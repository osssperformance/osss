'use client'

import Image from 'next/image'
import { Author } from '@/types/blog'

interface AuthorBioProps {
  author: Author
  publishedAt: string
}

const AuthorBio = ({ author, publishedAt }: AuthorBioProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-st-gray-100 rounded-2xl p-8">
      <div className="flex items-start gap-6">
        {/* Author Avatar */}
        <div className="w-20 h-20 bg-st-cyan rounded-full flex items-center justify-center flex-shrink-0">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-st-navy font-bold text-2xl">
              {author.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-st-navy mb-1">
                {author.name}
              </h3>
              {author.role && (
                <p className="text-st-cyan font-medium text-sm">
                  {author.role}
                </p>
              )}
            </div>
            <div className="text-st-gray-400 text-sm mt-2 sm:mt-0">
              Published {formatDate(publishedAt)}
            </div>
          </div>

          {author.bio && (
            <p className="text-st-gray-400 leading-relaxed">
              {author.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://twitter.com/spencertoogood"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-st-gray-400 hover:text-st-cyan hover:bg-st-cyan hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/spencertoogood"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-st-gray-400 hover:text-st-cyan hover:bg-st-cyan hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:hello@spencertoogood.com"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-st-gray-400 hover:text-st-cyan hover:bg-st-cyan hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio