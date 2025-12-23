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
              <span>© {currentYear} Osss Performance Pty Ltd</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Helping Small Business do MORE with LESS!</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer