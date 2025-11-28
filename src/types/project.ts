// Updated to match Sanity project schema
export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  heroImage?: any // Sanity image object
  galleryImages?: any[] // Array of Sanity image objects
  technologies?: string[]
  category: string
  client?: string
  year: number
  url?: string
  content?: any[] // Rich text content

  // Display properties (derived or defaults)
  id?: string // slug.current for compatibility
  number?: string // Generated from index
  subtitle?: string // Derived from category
  color?: string // Generated based on category
  tags?: string[] // technologies for compatibility
  liveUrl?: string // url for compatibility
  featured?: boolean // Can be derived from criteria
  featuredImage?: any // Large featured image for the middle of the page
  secondFeaturedImage?: any // Second large featured image
  extraBodyText?: any
  outro?: any // Conclusion text (Rich Text)
  ctaHeading?: string
  ctaText?: string
}