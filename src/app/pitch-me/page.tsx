'use client'

import { useState } from 'react'
import PitchForm from '@/components/pitch/PitchForm'
import PitchOffer from '@/components/pitch/PitchOffer'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'
import Footer from '@/components/Footer'

export default function PitchMePage() {
  const [showOffer, setShowOffer] = useState(false)
  const [formData, setFormData] = useState(null)
  const [offerData, setOfferData] = useState(null)

  const handleFormSubmit = (data: any, offer: any) => {
    setFormData(data)
    setOfferData(offer)
    setShowOffer(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <GlowMenu />
      <StickyLogo />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {!showOffer ? (
              <>
                {/* Simple Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-black text-st-navy mb-6">
                    Pitch Your App Idea
                  </h1>
                  <p className="text-xl text-st-gray-600 leading-relaxed">
                    Got an app idea? Tell me about it. I&apos;ll evaluate your concept and provide personalized recommendations for bringing it to life.
                  </p>
                </div>

                {/* Form */}
                <PitchForm onSubmit={handleFormSubmit} />
              </>
            ) : (
              <PitchOffer 
                formData={formData} 
                offerData={offerData}
                onBack={() => setShowOffer(false)}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}