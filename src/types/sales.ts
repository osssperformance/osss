export interface Product {
  id: string
  name: string
  headline: string
  subheadline: string
  regularPrice: number
  salePrice?: number
  heroImage: string
  videoUrl?: string
  bulletPoints: string[]
  ctaText: string
  guarantee: string
  slug: string
}

export interface Problem {
  icon: string
  title: string
  description: string
  costOfNotSolving?: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
  stat?: string
}

export interface Feature {
  name: string
  description: string
  included: boolean
  icon?: string
}

export interface PricingTier {
  id: string
  name: string
  price: number
  salePrice?: number
  features: Feature[]
  highlighted?: boolean
  ctaText: string
  popular?: boolean
  bonuses?: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  image?: string
  rating?: number
  result?: string
  videoUrl?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface UrgencyElement {
  type: 'countdown' | 'limited-spots' | 'limited-time' | 'price-increase'
  message: string
  countdown?: {
    endDate: string
    timeZone: string
  }
  spotsRemaining?: number
}

export interface TrustBadge {
  id: string
  name: string
  image: string
  description?: string
}

export interface SalesPageData {
  product: Product
  problems: Problem[]
  benefits: Benefit[]
  features: Feature[]
  pricing: PricingTier[]
  testimonials: Testimonial[]
  faqs: FAQItem[]
  urgency?: UrgencyElement
  trustBadges: TrustBadge[]
  bonusItems?: string[]
  riskReversals: string[]
}