'use client'

import { useState } from 'react'
import { FAQItem } from '@/types/sales'
import { metaTracking } from '@/lib/metaTracking'

interface FAQSectionProps {
  faqs: FAQItem[]
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Group FAQs by category
  const groupedFAQs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQItem[]>)

  const categories = Object.keys(groupedFAQs)

  return (
    <section className="py-24 bg-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-st-navy mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-st-gray-600 max-w-3xl mx-auto">
              Got questions? We&apos;ve got answers. Here are the most common questions we receive 
              about our AI chat solution:
            </p>
          </div>

          {/* FAQ Categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <span
                  key={category}
                  className="bg-white text-st-navy px-4 py-2 rounded-full text-sm font-semibold border border-st-gray-200"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-sm border border-st-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-st-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg md:text-xl font-bold text-st-navy pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-st-gray-100 flex-shrink-0 transition-all duration-300 ${
                    openItems.has(faq.id) ? 'bg-st-cyan rotate-180' : ''
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-colors duration-300 ${
                        openItems.has(faq.id) ? 'text-st-navy' : 'text-st-gray-600'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.has(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="border-t border-st-gray-200 pt-4">
                      <p className="text-st-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="text-center mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-st-gray-200">
              <h3 className="text-2xl font-bold text-st-navy mb-4">
                Still have questions?
              </h3>
              <p className="text-st-gray-600 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Book a quick 15-minute call 
                and I&apos;ll answer all your questions personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    metaTracking.trackLead({
                      content_name: 'FAQ Book Call Button',
                      content_category: 'Sales Page CTA'
                    })
                  }}
                  className="bg-st-navy text-white px-6 py-3 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 font-semibold"
                >
                  Book a Call
                </button>
                <button 
                  onClick={() => {
                    metaTracking.trackLead({
                      content_name: 'FAQ Send Message Button',
                      content_category: 'Sales Page CTA'
                    })
                  }}
                  className="border-2 border-st-navy text-st-navy px-6 py-3 rounded-full hover:bg-st-navy hover:text-white transition-all duration-300 font-semibold"
                >
                  Send a Message
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default FAQSection