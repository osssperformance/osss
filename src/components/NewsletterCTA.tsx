'use client'

import { useState } from 'react'

interface NewsletterCTAProps {
  title?: string
  description?: string
  className?: string
}

const NewsletterCTA = ({ 
  title = "Want more insights like this?",
  description = "Subscribe to get the latest articles on AI, automation, and marketing delivered to your inbox.",
  className = ""
}: NewsletterCTAProps) => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim()) {
      setStatus('error')
      setMessage('Please enter your first name')
      return
    }
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('https://agent-mofos-backend.onrender.com/api/crm/contacts/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          first_name: firstName,
          email: email,
          source: 'newsletter-signup',
          tags: ['newsletter', 'spencertoogood.com'],
          referrer_url: window.location.href
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email for confirmation.')
        
        // Track successful newsletter signup
        if (typeof window !== 'undefined' && window.OmniWolf) {
          window.OmniWolf.track('newsletter_signup', {
            email: email,
            first_name: firstName,
            source: 'newsletter-cta',
            location: window.location.pathname
          })
        }
        
        setFirstName('')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className={`bg-gradient-to-r from-st-navy to-st-gray-800 text-white p-12 rounded-3xl text-center ${className}`}>
      <h3 className="text-3xl font-bold mb-4">
        {title}
      </h3>
      <p className="text-xl mb-8 opacity-90">
        {description}
      </p>
      
      {status === 'success' ? (
        <div className="max-w-md mx-auto">
          <div className="bg-st-cyan/20 border border-st-cyan/30 rounded-full px-6 py-4 mb-4">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-st-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-st-cyan font-semibold">{message}</span>
            </div>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="text-st-cyan hover:text-white transition-colors text-sm underline"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="flex-1 px-6 py-4 rounded-full text-st-navy focus:outline-none focus:ring-2 focus:ring-st-cyan disabled:opacity-50"
              disabled={status === 'loading'}
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-6 py-4 rounded-full text-st-navy focus:outline-none focus:ring-2 focus:ring-st-cyan disabled:opacity-50"
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-st-cyan text-st-navy px-8 py-4 rounded-full hover:bg-white transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-st-navy border-t-transparent rounded-full animate-spin"></div>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          {status === 'error' && (
            <div className="mt-4 text-red-300 text-sm">
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default NewsletterCTA