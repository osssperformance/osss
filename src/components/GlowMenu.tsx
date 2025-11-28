'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const GlowMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Track navigation click
    if (typeof window !== 'undefined' && window.OmniWolf) {
      window.OmniWolf.track('navigation_click', {
        section: sectionId,
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const goBack = () => {
    // Track back button click
    if (typeof window !== 'undefined' && window.OmniWolf) {
      window.OmniWolf.track('navigation_click', {
        section: 'back',
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
    
    window.history.back()
    setIsOpen(false)
  }

  const goToContact = () => {
    // Track CTA click
    if (typeof window !== 'undefined' && window.OmniWolf) {
      window.OmniWolf.track('cta_click', {
        cta_text: 'Start project',
        location: 'navigation',
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
    
    if (pathname === '/') {
      scrollToSection('contact')
    } else {
      window.location.href = '/#contact'
    }
  }

  const menuItems = [
    { label: 'About Me', href: 'story' },
    { label: 'What I do', href: 'about' },
    { label: 'Projects', href: 'work' },
    { label: 'Blog', href: 'blog' },
    { label: 'Pitch Me', href: '/pitch-me', external: true },
  ]

  // Check if we're on blog or work pages
  const isSubPage = pathname.startsWith('/blog') || pathname.startsWith('/work')

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 hidden md:block`}>
        <div 
          className={`rounded-full px-6 py-3 flex items-center space-x-6 shadow-2xl border transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/10 backdrop-blur-xl border-white/20 shadow-lg' 
              : 'bg-black/90 backdrop-blur-md border-white/10'
          }`}
          style={{ 
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 20px rgba(0, 255, 255, 0.1)' 
              : '0 0 30px rgba(0, 255, 255, 0.1), 0 0 60px rgba(0, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(1.8)',
          }}
        >
          {/* Menu Items */}
          {isSubPage ? (
            // Show only Back button on sub pages
            <button
              onClick={goBack}
              className={`transition-colors duration-300 text-md font-medium ${
                isScrolled 
                  ? 'text-black/70 hover:text-st-navy' 
                  : 'text-white/70 hover:text-st-cyan'
              }`}
            >
              ← Back
            </button>
          ) : (
            // Show all menu items on home page
            menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  // Track external link clicks separately
                  if ((item as any).external) {
                    if (typeof window !== 'undefined' && window.OmniWolf) {
                      window.OmniWolf.track('external_link_click', {
                        link_text: item.label,
                        link_url: item.href,
                        location: 'navigation_desktop'
                      })
                    }
                    window.location.href = item.href
                  } else {
                    scrollToSection(item.href)
                  }
                }}
                className={`transition-colors duration-300 text-md font-medium ${
                  isScrolled 
                    ? 'text-black/70 hover:text-st-navy' 
                    : 'text-white/70 hover:text-st-cyan'
                }`}
              >
                {item.label}
              </button>
            ))
          )}

          {/* CTA Button */}
          <button
            onClick={goToContact}
            className="bg-st-cyan text-st-navy px-4 py-2 rounded-full hover:bg-st-cyan/90 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-md font-semibold shadow-md"
          >
            Start project
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-6 right-6 z-50 md:hidden">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className={`rounded-full px-4 py-2 flex items-center space-x-2 shadow-2xl border transition-all duration-500 ${
              isScrolled 
                ? 'bg-white/10 backdrop-blur-xl border-white/20' 
                : 'bg-black/90 backdrop-blur-md border-white/10'
            }`}
            style={{ 
              boxShadow: isScrolled 
                ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 20px rgba(0, 255, 255, 0.1)' 
                : '0 0 20px rgba(0, 255, 255, 0.1), 0 0 40px rgba(0, 255, 255, 0.05)',
              backdropFilter: 'blur(20px) saturate(1.8)',
            }}
          >
            <span className={`text-sm font-medium ${
              isScrolled ? 'text-black/70' : 'text-white/70'
            }`}>Menu</span>
            <svg className={`w-3 h-3 ${
              isScrolled ? 'text-black/50' : 'text-white/50'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        ) : (
          <div 
            className="bg-black/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10 min-w-[280px] max-w-[calc(100vw-3rem)]"
            style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.15), 0 0 80px rgba(0, 255, 255, 0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/70 text-sm font-medium">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-4 mb-6">
              {isSubPage ? (
                // Show only Back button on sub pages
                <button
                  onClick={goBack}
                  className="block w-full text-left text-white/70 hover:text-st-cyan transition-colors duration-300 text-lg font-medium py-2"
                >
                  ← Back
                </button>
              ) : (
                // Show all menu items on home page
                menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      // Track external link clicks separately for mobile
                      if ((item as any).external) {
                        if (typeof window !== 'undefined' && window.OmniWolf) {
                          window.OmniWolf.track('external_link_click', {
                            link_text: item.label,
                            link_url: item.href,
                            location: 'navigation_mobile'
                          })
                        }
                        window.location.href = item.href
                      } else {
                        scrollToSection(item.href)
                      }
                    }}
                    className="block w-full text-left text-white/70 hover:text-st-cyan transition-colors duration-300 text-lg font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={goToContact}
              className="w-full bg-st-cyan text-st-navy px-4 py-2 rounded-full hover:bg-st-cyan/90 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-md"
            >
              Start project
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default GlowMenu