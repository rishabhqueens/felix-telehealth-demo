'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PeerGuide } from '../data/peerGuides'

interface PeerGuideModalProps {
  guide: PeerGuide
  onClose: () => void
}

type ModalTab = 'journey' | 'question'

function JourneyTab({ guide }: { guide: PeerGuide }) {
  return (
    <div className="space-y-6">
      {/* Time in care pill */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f3ef] px-3 py-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.2" />
          <path d="M6 3.5V6l1.5 1.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-gray-500">{guide.timeInCare} in care</span>
      </div>

      {/* Narrative sections */}
      {[
        { label: 'My starting point', body: guide.journey.startingPoint },
        { label: 'What I was worried about', body: guide.journey.worries },
        { label: 'How the Felix process felt', body: guide.journey.process },
        { label: 'What changed for me', body: guide.journey.changed },
        { label: "What I'd tell someone considering it", body: guide.journey.advice },
      ].map(({ label, body }) => (
        <div key={label}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
        </div>
      ))}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 leading-relaxed border-t border-[#f0ede8] pt-4">
        Peer Guides are included to help prospective users better understand the emotional and practical side of the Felix care journey. For medical or treatment-related questions, contact the Felix care team.
      </p>
    </div>
  )
}

function QuestionTab({ guide }: { guide: PeerGuide }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', question: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ede8]">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11l5 5 9-9" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[#1a1a1a] mb-2">Thanks — your question has been sent to the Felix team.</p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">We&apos;ll review your message and follow up with more information where appropriate.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Have a question after reading {guide.name}&apos;s story? Submit it here and the Felix team can follow up with more information about the care journey.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">First name</label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              className="w-full rounded-xl border border-[#e2e0db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-gray-400"
              placeholder="First"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Last name</label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className="w-full rounded-xl border border-[#e2e0db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-gray-400"
              placeholder="Last"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl border border-[#e2e0db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-gray-400"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Your question</label>
          <textarea
            required
            rows={4}
            value={form.question}
            onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
            className="w-full rounded-xl border border-[#e2e0db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-gray-400 resize-none"
            placeholder="What would you like to know..."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-[#1a1a1a] py-3 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors"
        >
          Send question
        </button>
        <p className="text-xs text-gray-400 text-center">
          Peer Guides do not provide medical advice. Questions are reviewed by the Felix team.
        </p>
      </form>
    </div>
  )
}

export function PeerGuideModal({ guide, onClose }: PeerGuideModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('journey')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
        {/* Photo header */}
        {guide.avatar && (
          <div className="relative h-36 w-full rounded-t-2xl overflow-hidden shrink-0">
            <Image src={guide.avatar} alt={guide.name} fill className="object-cover object-top" sizes="512px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-5">
              <p className="text-lg font-bold text-white">{guide.name}, {guide.age}</p>
              <p className="text-xs text-white/80">{guide.roleSummary}</p>
            </div>
          </div>
        )}

        {/* Header (no photo fallback) */}
        {!guide.avatar && (
          <div className="flex items-start gap-4 px-6 pt-6 pb-4 shrink-0">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${guide.avatarColor}`}>
              <span className="text-sm font-bold text-[#1a1a1a]">{guide.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-[#1a1a1a]">{guide.name}, {guide.age}</p>
              <p className="text-xs text-gray-500 leading-snug">{guide.roleSummary}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e0db] text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[#e2e0db] px-6 shrink-0">
          {(['journey', 'question'] as ModalTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-6 pb-3 text-sm font-medium transition-colors border-b-2 -mb-px
                ${activeTab === tab
                  ? 'border-[#1a1a1a] text-[#1a1a1a]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
            >
              {tab === 'journey' ? 'Journey' : 'Ask a Question'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {activeTab === 'journey' ? (
            <JourneyTab guide={guide} />
          ) : (
            <QuestionTab guide={guide} />
          )}
        </div>
      </div>
    </div>
  )
}
