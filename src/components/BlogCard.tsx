'use client'

import { BlogCardProps } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

const BlogCard = ({ post, variant = 'standard' }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Minimal variant for list view
  if (variant === 'minimal') {
    return (
      <article className="group bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-st-gray-200">
        <div className="flex gap-4 p-6">
          {/* Small Image */}
          {post.heroImage && (
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-st-gray-200">
              {typeof post.heroImage === 'string' ? (
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-st-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <span className="bg-st-cyan text-st-navy px-2 py-1 rounded text-xs font-semibold">
                {post.category}
              </span>
              {post.readingTime && (
                <>
                  <span className="text-st-gray-400 mx-2">•</span>
                  <span className="text-st-gray-400 text-xs">{post.readingTime} min read</span>
                </>
              )}
            </div>

            <h3 className="text-lg font-bold text-st-navy mb-2 group-hover:text-st-cyan transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-st-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-st-cyan rounded-full flex items-center justify-center mr-2">
                  <span className="text-st-navy text-xs font-bold">ST</span>
                </div>
                <span className="text-st-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-st-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Featured variant for hero sections
  if (variant === 'featured') {
    return (
      <article className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-102">
        <div className="md:flex">
          {/* Large Image */}
          {post.heroImage && (
            <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-st-gray-200">
              {typeof post.heroImage === 'string' ? (
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-st-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <div className="md:w-1/2 p-8">
            <div className="flex items-center mb-4">
              <span className="bg-st-cyan text-st-navy px-3 py-1 rounded-full text-sm font-semibold mr-4">
                Featured
              </span>
              <span className="text-st-gray-400 text-sm">
                {post.category}
              </span>
            </div>

            <h3 className="text-3xl font-bold text-st-navy mb-4 group-hover:text-st-cyan transition-colors duration-300">
              {post.title}
            </h3>

            <p className="text-st-gray-400 leading-relaxed mb-6 text-lg">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-st-gray-100 text-st-gray-400 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-st-cyan rounded-full flex items-center justify-center mr-3">
                  <span className="text-st-navy font-bold text-sm">ST</span>
                </div>
                <div>
                  <p className="font-semibold text-st-navy">{post.author.name}</p>
                  <p className="text-st-gray-400 text-sm">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              
              {post.readingTime && (
                <span className="text-st-gray-400 text-sm">{post.readingTime} min read</span>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Standard variant (default)
  return (
    <article className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:scale-102">
      {/* Hero Image */}
      {post.heroImage && (
        <div className="aspect-video relative overflow-hidden bg-st-gray-200">
          {typeof post.heroImage === 'string' ? (
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-st-gray-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Video indicator */}
          {post.videoUrl && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Category and Reading Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="bg-st-cyan text-st-navy px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            {post.readingTime && (
              <>
                <span className="text-st-gray-400 mx-2">•</span>
                <span className="text-st-gray-400 text-sm">{post.readingTime} min read</span>
              </>
            )}
          </div>
          <span className="text-st-gray-400 text-sm">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-st-navy mb-3 group-hover:text-st-cyan transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-st-gray-400 leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-st-gray-100 text-st-gray-400 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center mr-3">
              <span className="text-st-navy font-bold text-xs">ST</span>
            </div>
            <span className="text-st-gray-400 text-sm">
              {post.author.name}
            </span>
          </div>

          {/* Read more arrow */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-st-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogCard