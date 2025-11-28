'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'

interface RelatedPostsProps {
  posts: BlogPost[]
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-st-navy">Related Articles</h2>
        <div className="flex-1 h-px bg-st-gray-200"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.slice(0, 2).map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-st-gray-200 group-hover:border-st-cyan">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-st-navy to-st-gray-800"></div>
                {post.heroImage ? (
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m0 0V5a2 2 0 00-2-2H9" />
                    </svg>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-st-cyan text-st-navy px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-st-gray-400 mb-3">
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-st-navy mb-3 group-hover:text-st-cyan transition-colors leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-st-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-st-cyan rounded-full flex items-center justify-center">
                    <span className="text-st-navy font-bold text-sm">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-st-gray-500 text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>

                {/* Read More Arrow */}
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center gap-2 text-st-cyan group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-semibold">Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View All Posts CTA */}
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 bg-st-navy text-white px-8 py-4 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 font-semibold group"
        >
          <span>View All Articles</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default RelatedPosts