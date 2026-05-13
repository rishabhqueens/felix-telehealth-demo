'use client'

interface SectionBadgeProps {
  section: string
}

const SECTION_ICONS: Record<string, string> = {
  'Your goals': '🎯',
  'Lifestyle': '🌿',
  'Medical history': '🏥',
  'Past attempts': '📋',
  'Body metrics': '📏',
  'Lab readiness': '🔬',
}

export function SectionBadge({ section }: SectionBadgeProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm">{SECTION_ICONS[section] || '📝'}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {section}
      </span>
    </div>
  )
}
