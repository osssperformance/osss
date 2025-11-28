'use client'

import { useState } from 'react'
import type { PitchFormData, PitchOffer } from '@/types/pitch'

interface PitchOfferProps {
  formData: PitchFormData | null
  offerData: PitchOffer | null
  onBack: () => void
}

const PitchOffer = ({ formData, offerData, onBack }: PitchOfferProps) => {
  const [showPDF, setShowPDF] = useState(false)

  if (!formData || !offerData) {
    return (
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-st-navy mb-4">Something went wrong</h2>
          <p className="text-st-gray-600 mb-8">Please try submitting your pitch again.</p>
          <button
            onClick={onBack}
            className="bg-st-navy text-white px-6 py-3 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const getScoreBandColor = (band: string) => {
    switch (band) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-st-gray-600 bg-st-gray-50 border-st-gray-200'
    }
  }

  const getScoreBandLabel = (band: string) => {
    switch (band) {
      case 'high': return 'Strong Fit'
      case 'medium': return 'Validation Candidate'
      case 'low': return 'Needs Preparation'
      default: return 'Assessed'
    }
  }

  const generatePDF = () => {
    // This would generate a PDF of the proposal
    setShowPDF(true)
    // Implementation for PDF generation would go here
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-block px-6 py-2 rounded-full border-2 mb-4 ${getScoreBandColor(offerData.scoreBand)}`}>
            <span className="font-semibold text-lg">{getScoreBandLabel(offerData.scoreBand)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-st-navy mb-6">
            Your Pitch Assessment
          </h1>
          <p className="text-xl text-st-gray-600 max-w-3xl mx-auto">
            Thanks for your submission, {formData.fullName}. Here&apos;s your personalized recommendation.
          </p>
        </div>

        {/* Main Offer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Left Column - Package Details */}
            <div>
              <h2 className="text-2xl font-bold text-st-navy mb-4">
                Recommended Package
              </h2>
              
              <div className="bg-st-gray-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-st-navy mb-2">
                  {offerData.basePackage.name}
                </h3>
                <p className="text-st-gray-600 mb-4">
                  {offerData.basePackage.description}
                </p>
                <div className="text-3xl font-black text-st-navy">
                  ${offerData.basePackage.price.toLocaleString()}
                </div>
              </div>

              {/* Add-ons */}
              {offerData.addOns.some(addon => addon.triggered) && (
                <div className="mb-6">
                  <h4 className="font-bold text-st-navy mb-3">Recommended Add-ons</h4>
                  <div className="space-y-3">
                    {offerData.addOns
                      .filter(addon => addon.triggered)
                      .map((addon, index) => (
                        <div key={index} className="border border-st-cyan rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-semibold text-st-navy">{addon.name}</h5>
                              <p className="text-sm text-st-gray-600">{addon.description}</p>
                            </div>
                            <div className="text-lg font-bold text-st-navy ml-4">
                              +${addon.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t-2 border-st-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-st-navy">Total Investment</span>
                  <span className="text-3xl font-black text-st-navy">
                    ${offerData.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Next Steps */}
            <div>
              <h2 className="text-2xl font-bold text-st-navy mb-4">
                Next Steps
              </h2>
              
              <div className="bg-gradient-to-r from-st-navy to-st-gray-800 text-white rounded-lg p-6 mb-6">
                <p className="text-lg leading-relaxed">
                  {offerData.nextStep}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {offerData.callBookingUrl && (
                  <a
                    href={offerData.callBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-st-cyan text-st-navy px-6 py-4 rounded-full text-center font-semibold text-lg hover:bg-st-cyan/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Book Kickoff Call
                  </a>
                )}
                
                {offerData.paymentUrl && (
                  <a
                    href={offerData.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-st-navy text-white px-6 py-4 rounded-full text-center font-semibold text-lg hover:bg-st-gray-800 transition-all duration-300"
                  >
                    Pay ${offerData.totalPrice.toLocaleString()} & Secure Slot
                  </a>
                )}
                
                <button
                  onClick={generatePDF}
                  className="block w-full border-2 border-st-navy text-st-navy px-6 py-4 rounded-full text-center font-semibold text-lg hover:bg-st-navy hover:text-white transition-all duration-300"
                >
                  Download Proposal PDF
                </button>
              </div>

              {/* Timeline */}
              <div className="mt-8 p-4 bg-st-gray-100 rounded-lg">
                <h4 className="font-semibold text-st-navy mb-3">Expected Timeline</h4>
                <div className="space-y-2 text-sm text-st-gray-600">
                  <div className="flex justify-between">
                    <span>Kickoff Call</span>
                    <span>Within 48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validation Complete</span>
                    <span>1-2 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Results & Recommendations</span>
                    <span>2-3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-st-navy mb-6">What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Market Research',
                description: 'Competitive analysis and market size validation'
              },
              {
                icon: '📱',
                title: 'Prototype',
                description: '3-5 key screens to test user flow'
              },
              {
                icon: '🎯',
                title: 'Landing Page',
                description: 'High-converting page with signup form'
              },
              {
                icon: '📊',
                title: 'Ad Testing',
                description: 'Facebook/Google ads to measure demand'
              },
              {
                icon: '📋',
                title: 'Insights Report',
                description: 'Detailed findings and recommendations'
              },
              {
                icon: '💳',
                title: 'Build Credit',
                description: 'Full validation cost credited to build'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-st-navy mb-2">{item.title}</h3>
                <p className="text-sm text-st-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-st-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: 'What if validation shows negative results?',
                answer: 'You get a full refund of your validation payment. No risk to you.'
              },
              {
                question: 'How is the validation credit applied?',
                answer: 'The full $1,500 validation cost is deducted from your build project total.'
              },
              {
                question: 'Can I change the scope after validation?',
                answer: 'Absolutely. We adjust the build plan based on validation learnings.'
              },
              {
                question: 'What if I need to pause the project?',
                answer: 'No problem. Your validation results and credit remain valid for 12 months.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-st-gray-200 pb-4 last:border-b-0">
                <h3 className="font-semibold text-st-navy mb-2">{faq.question}</h3>
                <p className="text-st-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-st-gray-600 mb-4">
            Questions about your assessment? 
          </p>
          <a
            href="mailto:hello@spencertoogood.com"
            className="text-st-cyan hover:text-st-navy transition-colors font-semibold"
          >
            Email me directly →
          </a>
        </div>
      </div>
    </div>
  )
}

export default PitchOffer