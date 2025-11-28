'use client'

import { useEffect } from 'react'

// Declare OmniWolf on window object
declare global {
  interface Window {
    OmniWolf: {
      track: (eventName: string, data?: Record<string, any>) => void
      trackPageView: (data?: Record<string, any>) => void
      trackFormSubmit: (data?: Record<string, any>) => void
      getConfig: () => any
    }
    omniwolf_config: {
      license_key?: string
      tenant_id?: number
      brand_id?: number
    }
  }
}

const OmniWolfTracking = () => {
  useEffect(() => {
    // Set up OmniWolf configuration
    window.omniwolf_config = {
      license_key: process.env.NEXT_PUBLIC_OMNIWOLF_LICENSE_KEY || 'your_license_key'
    }

    // Load the OmniWolf pixel script
    const script = document.createElement('script')
    script.src = 'https://cdn.omniwolf.com/pixel/universal-pixel.js'
    script.async = true
    document.head.appendChild(script)

    // Track initial page view
    script.onload = () => {
      if (window.OmniWolf) {
        window.OmniWolf.trackPageView({
          page_type: 'home',
          custom_data: 'portfolio_visit'
        })
      }
    }

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}

export default OmniWolfTracking