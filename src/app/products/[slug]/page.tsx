'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getSalesPageData } from '@/lib/salesData'
import { getSalesPageFromSanity } from '@/lib/sanitySalesData'
import { SalesPageData } from '@/types/sales'
import { metaTracking } from '@/lib/metaTracking'

// Sales Components
import SalesHero from '@/components/sales/SalesHero'
import ProblemSection from '@/components/sales/ProblemSection'
import BenefitsSection from '@/components/sales/BenefitsSection'
import TestimonialCarousel from '@/components/sales/TestimonialCarousel'
import FAQSection from '@/components/sales/FAQSection'

const SalesPage = () => {
  const params = useParams()
  const [salesData, setSalesData] = useState<SalesPageData | null>(null)
  const [showStickyButton, setShowStickyButton] = useState(false)

  useEffect(() => {
    const fetchSalesData = async () => {
      if (params.slug) {
        // Try to fetch from Sanity first
        const sanityData = await getSalesPageFromSanity(params.slug as string)
        
        // Fallback to mock data if not found in Sanity
        const data = sanityData || getSalesPageData(params.slug as string)
        setSalesData(data)
        
        // Track page view
        if (data) {
          metaTracking.trackViewContent({
            content_name: data.product.name,
            content_category: 'Sales Page',
            value: data.pricing[0]?.salePrice || data.pricing[0]?.price,
            currency: 'USD'
          })
        }
      }
    }

    fetchSalesData()
  }, [params.slug])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTAClick = () => {
    // Track initiate checkout
    if (salesData) {
      metaTracking.trackInitiateCheckout({
        content_name: salesData.product.name,
        value: salesData.pricing[0]?.salePrice || salesData.pricing[0]?.price,
        currency: 'USD',
        num_items: 1
      })
    }
    
    // Scroll to pricing or contact section
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!salesData) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="text-3xl font-bold text-st-navy mb-4">Product not found</h1>
          <p className="text-st-gray-400 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <button className="bg-st-cyan text-st-navy px-6 py-3 rounded-full hover:bg-st-navy hover:text-white transition-all duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Urgency Banner */}
      {salesData.urgency && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white py-3 text-center font-semibold z-50">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {salesData.urgency.message}
          </div>
        </div>
      )}

      <div className={salesData.urgency ? 'pt-12' : ''}>
        {/* Hero Section */}
        <SalesHero 
          product={salesData.product}
          trustBadges={salesData.trustBadges}
          onCTAClick={handleCTAClick}
        />

        {/* Problem/Agitation Section */}
        <ProblemSection problems={salesData.problems} />

        {/* Benefits Section */}
        <BenefitsSection benefits={salesData.benefits} />

        {/* Social Proof/Testimonials */}
        <TestimonialCarousel testimonials={salesData.testimonials} />

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-st-navy mb-6">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-st-gray-600 max-w-3xl mx-auto">
                  Your AI chat solution comes fully loaded with everything you need to start 
                  converting more visitors into customers immediately.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salesData.features.map((feature, index) => (
                  <div key={index} className="bg-st-gray-100 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-st-cyan rounded-full flex items-center justify-center flex-shrink-0">
                        {feature.icon ? (
                          <span className="text-xl">{feature.icon}</span>
                        ) : (
                          <svg className="w-6 h-6 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-st-navy mb-2">{feature.name}</h3>
                        <p className="text-st-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gradient-to-b from-st-gray-100 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-st-navy mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-st-gray-600">
                  Join hundreds of businesses that have dramatically increased their conversion rates 
                  with our AI solution.
                </p>
              </div>

              {salesData.pricing.map((tier) => (
                <div key={tier.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-st-cyan">
                  {tier.popular && (
                    <div className="bg-st-cyan text-st-navy text-center py-3 font-bold">
                      MOST POPULAR - LIMITED TIME OFFER
                    </div>
                  )}
                  
                  <div className="p-12">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-st-navy mb-4">{tier.name}</h3>
                      
                      <div className="flex items-baseline justify-center gap-4 mb-6">
                        {tier.salePrice ? (
                          <>
                            <span className="text-5xl font-black text-st-cyan">${tier.salePrice}</span>
                            <span className="text-2xl text-st-gray-400 line-through">${tier.price}</span>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Save ${tier.price - tier.salePrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-5xl font-black text-st-cyan">${tier.price}</span>
                        )}
                      </div>
                      
                      <p className="text-st-gray-600">One-time setup fee • No monthly charges</p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-st-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg className="w-3 h-3 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-st-navy">{feature.name}</p>
                            <p className="text-st-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bonuses */}
                    {tier.bonuses && tier.bonuses.length > 0 && (
                      <div className="bg-st-cyan/10 border border-st-cyan/20 rounded-2xl p-6 mb-8">
                        <h4 className="font-bold text-st-navy mb-4 text-center">BONUS ITEMS INCLUDED:</h4>
                        <div className="space-y-2">
                          {tier.bonuses.map((bonus, bonusIndex) => (
                            <div key={bonusIndex} className="flex items-center gap-3">
                              <span className="text-st-cyan">🎁</span>
                              <span className="text-st-navy font-medium">{bonus}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="text-center">
                      <button className="w-full bg-st-cyan text-st-navy py-4 px-8 rounded-full font-bold text-xl hover:bg-st-navy hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg mb-6">
                        {tier.ctaText}
                      </button>
                      
                      {/* Guarantees */}
                      <div className="space-y-2 text-sm text-st-gray-600">
                        {salesData.riskReversals.map((guarantee, guaranteeIndex) => (
                          <div key={guaranteeIndex} className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{guarantee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={salesData.faqs} />

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-r from-st-navy to-st-gray-800 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Don&apos;t Let Another Lead Slip Away
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Every day you wait is another day of lost revenue. Your competitors are already 
                implementing AI solutions. Don&apos;t get left behind.
              </p>
              
              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4">What happens when you order today:</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <div className="text-st-cyan font-bold mb-2">Step 1: Order</div>
                    <p className="text-white/80">Secure your spot and get instant access to our onboarding portal</p>
                  </div>
                  <div>
                    <div className="text-st-cyan font-bold mb-2">Step 2: Setup</div>
                    <p className="text-white/80">We handle everything - you&apos;ll be live within 24-48 hours</p>
                  </div>
                  <div>
                    <div className="text-st-cyan font-bold mb-2">Step 3: Results</div>
                    <p className="text-white/80">Watch your conversion rates soar as leads pour in 24/7</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCTAClick}
                className="bg-st-cyan text-st-navy px-12 py-6 rounded-full font-bold text-xl hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6"
              >
                Get Your AI Chat Bot Now - Save $200 Today
              </button>
              
              <p className="text-white/70">
                30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Buy Button */}
      {showStickyButton && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button 
            onClick={handleCTAClick}
            className="bg-st-cyan text-st-navy px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <span>Get Started Now - ${salesData.pricing[0]?.salePrice || salesData.pricing[0]?.price}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default SalesPage