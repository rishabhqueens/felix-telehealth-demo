'use client'

import { useState, useEffect, useRef } from 'react'
import { QUESTIONS, Answers } from '../data/questions'
import { ProgressHeader } from './ProgressHeader'
import { SectionBadge } from './SectionBadge'

interface QuestionnaireProps {
  onComplete: (answers: Answers) => void
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [pendingSingle, setPendingSingle] = useState<string | null>(null)
  const [multiSelected, setMultiSelected] = useState<string[]>([])
  const [metrics, setMetrics] = useState({ feet: '', inches: '', weight: '' })
  const [animKey, setAnimKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const q = QUESTIONS[currentIndex]

  useEffect(() => {
    const existing = answers[q.id]
    if (q.type === 'multi' && Array.isArray(existing)) {
      setMultiSelected(existing)
    } else {
      setMultiSelected([])
    }
    setPendingSingle(q.type === 'single' ? ((existing as string) || null) : null)
    if (q.type === 'metrics' && existing) {
      setMetrics(existing as { feet: string; inches: string; weight: string })
    }
    setAnimKey(k => k + 1)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  function navigate(dir: 1 | -1) {
    const next = currentIndex + dir
    if (next < 0) return
    if (next >= QUESTIONS.length) {
      onComplete(answers)
      return
    }
    setCurrentIndex(next)
  }

  function handleSingleSelect(option: string) {
    setAnswers(prev => ({ ...prev, [q.id]: option }))
    setPendingSingle(option)
    setTimeout(() => navigate(1), 500)
  }

  function toggleMulti(option: string) {
    setMultiSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    )
  }

  function handleMultiContinue(noneSelected = false) {
    setAnswers(prev => ({ ...prev, [q.id]: noneSelected ? [] : multiSelected }))
    navigate(1)
  }

  function handleMetricsContinue() {
    setAnswers(prev => ({ ...prev, [q.id]: metrics }))
    navigate(1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f3ef]">
      <ProgressHeader currentIndex={currentIndex} onBack={() => navigate(-1)} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div key={animKey} className="animate-fade-in-up mx-auto max-w-2xl px-4 py-10">
          <SectionBadge section={q.section} />

          <h1 className="text-3xl font-bold leading-tight text-[#1a1a1a] mb-3">
            {q.title}
          </h1>
          <p className="text-base text-gray-500 mb-8 leading-relaxed">{q.subtitle}</p>

          {/* ── SINGLE SELECT ── */}
          {q.type === 'single' && (
            <div className="space-y-3">
              {q.options?.map(option => (
                <button
                  key={option}
                  onClick={() => !pendingSingle && handleSingleSelect(option)}
                  className={`w-full flex items-center justify-between rounded-xl border bg-white px-5 py-4 text-left text-base font-medium transition-all duration-200
                    ${pendingSingle === option
                      ? 'border-[#1a1a1a] bg-[#f0efeb] ring-1 ring-[#1a1a1a] shadow-sm'
                      : pendingSingle
                      ? 'border-[#e2e0db] opacity-40 cursor-default'
                      : 'border-[#e2e0db] hover:border-gray-400 hover:shadow-sm cursor-pointer'
                    }`}
                >
                  <span>{option}</span>
                  {pendingSingle === option ? (
                    <span className="h-5 w-5 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-gray-300">
                      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* ── MULTI SELECT ── */}
          {q.type === 'multi' && (
            <div>
              <div className="space-y-2.5">
                {q.options?.map(option => {
                  const checked = multiSelected.includes(option)
                  return (
                    <button
                      key={option}
                      onClick={() => toggleMulti(option)}
                      className={`w-full flex items-center justify-between rounded-xl border bg-white px-5 py-4 text-left text-base transition-all duration-150
                        ${checked
                          ? 'border-[#1a1a1a] bg-[#f0efeb] ring-1 ring-[#1a1a1a] shadow-sm'
                          : 'border-[#e2e0db] hover:border-gray-400 hover:shadow-sm'
                        }`}
                    >
                      <span className="font-medium">{option}</span>
                      <span className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0
                        ${checked ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 bg-white'}`}
                      >
                        {checked && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 space-y-3">
                {multiSelected.length > 0 && (
                  <button
                    onClick={() => handleMultiContinue(false)}
                    className="w-full rounded-xl bg-[#1a1a1a] py-4 text-center font-semibold text-white hover:bg-[#2a2a2a] transition-colors"
                  >
                    Continue ({multiSelected.length} selected)
                  </button>
                )}
                <button
                  onClick={() => handleMultiContinue(true)}
                  className={`w-full rounded-xl py-4 text-center font-semibold transition-colors
                    ${multiSelected.length === 0
                      ? 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
                      : 'bg-[#f0efeb] text-gray-600 hover:bg-[#e8e5e0] border border-[#e2e0db]'
                    }`}
                >
                  None of these apply
                </button>
              </div>
            </div>
          )}

          {/* ── METRICS ── */}
          {q.type === 'metrics' && (
            <div>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">How tall are you?</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="5"
                      value={metrics.feet}
                      onChange={e => setMetrics({ ...metrics, feet: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e0db] bg-white px-4 py-4 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="11"
                      value={metrics.inches}
                      onChange={e => setMetrics({ ...metrics, inches: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e0db] bg-white px-4 py-4 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">in</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">How much do you currently weigh?</p>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="150"
                    value={metrics.weight}
                    onChange={e => setMetrics({ ...metrics, weight: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e0db] bg-white px-4 py-4 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">lbs</span>
                </div>
              </div>

              <button
                onClick={handleMetricsContinue}
                disabled={!metrics.feet || !metrics.weight}
                className="w-full rounded-xl bg-[#1a1a1a] py-4 text-center font-semibold text-white hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
