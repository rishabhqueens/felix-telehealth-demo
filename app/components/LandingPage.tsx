'use client'

import Image from 'next/image'
import { FelixLogo } from './FelixLogo'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-gray-100 px-8 py-4">
        <div className="text-3xl font-bold">
          <FelixLogo className="text-3xl" />
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {['Treatments', 'Medications', 'Labs', 'Learn'].map(item => (
            <button key={item} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              {item}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Search
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 19c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 pt-14 pb-4">
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-5 leading-tight">
          Treatment, on-demand
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-10">
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L8 1z" stroke="#e8431a" strokeWidth="1.2" fill="none" />
            </svg>
            Trusted by over 1.5 million Canadians
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="#e8431a" strokeWidth="1.2" />
              <path d="M5 8l2 2 4-4" stroke="#e8431a" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Licensed Canadian practitioners
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2l2 4h4l-3 2.5 1 4L8 10l-4 2.5 1-4L2 6h4L8 2z" stroke="#e8431a" strokeWidth="1.2" fill="none" />
            </svg>
            Direct insurance billing
          </span>
        </div>

        {/* Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
          {/* Weight Loss — primary */}
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{ height: 340 }}
            onClick={onStart}
          >
            <Image
              src="/homepage-2.avif"
              alt="Weight loss"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-white text-lg font-semibold">Weight loss</span>
            </div>

            {/* Click-here signal */}
            <div className="absolute top-4 right-4 flex flex-col items-center gap-1.5">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-8 w-8 rounded-full bg-[#e8431a] animate-click-ring" />
                <div className="h-8 w-8 rounded-full bg-[#e8431a] flex items-center justify-center shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v8M4 7l3 3 3-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="rounded-full bg-[#e8431a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow animate-bounce-down">
                Start here
              </span>
            </div>

            <div className="absolute bottom-4 left-4">
              <button className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                Free visit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Erectile Dysfunction */}
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{ height: 340 }}
          >
            <Image
              src="/erectile.avif"
              alt="Erectile Dysfunction"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-white text-lg font-semibold">Erectile Dysfunction</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <button className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                Free visit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Longevity */}
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{ height: 340 }}
          >
            <Image
              src="/homepage-3.avif"
              alt="Longevity"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-white text-lg font-semibold">Longevity</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <button className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                Now $299
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-16 border-t border-gray-100 py-10 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-gray-500">
          {[
            { icon: '🏥', text: 'Licensed practitioners across Canada' },
            { icon: '🔒', text: 'Private & confidential consultations' },
            { icon: '💊', text: 'Medications delivered to your door' },
            { icon: '⭐', text: '4.8/5 from over 50,000 reviews' },
          ].map(item => (
            <div key={item.text} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="leading-snug">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
