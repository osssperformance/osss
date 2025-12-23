'use client'

import type { ReactNode } from 'react'

interface HomeClientProps {
  children: ReactNode
}

const HomeClient = ({ children }: HomeClientProps) => {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  )
}

export default HomeClient