import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send welcome email to subscriber
    const welcomeEmail = await resend.emails.send({
      from: 'Spencer Toogood <hello@mail.spencertoogood.com>',
      to: [email],
      subject: 'Welcome to Spencer Toogood\'s Newsletter',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #0a1e32; font-size: 32px; font-weight: 900; margin: 0 0 16px 0;">
              Welcome to the Newsletter!
            </h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #00ffff, #0a1e32); margin: 0 auto;"></div>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8f9fa, #ffffff); padding: 32px; border-radius: 16px; margin-bottom: 32px; border-left: 4px solid #00ffff;">
            <h2 style="color: #0a1e32; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
              Thanks for subscribing! 🚀
            </h2>
            <p style="color: #6c757d; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              You'll receive the latest insights on AI, automation, and marketing strategies that help small businesses do MORE with less.
            </p>
            <p style="color: #6c757d; font-size: 16px; line-height: 1.6; margin: 0;">
              Expect actionable tips, case studies, and exclusive content delivered directly to your inbox.
            </p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://spencertoogood.com/blog" style="display: inline-block; background: linear-gradient(135deg, #00ffff, #0a1e32); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px;">
              Read Latest Articles
            </a>
          </div>
          
          <div style="border-top: 1px solid #e9ecef; padding-top: 24px; text-align: center;">
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 8px 0;">
              Spencer Toogood - AI & Automation Specialist
            </p>
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              <a href="https://spencertoogood.com" style="color: #00ffff; text-decoration: none;">spencertoogood.com</a>
            </p>
          </div>
        </div>
      `
    })

    // Send notification to Spencer
    const notificationEmail = await resend.emails.send({
      from: 'Newsletter <hello@mail.spencertoogood.com>',
      to: ['hello@spencertoogood.com'],
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0a1e32; margin-bottom: 20px;">New Newsletter Subscription</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00ffff;">
            <p style="margin: 0; color: #0a1e32; font-size: 16px;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="margin: 8px 0 0 0; color: #6c757d; font-size: 14px;">
              Subscribed at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}