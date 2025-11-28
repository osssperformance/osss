'use client'

import { useEffect, useState } from 'react'

const Hero = () => {
  const [currentText, setCurrentText] = useState(0)
  const texts = ['Stress', 'Headaches', 'Confusion','Cost']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="bg-white relative overflow-hidden p-[25px] md:p-[50px] pt-28 md:pt-32">
      {/* Aqua Blue Hero Card with 50px padding */}
      <div className="bg-st-cyan rounded-[2.5rem] w-full flex items-center justify-center text-center px-8 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-st-navy mb-8 animate-slide-up leading-tight">
            Helping Small Businesses Win Back Time and Control.
          </h1>

          <div className="flex items-center justify-center mb-12">
            <p className="text-2xl md:text-3xl lg:text-4xl text-st-navy font-semibold">
              Work Less on the Grind. More on the Growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => {
                // Track hero CTA click
                if (typeof window !== 'undefined' && window.OmniWolf) {
                  window.OmniWolf.track('cta_click', {
                    cta_text: 'View My Work',
                    location: 'hero',
                    section: 'primary_cta'
                  })
                }

                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-st-navy text-white px-10 py-5 rounded-full hover:bg-white hover:text-st-navy transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-bold text-xl"
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero