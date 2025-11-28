'use client'

import { useEffect, useState } from 'react'

const About = () => {
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

    const element = document.getElementById('about')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const expertise = [
    {
      title: 'AI & Automation',
      description: 'Implementing intelligent automation solutions that transform business operations and decision-making processes.',
      icon: '🤖'
    },
    {
      title: 'App Development',
      description: 'Creating custom mobile and web applications that solve real problems and deliver exceptional user experiences.',
      icon: '📱'
    },
    {
      title: 'Advertising',
      description: 'Creating data-driven advertising campaigns that deliver measurable ROI and sustainable growth.',
      icon: '🎯'
    }
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-st-navy mb-8">
              What I do.
            </h2>
            <p className="text-xl text-st-gray-400 max-w-3xl mx-auto leading-relaxed">
              With over a decade of experience in digital transformation, I specialize in creating 
              intelligent solutions that bridge the gap between human creativity and machine efficiency.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <div
                key={item.title}
                className={`group bg-st-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-500 transform hover:scale-102 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-st-navy mb-4 group-hover:text-st-cyan transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-st-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide">
              {expertise.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex-none w-[90%] snap-start ${
                    index === expertise.length - 1 ? 'mr-4' : ''
                  }`}
                >
                  <div
                    className={`bg-st-gray-100 p-6 rounded-2xl h-full ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="text-3xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-st-navy mb-3">
                      {item.title}
                    </h3>
                    <p className="text-st-gray-400 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Preview card */}
              <div className="flex-none w-[5%] snap-start">
                <div className="bg-st-gray-100 p-6 rounded-2xl h-full opacity-30">
                  <div className="text-3xl mb-4">
                    {expertise[0].icon}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`text-center mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div 
              className="relative bg-gradient-to-r from-st-navy to-st-gray-800 text-white p-12 rounded-3xl group"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.15), 0 0 80px rgba(0, 255, 255, 0.1)'
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  boxShadow: '0 0 60px rgba(0, 255, 255, 0.3), 0 0 120px rgba(0, 255, 255, 0.15)' 
                }}
              />
              
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">
                  Have an Idea for an App?
                </h3>
                <p className="text-xl mb-8 opacity-90">
                  Let&apos;s discuss how AI, automation, and strategic advertising can accelerate your growth.
                </p>
                <button
                  onClick={() => {
                    // Track pitch me CTA click
                    if (typeof window !== 'undefined' && window.OmniWolf) {
                      window.OmniWolf.track('cta_click', {
                        cta_text: 'Pitch Me!',
                        location: 'about_section',
                        section: 'app_idea_cta'
                      })
                    }
                    
                    window.location.href = '/pitch-me'
                  }}
                  className="bg-st-cyan text-st-navy px-8 py-4 rounded-full hover:bg-white hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                >
                  Pitch Me!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About