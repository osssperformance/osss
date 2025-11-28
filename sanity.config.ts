import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'unb7xof3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'osss-performance-studio',
  title: 'OSSS Performance',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 200
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required().max(200)
          },
          {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'AI', value: 'ai' },
                { title: 'Automation', value: 'automation' },
                { title: 'Advertising', value: 'advertising' },
                { title: 'Marketing', value: 'marketing' },
                { title: 'Technology', value: 'technology' },
                { title: 'Business', value: 'business' }
              ]
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (rule) => rule.required()
          },
          {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: (rule) => rule.required()
          }
        ],
        preview: {
          select: {
            title: 'title',
            author: 'author.name',
            media: 'heroImage'
          },
          prepare(selection) {
            const { author } = selection
            return Object.assign({}, selection, {
              subtitle: author && `by ${author}`
            })
          }
        }
      },
      {
        name: 'author',
        title: 'Author',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 96
            }
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
              {
                title: 'Block',
                type: 'block',
                styles: [{ title: 'Normal', value: 'normal' }],
                lists: []
              }
            ]
          }
        ],
        preview: {
          select: {
            title: 'name',
            media: 'image'
          }
        }
      },
      {
        name: 'project',
        title: 'Project',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 200
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required()
          },
          {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
              layout: 'tags'
            }
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'AI Implementation', value: 'ai' },
                { title: 'Automation', value: 'automation' },
                { title: 'Advertising Campaign', value: 'advertising' },
                { title: 'Web Development', value: 'web' },
                { title: 'Mobile App', value: 'mobile' },
                { title: 'Integration', value: 'integration' }
              ]
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'client',
            title: 'Client',
            type: 'string'
          },
          {
            name: 'year',
            title: 'Year',
            type: 'number',
            validation: (rule) => rule.required().min(2020).max(new Date().getFullYear())
          },
          {
            name: 'url',
            title: 'Project URL',
            type: 'url'
          },
          {
            name: 'content',
            title: 'Project Body Text',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'secondFeaturedImage',
            title: 'Second Featured Image',
            type: 'image',
            options: {
              hotspot: true
            },
            description: 'Large image displayed between the main content and additional body text'
          },
          {
            name: 'extraBodyText',
            title: 'Additional Body Text',
            type: 'array',
            of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ],
            description: 'Second block of text between featured image and gallery'
          },
          {
            name: 'featuredImage',
            title: 'Featured Image (Middle)',
            type: 'image',
            options: {
              hotspot: true
            },
            description: 'Large image displayed between text blocks'
          },
          {
            name: 'outro',
            title: 'Outro Text',
            type: 'array',
            of: [
              {
                type: 'block'
              }
            ],
            description: 'Conclusion text displayed before the CTA'
          },
          {
            name: 'ctaHeading',
            title: 'CTA Heading',
            type: 'string',
            description: 'Heading for the Call to Action section'
          },
          {
            name: 'ctaText',
            title: 'CTA Text',
            type: 'text',
            rows: 3,
            description: 'Text for the Call to Action section'
          }
        ],
        preview: {
          select: {
            title: 'title',
            client: 'client',
            media: 'heroImage'
          },
          prepare(selection) {
            const { client } = selection
            return Object.assign({}, selection, {
              subtitle: client && `for ${client}`
            })
          }
        }
      },
      {
        name: 'salesPage',
        title: 'Sales Page',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: (rule) => rule.required()
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 200
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'product',
            title: 'Product Information',
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Product Name',
                type: 'string',
                validation: (rule) => rule.required()
              },
              {
                name: 'tagline',
                title: 'Tagline',
                type: 'string',
                validation: (rule) => rule.required()
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
                rows: 3
              },
              {
                name: 'videoUrl',
                title: 'Demo Video URL',
                type: 'url'
              },
              {
                name: 'image',
                title: 'Product Image',
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          },
          {
            name: 'problems',
            title: 'Problems/Pain Points',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Problem Title',
                    type: 'string'
                  },
                  {
                    name: 'description',
                    title: 'Description',
                    type: 'text'
                  },
                  {
                    name: 'icon',
                    title: 'Icon (emoji)',
                    type: 'string'
                  },
                  {
                    name: 'cost',
                    title: 'Cost Impact',
                    type: 'string'
                  }
                ]
              }
            ]
          },
          {
            name: 'benefits',
            title: 'Benefits/Solutions',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Benefit Title',
                    type: 'string'
                  },
                  {
                    name: 'description',
                    title: 'Description',
                    type: 'text'
                  },
                  {
                    name: 'icon',
                    title: 'Icon (emoji)',
                    type: 'string'
                  },
                  {
                    name: 'stat',
                    title: 'Statistic',
                    type: 'string'
                  }
                ]
              }
            ]
          },
          {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'name',
                    title: 'Feature Name',
                    type: 'string'
                  },
                  {
                    name: 'description',
                    title: 'Description',
                    type: 'text'
                  },
                  {
                    name: 'icon',
                    title: 'Icon (emoji)',
                    type: 'string'
                  }
                ]
              }
            ]
          },
          {
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'quote',
                    title: 'Quote',
                    type: 'text'
                  },
                  {
                    name: 'author',
                    title: 'Author Name',
                    type: 'string'
                  },
                  {
                    name: 'role',
                    title: 'Role/Title',
                    type: 'string'
                  },
                  {
                    name: 'company',
                    title: 'Company',
                    type: 'string'
                  },
                  {
                    name: 'rating',
                    title: 'Rating (1-5)',
                    type: 'number',
                    validation: (rule) => rule.min(1).max(5)
                  },
                  {
                    name: 'result',
                    title: 'Result/Outcome',
                    type: 'string'
                  },
                  {
                    name: 'image',
                    title: 'Author Image',
                    type: 'image'
                  }
                ]
              }
            ]
          },
          {
            name: 'pricing',
            title: 'Pricing Tiers',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'name',
                    title: 'Package Name',
                    type: 'string'
                  },
                  {
                    name: 'price',
                    title: 'Regular Price',
                    type: 'number'
                  },
                  {
                    name: 'salePrice',
                    title: 'Sale Price (optional)',
                    type: 'number'
                  },
                  {
                    name: 'popular',
                    title: 'Most Popular',
                    type: 'boolean',
                    initialValue: false
                  },
                  {
                    name: 'ctaText',
                    title: 'Button Text',
                    type: 'string',
                    initialValue: 'Get Started Now'
                  },
                  {
                    name: 'features',
                    title: 'Included Features',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          {
                            name: 'name',
                            title: 'Feature Name',
                            type: 'string'
                          },
                          {
                            name: 'description',
                            title: 'Description',
                            type: 'string'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'bonuses',
                    title: 'Bonus Items',
                    type: 'array',
                    of: [{ type: 'string' }]
                  }
                ]
              }
            ]
          },
          {
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'question',
                    title: 'Question',
                    type: 'string'
                  },
                  {
                    name: 'answer',
                    title: 'Answer',
                    type: 'text'
                  },
                  {
                    name: 'category',
                    title: 'Category',
                    type: 'string',
                    options: {
                      list: [
                        'General',
                        'Pricing',
                        'Technical',
                        'Support',
                        'Implementation'
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            name: 'trustBadges',
            title: 'Trust Badges',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Trust indicators like "Money Back Guarantee", "SSL Secured", etc.'
          },
          {
            name: 'riskReversals',
            title: 'Risk Reversals/Guarantees',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Guarantees like "30-day money back", "No setup fees", etc.'
          },
          {
            name: 'urgency',
            title: 'Urgency Banner',
            type: 'object',
            fields: [
              {
                name: 'enabled',
                title: 'Show Urgency Banner',
                type: 'boolean',
                initialValue: false
              },
              {
                name: 'message',
                title: 'Urgency Message',
                type: 'string'
              }
            ]
          },
          {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
              {
                name: 'metaTitle',
                title: 'Meta Title',
                type: 'string'
              },
              {
                name: 'metaDescription',
                title: 'Meta Description',
                type: 'text',
                rows: 2
              },
              {
                name: 'ogImage',
                title: 'Social Share Image',
                type: 'image'
              }
            ]
          }
        ],
        preview: {
          select: {
            title: 'product.name',
            subtitle: 'title',
            media: 'product.image'
          }
        }
      },
      {
        name: 'siteSettings',
        title: 'Site Settings',
        type: 'document',
        fields: [
          {
            name: 'profileImage',
            title: 'Profile Image (Story Section)',
            type: 'image',
            description: 'Your profile image that appears in the Story section',
            options: {
              hotspot: true
            }
          }
        ]
      }
    ]
  }
})