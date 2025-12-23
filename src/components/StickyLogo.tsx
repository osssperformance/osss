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

  const getSizeClasses = () => {
    if (isScrolled) {
      return 'w-12 h-auto md:w-16 md:h-auto' // Mobile: 48px width, Desktop: 64px width
    }
    return 'w-16 h-auto md:w-[130px] md:h-auto' // Mobile: 64px width, Desktop: 130px width (50% of 260px)
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
        className={`block transition-all duration-300 ease-in-out ${getSizeClasses()}`}
      >
        <Image
          src="/images/logo-osss.svg"
          alt="Osss Performance"
          width={260}
          height={91}
          className="w-full h-auto"
        />
      </button>
    </div>
  )
}

export default StickyLogo