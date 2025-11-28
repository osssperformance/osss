'use client'

import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import Image from 'next/image'
import { useState } from 'react'

interface BlogContentProps {
  content: any[]
}

const BlogContent = ({ content }: BlogContentProps) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const components: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({ children }) => (
        <h1 id={createAnchor(children)} className="text-4xl md:text-5xl font-black text-st-navy mb-8 mt-12 first:mt-0 scroll-mt-32">
          {children}
          <a href={`#${createAnchor(children)}`} className="ml-3 text-st-cyan hover:text-st-navy opacity-0 hover:opacity-100 transition-opacity">
            #
          </a>
        </h1>
      ),
      h2: ({ children }) => (
        <h2 id={createAnchor(children)} className="text-3xl md:text-4xl font-bold text-st-navy mb-6 mt-10 scroll-mt-32">
          {children}
          <a href={`#${createAnchor(children)}`} className="ml-3 text-st-cyan hover:text-st-navy opacity-0 hover:opacity-100 transition-opacity">
            #
          </a>
        </h2>
      ),
      h3: ({ children }) => (
        <h3 id={createAnchor(children)} className="text-2xl md:text-3xl font-bold text-st-navy mb-4 mt-8 scroll-mt-32">
          {children}
          <a href={`#${createAnchor(children)}`} className="ml-2 text-st-cyan hover:text-st-navy opacity-0 hover:opacity-100 transition-opacity">
            #
          </a>
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl md:text-2xl font-bold text-st-navy mb-4 mt-6">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-st-gray-600 mb-6">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-st-cyan pl-6 py-4 my-8 bg-st-gray-100 rounded-r-2xl">
          <div className="text-xl md:text-2xl font-medium text-st-navy italic leading-relaxed">
            {children}
          </div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-none space-y-3 mb-6 pl-0">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-none counter-reset-custom space-y-3 mb-6 pl-0">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3">
          <span className="w-2 h-2 bg-st-cyan rounded-full mt-3 flex-shrink-0"></span>
          <div className="text-lg leading-relaxed text-st-gray-600">
            {children}
          </div>
        </li>
      ),
      number: ({ children }) => (
        <li className="flex items-start gap-4 counter-increment-custom">
          <span className="w-8 h-8 bg-st-cyan text-st-navy rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 counter-content"></span>
          <div className="text-lg leading-relaxed text-st-gray-600">
            {children}
          </div>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-st-navy">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-st-gray-700">{children}</em>
      ),
      code: ({ children }) => (
        <code className="bg-st-gray-200 text-st-navy px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target={value?.href?.startsWith('http') ? '_blank' : '_self'}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-st-cyan hover:text-st-navy underline decoration-st-cyan hover:decoration-st-navy transition-colors"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => (
        <div className="my-8">
          <div 
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxImage(value.asset?.url)}
          >
            <Image
              src={value.asset?.url || '/images/placeholder.jpg'}
              alt={value.alt || 'Blog image'}
              width={800}
              height={500}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6 text-st-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          {value.caption && (
            <p className="text-center text-st-gray-400 text-sm mt-3 italic">
              {value.caption}
            </p>
          )}
        </div>
      ),
      code: ({ value }) => (
        <div className="my-8">
          <div className="bg-st-gray-900 rounded-2xl overflow-hidden">
            {value.language && (
              <div className="bg-st-gray-800 px-4 py-2 text-st-gray-300 text-sm font-mono border-b border-st-gray-700">
                {value.language}
              </div>
            )}
            <pre className="p-6 overflow-x-auto">
              <code className="text-st-gray-100 font-mono text-sm leading-relaxed">
                {value.code}
              </code>
            </pre>
          </div>
        </div>
      ),
      callout: ({ value }) => (
        <div className={`my-8 p-6 rounded-2xl border-l-4 ${
          value.type === 'warning' 
            ? 'bg-orange-50 border-orange-400 text-orange-800'
            : value.type === 'error'
            ? 'bg-red-50 border-red-400 text-red-800'
            : value.type === 'success'
            ? 'bg-green-50 border-green-400 text-green-800'
            : 'bg-st-cyan/10 border-st-cyan text-st-navy'
        }`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {value.type === 'warning' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {value.type === 'error' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {value.type === 'success' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {(!value.type || value.type === 'info') && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="text-lg leading-relaxed">
              <PortableText value={value.content} />
            </div>
          </div>
        </div>
      ),
      ctaBlock: ({ value }) => (
        <div className="my-12 bg-gradient-to-r from-st-cyan to-st-navy text-white p-8 rounded-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {value.title}
          </h3>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            {value.description}
          </p>
          {value.buttonText && value.buttonUrl && (
            <a
              href={value.buttonUrl}
              target={value.buttonUrl.startsWith('http') ? '_blank' : '_self'}
              rel={value.buttonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-block bg-white text-st-navy px-6 py-3 rounded-full hover:bg-st-gray-100 transition-all duration-300 font-semibold"
            >
              {value.buttonText}
            </a>
          )}
        </div>
      ),
    },
  }

  const createAnchor = (children: any): string => {
    const text = children?.toString() || ''
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  return (
    <>
      <div className="prose prose-lg max-w-none">
        <PortableText value={content} components={components} />
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-st-cyan transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={lightboxImage}
              alt="Lightbox image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .counter-reset-custom {
          counter-reset: custom-counter;
        }
        .counter-increment-custom {
          counter-increment: custom-counter;
        }
        .counter-content::before {
          content: counter(custom-counter);
        }
      `}</style>
    </>
  )
}

export default BlogContent