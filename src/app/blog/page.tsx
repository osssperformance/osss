'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost, BlogCategory } from '@/types/blog'
import { client, postsQuery } from '@/lib/sanity'
import { getMockBlogPosts } from '@/lib/mockBlogData'
import BlogCard from '@/components/BlogCard'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

  const categories: BlogCategory[] = ['All', 'AI', 'Automation', 'Marketing', 'Advertising', 'Case Study', 'Tutorial']

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (client) {
          const data = await client.fetch(postsQuery)
          setPosts(data)
          setFilteredPosts(data)
        } else {
          // Use comprehensive mock data
          const mockPosts = getMockBlogPosts()
          setPosts(mockPosts)
          setFilteredPosts(mockPosts)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [posts, activeCategory, searchTerm])

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-st-gray-200 rounded w-1/3 mb-8"></div>
            <div className="h-96 bg-st-gray-200 rounded-2xl mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-st-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <GlowMenu />
      <StickyLogo />
      <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="relative h-[60vh] mb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-st-navy to-st-gray-800"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 h-full flex items-end">
            <div className="max-w-4xl text-white pb-16">
              <div className="flex items-center mb-4">
                <span className="bg-st-cyan text-st-navy px-3 py-1 rounded-full text-sm font-semibold mr-4">
                  Featured
                </span>
                <span className="text-st-cyan text-sm font-medium">
                  {featuredPost.category}
                </span>
                <span className="text-white/60 mx-2">•</span>
                <span className="text-white/60 text-sm">
                  {featuredPost.readingTime} min read
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                {featuredPost.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-st-cyan rounded-full flex items-center justify-center mr-4">
                    <span className="text-st-navy font-bold text-sm">ST</span>
                  </div>
                  <div>
                    <p className="font-semibold">{featuredPost.author.name}</p>
                    <p className="text-white/60 text-sm">{formatDate(featuredPost.publishedAt)}</p>
                  </div>
                </div>
                
                <Link href={`/blog/${featuredPost.slug.current}`}>
                  <button className="bg-st-cyan text-st-navy px-8 py-3 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 font-semibold">
                    Read Article
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-st-navy mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-st-gray-400 max-w-2xl mx-auto">
            Thoughts on AI, automation, marketing strategies, and the future of digital business.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-st-cyan text-st-navy font-semibold'
                      : 'bg-st-gray-100 text-st-gray-400 hover:bg-st-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and View Toggle */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-st-gray-200 rounded-full focus:border-st-cyan focus:outline-none transition-colors duration-300 w-64"
                />
                <svg className="w-4 h-4 text-st-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex bg-st-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {regularPosts.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {regularPosts.map(post => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <BlogCard post={post} variant={viewMode === 'list' ? 'minimal' : 'standard'} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-st-navy mb-2">No posts found</h3>
            <p className="text-st-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default BlogPage