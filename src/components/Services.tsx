'use client'

import { useEffect, useState } from 'react'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'AI Strategy & Implementation',
      description: 'Custom AI solutions tailored to your business needs, from chatbots to predictive analytics.',
      features: ['Custom AI Development', 'Process Automation', 'Data Analysis', 'Machine Learning Models'],
      price: 'From $5,000',
      popular: false
    },
    {
      title: 'Marketing Automation Suite',
      description: 'Complete marketing automation setup with lead nurturing, email sequences, and CRM integration.',
      features: ['Email Automation', 'Lead Scoring', 'CRM Integration', 'Analytics Dashboard'],
      price: 'From $3,000',
      popular: true
    },
    {
      title: 'Performance Advertising',
      description: 'Data-driven advertising campaigns across Google, Facebook, LinkedIn, and emerging platforms.',
      features: ['Campaign Strategy', 'Ad Creation', 'Performance Optimization', 'ROI Tracking'],
      price: 'From $2,000/month',
      popular: false
    }
  ]

  return (
    <section id="services" className="py-24 bg-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-st-gray-400 text-lg mb-4">Services</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-st-navy mb-8">
              HOW WE HELP SMALL BUSINESS
            </h2>
            <p className="text-xl text-st-gray-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to accelerate your business growth through intelligent technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-500 transform hover:scale-102 ${
                  service.popular ? 'ring-2 ring-st-cyan' : ''
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-st-cyan text-st-navy px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-st-navy mb-4 group-hover:text-st-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-st-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="text-3xl font-bold text-st-navy mb-6">
                    {service.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-st-gray-400">
                      <svg className="w-5 h-5 text-st-cyan mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-st-navy text-white py-3 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold">
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-st-gray-400 mb-6">
              Need a custom solution? Let&apos;s discuss your specific requirements.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-st-navy text-st-navy px-8 py-4 rounded-full hover:bg-st-navy hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services