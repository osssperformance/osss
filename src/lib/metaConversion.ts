import crypto from 'crypto'

interface ConversionData {
  event_name: string
  event_time: number
  event_source_url: string
  user_data: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    client_ip_address?: string
    client_user_agent?: string
    fbc?: string  // Facebook click ID
    fbp?: string  // Facebook browser ID
  }
  custom_data?: {
    currency?: string
    value?: number
    content_name?: string
    content_category?: string
    content_ids?: string[]
    num_items?: number
    order_id?: string
    delivery_category?: string
  }
  action_source: 'website' | 'email' | 'phone_call' | 'chat' | 'system_generated'
}

interface MetaConversionResponse {
  events_received: number
  messages: string[]
  fbtrace_id: string
}

export class MetaConversionAPI {
  private pixelId: string
  private accessToken: string
  private apiUrl: string

  constructor(pixelId: string, accessToken: string) {
    this.pixelId = pixelId
    this.accessToken = accessToken
    this.apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`
  }

  private hashData(data: string): string {
    return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
  }

  private prepareUserData(userData: ConversionData['user_data']): ConversionData['user_data'] {
    const prepared: ConversionData['user_data'] = {}

    if (userData.email) {
      prepared.email = this.hashData(userData.email)
    }
    if (userData.phone) {
      // Remove non-numeric characters and hash
      const cleanPhone = userData.phone.replace(/\D/g, '')
      prepared.phone = this.hashData(cleanPhone)
    }
    if (userData.first_name) {
      prepared.first_name = this.hashData(userData.first_name)
    }
    if (userData.last_name) {
      prepared.last_name = this.hashData(userData.last_name)
    }

    // Keep these unhashed
    if (userData.client_ip_address) {
      prepared.client_ip_address = userData.client_ip_address
    }
    if (userData.client_user_agent) {
      prepared.client_user_agent = userData.client_user_agent
    }
    if (userData.fbc) {
      prepared.fbc = userData.fbc
    }
    if (userData.fbp) {
      prepared.fbp = userData.fbp
    }

    return prepared
  }

  async sendConversion(data: ConversionData): Promise<MetaConversionResponse> {
    try {
      const payload = {
        data: [{
          ...data,
          user_data: this.prepareUserData(data.user_data)
        }],
        access_token: this.accessToken
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Meta API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Meta Conversion API error:', error)
      throw error
    }
  }
}

// Helper function to track common events
export const trackConversion = async (
  eventName: string,
  eventSourceUrl: string,
  userData: ConversionData['user_data'],
  customData?: ConversionData['custom_data']
): Promise<void> => {
  try {
    const pixelId = process.env.META_PIXEL_ID
    const accessToken = process.env.META_ACCESS_TOKEN

    if (!pixelId || !accessToken) {
      console.warn('Meta Pixel ID or Access Token not configured')
      return
    }

    const api = new MetaConversionAPI(pixelId, accessToken)
    
    const conversionData: ConversionData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl,
      user_data: userData,
      custom_data: customData,
      action_source: 'website'
    }

    await api.sendConversion(conversionData)
  } catch (error) {
    console.error('Failed to track conversion:', error)
  }
}

// Pre-defined conversion events
export const MetaEvents = {
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  CONTACT: 'Contact',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_TO_CART: 'AddToCart',
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  SUBSCRIBE: 'Subscribe'
} as const