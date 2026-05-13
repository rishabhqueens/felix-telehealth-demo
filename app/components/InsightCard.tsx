'use client'

interface InsightCardProps {
  text: string
  type?: 'info' | 'warning' | 'positive'
}

const CONFIG = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="#3b82f6" strokeWidth="1.3" />
        <path d="M7 6.5v3.5M7 4.5v.5" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    label: 'Clinical insight',
    labelColor: 'text-blue-500',
    text: 'text-blue-900',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconBg: 'bg-amber-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2L13 12H1L7 2z" stroke="#f59e0b" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 6v2.5M7 10v.5" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    label: 'Good to know',
    labelColor: 'text-amber-600',
    text: 'text-amber-900',
  },
  positive: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconBg: 'bg-emerald-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="#10b981" strokeWidth="1.3" />
        <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Noted',
    labelColor: 'text-emerald-600',
    text: 'text-emerald-900',
  },
}

export function InsightCard({ text, type = 'info' }: InsightCardProps) {
  const c = CONFIG[type]

  return (
    <div
      className={`animate-fade-in-up mt-4 rounded-2xl border px-5 py-4 ${c.bg} ${c.border}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${c.iconBg}`}>
          {c.icon}
        </span>
        <span className={`text-xs font-semibold uppercase tracking-wider ${c.labelColor}`}>
          {c.label}
        </span>
      </div>
      <p className={`text-sm leading-relaxed ${c.text}`}>{text}</p>
    </div>
  )
}
