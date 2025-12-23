'use client'

import { useEffect, useState } from 'react'
import { metaTracking } from '@/lib/metaTracking'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setMessage('Please fill in all required fields')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        
        // Track successful contact form submission with OmniWolf
        if (typeof window !== 'undefined' && window.OmniWolf) {
          window.OmniWolf.trackFormSubmit({
            id: 'contact_form',
            name: 'Contact Form',
            type: 'contact',
            fields: ['name', 'email', 'company', 'message'],
            email: formData.email
          })
          
          // Also track as a custom event
          window.OmniWolf.track('contact_form_success', {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message_length: formData.message.length
          })
        }
        
        // Track successful contact form submission
        metaTracking.trackContact({
          email: formData.email,
          first_name: formData.name.split(' ')[0],
          last_name: formData.name.split(' ')[1] || '',
          content_name: 'Contact Form Submission'
        })
        
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-24 bg-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-5xl md:text-6xl font-black text-st-navy mb-8">
              LET&apos;S WORK TOGETHER
            </h2>
            <p className="text-xl text-st-gray-400 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your business with AI, automation, and strategic advertising? 
              Let&apos;s start the conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-st-navy font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 border-2 border-st-gray-200 rounded-lg focus:border-st-cyan focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-st-navy font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 border-2 border-st-gray-200 rounded-lg focus:border-st-cyan focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-st-navy font-semibold mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 border-2 border-st-gray-200 rounded-lg focus:border-st-cyan focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-st-navy font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={status === 'loading'}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-st-gray-200 rounded-lg focus:border-st-cyan focus:outline-none transition-colors duration-300 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-st-navy text-white py-4 rounded-lg hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-st-navy flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                
                {/* Status Messages */}
                {message && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    status === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      {status === 'success' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      )}
                      <span className="font-medium">{message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-st-navy mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="w-6 h-6 text-st-cyan mr-4 mt-1">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-st-navy font-semibold">call</p>
                        <p className="text-st-gray-400">0473 344 773</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 text-st-cyan mr-4 mt-1">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-st-navy font-semibold">Location</p>
                        <p className="text-st-gray-400">Gold Coast, QLD</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 text-st-cyan mr-4 mt-1">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-st-navy font-semibold">Response Time</p>
                        <p className="text-st-gray-400">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact