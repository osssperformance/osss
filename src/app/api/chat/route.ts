import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, timestamp } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Use the specific n8n webhook URL for Spencer Toogood chat
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://mediaevolutionn8n.onrender.com/webhook/stchat'

    console.log('Using N8N_WEBHOOK_URL:', N8N_WEBHOOK_URL)

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL environment variable not set')
      return NextResponse.json(
        { 
          response: "Thanks for your message! Spencer will get back to you soon. You can also reach him directly at hello@spencertoogood.com" 
        },
        { status: 200 }
      )
    }

    // Send message to n8n webhook
    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        timestamp,
        source: 'portfolio_chat',
        user_agent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        url: request.url,
        referer: request.headers.get('referer')
      }),
    })

    if (webhookResponse.ok) {
      let webhookData
      try {
        webhookData = await webhookResponse.json()
      } catch (parseError) {
        // If response isn't JSON, try to get text
        const textResponse = await webhookResponse.text()
        console.log('n8n webhook text response:', textResponse)
        webhookData = { response: textResponse }
      }
      
      // Return the response from n8n, or a default confirmation message
      return NextResponse.json({
        response: webhookData.response || webhookData.message || "Thanks for your message! Spencer will get back to you soon."
      })
    } else {
      console.error('n8n webhook failed:', webhookResponse.status, webhookResponse.statusText)
      const errorText = await webhookResponse.text()
      console.error('n8n webhook error response:', errorText)
      throw new Error(`Webhook failed: ${webhookResponse.status}`)
    }

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return a fallback message if anything fails
    return NextResponse.json(
      { 
        response: "Thanks for your message! I'm having trouble connecting right now, but Spencer will see your message and get back to you soon. You can also reach him directly at hello@spencertoogood.com" 
      },
      { status: 200 }
    )
  }
}