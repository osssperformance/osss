'use client'

import { MetaEvents } from './metaConversion'

declare global {
  interface Window {
    fbq: any
  }
}

interface TrackingData {
  email?: string
  phone?: string
  first_name?: string
  last_name?: string
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
  order_id?: string
}

export class MetaTracking {
  private isInitialized = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializePixel()
    }
  }

  private initializePixel() {
    if (this.isInitialized || !window.fbq) return
    this.isInitialized = true
  }

  // Client-side pixel tracking
  trackPixelEvent(eventName: string, parameters?: any) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters)
    }
  }

  // Server-side conversion API tracking
  async trackConversionAPI(eventName: string, userData: TrackingData, customData?: any) {
    try {
      const response = await fetch('/api/meta-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          userData,
          customData,
          eventSourceUrl: window.location.href
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Meta Conversion API tracking failed:', error)
      throw error
    }
  }

  // Track both pixel and conversion API
  async trackEvent(eventName: string, userData: TrackingData, customData?: any) {
    // Track with pixel immediately
    this.trackPixelEvent(eventName, { ...userData, ...customData })

    // Track with conversion API
    try {
      await this.trackConversionAPI(eventName, userData, customData)
    } catch (error) {
      console.error('Conversion API tracking failed, but pixel tracking succeeded:', error)
    }
  }

  // Specific event tracking methods
  async trackPurchase(orderData: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    value: number
    currency: string
    order_id: string
    content_name?: string
  }) {
    await this.trackEvent(MetaEvents.PURCHASE, orderData)
  }

  async trackLead(leadData: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    content_name?: string
    content_category?: string
    value?: number
    currency?: string
  }) {
    await this.trackEvent(MetaEvents.LEAD, leadData)
  }

  async trackContact(contactData: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    content_name?: string
  }) {
    await this.trackEvent(MetaEvents.CONTACT, contactData)
  }

  async trackInitiateCheckout(checkoutData: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    value: number
    currency: string
    content_name?: string
    num_items?: number
  }) {
    await this.trackEvent(MetaEvents.INITIATE_CHECKOUT, checkoutData)
  }

  async trackViewContent(contentData: {
    content_name: string
    content_category?: string
    value?: number
    currency?: string
  }) {
    await this.trackEvent(MetaEvents.VIEW_CONTENT, {}, contentData)
  }

  async trackSubscribe(subscribeData: {
    email?: string
    phone?: string
    first_name?: string
    last_name?: string
    value?: number
    currency?: string
  }) {
    await this.trackEvent(MetaEvents.SUBSCRIBE, subscribeData)
  }
}

// Export singleton instance
export const metaTracking = new MetaTracking()