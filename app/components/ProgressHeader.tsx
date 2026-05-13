'use client'

import { FelixLogo } from './FelixLogo'
import { QUESTIONS, SECTIONS } from '../data/questions'

const SECTION_DESCRIPTIONS: Record<string, string> = {
  'Your goals':       'Helps us understand what success looks like for you personally.',
  'Lifestyle':        'Helps us recommend an approach that fits into your real daily routine.',
  'Medical history':  'Helps us identify which treatments are safe and most effective for you.',
  'Past attempts':    'Helps us build on what you\'ve already tried — not repeat it.',
  'Body metrics':     'Helps us calculate eligibility and find the most appropriate care path.',
  'Lab readiness':    'Some treatments require baseline labs — we want to know what you have.',
}

interface ProgressHeaderProps {
  currentIndex: number
  onBack: () => void
}

export function ProgressHeader({ currentIndex, onBack }: ProgressHeaderProps) {
  const q = QUESTIONS[currentIndex]
  const currentSectionIdx = SECTIONS.indexOf(q.section)
  const totalQuestions = QUESTIONS.length
  const overallPct = Math.round((currentIndex / totalQuestions) * 100)

  const sectionCounts = SECTIONS.map(s => QUESTIONS.filter(q => q.section === s).length)
  const totalQ = QUESTIONS.length

  let cumulative = 0
  const sectionFills = SECTIONS.map((s, i) => {
    const count = sectionCounts[i]
    const sectionStart = cumulative
    cumulative += count
    if (currentIndex <= sectionStart) return 0
    if (currentIndex >= sectionStart + count) return 1
    return (currentIndex - sectionStart) / count
  })

  return (
    <header className="bg-[#f5f3ef] border-b border-[#e8e5e0]">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="w-24">
          <FelixLogo className="text-2xl" />
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white border border-[#e2e0db] px-3 py-1.5 shadow-sm text-sm text-gray-600">
          <button
            onClick={onBack}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-0.5"
            aria-label="Go back"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-medium text-[#1a1a1a]">{overallPct}% complete</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-500">Q{currentIndex + 1} of {totalQuestions}</span>
        </div>

        <div className="w-24 flex justify-end">
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7.5 5v.5M7.5 7.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Help
          </button>
        </div>
      </div>

      {/* Section card */}
      <div className="px-6 pb-4">
        <div className="rounded-xl bg-white border border-[#e2e0db] shadow-sm px-5 py-4">
          {/* Segment bars */}
          <div className="flex gap-1.5 mb-4">
            {SECTIONS.map((section, i) => {
              const fill = sectionFills[i]
              const isActive = i === currentSectionIdx
              const isDone = fill === 1
              const weight = sectionCounts[i] / totalQ

              return (
                <div key={section} className="flex flex-col gap-1.5" style={{ flex: weight * 10 }}>
                  {/* Section dot */}
                  <div className="flex items-center gap-1">
                    <div className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors
                      ${isDone ? 'bg-[#e8431a]' : isActive ? 'bg-[#1a1a1a]' : 'bg-[#d4d1cb]'}`}
                    />
                    <span className={`text-[9px] font-semibold uppercase tracking-wider truncate transition-colors
                      ${isActive ? 'text-[#1a1a1a]' : isDone ? 'text-[#e8431a]' : 'text-[#c4c1bc]'}`}
                    >
                      {isDone ? '✓' : section}
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="h-1 rounded-full bg-[#ece9e4] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${fill * 100}%`,
                        background: isDone ? '#e8431a' : '#1a1a1a',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Current section info */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Section {currentSectionIdx + 1} of {SECTIONS.length}
              </p>
              <p className="text-sm font-bold text-[#1a1a1a]">{q.section}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                {SECTION_DESCRIPTIONS[q.section]}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xs text-gray-400">
                {q.sectionIndex}/{q.totalInSection}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
