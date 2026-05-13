'use client'

import { useState } from 'react'
import { PEER_GUIDES, PeerGuide } from '../data/peerGuides'
import { PeerGuideCard } from './PeerGuideCard'
import { PeerGuideModal } from './PeerGuideModal'

export function PeerGuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState<PeerGuide | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Peer Guides</h1>
      <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-xl">
        Explore real stories from people who&apos;ve been through the Felix care journey. Learn what they were feeling before starting, what helped them trust the process, and what they&apos;d want others to know.
      </p>

      {/* Disclaimer + context banner */}
      <div className="rounded-xl border border-[#e8e5e0] bg-[#f5f3ef] px-4 py-4 mb-8 space-y-3">
        {/* Care context pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#e2e0db] px-3 py-1 text-xs font-medium text-[#1a1a1a] shadow-sm">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 8.5S1.5 6 1.5 3.5A2.5 2.5 0 015 2a2.5 2.5 0 013.5 1.5c0 2.5-3.5 5-3.5 5z" stroke="#e8431a" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            Weight Loss
          </span>
          <span className="text-xs text-gray-500">— your active care program</span>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Peer Guides shown here are matched to your current care program. As you start new care programs, you&apos;ll see guides from those communities too.
        </p>

        <div className="flex items-start gap-2 border-t border-[#e8e5e0] pt-3">
          <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.1" />
            <path d="M6 5.5v3" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="6" cy="3.8" r="0.6" fill="#9ca3af" />
          </svg>
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="font-medium text-gray-500">Peer Guides share personal experiences only.</span>{' '}
            They do not provide medical advice, treatment recommendations, or eligibility guidance.
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PEER_GUIDES.map(guide => (
          <PeerGuideCard
            key={guide.id}
            guide={guide}
            onClick={() => setSelectedGuide(guide)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedGuide && (
        <PeerGuideModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </div>
  )
}
