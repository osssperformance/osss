export interface Author {
  _id: string
  name: string
  image?: any
  bio?: string
  role?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  heroImage?: any
  videoUrl?: string
  excerpt: string
  content?: any[]
  category: string
  tags?: string[]
  publishedAt: string
  featured?: boolean
  readingTime?: number
  author: Author
}

export interface EnhancedBlogPost extends BlogPost {
  relatedPosts?: BlogPost[]
}

export interface BlogCardProps {
  post: BlogPost
  variant?: 'standard' | 'featured' | 'minimal'
}

export type BlogCategory = 'All' | 'AI' | 'Automation' | 'Marketing' | 'Advertising' | 'Case Study' | 'Tutorial'