'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FelixLogo } from './FelixLogo'
import { Answers } from '../data/questions'
import { TreatmentPage } from './TreatmentPage'
import { PeerGuidesPage } from './PeerGuidesPage'
import { ReadmePage } from './ReadmePage'

interface DashboardProps {
  answers: Answers
}

type DashTab = 'Home' | 'Care' | 'Shop' | 'Peer Guides' | 'README'
type View = 'home' | 'treatment'

export function Dashboard({ answers }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashTab>('Home')
  const [view, setView] = useState<View>('home')

  if (view === 'treatment') {
    return <TreatmentPage answers={answers} onBack={() => setView('home')} />
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      {/* Nav — matches home.png exactly */}
      <nav className="flex items-center justify-between bg-[#f5f3ef] px-6 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-1">
          {/* Logo */}
          <div className="mr-4">
            <FelixLogo className="text-2xl" />
          </div>
          {/* Nav tabs */}
          {([
            { id: 'Home', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 7.5L8 1l7 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 7v7a.5.5 0 00.5.5h3.5v-3.5h3V14.5H13a.5.5 0 00.5-.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )},
            { id: 'Care', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 018 3a3.5 3.5 0 016 2c0 4-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            )},
            { id: 'Shop', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5.5 5V4a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )},
            { id: 'Peer Guides', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 13.5c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M12 10.5c1.66 0 3 1.34 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            )},
            { id: 'README', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="1.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M4.5 5.5h5M4.5 8h5M4.5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )},
          ] as { id: DashTab; icon: React.ReactNode }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-white text-[#1a1a1a] shadow-sm border border-[#e2e0db]'
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab.icon}
              {tab.id}
              {(tab.id === 'Peer Guides' || tab.id === 'README') && (
                <span className="animate-badge-pop ml-0.5 rounded-full bg-[#e8431a] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white leading-none">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Earn rewards */}
          <button className="flex items-center gap-2 rounded-full border border-[#e2e0db] bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white">R</span>
            Earn rewards
          </button>
          {/* Account */}
          <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3.5 17c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Account
          </button>
        </div>
      </nav>

      {/* Peer Guides full page */}
      {activeTab === 'Peer Guides' && <PeerGuidesPage />}

      {/* README tab */}
      {activeTab === 'README' && <ReadmePage />}

      {/* Page content */}
      {activeTab !== 'Peer Guides' && activeTab !== 'README' && <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8">
          Welcome back, RISHABH
        </h1>

        {/* Care section */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#1a1a1a] mb-3">Care</h2>

          {/* Weight Loss card */}
          <div className="rounded-2xl bg-white border border-[#e2e0db] overflow-hidden">
            <button
              onClick={() => setView("treatment")}
              className="w-full flex items-center justify-between px-5 py-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Felix "fx" logo mark */}
                <span className="text-[#e8431a] font-bold text-lg leading-none">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                    <text x="0" y="16" fontSize="18" fontWeight="bold" fill="#e8431a" fontFamily="system-ui">fx</text>
                  </svg>
                </span>
                <span className="text-base font-semibold text-[#1a1a1a]">Weight Loss</span>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e0db]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {/* Ready banner */}
            <div className="border-t border-[#f0ede8] mx-0 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#faf9f7]">
              <p className="text-sm text-gray-600">Your personalised treatment recommendation is ready.</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setView("home")}
                  className="rounded-full border border-[#e2e0db] bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <div className="relative">
                  {/* Pulsing ring around CTA */}
                  <div className="absolute inset-0 rounded-full bg-[#1a1a1a] animate-click-ring" />
                  <button
                    onClick={() => setView("treatment")}
                    className="relative rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a2a2a] animate-glow-pulse"
                  >
                    View recommendation ✦
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Explore treatments */}
          <button className="mt-3 w-full rounded-2xl bg-white border border-[#e2e0db] px-5 py-4 text-sm font-medium text-gray-600 text-center hover:bg-gray-50 transition-colors">
            Explore treatments
          </button>
        </section>

        {/* Shop section */}
        <section>
          <h2 className="text-base font-semibold text-[#1a1a1a] mb-3">Shop</h2>
          <div className="rounded-2xl bg-white border border-[#e2e0db] overflow-hidden" style={{ minHeight: 200 }}>
            <div className="flex items-center justify-center py-16">
              <Image
                src="/semaglutide.png"
                alt="Medications"
                width={200}
                height={160}
                className="object-contain opacity-80"
              />
            </div>
          </div>
        </section>
      </div>}
    </div>
  )
}
