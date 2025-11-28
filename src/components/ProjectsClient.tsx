'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'

interface ProjectsClientProps {
  projects: Project[]
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('work')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleProjects(prev => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-st-cyan rounded-full opacity-20" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-st-navy rounded-full opacity-10" />
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-st-cyan rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-8">
              <p className="text-st-gray-400 text-sm mb-2">from 2020 &apos;til today</p>
              <h2 className="text-4xl md:text-5xl font-black text-st-navy">
                MY LATEST WORK
              </h2>
            </div>
          </div>

          {/* Featured Project Cards */}
          {/* Desktop: 3-column grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link key={project.id || project._id} href={`/work/${project.id || project.slug.current}`}>
                <div
                  onClick={() => {
                    // Track project card click - desktop
                    if (typeof window !== 'undefined' && (window as any).OmniWolf) {
                      (window as any).OmniWolf.track('project_click', {
                        project_id: project.id || project._id,
                        project_title: project.title,
                        location: 'project_card_desktop',
                        position: index + 1
                      })
                    }
                  }}
                  className={`group transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Project Card */}
                  <div className="relative bg-st-gray-100 hover:bg-amber-50 transition-all duration-500 rounded-2xl p-6 overflow-hidden h-full flex flex-col">
                    {/* Sunburst Hover Effect */}
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 opacity-0 group-hover:w-[400px] group-hover:h-[400px] group-hover:opacity-100 transition-all duration-700 ease-out"
                      style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(0, 255, 255, 0.2) 25%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)'
                      }}
                    />

                    {/* Project Header */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        {/* Project Logo */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: project.color || '#666666' }}
                        >
                          <span className="text-white font-bold text-sm">
                            {project.title.charAt(0)}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-lg font-black text-st-navy leading-tight">
                          {project.title.toUpperCase()}
                        </h3>
                      </div>

                      {/* Project Description */}
                      <p className="text-st-gray-600 leading-relaxed text-sm mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {(project.tags || project.technologies || []).slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-white text-st-navy px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Hero Image */}
                    <div className="relative z-10 mt-auto">
                      <div className="transition-all duration-700 ease-out group-hover:scale-[1.02]">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg relative">
                          {project.heroImage ? (
                            <Image
                              src={project.heroImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-st-navy to-st-gray-800 flex items-center justify-center">
                              <div className="text-center text-white">
                                <div
                                  className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                                  style={{ backgroundColor: project.color || '#666666' }}
                                >
                                  <span className="text-st-navy text-2xl font-bold">
                                    {project.title.charAt(0)}
                                  </span>
                                </div>
                                <p className="text-white/80 text-sm font-medium">
                                  {project.title}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile: Horizontal carousel */}
          <div className="md:hidden -mr-6">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide pl-6 pr-6">
              {projects.map((project, index) => (
                <Link key={project.id || project._id} href={`/work/${project.id || project.slug.current}`}>
                  <div
                    onClick={() => {
                      // Track project card click - mobile
                      if (typeof window !== 'undefined' && (window as any).OmniWolf) {
                        (window as any).OmniWolf.track('project_click', {
                          project_id: project.id || project._id,
                          project_title: project.title,
                          location: 'project_card_mobile',
                          position: index + 1
                        })
                      }
                    }}
                    className={`flex-none w-[85vw] snap-start group transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Project Card - Mobile optimized */}
                    <div className="relative bg-st-gray-100 hover:bg-amber-50 transition-all duration-500 rounded-2xl p-6 pb-12 overflow-hidden h-full">

                      {/* Sunburst Hover Effect - Mobile optimized */}
                      <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 opacity-0 group-hover:w-full group-hover:h-64 group-hover:opacity-100 transition-all duration-700 ease-out"
                        style={{
                          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(0, 255, 255, 0.2) 25%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)'
                        }}
                      />

                      {/* Project Header - Mobile layout */}
                      <div className="relative z-10 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          {/* Project Logo */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: project.color || '#666666' }}
                          >
                            <span className="text-white font-bold text-sm">
                              {project.title.charAt(0)}
                            </span>
                          </div>

                          {/* Project Title */}
                          <h3 className="text-lg font-black text-st-navy leading-tight">
                            {project.title.toUpperCase()}
                          </h3>
                        </div>

                        {/* Project Description */}
                        <p className="text-st-gray-600 leading-relaxed text-sm mb-4">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {(project.tags || project.technologies || []).slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-white text-st-navy px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Preview - Mobile optimized */}
                      <div className="relative z-10">
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-md h-32">
                          {project.heroImage ? (
                            <Image
                              src={project.heroImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center">
                              <span className="text-st-gray-400 text-sm">Website Preview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Preview card to show there's more */}
              <div className="flex-none w-16 snap-start flex items-center justify-center">
                <div className="w-12 h-12 bg-st-gray-100 rounded-full flex items-center justify-center opacity-30">
                  <svg className="w-6 h-6 text-st-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects CTA */}
          <div className={`text-center mt-32 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="mb-8">
              <span className="text-st-gray-400 text-lg">
                Want to see more detailed case studies?
              </span>
            </div>

            <Link href="/work">
              <button
                onClick={() => {
                  // Track view all projects CTA click
                  if (typeof window !== 'undefined' && (window as any).OmniWolf) {
                    (window as any).OmniWolf.track('cta_click', {
                      cta_text: 'View All Projects',
                      location: 'projects_section',
                      section: 'view_all_cta'
                    })
                  }
                }}
                className="group bg-st-navy text-white px-12 py-6 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold text-lg inline-flex items-center gap-3"
              >
                <span>View All Projects</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsClient