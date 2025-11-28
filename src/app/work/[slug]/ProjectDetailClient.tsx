'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Project } from '@/types/project'
import { urlFor } from '@/lib/sanity'

interface ProjectDetailClientProps {
  project: Project
  relatedProjects: Project[]
}

const ProjectDetailClient = ({ project, relatedProjects }: ProjectDetailClientProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* 1. Large Hero Image */}
      <section className="mb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className={`relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-st-gray-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-st-navy">
                <span className="text-white text-4xl font-bold opacity-20">{project.title}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Text Block (Intro) */}
      <section className="mb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <h1 className="text-5xl md:text-7xl font-black text-st-navy mb-8 leading-tight">
              {project.title}
            </h1>
            <div className="text-xl md:text-2xl text-st-gray-600 leading-relaxed font-medium mb-12">
              {project.description}
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 gap-8 border-t border-st-gray-200 pt-12 text-left">
              <div>
                <h3 className="text-sm font-bold text-st-gray-400 uppercase tracking-wider mb-2">Client</h3>
                <p className="text-lg font-semibold text-st-navy">{project.client || 'Confidential'}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-st-gray-400 uppercase tracking-wider mb-2">Services</h3>
                <p className="text-lg font-semibold text-st-navy capitalize">{project.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Large Featured Image */}
      {(project.featuredImage) && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-st-gray-100">
              <Image
                src={project.featuredImage}
                alt={`${project.title} featured`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. Secondary Text Block (Content) */}
      {project.content && project.content.length > 0 && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg md:prose-xl max-w-none text-st-gray-600">
              <PortableText
                value={project.content}
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset) return null
                      return (
                        <div className="my-12 relative aspect-video rounded-2xl overflow-hidden bg-st-gray-100">
                          <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || 'Project image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    }
                  },
                  block: {
                    normal: ({ children }) => <p className="leading-relaxed mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-4xl font-bold text-st-navy mb-8 mt-12">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-bold text-st-navy mb-6 mt-12">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-bold text-st-navy mb-4 mt-8">{children}</h3>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold text-st-navy">{children}</strong>,
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-st-cyan hover:underline font-medium"
                        target={value?.blank ? '_blank' : undefined}
                        rel={value?.blank ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-2">{children}</ol>,
                  }
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4.25. Second Featured Image */}
      {(project.secondFeaturedImage) && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-st-gray-100">
              <Image
                src={project.secondFeaturedImage}
                alt={`${project.title} second featured`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 4.5. Additional Body Text */}
      {project.extraBodyText && project.extraBodyText.length > 0 && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg md:prose-xl max-w-none text-st-gray-600">
              <PortableText
                value={project.extraBodyText}
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset) return null
                      return (
                        <div className="my-12 relative aspect-video rounded-2xl overflow-hidden bg-st-gray-100">
                          <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || 'Project image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    }
                  },
                  block: {
                    normal: ({ children }) => <p className="leading-relaxed mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-4xl font-bold text-st-navy mb-8 mt-12">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-bold text-st-navy mb-6 mt-12">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-bold text-st-navy mb-4 mt-8">{children}</h3>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold text-st-navy">{children}</strong>,
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-st-cyan hover:underline font-medium"
                        target={value?.blank ? '_blank' : undefined}
                        rel={value?.blank ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-2">{children}</ol>,
                  }
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. Image Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.galleryImages.map((image, index) => {
                let imageUrl: string
                if (typeof image === 'string') {
                  imageUrl = image
                } else if (image && typeof image === 'object' && image._type === 'image') {
                  imageUrl = urlFor(image).width(800).height(800).url()
                } else {
                  imageUrl = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&crop=center`
                }

                return (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group bg-st-gray-100"
                    onClick={() => setLightboxImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} gallery ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile: Horizontal carousel */}
            <div className="md:hidden -mx-6 px-6">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide">
                {project.galleryImages.map((image, index) => {
                  let imageUrl: string
                  if (typeof image === 'string') {
                    imageUrl = image
                  } else if (image && typeof image === 'object' && image._type === 'image') {
                    imageUrl = urlFor(image).width(800).height(800).url()
                  } else {
                    imageUrl = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&crop=center`
                  }

                  return (
                    <div
                      key={index}
                      className="flex-none w-[85vw] snap-center"
                    >
                      <div
                        className="relative aspect-square overflow-hidden rounded-2xl bg-st-gray-100"
                        onClick={() => setLightboxImage(imageUrl)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${project.title} gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Outro Text Block */}
      {project.outro && (
        <section className="mb-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg md:prose-xl max-w-none text-st-gray-600">
              <PortableText
                value={Array.isArray(project.outro) ? project.outro : [{ _type: 'block', children: [{ _type: 'span', text: project.outro }], style: 'normal' }]}
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset) return null
                      return (
                        <div className="my-12 relative aspect-video rounded-2xl overflow-hidden bg-st-gray-100">
                          <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || 'Project image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    }
                  },
                  block: {
                    normal: ({ children }) => <p className="leading-relaxed mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-4xl font-bold text-st-navy mb-8 mt-12">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-bold text-st-navy mb-6 mt-12">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-bold text-st-navy mb-4 mt-8">{children}</h3>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold text-st-navy">{children}</strong>,
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-st-cyan hover:underline font-medium"
                        target={value?.blank ? '_blank' : undefined}
                        rel={value?.blank ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-2">{children}</ol>,
                  }
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA Block */}
      <section className="mb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-st-navy rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-st-cyan rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                {project.ctaHeading || "Ready to start your project?"}
              </h2>
              <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
                {project.ctaText || "Let's collaborate to bring your vision to life with cutting-edge design and technology."}
              </p>
              <Link href="/contact" className="inline-block">
                <span className="inline-block bg-st-cyan text-st-navy px-10 py-5 rounded-full text-xl font-bold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-st-cyan/50">
                  Book a Call
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-6xl h-full max-h-screen flex items-center justify-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage}
                alt="Lightbox image"
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetailClient