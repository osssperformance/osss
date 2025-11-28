import Link from 'next/link'
import { getProjectBySlug, getRelatedProjects } from '@/lib/projects'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'
import ProjectDetailClient from './ProjectDetailClient'

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  const relatedProjects = project ? await getRelatedProjects(project._id) : []

  if (!project) {
    return (
      <>
        <GlowMenu />
        <StickyLogo />
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-st-navy mb-4">Project not found</h1>
          <p className="text-st-gray-400 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/work">
            <button className="bg-st-cyan text-st-navy px-6 py-3 rounded-full hover:bg-st-navy hover:text-white transition-all duration-300">
              Back to Projects
            </button>
          </Link>
        </div>
        </div>
      </>
    )
  }

  return (
    <>
      <GlowMenu />
      <StickyLogo />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
    </>
  )
}

export default ProjectDetailPage