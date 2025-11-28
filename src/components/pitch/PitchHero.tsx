'use client'

interface PitchHeroProps {
  onStartPitch: () => void
}

const PitchHero = ({ onStartPitch }: PitchHeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-st-cyan rounded-full opacity-20" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-st-navy rounded-full opacity-10" />
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-st-cyan rounded-full opacity-30" />
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-st-navy rounded-full opacity-15" />
        <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-st-cyan rounded-full opacity-25" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-st-navy mb-8 leading-none">
            Have an app idea?<br />
            Pitch it. Let&apos;s build it together.
          </h1>
          
          <div className="h-20 flex items-center justify-center mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-st-gray-600 max-w-4xl">
              Pick cash plus equity or equity-only.<br />
              We only build ideas with proof.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={onStartPitch}
              className="bg-st-navy text-white px-8 py-4 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold text-lg"
            >
              Start Your Pitch
            </button>
          </div>

          {/* Process Preview */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Pitch Your Idea',
                description: 'Tell us about your vision, market, and commitment level'
              },
              {
                step: '02', 
                title: 'Get Scored & Priced',
                description: 'Instant assessment with custom package and next steps'
              },
              {
                step: '03',
                title: 'Validate & Build',
                description: 'Market test first, then build with confidence'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-st-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-st-navy font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-st-navy mb-2">{item.title}</h3>
                <p className="text-st-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-st-navy rounded-full flex justify-center">
          <div className="w-1 h-3 bg-st-navy rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default PitchHero