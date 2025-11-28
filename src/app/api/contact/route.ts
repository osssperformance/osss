import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface ContactFormData {
  name: string
  email: string
  message: string
  company?: string
  budget?: string
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, company, budget }: ContactFormData = await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
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

    // Send notification to Spencer
    const contactEmail = await resend.emails.send({
      from: 'Contact Form <hello@mail.spencertoogood.com>',
      to: ['hello@spencertoogood.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #0a1e32; font-size: 28px; font-weight: 900; margin: 0 0 16px 0;">
              New Contact Form Submission
            </h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #00ffff, #0a1e32); margin: 0 auto;"></div>
          </div>
          
          <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #00ffff;">
            <div style="margin-bottom: 16px;">
              <strong style="color: #0a1e32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</strong>
              <p style="color: #0a1e32; font-size: 18px; margin: 4px 0 0 0; font-weight: 600;">${name}</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #0a1e32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
              <p style="color: #0a1e32; font-size: 16px; margin: 4px 0 0 0;">
                <a href="mailto:${email}" style="color: #00ffff; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            ${company ? `
            <div style="margin-bottom: 16px;">
              <strong style="color: #0a1e32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company:</strong>
              <p style="color: #0a1e32; font-size: 16px; margin: 4px 0 0 0;">${company}</p>
            </div>
            ` : ''}
            
            ${budget ? `
            <div style="margin-bottom: 16px;">
              <strong style="color: #0a1e32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Budget:</strong>
              <p style="color: #0a1e32; font-size: 16px; margin: 4px 0 0 0;">${budget}</p>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e9ecef;">
            <strong style="color: #0a1e32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Message:</strong>
            <div style="color: #0a1e32; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              Received at: ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/New_York',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
            <div style="margin-top: 16px;">
              <a href="mailto:${email}?subject=Re: Contact Form Inquiry" style="display: inline-block; background: linear-gradient(135deg, #00ffff, #0a1e32); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>
          </div>
        </div>
      `
    })

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: 'Spencer Toogood <hello@mail.spencertoogood.com>',
      to: [email],
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #0a1e32; font-size: 32px; font-weight: 900; margin: 0 0 16px 0;">
              Thanks for reaching out!
            </h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #00ffff, #0a1e32); margin: 0 auto;"></div>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8f9fa, #ffffff); padding: 32px; border-radius: 16px; margin-bottom: 32px; border-left: 4px solid #00ffff;">
            <h2 style="color: #0a1e32; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
              Hi ${name}! 👋
            </h2>
            <p style="color: #6c757d; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thanks for your message! I've received your inquiry and will get back to you within 24 hours.
            </p>
            <p style="color: #6c757d; font-size: 16px; line-height: 1.6; margin: 0;">
              In the meantime, feel free to check out my latest articles on AI, automation, and marketing strategies.
            </p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://spencertoogood.com/blog" style="display: inline-block; background: linear-gradient(135deg, #00ffff, #0a1e32); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; margin-right: 16px;">
              Read Blog
            </a>
            <a href="https://spencertoogood.com" style="display: inline-block; background: transparent; color: #0a1e32; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; border: 2px solid #0a1e32;">
              View Portfolio
            </a>
          </div>
          
          <div style="border-top: 1px solid #e9ecef; padding-top: 24px; text-align: center;">
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 8px 0;">
              Spencer Toogood - AI & Automation Specialist
            </p>
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 16px 0;">
              Helping Small Business do MORE with less
            </p>
            <div style="display: flex; justify-content: center; gap: 16px;">
              <a href="https://linkedin.com/in/spencertoogood" style="color: #6c757d; text-decoration: none; font-size: 14px;">LinkedIn</a>
              <a href="https://twitter.com/spencertoogood" style="color: #6c757d; text-decoration: none; font-size: 14px;">Twitter</a>
              <a href="https://spencertoogood.com" style="color: #6c757d; text-decoration: none; font-size: 14px;">Website</a>
            </div>
          </div>
        </div>
      `
    })

    return NextResponse.json(
      { message: 'Message sent successfully! We\'ll get back to you soon.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}