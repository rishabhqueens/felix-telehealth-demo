'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FelixLogo } from './FelixLogo'
import { Answers, computeRecommendation } from '../data/questions'
import { JourneyTrackerCard } from './JourneyTrackerCard'
import { JOURNEY_VARIANTS, buildSteps } from '../data/journey'

interface TreatmentPageProps {
  answers: Answers
  onBack: () => void
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#f0ede8] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#1a1a1a] hover:opacity-80 transition-opacity"
      >
        {title}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-500 leading-relaxed animate-fade-in-up">
          {children}
        </div>
      )}
    </div>
  )
}

const MEDICATIONS = [
  {
    id: 'semaglutide',
    name: 'Ozempic or Wegovy',
    subtitle: 'Semaglutide',
    image: '/semaglutide.png',
    priceFrom: '$312',
    pricePer: '$325 per pen (typically lasts a month)',
    badge: 'Recommended',
    benefits: [
      'Reduces cravings',
      'Helps regulate blood sugar levels',
      'Helps maintain feelings of fullness',
      'Often covered by insurance',
    ],
    description: "Semaglutide supports weight loss by mimicking a hormone that helps regulate appetite and insulin. It works by making you feel fuller for longer and by enhancing your body's insulin response.",
    clinical: 'Patients who took injectable semaglutide and made lifestyle changes lost a mean of 15% of their body weight over 68 weeks in a clinical trial.',
    medication: "Ozempic and Wegovy are two brand names of semaglutide, and are chemically identical. The pharmacy will determine which brand to dispense to minimise cost. Semaglutide works by mimicking hormones that slow digestion, decrease appetite, food intake, and cravings, while maintaining feelings of fullness.",
    howToTake: [
      { step: 1, title: 'Prepare', desc: 'Wash your hands and prepare your injection pen to the correct dose. Clean and dry the injection area with soap and water.' },
      { step: 2, title: 'Inject', desc: 'Insert the needle. Press and hold down the dose button. After the dose counter reaches 0, slowly count to 6.' },
      { step: 3, title: 'Store or dispose', desc: 'Remove the needle and store it as specified in your medication kit. If your pen is empty, dispose of it in the medical sharps container provided.' },
    ],
    sideEffects: 'Like all medications, semaglutide injections may cause side effects. Common side effects include nausea, vomiting, constipation, diarrhoea, and acid reflux. These typically resolve within a couple of weeks.',
  },
  {
    id: 'tirzepatide',
    name: 'Mounjaro or Zepbound',
    subtitle: 'Tirzepatide',
    image: '/tirzepatide.jpg',
    priceFrom: '$350',
    pricePer: '$391 per pen',
    badge: null,
    benefits: ['Dual GIP and GLP-1 receptor agonist', 'May produce greater weight loss than semaglutide', 'Weekly injection'],
    description: 'Tirzepatide is a dual receptor agonist that targets both GIP and GLP-1 pathways, which may produce more significant weight loss than semaglutide alone.',
    clinical: 'In clinical trials, tirzepatide produced up to 22.5% mean body weight reduction over 72 weeks.',
    medication: '',
    howToTake: [],
    sideEffects: 'Common side effects include nausea, diarrhoea, vomiting, and constipation, particularly when starting treatment or increasing dose.',
  },
  {
    id: 'rybelsus',
    name: 'Rybelsus',
    subtitle: 'Oral Semaglutide',
    image: '/rybelsus.jpg',
    priceFrom: 'First month free',
    pricePer: 'then $322/mo',
    badge: null,
    benefits: ['Daily oral tablet — no injection needed', 'Same mechanism as injectable semaglutide', 'Good for injection-averse patients'],
    description: 'Rybelsus is an oral form of semaglutide — the same active ingredient as Ozempic — taken as a daily tablet. It offers the same appetite-regulating benefits without injections.',
    clinical: '',
    medication: '',
    howToTake: [],
    sideEffects: 'Similar to injectable semaglutide: nausea, vomiting, and diarrhoea are most common, especially when starting.',
  },
  {
    id: 'contrave',
    name: 'Contrave',
    subtitle: 'Naltrexone / Bupropion',
    image: '/contrave.jpg',
    priceFrom: '$399',
    pricePer: 'per package',
    badge: null,
    benefits: ['Oral tablet — twice daily', 'Targets reward pathways to reduce cravings', 'Different mechanism to GLP-1s'],
    description: 'Contrave combines two medications that work on the brain\'s reward and hunger systems to help reduce appetite and food cravings.',
    clinical: '',
    medication: '',
    howToTake: [],
    sideEffects: 'Common side effects include nausea, constipation, headache, vomiting, and dizziness. Not suitable for patients with seizure history.',
  },
  {
    id: 'saxenda',
    name: 'Saxenda',
    subtitle: 'Liraglutide',
    image: '/saxenda.jpg',
    priceFrom: '$539',
    pricePer: 'per pen',
    badge: null,
    benefits: ['Daily injection', 'Long track record in weight management', 'May suit patients who need gradual titration'],
    description: 'Saxenda (liraglutide) is a daily GLP-1 receptor agonist injection that helps regulate appetite and food intake.',
    clinical: '',
    medication: '',
    howToTake: [],
    sideEffects: 'Common side effects include nausea, diarrhoea, constipation, vomiting, and headache.',
  },
]

