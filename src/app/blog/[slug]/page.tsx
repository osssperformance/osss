'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { EnhancedBlogPost, BlogPost } from '@/types/blog'
import { client, postQuery } from '@/lib/sanity'
import { getMockBlogPost } from '@/lib/mockBlogData'
import BlogContent from '@/components/BlogContent'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'
import VideoEmbed from '@/components/VideoEmbed'
import AuthorBio from '@/components/AuthorBio'
import SocialShare from '@/components/SocialShare'
import RelatedPosts from '@/components/RelatedPosts'
import ReadingProgress from '@/components/ReadingProgress'
import NewsletterCTA from '@/components/NewsletterCTA'

const BlogPostPage = () => {
  const params = useParams()
  const [post, setPost] = useState<EnhancedBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-content')
      if (article) {
        const { top, height } = article.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(100, ((windowHeight - top) / (height + windowHeight)) * 100))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (client) {
          const data = await client.fetch(postQuery, { slug: params.slug })
          setPost(data)
        } else {
          // Use mock data
          const mockPostData = getMockBlogPost(params.slug as string)
          if (mockPostData) {
            // Convert to EnhancedBlogPost format
            const mockPost: EnhancedBlogPost = {
              ...mockPostData,
              tags: ['AI', 'Business', 'Technology'],
              readingTime: 5,
              featured: true,
              videoUrl: undefined,
              relatedPosts: []
            }
            setPost(mockPost)
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <>
        <GlowMenu />
        <StickyLogo />
        <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-96 bg-st-gray-200 rounded-2xl mb-12"></div>
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-st-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-st-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-st-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <GlowMenu />
        <StickyLogo />
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-st-navy mb-4">Post not found</h1>
          <p className="text-st-gray-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <button className="bg-st-cyan text-st-navy px-6 py-3 rounded-full hover:bg-st-navy hover:text-white transition-all duration-300">
              Back to Blog
            </button>
          </Link>
        </div>
        </div>
      </>
    )
  }

  return (
    <>
      <GlowMenu />
      <StickyLogo />
      <ReadingProgress progress={scrollProgress} />
      
      <div className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-16">
          {/* Hero Image */}
          {post.heroImage && (
            <div className="h-[70vh] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-st-navy to-st-gray-800"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="container mx-auto max-w-4xl">
                  {/* Breadcrumb */}
                  <nav className="mb-6">
                    <div className="flex items-center text-sm text-white/60">
                      <Link href="/blog" className="hover:text-white transition-colors">
                        Blog
                      </Link>
                      <span className="mx-2">/</span>
                      <span className="text-st-cyan">{post.category}</span>
                    </div>
                  </nav>

                  {/* Meta Info */}
                  <div className="flex items-center mb-6">
                    <span className="bg-st-cyan text-st-navy px-3 py-1 rounded-full text-sm font-semibold mr-4">
                      {post.category}
                    </span>
                    <span className="text-white/80 text-sm mr-4">
                      {formatDate(post.publishedAt)}
                    </span>
                    {post.readingTime && (
                      <>
                        <span className="text-white/60 mx-2">•</span>
                        <span className="text-white/80 text-sm">
                          {post.readingTime} min read
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="container mx-auto px-6 max-w-4xl">
          {/* Video Embed */}
          {post.videoUrl && (
            <div className="mb-12">
              <VideoEmbed url={post.videoUrl} />
            </div>
          )}

          {/* Author Bio */}
          <div className="mb-12">
            <AuthorBio author={post.author} publishedAt={post.publishedAt} />
          </div>

          {/* Article Content */}
          <article id="article-content" className="mb-16">
            <div className="blog-content">
              <BlogContent content={post.content || []} />
            </div>
          </article>

          {/* Social Share */}
          <div className="mb-16">
            <SocialShare 
              title={post.title}
              url={`https://spencertoogood.com/blog/${post.slug.current}`}
            />
          </div>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mb-16">
              <RelatedPosts posts={post.relatedPosts} />
            </div>
          )}

          {/* Newsletter CTA */}
          <NewsletterCTA />
        </div>
      </div>

      {/* Floating Social Share */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <SocialShare 
          title={post.title}
          url={`https://spencertoogood.com/blog/${post.slug.current}`}
          vertical
        />
      </div>
    </>
  )
}

export default BlogPostPage