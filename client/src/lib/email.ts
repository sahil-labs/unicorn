import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = process.env.FROM_EMAIL || 'noreply@microcreator.app'

export async function sendPayoutEmail(params: {
  to: string
  name: string
  amount: number
  payoutId: string
  status: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: `Payout ${params.status}: ₹${params.amount}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Payout Update</h2>
          <p>Hi ${params.name},</p>
          <p>Your payout request has been ${params.status.toLowerCase()}.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Amount:</strong> ₹${params.amount}</p>
            <p style="margin: 10px 0 0 0;"><strong>Payout ID:</strong> ${params.payoutId}</p>
          </div>
          <p>The amount will be credited to your account within 1-3 business days.</p>
          <p>Thank you for being part of Micro-Creator!</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(params: {
  to: string
  name: string
  role: 'creator' | 'brand'
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: 'Welcome to Micro-Creator! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Welcome to Micro-Creator!</h1>
          <p>Hi ${params.name},</p>
          <p>Thank you for joining Micro-Creator as a ${params.role}!</p>
          ${params.role === 'creator' ? `
            <p>You're now ready to start earning commissions by promoting amazing products.</p>
            <p><strong>Next steps:</strong></p>
            <ul>
              <li>Browse the marketplace and find products you love</li>
              <li>Generate your unique affiliate links</li>
              <li>Share them with your audience</li>
              <li>Track your earnings in real-time</li>
            </ul>
          ` : `
            <p>You're now ready to reach thousands of creators and grow your sales.</p>
            <p><strong>Next steps:</strong></p>
            <ul>
              <li>Add your first product to the marketplace</li>
              <li>Set your commission rates</li>
              <li>Watch creators promote your products</li>
              <li>Track your performance and conversions</li>
            </ul>
          `}
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Happy earning!</p>
          <p>The Micro-Creator Team</p>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendWeeklyDigest(params: {
  to: string
  name: string
  stats: {
    clicks: number
    conversions: number
    earnings: number
    topProduct: string
  }
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: 'Your Weekly Performance Summary 📊',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Your Week in Review</h2>
          <p>Hi ${params.name},</p>
          <p>Here's how you performed this week:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Total Clicks:</strong> ${params.stats.clicks}</p>
            <p><strong>Conversions:</strong> ${params.stats.conversions}</p>
            <p><strong>Earnings:</strong> ₹${params.stats.earnings}</p>
            <p><strong>Top Product:</strong> ${params.stats.topProduct}</p>
          </div>
          <p>Keep up the great work!</p>
          <p>Best regards,<br/>The Micro-Creator Team</p>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

