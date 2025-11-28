'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'

interface WorkPageClientProps {
  projects: Project[]
}

const WorkPageClient = ({ projects }: WorkPageClientProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  const categories = ['all', 'ai', 'automation', 'advertising', 'web', 'mobile', 'integration']

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project =>
        project.category === filter ||
        (project.tags || project.technologies || []).some(tag =>
          tag.toLowerCase().includes(filter.toLowerCase())
        ) ||
        (project.subtitle || '').toLowerCase().includes(filter.toLowerCase())
      ))
    }
  }, [filter, projects])

  const getCategoryLabel = (category: string) => {
    const labels = {
      'all': 'All Projects',
      'ai': 'AI Implementation',
      'automation': 'Automation',
      'advertising': 'Advertising',
      'web': 'Web Development',
      'mobile': 'Mobile App',
      'integration': 'Integration'
    }
    return labels[category as keyof typeof labels] || category
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative mb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-st-gray-300" />
                <span className="text-st-gray-400 text-sm uppercase tracking-[0.2em] font-semibold">
                  Portfolio
                </span>
                <div className="w-12 h-px bg-st-gray-300" />
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-st-navy mb-8 leading-none">
                ALL <span className="text-st-cyan">PROJECTS</span>
              </h1>

              <p className="text-xl text-st-gray-600 leading-relaxed max-w-2xl mx-auto">
                A comprehensive showcase of digital solutions that drive measurable business results.
                From startups to Fortune 500 companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      filter === category
                        ? 'bg-st-navy text-white'
                        : 'bg-st-gray-100 text-st-gray-600 hover:bg-st-gray-200'
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                ))}
              </div>

              <div className="text-center text-st-gray-500">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link key={project.id || project._id} href={`/work/${project.id || project.slug.current}`}>
                  <div className={`group cursor-pointer transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                      {/* Project Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-st-navy to-st-gray-800">
                          {project.heroImage ? (
                            <Image
                              src={project.heroImage}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center text-white">
                                <div
                                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                  style={{ backgroundColor: project.color || '#666666' }}
                                >
                                  <span className="text-st-navy text-2xl font-bold">
                                    {project.title.charAt(0)}
                                  </span>
                                </div>
                                <p className="text-st-gray-400">Project Preview</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold">View Case Study</span>
                          </div>
                        </div>

                        {/* Project Number */}
                        <div className="absolute top-6 left-6">
                          <span
                            className="text-2xl font-black text-white/90"
                          >
                            {project.number || String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Color Accent */}
                        <div
                          className="absolute top-6 right-6 w-4 h-4 rounded-full"
                          style={{ backgroundColor: project.color || '#666666' }}
                        />
                      </div>

                      {/* Project Content */}
                      <div className="p-8">
                        <div className="mb-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: project.color || '#666666' }}
                          >
                            {project.subtitle || project.category}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-st-navy mb-3 group-hover:text-st-cyan transition-colors leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-st-gray-600 leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(project.tags || project.technologies || []).slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-st-gray-100 text-st-gray-600 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-st-gray-500">
                          <span>{project.year}</span>
                          <span>{project.client || 'Client Work'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkPageClient