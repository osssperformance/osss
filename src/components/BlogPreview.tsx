'use client'

import { useEffect, useState } from 'react'
import { BlogPost } from '@/types/blog'
import { client, latestPostsQuery } from '@/lib/sanity'
import BlogCard from './BlogCard'
import Link from 'next/link'

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('blog')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (client) {
          const data = await client.fetch(latestPostsQuery)
          setPosts(data || [])
        } else {
          console.log('Sanity client not configured')
          setPosts([])
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section id="blog" className="py-24 bg-st-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-st-navy mb-8">
                LATEST INSIGHTS
              </h2>
            </div>
            {/* Desktop loading state */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-st-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-st-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-st-gray-200 rounded" />
                    <div className="h-4 bg-st-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile loading state */}
            <div className="md:hidden -mr-6">
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide pl-6 pr-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-none w-[80vw] bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-st-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-st-gray-200 rounded w-1/3" />
                      <div className="h-6 bg-st-gray-200 rounded" />
                      <div className="h-4 bg-st-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-24 bg-st-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-st-navy mb-8">
              Latest Blogs
            </h2>
            <p className="text-xl text-st-gray-400 max-w-3xl mx-auto leading-relaxed">
              Thoughts on AI, Automation, Advertising, Apps, and the Future of Digital Business.
            </p>
          </div>

          {posts.length > 0 ? (
            <>
              {/* Desktop: Grid layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
                {posts.map((post, index) => (
                  <div
                    key={post._id}
                    className={`transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      onClick={() => {
                        // Track blog post click - desktop
                        if (typeof window !== 'undefined' && window.OmniWolf) {
                          window.OmniWolf.track('blog_post_click', {
                            post_id: post._id,
                            post_title: post.title,
                            post_category: post.category,
                            location: 'blog_preview_desktop',
                            position: index + 1
                          })
                        }
                      }}
                    >
                      <BlogCard post={post} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Mobile: Horizontal carousel */}
              <div className="md:hidden mb-16 -mr-6">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide pl-6 pr-6">
                  {posts.map((post, index) => (
                    <div
                      key={post._id}
                      className={`flex-none w-[80vw] snap-start transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        onClick={() => {
                          // Track blog post click - mobile
                          if (typeof window !== 'undefined' && window.OmniWolf) {
                            window.OmniWolf.track('blog_post_click', {
                              post_id: post._id,
                              post_title: post.title,
                              post_category: post.category,
                              location: 'blog_preview_mobile',
                              position: index + 1
                            })
                          }
                        }}
                      >
                        <BlogCard post={post} />
                      </Link>
                    </div>
                  ))}
                  
                  {/* Preview card to show there's more */}
                  <div className="flex-none w-16 snap-start flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-30 shadow-md">
                      <svg className="w-6 h-6 text-st-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`text-center mt-32 transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="mb-8">
                  <span className="text-st-gray-400 text-lg">
                    Want to read more insights and guides?
                  </span>
                </div>

                <Link href="/blog">
                  <button
                    onClick={() => {
                      // Track view all blog posts CTA click
                      if (typeof window !== 'undefined' && window.OmniWolf) {
                        window.OmniWolf.track('cta_click', {
                          cta_text: 'View All Posts',
                          location: 'blog_preview_section',
                          section: 'view_all_blog_cta'
                        })
                      }
                    }}
                    className="group bg-st-navy text-white px-12 py-6 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold text-lg inline-flex items-center gap-3"
                  >
                    <span>View All Posts</span>
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
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-st-gray-400 text-lg">
                Blog posts coming soon! Stay tuned for insights on AI, automation, and marketing.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview