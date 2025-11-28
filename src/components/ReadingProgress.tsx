'use client'

interface ReadingProgressProps {
  progress: number
}

const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-st-cyan z-50 transition-all duration-150 ease-out"
      style={{ 
        width: `${progress}%`,
        transformOrigin: 'left'
      }}
    />
  )
}

export default ReadingProgress