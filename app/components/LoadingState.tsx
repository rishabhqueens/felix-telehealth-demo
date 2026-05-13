'use client'

import { useEffect, useState } from 'react'
import { FelixLogo } from './FelixLogo'

const MESSAGES = [
  'Reviewing your health profile...',
  'Matching treatment options...',
  'Analysing your medical history...',
  'Preparing your care preview...',
  'Almost ready...',
]

interface LoadingStateProps {
  onComplete: () => void
}

export function LoadingState({ onComplete }: LoadingStateProps) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i < MESSAGES.length) {
        setMsgIndex(i)
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 400)
      }
    }, 700)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f3ef]">
      <div className="mb-12 text-3xl">
        <FelixLogo className="text-4xl" />
      </div>

      <div className="relative mb-8 h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1a1a1a] animate-spin"
        />
      </div>

      <div className="h-8 text-center">
        <p
          key={msgIndex}
          className="animate-fade-in text-base text-gray-500"
        >
          {MESSAGES[msgIndex]}
        </p>
      </div>
    </div>
  )
}
