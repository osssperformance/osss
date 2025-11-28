# OSSS Performance Website

Modern Next.js website for OSSS Performance, featuring Sanity CMS integration, portfolio showcase, and contact functionality.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Email**: Resend

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and update with your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Already configured (unb7xof3)
- `NEXT_PUBLIC_SANITY_DATASET` - Already configured (production)
- `RESEND_API_KEY` - For contact form functionality
- `NEXT_PUBLIC_META_PIXEL_ID` (optional) - Meta/Facebook tracking
- `META_ACCESS_TOKEN` (optional) - Meta conversion tracking

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Sanity Studio

To manage content in Sanity Studio:

```bash
npm run studio
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run studio` - Start Sanity Studio locally
- `npm run studio:build` - Build Sanity Studio
- `npm run studio:deploy` - Deploy Sanity Studio

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes
│   ├── blog/        # Blog pages
│   ├── work/        # Portfolio pages
│   ├── studio/      # Sanity Studio
│   └── layout.tsx   # Root layout
├── components/       # React components
├── lib/             # Utilities and helpers
└── types/           # TypeScript types
```

## Content Management

The site uses Sanity CMS with the following content types:

- **Blog Posts** - Articles and blog content
- **Projects** - Portfolio work and case studies
- **Authors** - Author profiles
- **Sales Pages** - Landing pages for products/services
- **Site Settings** - Global site configuration

Access the CMS at `/studio` or run `npm run studio` for local development.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## Backend Configuration

This site uses the same Sanity backend as the Spencer Toogood portfolio:
- Project ID: `unb7xof3`
- Dataset: `production`

Content is shared across both sites, allowing for unified content management.

## License

Private - All rights reserved
