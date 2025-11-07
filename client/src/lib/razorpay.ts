import Razorpay from 'razorpay'

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create payout using Razorpay Route
export async function createPayout(params: {
  accountNumber: string
  amount: number
  currency: string
  mode: 'IMPS' | 'NEFT' | 'RTGS' | 'UPI'
  purpose: string
  fund_account_id?: string
  queue_if_low_balance?: boolean
  reference_id?: string
  narration?: string
  notes?: Record<string, string>
}) {
  try {
    const payout = await razorpay.payouts.create({
      account_number: params.accountNumber,
      amount: params.amount * 100, // Convert to paise
      currency: params.currency,
      mode: params.mode,
      purpose: params.purpose,
      fund_account_id: params.fund_account_id,
      queue_if_low_balance: params.queue_if_low_balance ?? true,
      reference_id: params.reference_id,
      narration: params.narration,
      notes: params.notes,
    })

    return { success: true, data: payout }
  } catch (error) {
    console.error('Razorpay payout error:', error)
    return { success: false, error }
  }
}

// Create fund account for creator
export async function createFundAccount(params: {
  contact_id: string
  account_type: 'bank_account' | 'vpa'
  bank_account?: {
    name: string
    ifsc: string
    account_number: string
  }
  vpa?: {
    address: string
  }
}) {
  try {
    const fundAccount = await razorpay.fundAccount.create(params)
    return { success: true, data: fundAccount }
  } catch (error) {
    console.error('Razorpay fund account error:', error)
    return { success: false, error }
  }
}

// Create contact for creator
export async function createContact(params: {
  name: string
  email: string
  contact: string
  type: 'vendor' | 'customer'
  reference_id?: string
  notes?: Record<string, string>
}) {
  try {
    const contact = await razorpay.contacts.create(params)
    return { success: true, data: contact }
  } catch (error) {
    console.error('Razorpay contact error:', error)
    return { success: false, error }
  }
}

// Verify webhook signature
export function verifyWebhookSignature(
  webhookBody: string,
  signature: string,
  secret: string
): boolean {
  try {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(webhookBody)
      .digest('hex')
    
    return expectedSignature === signature
  } catch (error) {
    console.error('Webhook verification error:', error)
    return false
  }
}

// Create subscription for brand
export async function createSubscription(params: {
  plan_id: string
  customer_id: string
  total_count: number
  quantity?: number
  start_at?: number
  expire_by?: number
  notes?: Record<string, string>
}) {
  try {
    const subscription = await razorpay.subscriptions.create(params)
    return { success: true, data: subscription }
  } catch (error) {
    console.error('Razorpay subscription error:', error)
    return { success: false, error }
  }
}

