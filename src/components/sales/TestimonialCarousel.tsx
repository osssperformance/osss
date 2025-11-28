'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Testimonial } from '@/types/sales'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-gradient-to-b from-st-gray-100 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-st-navy mb-6">
              Real Results from Real Clients
            </h2>
            <p className="text-xl text-st-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what happens when businesses implement our AI solution:
            </p>
          </div>

          {/* Main Testimonial */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 items-center">
                
                {/* Testimonial Content */}
                <div className="p-12 lg:p-16">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-st-cyan/10 rounded-full flex items-center justify-center mb-8">
                    <svg className="w-6 h-6 text-st-cyan" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-bold text-st-navy leading-relaxed mb-8">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </blockquote>

                  {/* Result/Stat */}
                  {testimonials[currentIndex].result && (
                    <div className="bg-st-cyan/10 border border-st-cyan/20 rounded-2xl p-6 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-st-navy" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-st-navy font-bold text-lg">{testimonials[currentIndex].result}</span>
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-st-cyan rounded-full flex items-center justify-center">
                      {testimonials[currentIndex].image ? (
                        <Image
                          src={testimonials[currentIndex].image!}
                          alt={testimonials[currentIndex].author}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-st-navy font-bold text-xl">
                          {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-st-navy text-lg">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-st-gray-600">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  {testimonials[currentIndex].rating && (
                    <div className="flex items-center gap-2 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[currentIndex].rating! ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual/Image Side */}
                <div className="bg-gradient-to-br from-st-navy to-st-gray-800 p-12 lg:p-16 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-st-cyan rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-st-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
                    <p className="text-white/80 leading-relaxed">
                      Join hundreds of businesses that have transformed their customer experience 
                      and dramatically increased their conversion rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-st-gray-100 transition-colors duration-300 z-10"
                >
                  <svg className="w-5 h-5 text-st-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-st-gray-100 transition-colors duration-300 z-10"
                >
                  <svg className="w-5 h-5 text-st-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-st-cyan w-8' 
                      : 'bg-st-gray-300 hover:bg-st-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Stats Summary */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-st-cyan mb-2">340%</div>
              <p className="text-st-gray-600">Average conversion increase</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-st-cyan mb-2">97%</div>
              <p className="text-st-gray-600">Answer accuracy rate</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-3xl font-black text-st-cyan mb-2">24/7</div>
              <p className="text-st-gray-600">Always-on lead capture</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel