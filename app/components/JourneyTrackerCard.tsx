'use client'

import { JourneyStep } from '../data/journey'

interface JourneyTrackerCardProps {
  steps: JourneyStep[]
}

function StepIcon({ status }: { status: JourneyStep['status'] }) {
  if (status === 'complete') {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1a1a] shrink-0">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
  if (status === 'current') {
    return (
      <div className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white shrink-0">
        <div className="h-2 w-2 rounded-full bg-[#1a1a1a]" />
        <div className="absolute inset-[-3px] rounded-full border-2 border-[#1a1a1a] opacity-15 animate-ping" />
      </div>
    )
  }
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-200 bg-white shrink-0" />
  )
}

export function JourneyTrackerCard({ steps }: JourneyTrackerCardProps) {
  const currentStep = steps.find(s => s.status === 'current')

  return (
    <div className="rounded-2xl bg-white border border-[#e2e0db] px-5 pt-5 pb-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Your care journey</p>
      <p className="text-base font-bold text-[#1a1a1a] mb-5">From assessment to delivery</p>

      {/* Horizontal stepper — scrollable on mobile */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-start" style={{ minWidth: 480 }}>
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-start flex-1">
              {/* Step node */}
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <StepIcon status={step.status} />
                <span
                  className={`text-center leading-tight text-[10px] font-medium transition-colors
                    ${step.status === 'complete' ? 'text-[#1a1a1a]' : ''}
                    ${step.status === 'current'  ? 'text-[#1a1a1a] font-bold' : ''}
                    ${step.status === 'upcoming' ? 'text-gray-300' : ''}
                  `}
                  style={{ maxWidth: 56 }}
                >
                  {step.shortLabel}
                </span>
                {step.status === 'complete' && (
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Done</span>
                )}
                {step.status === 'current' && (
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-[#e8431a]">Now</span>
                )}
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 mt-3.5 mx-0.5 h-[2px] w-full flex-1 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#1a1a1a] transition-all duration-500"
                    style={{ width: step.status === 'complete' ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Single current-step description */}
      {currentStep && (
        <p className="mt-4 text-sm text-gray-500 leading-relaxed border-t border-[#f0ede8] pt-4">
          <span className="font-medium text-[#1a1a1a]">{currentStep.label}: </span>
          {currentStep.currentDescription}
        </p>
      )}
    </div>
  )
}