const WHATS_NEXT = [
  { icon: '💬', title: 'Connect with your practitioner', desc: 'Your practitioner will reach out to discuss your treatment.' },
  { icon: '📹', title: 'Verify your BMI', desc: 'You\'ll upload a short video or join a live video visit to make sure you\'re eligible for treatment.' },
  { icon: '📦', title: 'Get fast, free delivery', desc: 'Your treatment will arrive 2–5 days after it\'s been prescribed. Your medication will be kept cold throughout its entire journey.' },
  { icon: '🔬', title: 'Complete your labs', desc: 'Before your renewal, you\'ll need to complete lab testing.' },
  { icon: '⚙️', title: 'Make changes anytime', desc: 'Chat with your practitioner and pause, manage, or cancel your treatment whenever you like.' },
]

export function TreatmentPage({ answers, onBack }: TreatmentPageProps) {
  const rec = computeRecommendation(answers)
  const [selectedMedId, setSelectedMedId] = useState('semaglutide')
  const [demoVariantId, setDemoVariantId] = useState<'A'|'B'|'C'|'D'|'E'>('A')

  // pick recommended med based on profile
  const defaultMed = rec.hasCardio || rec.hasThyroid ? 'contrave'
    : rec.recommendation === 'Oral medication path' ? 'rybelsus'
    : 'semaglutide'

  const primaryMed = MEDICATIONS.find(m => m.id === defaultMed) || MEDICATIONS[0]
  const selectedMed = MEDICATIONS.find(m => m.id === selectedMedId) || primaryMed
  const otherMeds = MEDICATIONS.filter(m => m.id !== selectedMedId)

  const pct = 94
  const circumference = 2 * Math.PI * 10
  const strokeDash = (pct / 100) * circumference

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      {/* Progress header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#f5f3ef] border-b border-[#e8e5e0]">
        <div className="w-24">
          <FelixLogo className="text-2xl" />
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white border border-[#e2e0db] px-3 py-1.5 shadow-sm">
          <button
            onClick={onBack}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-1"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-[#1a1a1a]">Step 1 of 3</span>
            <span className="text-gray-300">·</span>
            <span>Get care</span>
          </div>
          <div className="ml-2 flex items-center gap-1.5">
            <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#e2e0db" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="10" fill="none" stroke="#1a1a1a" strokeWidth="2.5"
                strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <span className="text-sm font-medium text-[#1a1a1a]">{pct}% complete</span>
          </div>
        </div>

        <div className="w-24 flex justify-end">
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7.5 5v.5M7.5 7.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Help
          </button>
        </div>
      </header>

      <div className="max-w-[580px] mx-auto px-4 py-8">

        {/* Hero */}
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4 animate-fade-in-up">
          Meet your treatment
        </h1>

        {/* Demo-only state switcher */}
        <div className="animate-fade-in-up mb-3 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3"
          style={{ animationDelay: '0.03s' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
              🧪 Demo only — preview journey stages
            </p>
            <span className="flex items-center gap-1 text-[10px] text-amber-500 font-medium animate-bounce-down">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v6M2.5 5L5 7.5 7.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Click a stage
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {JOURNEY_VARIANTS.map(v => (
              <button
                key={v.id}
                onClick={() => setDemoVariantId(v.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors
                  ${demoVariantId === v.id
                    ? 'bg-amber-700 text-white'
                    : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-100'
                  }`}
              >
                {v.id} · {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Journey tracker */}
        <div className="animate-fade-in-up mb-4" style={{ animationDelay: '0.06s' }}>
          <JourneyTrackerCard
            key={demoVariantId}
            steps={buildSteps(JOURNEY_VARIANTS.find(v => v.id === demoVariantId)!)}
          />
        </div>

        {/* Primary recommendation card */}
        <div className="animate-fade-in-up rounded-2xl bg-white border border-[#e2e0db] overflow-hidden mb-4"
          style={{ animationDelay: '0.05s' }}>
          <div className="p-5">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                <Image src={selectedMed.image} alt={selectedMed.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  {selectedMed.badge && (
                    <span className="rounded-sm bg-[#eef5ee] text-[#2d7a2d] text-xs font-semibold px-2 py-0.5">
                      {selectedMed.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-[#1a1a1a] leading-tight">{selectedMed.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedMed.subtitle}</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mt-1">
                  Starts at {selectedMed.priceFrom}
                  <span className="text-gray-400 font-normal ml-1 line-through text-xs">
                    {selectedMed.id === 'semaglutide' ? '$325' : ''}
                  </span>
                </p>
                <p className="text-xs text-gray-400">{selectedMed.pricePer}</p>
                {selectedMed.id === 'semaglutide' && (
                  <p className="text-xs text-[#2d7a2d] mt-0.5">InnoviCares discount automatically applied</p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-2 mb-5">
              {selectedMed.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef5ee] shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#2d7a2d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="w-full rounded-xl bg-[#1a1a1a] py-4 text-center text-base font-semibold text-white hover:bg-[#2a2a2a] transition-colors">
              Continue
            </button>
          </div>

          {/* Accordion details */}
          <div className="border-t border-[#f0ede8] px-5">
            <AccordionItem title={`About ${selectedMed.subtitle}`}>
              <p className="mb-3">{selectedMed.description}</p>
              {selectedMed.clinical && (
                <div className="rounded-xl bg-[#f5f3ef] p-4 mb-3">
                  <p className="font-medium text-[#1a1a1a] mb-1 text-xs uppercase tracking-wider">Clinical evidence</p>
                  <p>{selectedMed.clinical}</p>
                  {selectedMed.id === 'semaglutide' && (
                    <div className="mt-3">
                      <Image src="/clinicaltrialGraph.png" alt="Clinical trial graph" width={400} height={160} className="w-full rounded-lg object-contain" />
                    </div>
                  )}
                </div>
              )}
              {selectedMed.medication && <p>{selectedMed.medication}</p>}
            </AccordionItem>

            {selectedMed.howToTake.length > 0 && (
              <AccordionItem title="How to take it">
                <p className="mb-3 text-gray-500 text-xs">Semaglutide is a weekly injection medication administered with an injection pen.</p>
                <div className="space-y-3">
                  {selectedMed.howToTake.map(s => (
                    <div key={s.step} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-bold text-white">
                        {s.step}
                      </span>
                      <div>
                        <p className="font-medium text-[#1a1a1a] mb-0.5">{s.title}</p>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-[#f5f3ef] p-3">
                  <p className="font-medium text-[#1a1a1a] mb-1 text-xs">Tips</p>
                  <p>Inject in the front of your thighs, abdomen, or upper arms. Rotate injection sites weekly to avoid skin irritation.</p>
                </div>
              </AccordionItem>
            )}

            <AccordionItem title="Potential side effects">
              <p>{selectedMed.sideEffects}</p>
              <p className="mt-2">If you have severe symptoms, seek in-person care with your primary care provider or visit an emergency department.</p>
            </AccordionItem>
          </div>
        </div>

        {/* More options */}
        <div className="animate-fade-in-up mb-4" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm font-semibold text-[#1a1a1a] mb-3">More options</h3>
          <div className="space-y-2.5">
            {otherMeds.map(med => (
              <button
                key={med.id}
                onClick={() => setSelectedMedId(med.id)}
                className="w-full flex items-center gap-4 rounded-2xl bg-white border border-[#e2e0db] px-4 py-4 text-left hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                  <Image src={med.image} alt={med.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">{med.name}</p>
                  <p className="text-xs text-gray-400">{med.subtitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-[#1a1a1a]">{med.priceFrom}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[100px]">{med.pricePer}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-300">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Included in your treatment */}
        <div className="animate-fade-in-up mb-6 rounded-2xl bg-white border border-[#e2e0db] overflow-hidden"
          style={{ animationDelay: '0.15s' }}>
          <div className="p-5">
            <h3 className="text-sm font-semibold text-[#1a1a1a] mb-4">Included in your treatment</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                  <Image src="/hcp.webp" alt="Practitioner" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">Practitioner chat</p>
                  <p className="text-xs text-gray-500">You'll be able to chat with your practitioner at any time during your treatment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                  <Image src="/insuranceConcierge.png" alt="Insurance" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">Insurance concierge</p>
                  <p className="text-xs text-gray-500">We'll work with you to maximise your insurance coverage to save you money.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-[#f5f3ef]">
                  <div className="absolute inset-0 flex items-center justify-center text-xl">💬</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">Exceptional customer care</p>
                  <p className="text-xs text-gray-500">For help with billing, shipping, or account issues, our support team is here for you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Satisfaction stat */}
          <div className="border-t border-[#f0ede8] px-5 py-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-[#1a1a1a]">88%</span>
            <p className="text-xs text-gray-500 leading-relaxed">
              When asked, 88% of weight loss patients were very satisfied or satisfied with their experience with Felix.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 pb-8">
          This is a demo prototype. No real medical advice or prescriptions are being provided.
        </p>
      </div>
    </div>
  )
}
