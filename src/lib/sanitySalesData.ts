import { client } from './sanity'
import { SalesPageData } from '@/types/sales'

// GROQ query to fetch sales page data
const salesPageQuery = `
  *[_type == "salesPage" && slug.current == $slug][0] {
    title,
    slug,
    product {
      name,
      tagline,
      description,
      videoUrl,
      "image": image.asset->url
    },
    problems[] {
      title,
      description,
      icon,
      cost
    },
    benefits[] {
      title,
      description,
      icon,
      stat
    },
    features[] {
      name,
      description,
      icon
    },
    testimonials[] {
      quote,
      author,
      role,
      company,
      rating,
      result,
      "image": image.asset->url
    },
    pricing[] {
      name,
      price,
      salePrice,
      popular,
      ctaText,
      features[] {
        name,
        description
      },
      bonuses[]
    },
    faqs[] {
      question,
      answer,
      category
    },
    trustBadges[],
    riskReversals[],
    urgency {
      enabled,
      message
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`

// Query to get all sales page slugs for static generation
const salesPageSlugsQuery = `
  *[_type == "salesPage" && defined(slug.current)] {
    "slug": slug.current
  }
`

export async function getSalesPageFromSanity(slug: string): Promise<SalesPageData | null> {
  try {
    if (!client) {
      console.warn('Sanity client not configured')
      return null
    }
    
    const salesPage = await client.fetch(salesPageQuery, { slug })
    
    if (!salesPage) {
      return null
    }

    // Transform Sanity data to match our SalesPageData type
    const transformedData: SalesPageData = {
      product: {
        id: `product-${slug}`,
        name: salesPage.product.name,
        headline: salesPage.product.tagline,
        subheadline: salesPage.product.description || '',
        regularPrice: salesPage.pricing?.[0]?.price || 0,
        salePrice: salesPage.pricing?.[0]?.salePrice,
        heroImage: salesPage.product.image || '',
        videoUrl: salesPage.product.videoUrl,
        bulletPoints: [],
        ctaText: 'Get Started Now',
        guarantee: '30-Day Money Back Guarantee',
        slug: slug
      },
      problems: salesPage.problems || [],
      benefits: salesPage.benefits || [],
      features: salesPage.features || [],
      testimonials: salesPage.testimonials?.map((testimonial: any) => ({
        id: `testimonial-${Math.random().toString(36).substr(2, 9)}`,
        quote: testimonial.quote,
        author: testimonial.author,
        role: testimonial.role,
        company: testimonial.company,
        rating: testimonial.rating,
        result: testimonial.result,
        image: testimonial.image
      })) || [],
      pricing: salesPage.pricing?.map((tier: any) => ({
        id: `tier-${Math.random().toString(36).substr(2, 9)}`,
        name: tier.name,
        price: tier.price,
        salePrice: tier.salePrice,
        popular: tier.popular || false,
        ctaText: tier.ctaText || 'Get Started Now',
        features: tier.features || [],
        bonuses: tier.bonuses || []
      })) || [],
      faqs: salesPage.faqs?.map((faq: any) => ({
        id: `faq-${Math.random().toString(36).substr(2, 9)}`,
        question: faq.question,
        answer: faq.answer,
        category: faq.category || 'General'
      })) || [],
      trustBadges: salesPage.trustBadges?.map((badge: string, index: number) => ({
        id: `badge-${index}`,
        name: badge,
        image: '',
        description: badge
      })) || [],
      riskReversals: salesPage.riskReversals || [],
      urgency: salesPage.urgency?.enabled ? {
        type: 'limited-time' as const,
        message: salesPage.urgency.message
      } : undefined
    }

    return transformedData
  } catch (error) {
    console.error('Error fetching sales page from Sanity:', error)
    return null
  }
}

export async function getAllSalesPageSlugs(): Promise<string[]> {
  try {
    if (!client) {
      console.warn('Sanity client not configured')
      return []
    }
    
    const slugs = await client.fetch(salesPageSlugsQuery)
    return slugs.map((item: any) => item.slug)
  } catch (error) {
    console.error('Error fetching sales page slugs from Sanity:', error)
    return []
  }
}