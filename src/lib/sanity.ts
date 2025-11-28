import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
}) : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (builder) {
    return builder.image(source)
  }
  return {
    url: () => '',
    width: () => ({ url: () => '', height: () => ({ url: () => '' }) }),
    height: () => ({ url: () => '' })
  }
}

// GROQ queries for blog posts
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    heroImage,
    excerpt,
    category,
    publishedAt,
    author->{
      name,
      image
    }
  }
`

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    excerpt,
    content,
    category,
    publishedAt,
    author->{
      name,
      image
    }
  }
`

export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    heroImage,
    excerpt,
    category,
    publishedAt,
    author->{
      name,
      image
    }
  }
`

// GROQ queries for projects
export const projectsQuery = `
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    description,
    heroImage,
    galleryImages,
    technologies,
    category,
    client,
    year,
    url,
    content,
    featuredImage,
    secondFeaturedImage,
    extraBodyText,
    outro,
    ctaHeading,
    ctaText
  }
`

export const featuredProjectsQuery = `
  *[_type == "project"] | order(year desc)[0...6] {
    _id,
    title,
    slug,
    description,
    heroImage,
    galleryImages,
    technologies,
    category,
    client,
    year,
    url,
    content,
    featuredImage,
    secondFeaturedImage,
    extraBodyText,
    outro,
    ctaHeading,
    ctaText
  }
`

export const projectQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    heroImage,
    galleryImages,
    technologies,
    category,
    client,
    year,
    url,
    content,
    featuredImage,
    secondFeaturedImage,
    extraBodyText,
    outro,
    ctaHeading,
    ctaText
  }
`