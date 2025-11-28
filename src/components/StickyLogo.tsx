'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const StickyLogo = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate sizes:
  // Desktop: Normal = 152px (w-38 h-38), Scrolled = same
  // Mobile: Normal = 64px (50% of 128px), Scrolled = 48px (75% of 64px)
  const getSizeClasses = () => {
    if (isScrolled) {
      return 'w-12 h-12 md:w-38 md:h-38' // Mobile: 48px, Desktop: 152px
    }
    return 'w-16 h-16 md:w-38 md:h-38' // Mobile: 64px, Desktop: 152px
  }

  return (
    <div className="fixed top-6 left-6 z-40">
      <button
        onClick={() => {
          if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            window.location.href = '/'
          }
        }}
        className={`block relative transition-all duration-300 ease-in-out ${getSizeClasses()}`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Image
            src="/images/logo-spencer-toogood-mono.png"
            alt="Spencer Toogood"
            fill
            className="object-cover"
          />
        </div>
      </button>
    </div>
  )
}

export default StickyLogo