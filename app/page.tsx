'use client'

import { useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { Questionnaire } from './components/Questionnaire'
import { LoadingState } from './components/LoadingState'
import { Dashboard } from './components/Dashboard'
import { Answers } from './data/questions'

type Screen = 'landing' | 'questionnaire' | 'loading' | 'dashboard'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [answers, setAnswers] = useState<Answers>({})

  function handleQuestionnaireComplete(a: Answers) {
    setAnswers(a)
    setScreen('loading')
  }

  if (screen === 'landing') {
    return <LandingPage onStart={() => setScreen('questionnaire')} />
  }

  if (screen === 'questionnaire') {
    return <Questionnaire onComplete={handleQuestionnaireComplete} />
  }

  if (screen === 'loading') {
    return <LoadingState onComplete={() => setScreen('dashboard')} />
  }

  return <Dashboard answers={answers} />
}
