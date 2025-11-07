import { Queue, Worker, QueueEvents } from 'bullmq'
import Redis from 'ioredis'

// Initialize Redis connection
const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
})

// Define job types
export enum JobType {
  PROCESS_PAYOUT = 'process-payout',
  SEND_EMAIL = 'send-email',
  UPDATE_STATS = 'update-stats',
  WEBHOOK_HANDLER = 'webhook-handler',
  WEEKLY_DIGEST = 'weekly-digest',
}

// Create queues
export const payoutQueue = new Queue('payouts', { connection })
export const emailQueue = new Queue('emails', { connection })
export const statsQueue = new Queue('stats', { connection })
export const webhookQueue = new Queue('webhooks', { connection })

// Payout processor
export const payoutWorker = new Worker(
  'payouts',
  async (job) => {
    const { payoutId, creatorId, amount } = job.data

    try {
      // Import here to avoid circular dependencies
      const { prisma } = await import('./prisma')
      const { createPayout } = await import('./razorpay')
      const { sendPayoutEmail } = await import('./email')

      // Get creator and payout details
      const creator = await prisma.creatorProfile.findUnique({
        where: { id: creatorId },
        include: { user: true },
      })

      if (!creator || !creator.razorpayFundAccountId) {
        throw new Error('Creator not found or missing fund account')
      }

      // Create Razorpay payout
      const result = await createPayout({
        accountNumber: process.env.RAZORPAY_ACCOUNT_NUMBER!,
        amount,
        currency: 'INR',
        mode: creator.upiId ? 'UPI' : 'IMPS',
        purpose: 'payout',
        fund_account_id: creator.razorpayFundAccountId,
        reference_id: payoutId,
        narration: 'Affiliate commission payout',
      })

      if (!result.success) {
        throw new Error('Payout creation failed')
      }

      // Update payout status
      await prisma.payout.update({
        where: { id: payoutId },
        data: {
          status: 'PROCESSING',
          razorpayPayoutId: result.data.id,
          processedAt: new Date(),
        },
      })

      // Send email notification
      await sendPayoutEmail({
        to: creator.user.email,
        name: creator.user.name || 'Creator',
        amount,
        payoutId,
        status: 'Processing',
      })

      return { success: true, payoutId }
    } catch (error) {
      console.error('Payout processing error:', error)

      // Update payout status to failed
      const { prisma } = await import('./prisma')
      await prisma.payout.update({
        where: { id: payoutId },
        data: {
          status: 'FAILED',
          statusMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      })

      throw error
    }
  },
  { connection }
)

// Email processor
export const emailWorker = new Worker(
  'emails',
  async (job) => {
    const { type, params } = job.data

    try {
      const { sendWelcomeEmail, sendPayoutEmail, sendWeeklyDigest } = await import('./email')

      switch (type) {
        case 'welcome':
          await sendWelcomeEmail(params)
          break
        case 'payout':
          await sendPayoutEmail(params)
          break
        case 'weekly-digest':
          await sendWeeklyDigest(params)
          break
        default:
          throw new Error(`Unknown email type: ${type}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Email processing error:', error)
      throw error
    }
  },
  { connection }
)

// Stats updater
export const statsWorker = new Worker(
  'stats',
  async (job) => {
    const { type, data } = job.data

    try {
      const { prisma } = await import('./prisma')

      switch (type) {
        case 'update-creator-stats':
          // Recalculate creator stats
          const creatorStats = await prisma.transaction.aggregate({
            where: {
              creatorId: data.creatorId,
              status: 'COMPLETED',
            },
            _sum: {
              commission: true,
            },
            _count: true,
          })

          await prisma.creatorProfile.update({
            where: { id: data.creatorId },
            data: {
              totalEarnings: creatorStats._sum.commission || 0,
              totalConversions: creatorStats._count,
            },
          })
          break

        case 'update-product-stats':
          // Recalculate product stats
          const productStats = await prisma.transaction.aggregate({
            where: {
              productId: data.productId,
              status: 'COMPLETED',
            },
            _sum: {
              amount: true,
            },
            _count: true,
          })

          await prisma.product.update({
            where: { id: data.productId },
            data: {
              totalRevenue: productStats._sum.amount || 0,
              totalConversions: productStats._count,
            },
          })
          break
      }

      return { success: true }
    } catch (error) {
      console.error('Stats update error:', error)
      throw error
    }
  },
  { connection }
)

// Helper functions to add jobs
export async function queuePayout(payoutId: string, creatorId: string, amount: number) {
  await payoutQueue.add(JobType.PROCESS_PAYOUT, {
    payoutId,
    creatorId,
    amount,
  })
}

export async function queueEmail(type: string, params: any) {
  await emailQueue.add(JobType.SEND_EMAIL, {
    type,
    params,
  })
}

export async function queueStatsUpdate(type: string, data: any) {
  await statsQueue.add(JobType.UPDATE_STATS, {
    type,
    data,
  })
}

// Queue event listeners for monitoring
const payoutEvents = new QueueEvents('payouts', { connection })
payoutEvents.on('completed', ({ jobId }) => {
  console.log(`Payout job ${jobId} completed`)
})

payoutEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`Payout job ${jobId} failed:`, failedReason)
})

const emailEvents = new QueueEvents('emails', { connection })
emailEvents.on('completed', ({ jobId }) => {
  console.log(`Email job ${jobId} completed`)
})

emailEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`Email job ${jobId} failed:`, failedReason)
})

