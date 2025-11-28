'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const projects = [
    {
      name: 'Fighting Fit',
      description: 'The Science-Backed Program for Men 40+',
      url: 'https://fightingfit.movemofos.com',
      logo: '/images/fighting-fit.png',
    },
    {
      name: 'Lanistr',
      description: 'The Operating System for Combat Sports. Connect. Match. Promote.',
      url: 'https://www.lanistr.com',
      logo: '/images/lanistr.png',
    },
    {
      name: 'Train Mofos',
      description: 'High-Performance Combat Sports Strength & Conditioning',
      url: 'https://train.movemofos.com',
      logo: '/images/train-mofos.png',
    },
  ]

  return (
    <footer className="relative bg-st-navy text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-st-navy via-st-navy to-gray-900 opacity-50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Projects Section */}
        <div>
          <h3 className="text-2xl font-black mb-8 text-white text-center">Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-st-cyan/50 transition-all duration-300 hover:bg-white/10 flex flex-col"
              >
                <div className="mb-6 h-16 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 flex-grow text-center">
                  {project.description}
                </p>

                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 rounded-full text-center font-semibold border-2 border-white/20 text-white hover:border-st-cyan hover:text-st-cyan transition-all duration-300"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} Spencer Toogood</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Helping Small Business do MORE with LESS!</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link 
                href="https://www.facebook.com/spencertoogoodconsulting/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-st-cyan transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>

              <Link 
                href="https://www.tiktok.com/@spencertoogood" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-st-cyan transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </Link>

              <Link 
                href="https://www.instagram.com/spencertoogood" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-st-cyan transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </Link>

              <Link 
                href="https://www.youtube.com/@spencertoogood" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-st-cyan transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              
              <Link 
                href="https://linkedin.com/in/spencertoogood" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-st-cyan transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer