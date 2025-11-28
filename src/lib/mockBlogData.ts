import { BlogPost } from '@/types/blog'

export const mockBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'How AI Chat Bots Are Revolutionizing Customer Service',
    slug: { current: 'ai-chatbots-revolutionizing-customer-service' },
    heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Discover how businesses are using AI-powered chat bots to provide 24/7 customer support, reduce costs by 60%, and increase customer satisfaction scores.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'In today\'s fast-paced digital world, customers expect instant responses and 24/7 availability. Traditional customer service models simply can\'t keep up with these demands while maintaining cost efficiency.'
          }
        ]
      }
    ],
    category: 'AI',
    publishedAt: '2024-01-15T10:00:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    _id: '2',
    title: 'The Complete Guide to Marketing Automation in 2024',
    slug: { current: 'complete-guide-marketing-automation-2024' },
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Learn how to implement marketing automation that actually works. From lead nurturing to conversion optimization, this guide covers everything you need to know.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Marketing automation has evolved far beyond simple email sequences. Today\'s sophisticated platforms can create personalized customer journeys that adapt in real-time based on behavior and preferences.'
          }
        ]
      }
    ],
    category: 'Automation',
    publishedAt: '2024-01-10T14:30:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    _id: '3',
    title: 'Why Your Facebook Ads Aren\'t Converting (And How to Fix It)',
    slug: { current: 'facebook-ads-not-converting-how-to-fix' },
    heroImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Stop wasting money on Facebook ads that don\'t convert. These 7 proven strategies will help you optimize your campaigns and increase your ROAS by 300%.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'You\'re spending thousands on Facebook ads but seeing minimal results. Sound familiar? You\'re not alone. 97% of businesses struggle with Facebook ad conversion, but the solution is simpler than you think.'
          }
        ]
      }
    ],
    category: 'Advertising',
    publishedAt: '2024-01-05T09:15:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    _id: '4',
    title: 'Building High-Converting Landing Pages: A Data-Driven Approach',
    slug: { current: 'building-high-converting-landing-pages-data-driven' },
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Transform your landing pages from conversion killers to revenue generators. Real case studies showing how small changes led to 400% conversion improvements.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A well-optimized landing page can be the difference between a profitable campaign and money down the drain. After analyzing over 1,000 landing pages, here are the patterns that separate winners from losers.'
          }
        ]
      }
    ],
    category: 'Marketing',
    publishedAt: '2023-12-28T16:45:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    _id: '5',
    title: 'The Future of E-commerce: AI-Powered Personalization',
    slug: { current: 'future-ecommerce-ai-powered-personalization' },
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Discover how AI personalization is helping e-commerce stores increase average order value by 35% and customer lifetime value by 200%.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Generic product recommendations are dead. Today\'s consumers expect Amazon-level personalization from every online store they visit. Here\'s how to deliver it without Amazon\'s budget.'
          }
        ]
      }
    ],
    category: 'Technology',
    publishedAt: '2023-12-20T11:20:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    _id: '6',
    title: 'From Chaos to Clarity: Streamlining Business Operations with Smart Tools',
    slug: { current: 'chaos-to-clarity-streamlining-business-operations' },
    heroImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=500&fit=crop&crop=center',
    excerpt: 'Stop juggling 20 different tools. Learn how to create an integrated business operations system that saves 15+ hours per week and eliminates costly mistakes.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Your business is growing, but so is the complexity of managing it. Multiple tools, disconnected data, and manual processes are slowing you down. Time for a systematic approach.'
          }
        ]
      }
    ],
    category: 'Business',
    publishedAt: '2023-12-15T13:30:00Z',
    author: {
      _id: 'author-1',
      name: 'Spencer Toogood',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  }
]

export const getMockBlogPosts = (): BlogPost[] => {
  return mockBlogPosts
}

export const getMockBlogPost = (slug: string): BlogPost | null => {
  return mockBlogPosts.find(post => post.slug.current === slug) || null
}

export const getFeaturedBlogPosts = (limit: number = 3): BlogPost[] => {
  return mockBlogPosts.slice(0, limit)
}