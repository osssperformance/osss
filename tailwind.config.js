/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'st-navy': '#0a1e32',
        'st-cyan': '#00ffff',
        'st-white': '#ffffff',
        'st-gray-100': '#F8F9FA',
        'st-gray-200': '#E9ECEF',
        'st-gray-400': '#6C757D',
        'st-gray-800': '#1A2332',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(10, 30, 50, 0.08)',
        'md': '0 4px 20px rgba(10, 30, 50, 0.12)',
        'lg': '0 8px 40px rgba(10, 30, 50, 0.16)',
      },
      transitionDuration: {
        'base': '300ms',
        'slow': '500ms',
      },
      fontFamily: {
        'reddit': ['Reddit Sans Condensed', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}