import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Project } from '@/types/project'
import GlowMenu from '@/components/GlowMenu'
import StickyLogo from '@/components/StickyLogo'
import WorkPageClient from './WorkPageClient'

const WorkPage = async () => {
  const projects = await getAllProjects()

  return (
    <>
      <GlowMenu />
      <StickyLogo />
      <WorkPageClient projects={projects} />
    </>
  )
}

export default WorkPage