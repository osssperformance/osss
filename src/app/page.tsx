import HomeClient from '@/components/HomeClient'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Story from '@/components/Story'
import Projects from '@/components/Projects'
import BlogPreview from '@/components/BlogPreview'
import NewsletterCTA from '@/components/NewsletterCTA'
import Footer from '@/components/Footer'

export default async function Home() {
  return (
    <HomeClient>
      <GlowMenu />
      <StickyLogo />
      <Hero />
      <Story />
      <About />
      <Projects />
      <BlogPreview />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <NewsletterCTA
              title="Stay Ahead of the Curve"
              description="Get exclusive insights on AI, automation, and growth strategies delivered straight to your inbox. Join 2,000+ business leaders who read my weekly newsletter."
            />
          </div>
        </div>
      </section>
      <Footer />
    </HomeClient>
  )
}