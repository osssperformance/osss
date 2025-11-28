'use client'

import { useEffect, useState, useRef } from 'react'
import { Problem } from '@/types/sales'

interface ProblemSectionProps {
  problems: Problem[]
}

const ProblemSection = ({ problems }: ProblemSectionProps) => {
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
    <section className="py-24 bg-gradient-to-b from-white to-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-st-navy mb-6">
              Stop Losing Money While You Sleep
            </h2>
            <p className="text-xl md:text-2xl text-st-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every minute your website isn&apos;t converting visitors into customers, 
              you&apos;re literally watching potential revenue walk away. Here&apos;s what&apos;s really costing you:
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {problems.map((problem, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`transition-all duration-1000 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-l-4 border-red-500">
                  
                  {/* Problem Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{problem.icon}</div>
                    <h3 className="text-2xl font-bold text-st-navy">{problem.title}</h3>
                  </div>

                  {/* Problem Description */}
                  <p className="text-st-gray-600 text-lg leading-relaxed mb-6">
                    {problem.description}
                  </p>

                  {/* Cost of Not Solving */}
                  {problem.costOfNotSolving && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-red-700 font-semibold text-sm mb-1">The Real Cost:</p>
                          <p className="text-red-600 text-sm leading-relaxed">{problem.costOfNotSolving}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pain Amplification */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              How Much Revenue Are You Losing Right Now?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">78%</div>
                <p className="text-white/90">of customers buy from the first business that responds</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">$50K+</div>
                <p className="text-white/90">annual revenue loss from slow response times</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">24hrs</div>
                <p className="text-white/90">after which 82% of leads go completely cold</p>
              </div>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Every day you delay implementing a solution, you&apos;re essentially handing potential customers 
              to your competitors. The question isn&apos;t whether you can afford to fix this problem...
            </p>
            <p className="text-2xl font-bold mt-4">
              It&apos;s whether you can afford NOT to.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProblemSection