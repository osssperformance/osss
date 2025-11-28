# OSSS Performance - Claude Development Guidelines

**Read this before making any code changes to the project.**

## Project Overview

OSSS Performance website built with Next.js 15, Sanity CMS, and Tailwind CSS. Shares the same backend (Sanity) as the Spencer Toogood portfolio site but with rebranded frontend.

## Key Technologies

- **Framework**: Next.js 15 with App Router and Turbopack
- **CMS**: Sanity (Project ID: unb7xof3, Dataset: production)
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)
- **Email**: Resend
- **Analytics**: Google Analytics + Meta Pixel

## Development Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript validation
npm run studio       # Sanity Studio (localhost:3000/studio)
```

## Implementation Rules

### TypeScript Standards
- **MUST** use TypeScript strict mode
- **MUST** use `import type` for type-only imports
- **MUST NOT** use `any` types without TODO comment
- **SHOULD** use `type` over `interface` unless interface is more readable

### Component Standards
- **MUST** use Server Components by default
- **MUST** use Client Components (`'use client'`) only for interactivity
- **SHOULD** keep components simple and composable
- **SHOULD NOT** extract functions unless reused or needed for testing

### Code Quality
- **MUST** pass `npm run type-check` before committing
- **MUST** pass `npm run lint` (zero warnings)
- **MUST** pass `npm run build`
- **SHOULD** write tests for complex logic
- **SHOULD NOT** add comments except for critical caveats

### Git Standards
- **MUST** use Conventional Commits format
- **SHOULD NOT** reference Claude or Anthropic in commits
- Example: `feat(blog): add pagination to blog listing`

## Branding

- **Site Name**: OSSS Performance
- **Domain**: osssperformance.com
- **Description**: Helping businesses optimize and scale with AI, automation, and technology solutions
- **Social**: @osssperformance

## Backend Configuration

Shares Sanity backend with Spencer Toogood portfolio:
- Project ID: `unb7xof3`
- Dataset: `production`
- Content types: Blog Posts, Projects, Authors, Sales Pages, Site Settings

## Content Structure

- **Blog** (`/blog`) - Articles and blog posts
- **Work** (`/work`) - Portfolio and case studies
- **Products** (`/products`) - Sales/landing pages
- **Pitch Me** (`/pitch-me`) - Contact/pitch form
- **Studio** (`/studio`) - Sanity CMS interface

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=unb7xof3
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://osssperformance.com
```

Optional:
```bash
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id
META_ACCESS_TOKEN=your_meta_access_token
```

## Quick Reference

- **Add blog post**: Use Sanity Studio at `/studio`
- **Add project**: Use Sanity Studio, select "Project" document type
- **Update site settings**: Edit "Site Settings" in Sanity Studio
- **Modify styling**: Edit Tailwind classes in components or tailwind.config.js
- **Update metadata**: Edit src/app/layout.tsx

## Code Examples

### Server Component (Default)
```typescript
async function BlogList(): Promise<JSX.Element> {
  const posts = await getPosts()
  return <PostGrid posts={posts} />
}
```

### Client Component (Interactive Only)
```typescript
'use client'
function InteractiveCard({ data }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(false)
  return <Card onClick={() => setExpanded(!expanded)} />
}
```

### Type Import
```typescript
import type { Post } from '@/types/blog'
import { formatDate } from '@/lib/utils'
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Manual
```bash
npm run build
npm run start
```

## Support

For questions about:
- **Sanity content**: Check shared backend with Spencer Toogood portfolio
- **Build issues**: Run `npm run type-check` and `npm run lint`
- **Deployment**: Ensure all environment variables are set

---

**Remember**: This shares the same CMS backend as the Spencer Toogood site. Content changes will affect both sites.
