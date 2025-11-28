'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const Story = () => {
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

    const element = document.getElementById('story')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" className="py-24 bg-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className={`mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-st-navy leading-tight mb-8">
              25 years of Building, <br />
              Adapting, and Growing.
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column - Story Text */}
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="space-y-6">
                <p className="text-lg text-st-gray-600 leading-relaxed">
                  I&apos;ve spent more than 25 years building and growing businesses — my own and my clients&apos;.
                </p>
                
                <p className="text-lg text-st-gray-600 leading-relaxed">
                  I started in branding and design. Then came websites. Then digital ads. Now AI and automation are changing everything again. Every shift has forced me to adapt, learn, and create new ways for small businesses to compete.
                </p>

                <p className="text-lg text-st-gray-600 leading-relaxed">
                  My mission is simple: help business owners work less on the grind and more on the growth.
                </p>

                <p className="text-lg text-st-gray-600 leading-relaxed">
                  I believe small business is the backbone of our communities. But too many owners are buried in admin, stuck in survival mode, or burning time on things that don&apos;t move the needle. I want to give them the tools, systems, and strategies to get their time back, control their numbers, and grow with confidence.
                </p>

                <p className="text-lg text-st-gray-600 leading-relaxed">
                  I work with people who are open to change and ready to take action. My job is to cut through the noise, show what works, and implement solutions that make a difference from day one.
                </p>
                
                <p className="text-lg text-st-gray-600 leading-relaxed">
                  The way I see it, the game will keep changing — but if you have the right mindset, systems, and support, you can thrive no matter what&apos;s next.
                </p>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Main Photo - Polaroid Style */}
              <div className="relative">
                <div className="bg-white p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="relative aspect-square bg-gradient-to-br from-st-gray-100 to-st-gray-200 overflow-hidden">
                    <Image
                      src="https://dlfqschsipokjbmhqdrz.supabase.co/storage/v1/object/public/img/img-spencer.png"
                      alt="Spencer Toogood"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center mt-3 font-handwriting text-st-navy">
                    Life&apos;s better with a challenge
                  </p>
                </div>
                
                {/* Decorative Elements
                <div className="absolute -top-8 -right-8 transform rotate-12">
                  <div className="bg-white p-3 shadow-lg rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-st-cyan rounded-full"></div>
                      <div className="space-y-1">
                        <div className="w-16 h-1 bg-st-gray-300 rounded"></div>
                        <div className="w-12 h-1 bg-st-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Bottom Stats/Badges */}
          <div className={`mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Desktop: Centered flex wrap layout */}
            <div className="hidden md:flex flex-wrap justify-center gap-8">
              {[
                { icon: '🚀', label: '30+ Years Experience' },
                { icon: '🎯', label: 'Small Business Focus' },
                { icon: '💡', label: 'AI & Automation Expert' },
                { icon: '🌟', label: '100s Projects' },
                { icon: '🤝', label: 'Trusted Partner' }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-st-gray-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-st-cyan group-hover:scale-110 transition-all duration-300">
                    {badge.icon}
                  </div>
                  <span className="text-st-gray-600 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Mobile: Horizontal carousel */}
            <div className="md:hidden -mr-6">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide pl-6 pr-6">
                {[
                  { icon: '🚀', label: '30+ Years Experience' },
                  { icon: '🎯', label: 'Small Business Focus' },
                  { icon: '💡', label: 'AI & Automation Expert' },
                  { icon: '🌟', label: '100s Projects' },
                  { icon: '🤝', label: 'Trusted Partner' }
                ].map((badge, index) => (
                  <div key={index} className="flex-none snap-start">
                    <div className="flex items-center gap-3 group bg-white rounded-full px-4 py-3 shadow-sm border border-st-gray-200 hover:border-st-cyan transition-all duration-300">
                      <div className="w-10 h-10 bg-st-gray-100 rounded-full flex items-center justify-center text-lg group-hover:bg-st-cyan group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        {badge.icon}
                      </div>
                      <span className="text-st-gray-600 font-medium text-sm whitespace-nowrap">{badge.label}</span>
                    </div>
                  </div>
                ))}
                
                {/* Preview indicator */}
                <div className="flex-none w-12 snap-start flex items-center justify-center">
                  <div className="w-8 h-8 bg-st-gray-100 rounded-full flex items-center justify-center opacity-30">
                    <svg className="w-4 h-4 text-st-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

export default Story