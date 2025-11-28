'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product, TrustBadge } from '@/types/sales'

interface SalesHeroProps {
  product: Product
  trustBadges: TrustBadge[]
  onCTAClick: () => void
}

const SalesHero = ({ product, trustBadges, onCTAClick }: SalesHeroProps) => {
  const [showVideo, setShowVideo] = useState(false)
  
  const savings = product.salePrice ? product.regularPrice - product.salePrice : 0
  const savingsPercent = product.salePrice ? Math.round((savings / product.regularPrice) * 100) : 0

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-st-navy via-[#0A2540] to-st-gray-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.05)_0%,transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-st-cyan/20 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-st-cyan/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-st-cyan/30 rounded-full animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Copy */}
          <div className="text-white">
            {/* Urgency Banner */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Limited Time: Save ${savings} Today Only!
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {product.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {product.subheadline}
            </p>

            {/* Bullet Points */}
            <div className="space-y-4 mb-8">
              {product.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-st-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg text-white/90">{point}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                {product.salePrice ? (
                  <>
                    <span className="text-4xl md:text-5xl font-black text-st-cyan">
                      ${product.salePrice}
                    </span>
                    <span className="text-2xl text-white/60 line-through">
                      ${product.regularPrice}
                    </span>
                    <span className="bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save {savingsPercent}%
                    </span>
                  </>
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-st-cyan">
                    ${product.regularPrice}
                  </span>
                )}
              </div>
              <p className="text-white/70">One-time setup fee • No monthly charges</p>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <button
                onClick={onCTAClick}
                className="group bg-st-cyan text-st-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
                }}
              >
                <span>{product.ctaText}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-st-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">{product.guarantee}</p>
                <p className="text-sm text-white/70">No questions asked</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 opacity-80">
              {trustBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-xs">🛡️</span>
                  </div>
                  <span className="text-sm text-white/90">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {showVideo && product.videoUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={product.videoUrl}
                  title="Product Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Hero Image/Mockup */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-st-gray-100 to-white shadow-2xl">
                  {product.heroImage ? (
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-st-gray-600">
                        <div className="w-24 h-24 bg-st-cyan rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-12 h-12 text-st-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <p className="text-xl font-semibold">Product Demo</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Play Button Overlay */}
                {product.videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors rounded-2xl"
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-st-navy ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                )}

                {/* Floating Social Proof */}
                <div className="absolute -bottom-6 left-0 md:-left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-st-cyan to-st-navy rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-st-navy">340+ Happy Clients</p>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default SalesHero