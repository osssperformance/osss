import { Project } from '@/types/project'
import { client, featuredProjectsQuery, projectsQuery, projectQuery, urlFor } from './sanity'

// Category to color mapping
const categoryColors: Record<string, string> = {
  'ai': '#FF6B6B',
  'automation': '#4ECDC4',
  'advertising': '#A8E6CF',
  'web': '#FFB74D',
  'mobile': '#9575CD',
  'integration': '#F06292'
}

// Category to subtitle mapping
const categorySubtitles: Record<string, string> = {
  'ai': 'AI Implementation',
  'automation': 'Process Automation',
  'advertising': 'Campaign & Strategy',
  'web': 'Web Development',
  'mobile': 'Mobile Application',
  'integration': 'System Integration'
}

// Transform Sanity project data to match display needs
const transformProject = (project: any, index?: number): Project => {
  return {
    ...project,
    id: project.slug?.current || project._id,
    number: index !== undefined ? String(index + 1).padStart(2, '0') : undefined,
    subtitle: categorySubtitles[project.category] || project.category,
    color: categoryColors[project.category] || '#666666',
    tags: project.technologies || [],
    liveUrl: project.url,
    heroImage: project.heroImage && client && typeof project.heroImage === 'object' ?
      urlFor(project.heroImage).width(1920).height(1080).url() :
      project.heroImage,
    galleryImages: project.galleryImages || [],
    featured: true, // All projects are featured for now
    featuredImage: project.featuredImage && client && typeof project.featuredImage === 'object' ?
      urlFor(project.featuredImage).width(1920).height(1080).url() :
      project.featuredImage,
    secondFeaturedImage: project.secondFeaturedImage && client && typeof project.secondFeaturedImage === 'object' ?
      urlFor(project.secondFeaturedImage).width(1920).height(1080).url() :
      project.secondFeaturedImage,
    extraBodyText: project.extraBodyText,
    outro: project.outro,
    ctaHeading: project.ctaHeading,
    ctaText: project.ctaText
  }
}

