import { NextRequest, NextResponse } from 'next/server'
import { trackConversion, MetaEvents } from '@/lib/metaConversion'

export async function POST(request: NextRequest) {
  try {
    const { eventName, userData, customData, eventSourceUrl } = await request.json()

    // Get IP address from request
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1'

    // Get user agent
    const userAgent = request.headers.get('user-agent') || ''

    // Get Facebook pixel data from cookies
    const cookies = request.headers.get('cookie') || ''
    const fbpMatch = cookies.match(/_fbp=([^;]+)/)
    const fbcMatch = cookies.match(/_fbc=([^;]+)/)

    const enrichedUserData = {
      ...userData,
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: fbpMatch ? fbpMatch[1] : undefined,
      fbc: fbcMatch ? fbcMatch[1] : undefined
    }

    await trackConversion(
      eventName,
      eventSourceUrl || request.nextUrl.origin,
      enrichedUserData,
      customData
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Conversion tracked successfully' 
    })
  } catch (error) {
    console.error('Meta conversion tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track conversion' },
      { status: 500 }
    )
  }
}