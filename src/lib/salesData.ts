import { SalesPageData } from '@/types/sales'

export const aiChatKnowledgeBase: SalesPageData = {
  product: {
    id: 'ai-chat-kb',
    name: 'AI-Powered Chat Knowledge Base',
    headline: 'Turn Your Website Into a 24/7 Sales Machine',
    subheadline: 'Intelligent chatbot that learns your business and converts visitors into customers while you sleep',
    regularPrice: 495,
    salePrice: 295,
    heroImage: '/images/products/ai-chat-hero.jpg',
    videoUrl: 'https://vimeo.com/demo-ai-chat',
    bulletPoints: [
      'Answers customer questions instantly with 97% accuracy',
      'Learns from your existing content and FAQs',
      'Increases conversions by up to 340%',
      'Setup in under 10 minutes'
    ],
    ctaText: 'Get Your AI Chat Bot Now',
    guarantee: '30-Day Money-Back Guarantee',
    slug: 'ai-chat-knowledge-base'
  },

  problems: [
    {
      icon: '😫',
      title: 'Losing Leads While You Sleep',
      description: 'Your website gets traffic at all hours, but you\'re only available during business hours. Every visitor who leaves with questions is a lost opportunity.',
      costOfNotSolving: 'Average business loses $50,000+ annually in missed leads'
    },
    {
      icon: '⏰',
      title: 'Slow Response Times Killing Sales',
      description: 'Studies show 78% of customers buy from the first business that responds. If you\'re not first, you\'re last.',
      costOfNotSolving: '82% of leads go cold within 24 hours without immediate response'
    },
    {
      icon: '🔄',
      title: 'Support Team Overwhelmed',
      description: 'Your team spends hours answering the same questions over and over instead of focusing on high-value activities.',
      costOfNotSolving: 'Support costs can eat up 30% of your revenue'
    },
    {
      icon: '❓',
      title: 'Customers Leave with Unanswered Questions',
      description: 'Visitors bounce because they can\'t find the information they need quickly. Your conversion rate suffers.',
      costOfNotSolving: 'High bounce rates damage SEO and waste ad spend'
    }
  ],

  benefits: [
    {
      icon: '⚡',
      title: 'Instant 24/7 Response',
      description: 'Never lose a lead again. Your AI responds to every visitor instantly, even at 3 AM.',
      stat: '340% increase in lead capture'
    },
    {
      icon: '🎯',
      title: 'Qualified Lead Generation',
      description: 'AI qualifies prospects and routes hot leads directly to your sales team with context.',
      stat: '85% lead qualification accuracy'
    },
    {
      icon: '📈',
      title: 'Dramatically Higher Conversions',
      description: 'Visitors get immediate answers and feel confident buying. Your conversion rate skyrockets.',
      stat: 'Average 3.4x conversion improvement'
    },
    {
      icon: '💰',
      title: 'Massive Cost Savings',
      description: 'Reduce support costs while increasing sales. The ROI is immediate and measurable.',
      stat: 'Save $3,000+ monthly on support'
    },
    {
      icon: '🧠',
      title: 'Learns Your Business',
      description: 'Gets smarter over time by learning from your content, FAQs, and customer interactions.',
      stat: '97% answer accuracy rate'
    },
    {
      icon: '🚀',
      title: 'Setup in Minutes, Not Months',
      description: 'No complex integrations or technical knowledge required. Add one line of code and you\'re live.',
      stat: 'Average setup time: 8 minutes'
    }
  ],

  features: [
    {
      name: 'AI Knowledge Base',
      description: 'Automatically learns from your website content, FAQs, and documents',
      included: true,
      icon: '🧠'
    },
    {
      name: 'Lead Qualification',
      description: 'Asks smart questions to qualify prospects and capture contact information',
      included: true,
      icon: '🎯'
    },
    {
      name: 'CRM Integration',
      description: 'Seamlessly connects with your existing CRM and sales tools',
      included: true,
      icon: '🔗'
    },
    {
      name: 'Analytics Dashboard',
      description: 'Track conversations, conversion rates, and ROI in real-time',
      included: true,
      icon: '📊'
    },
    {
      name: 'Custom Branding',
      description: 'Match your brand colors, logo, and voice perfectly',
      included: true,
      icon: '🎨'
    },
    {
      name: 'Multi-language Support',
      description: 'Communicate with customers in their preferred language',
      included: true,
      icon: '🌍'
    }
  ],

  pricing: [
    {
      id: 'starter',
      name: 'Starter Setup',
      price: 495,
      salePrice: 295,
      highlighted: true,
      popular: true,
      ctaText: 'Get Started Now',
      features: [
        { name: 'AI Chat Bot Setup', description: 'Complete installation and configuration', included: true },
        { name: 'Knowledge Base Training', description: 'AI trained on your content and FAQs', included: true },
        { name: 'Basic Integrations', description: 'Connect to your website and one CRM', included: true },
        { name: 'Custom Branding', description: 'Match your brand colors and style', included: true },
        { name: '30-Day Support', description: 'Email and chat support for first month', included: true }
      ],
      bonuses: [
        'Lead Qualification Template ($97 value)',
        'Conversion Optimization Guide ($197 value)',
        'Priority Support for 30 Days ($147 value)'
      ]
    }
  ],

  testimonials: [
    {
      id: '1',
      quote: 'Spencer\'s AI chat solution transformed our customer service. We\'re converting 3x more visitors into customers and our support costs dropped by 60%. The ROI was immediate.',
      author: 'Sarah Chen',
      role: 'CEO',
      company: 'TechStartup Inc',
      image: '',  // Remove or add actual testimonial images
      rating: 5,
      result: '340% increase in conversions'
    },
    {
      id: '2',
      quote: 'Within 2 weeks of implementing Spencer\'s AI chat, we recovered our entire investment through increased sales. Now it\'s generating an extra $15k monthly. Best business decision we made this year.',
      author: 'Marcus Johnson',
      role: 'Head of Digital',
      company: 'Media Evolution',
      image: '',  // Remove or add actual testimonial images
      rating: 5,
      result: '$15,000 monthly increase'
    },
    {
      id: '3',
      quote: 'The setup was incredibly simple. Spencer handled everything and had us live in under 30 minutes. Our lead quality improved dramatically because the AI qualifies prospects before they reach our sales team.',
      author: 'Jennifer Rodriguez',
      role: 'Marketing Director',
      company: 'Growth Agency LLC',
      image: '',  // Remove or add actual testimonial images
      rating: 5,
      result: '85% qualified leads'
    }
  ],

  faqs: [
    {
      id: '1',
      question: 'How quickly can you set this up?',
      answer: 'Most clients are live within 24-48 hours. The actual setup takes about 30 minutes, but we spend time training the AI on your specific business to ensure maximum accuracy.',
      category: 'Setup'
    },
    {
      id: '2',
      question: 'What if I\'m not happy with the results?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not seeing improved conversions and lead generation, we\'ll refund you in full, no questions asked.',
      category: 'Guarantee'
    },
    {
      id: '3',
      question: 'Does it work with my website platform?',
      answer: 'Yes! Our solution works with any website - WordPress, Shopify, Squarespace, Webflow, custom builds, you name it. We just add a small piece of code to your site.',
      category: 'Compatibility'
    },
    {
      id: '4',
      question: 'Will it sound robotic or obviously AI?',
      answer: 'Not at all. We train the AI to match your brand voice and communication style. Most visitors don\'t realize they\'re talking to AI - they just appreciate the helpful, instant responses.',
      category: 'Experience'
    },
    {
      id: '5',
      question: 'What happens to leads after the AI qualifies them?',
      answer: 'Qualified leads are immediately sent to your CRM with full conversation context. You\'ll get an email notification and can follow up with warm, informed prospects.',
      category: 'Integration'
    },
    {
      id: '6',
      question: 'Can I see examples of it in action?',
      answer: 'Absolutely! Book a quick demo call and I\'ll show you the AI in action on similar businesses. You can also try the demo bot on this page.',
      category: 'Demo'
    }
  ],

  urgency: {
    type: 'limited-time',
    message: 'Launch Special: Save $200 - Only 5 Spots Remaining This Month!',
    countdown: {
      endDate: '2024-02-01T23:59:59Z',
      timeZone: 'America/Chicago'
    }
  },

  trustBadges: [
    {
      id: '1',
      name: 'SSL Secured',
      image: '/images/badges/ssl-secured.svg',
      description: 'Your data is encrypted and secure'
    },
    {
      id: '2',
      name: '30-Day Guarantee',
      image: '/images/badges/guarantee.svg',
      description: 'Risk-free money-back guarantee'
    },
    {
      id: '3',
      name: 'GDPR Compliant',
      image: '/images/badges/gdpr.svg',
      description: 'Fully compliant with privacy regulations'
    }
  ],

  bonusItems: [
    'Lead Qualification Template ($97 value)',
    'Conversion Optimization Guide ($197 value)',
    'Priority Support for 30 Days ($147 value)',
    'Custom Follow-up Email Sequences ($247 value)'
  ],

  riskReversals: [
    '30-day money-back guarantee',
    'No setup fees or hidden costs',
    'Cancel anytime',
    'Free migration if switching from another platform'
  ]
}

export const salesPages = {
  'ai-chat-knowledge-base': aiChatKnowledgeBase
}

export const getSalesPageData = (slug: string) => {
  return salesPages[slug as keyof typeof salesPages]
}