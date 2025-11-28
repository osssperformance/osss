'use client'

import { useState, ReactNode } from 'react'
import ChatPanel from '@/components/ChatPanel'

interface HomeClientProps {
  children: ReactNode
}

const HomeClient = ({ children }: HomeClientProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen flex">
      <main className={`flex-1 transition-all duration-300 ${
        isChatOpen ? 'md:mr-96 mr-0' : 'mr-0'
      }`}>
        {children}
      </main>
      <ChatPanel isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  )
}

export default HomeClient