// Fallback mock data when Sanity is not configured
const mockProjects: Project[] = [
  {
    _id: "mock-1",
    title: "AI-Powered Analytics Dashboard",
    slug: { current: "ai-analytics-dashboard" },
    description: "Revolutionary analytics platform with AI-powered insights for enterprise clients. This comprehensive solution transforms raw data into actionable insights, helping businesses make data-driven decisions faster than ever before.",
    category: "ai",
    year: 2024,
    technologies: ["React", "AI/ML", "TypeScript", "Analytics"],
    client: "TechCorp",
    url: "https://example.com",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center",
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This AI-powered analytics dashboard revolutionizes how businesses understand their data. Built with cutting-edge machine learning algorithms, it transforms complex datasets into actionable insights.'
          }
        ],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Key Features:'
          }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Real-time data processing with 99.9% accuracy'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Predictive analytics powered by machine learning'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Custom dashboards tailored to business needs'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=800&fit=crop&crop=center"
    ],
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center",
    secondFeaturedImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&crop=center",
    outro: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The analytics dashboard has become an essential tool for TechCorp, driving efficiency and growth across the organization.'
          }
        ],
        style: 'normal'
      }
    ],
    ctaHeading: "Ready to transform your data?",
    ctaText: "Let's discuss how AI can unlock new opportunities for your business."
  },
  {
    _id: "mock-2",
    title: "E-commerce Automation Suite",
    slug: { current: "ecommerce-automation" },
    description: "Complete automation solution for online retailers to streamline operations. From inventory management to customer communications, this platform reduces manual work by 80% while improving customer satisfaction.",
    category: "automation",
    year: 2024,
    technologies: ["Node.js", "Automation", "API Integration", "E-commerce"],
    client: "RetailPlus",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center",
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The E-commerce Automation Suite streamlines every aspect of online retail operations, from inventory management to customer communications.'
          }
        ],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Implementation Results:'
          }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '80% reduction in manual tasks'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '45% improvement in customer satisfaction'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=800&fit=crop&crop=center"
    ],
    featuredImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center",
    secondFeaturedImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&crop=center",
    outro: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'RetailPlus has seen a significant boost in operational efficiency and customer happiness since implementing the automation suite.'
          }
        ],
        style: 'normal'
      }
    ],
    ctaHeading: "Streamline your operations today",
    ctaText: "Contact us to find out how automation can save you time and money."
  },
  {
    _id: "mock-3",
    title: "Digital Marketing Campaign",
    slug: { current: "digital-marketing-campaign" },
    description: "Multi-channel advertising campaign that increased conversions by 300%. Strategic approach combining data analytics, creative optimization, and audience targeting to deliver exceptional ROI for our client.",
    category: "advertising",
    year: 2023,
    technologies: ["Meta Ads", "Google Ads", "Analytics", "CRO"],
    client: "GrowthCo",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center",
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our strategic approach combined data analytics, creative optimization, and precise audience targeting to deliver exceptional ROI.'
          }
        ],
        style: 'normal'
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=800&fit=crop&crop=center"
    ],
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center",
    secondFeaturedImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1920&h=1080&fit=crop&crop=center",
    outro: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The campaign exceeded all expectations, delivering a 300% increase in conversions and solidifying GrowthCo\'s position as a market leader.'
          }
        ],
        style: 'normal'
      }
    ],
    ctaHeading: "Ready to grow your business?",
    ctaText: "Let's create a data-driven marketing strategy that delivers real results."
  },
  {
    _id: "foliio",
    title: "Foliio",
    slug: { current: "foliio" },
    description: "A modern, high-performance portfolio platform designed for creative professionals. Foliio combines stunning aesthetics with powerful functionality to showcase work in the best possible light.",
    category: "web",
    year: 2025,
    technologies: ["Next.js", "React", "TailwindCSS", "Sanity"],
    client: "Foliio Inc.",
    url: "https://foliio.com",
    heroImage: "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?w=1920&h=1080&fit=crop&crop=center",
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1920&h=1080&fit=crop&crop=center",
    secondFeaturedImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1920&h=1080&fit=crop&crop=center",
    outro: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Foliio represents the future of digital portfolios, offering a seamless blend of design and technology that empowers creators to share their vision with the world.'
          }
        ],
        style: 'normal'
      }
    ],
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Foliio is more than just a portfolio template; it is a comprehensive design system built for the modern web. We focused on creating a user experience that is both intuitive and visually arresting.'
          }
        ],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Design Philosophy:'
          }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Minimalist aesthetics with maximum impact'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Performance-first architecture'
          }
        ],
        listItem: 'bullet',
        style: 'normal'
      }
    ],
    extraBodyText: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Technical Implementation:'
          }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Built with Next.js for server-side rendering and optimal SEO performance. Sanity CMS provides a flexible content structure, allowing for easy updates and management.'
          }
        ],
        style: 'normal'
      }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=800&fit=crop&crop=center"
    ],
    ctaHeading: "Build your dream portfolio",
    ctaText: "Start showcasing your work with Foliio today."
  }
].map(transformProject)

export const getFeaturedProjects = async (): Promise<Project[]> => {
  if (!client) {
    // Return mock data when Sanity is not configured
    return mockProjects
  }

  try {
    const projects = await client.fetch(featuredProjectsQuery)
    return projects.map((project: any, index: number) => transformProject(project, index))
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error)
    // Fallback to mock data on error
    return mockProjects
  }
}

export const getAllProjects = async (): Promise<Project[]> => {
  if (!client) {
    return mockProjects
  }

  try {
    const projects = await client.fetch(projectsQuery)
    return projects.map((project: any, index: number) => transformProject(project, index))
  } catch (error) {
    console.error('Error fetching all projects from Sanity:', error)
    return mockProjects
  }
}

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  if (!client) {
    return mockProjects.find(project => project.slug.current === slug)
  }

  try {
    const project = await client.fetch(projectQuery, { slug })
    return project ? transformProject(project) : undefined
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return mockProjects.find(project => project.slug.current === slug)
  }
}

export const getRelatedProjects = async (currentProjectId: string, limit: number = 2): Promise<Project[]> => {
  const allProjects = await getAllProjects()
  return allProjects
    .filter(project => project._id !== currentProjectId)
    .slice(0, limit)
}