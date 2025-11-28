import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import { Project } from '@/types/project'
import ProjectsClient from './ProjectsClient'

const Projects = async () => {
  const featuredProjects = await getFeaturedProjects()



  return <ProjectsClient projects={featuredProjects} />
}

export default Projects