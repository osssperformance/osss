'use client'

import { useEffect, useState, useRef } from 'react'
import { Benefit } from '@/types/sales'

interface BenefitsSectionProps {
  benefits: Benefit[]
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-st-gray-300" />
              <span className="text-st-gray-400 text-sm uppercase tracking-[0.2em] font-semibold">
                The Solution
              </span>
              <div className="w-12 h-px bg-st-gray-300" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-st-navy mb-6">
              Turn Every Visitor Into a 
              <span className="text-st-cyan"> Qualified Lead</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-st-gray-600 max-w-4xl mx-auto leading-relaxed">
              Imagine never losing another potential customer because they couldn&apos;t get instant answers. 
              Here&apos;s exactly what changes when you implement our AI solution:
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`transition-all duration-1000 delay-${index * 100} ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="group bg-st-gray-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 h-full transform hover:scale-[1.02]">
                  
                  {/* Benefit Icon */}
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>

                  {/* Benefit Title */}
                  <h3 className="text-2xl font-bold text-st-navy mb-4 group-hover:text-st-cyan transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="text-st-gray-600 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Stat/Result */}
                  {benefit.stat && (
                    <div className="bg-st-cyan/10 border border-st-cyan/20 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-st-navy font-bold text-lg">{benefit.stat}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Before vs After Comparison */}
          <div className="bg-gradient-to-r from-st-navy to-st-gray-800 text-white p-12 rounded-3xl">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Before vs After Implementation
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Before */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold">BEFORE (Your Current Situation)</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-white/90">Visitors leave with unanswered questions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-white/90">Miss leads outside business hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-white/90">Support team overwhelmed with repetitive questions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-white/90">Slow response times lose you to competitors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span className="text-white/90">No way to qualify leads automatically</span>
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-st-cyan">AFTER (With Our AI Solution)</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-st-cyan mt-1">✓</span>
                    <span className="text-white/90">Instant answers to every visitor, 24/7</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-st-cyan mt-1">✓</span>
                    <span className="text-white/90">Capture and qualify leads while you sleep</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-st-cyan mt-1">✓</span>
                    <span className="text-white/90">AI handles 90% of common questions automatically</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-st-cyan mt-1">✓</span>
                    <span className="text-white/90">Always be first to respond to prospects</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-st-cyan mt-1">✓</span>
                    <span className="text-white/90">Hot leads delivered with full context to your team</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-xl text-white/90 mb-6">
                The difference is night and day. Your visitors will finally get the instant, 
                helpful experience they expect in 2024.
              </p>
              <div className="bg-st-cyan/20 border border-st-cyan/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-lg font-semibold text-st-cyan mb-2">
                  &quot;Within 2 weeks, our lead quality improved by 340% and support costs dropped 60%. 
                  This AI solution paid for itself in the first month.&quot;
                </p>
                <p className="text-white/80">- Marcus Johnson, Media Evolution</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BenefitsSection