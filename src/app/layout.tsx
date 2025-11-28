import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MetaPixel from '@/components/MetaPixel'

export const metadata: Metadata = {
  title: 'OSSS Performance',
  description: 'OSSS Performance - Helping businesses optimize and scale with AI, automation, and technology solutions.',
  keywords: ['AI', 'Automation', 'Performance', 'Technology', 'Consulting', 'Optimization'],
  authors: [{ name: 'OSSS Performance' }],
  creator: 'OSSS Performance',
  publisher: 'OSSS Performance',
  openGraph: {
    title: 'OSSS Performance',
    description: 'Helping businesses optimize and scale with AI, automation, and technology solutions.',
    url: 'https://osssperformance.com',
    siteName: 'OSSS Performance',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSSS Performance',
    description: 'Helping businesses optimize and scale with AI, automation, and technology solutions.',
    creator: '@osssperformance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-reddit">
        <GoogleAnalytics />
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}