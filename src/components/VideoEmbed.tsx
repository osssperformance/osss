'use client'

interface VideoEmbedProps {
  url: string
}

const VideoEmbed = ({ url }: VideoEmbedProps) => {
  const getEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1`
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return url
  }

  const getPlatform = (url: string) => {
    if (url.includes('youtube') || url.includes('youtu.be')) return 'YouTube'
    if (url.includes('vimeo')) return 'Vimeo'
    return 'Video'
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black group">
      <div className="aspect-video">
        <iframe
          src={getEmbedUrl(url)}
          title="Video content"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Platform indicator */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {getPlatform(url)}
      </div>
    </div>
  )
}

export default VideoEmbed