'use client'

import Image from 'next/image'
import { PeerGuide } from '../data/peerGuides'

interface PeerGuideCardProps {
  guide: PeerGuide
  onClick: () => void
}

export function PeerGuideCard({ guide, onClick }: PeerGuideCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white border border-[#e2e0db] overflow-hidden hover:shadow-sm hover:border-gray-300 transition-all group"
    >
      {/* Photo / avatar */}
      <div className={`relative h-40 w-full ${!guide.avatar ? guide.avatarColor : 'bg-gray-100'}`}>
        {guide.avatar ? (
          <Image
            src={guide.avatar}
            alt={guide.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-bold text-[#1a1a1a]">{guide.initials}</span>
          </div>
        )}
      </div>

      <div className="px-5 py-4">
        {/* Name + age */}
        <p className="text-base font-bold text-[#1a1a1a] mb-1">
          {guide.name}, {guide.age}
        </p>

        {/* Role summary */}
        <p className="text-xs text-gray-500 leading-snug mb-3">{guide.roleSummary}</p>

        {/* Hook */}
        <p className="text-sm italic text-gray-600 leading-relaxed mb-4">{guide.hook}</p>

        {/* CTA */}
        <span className="text-xs font-medium text-[#1a1a1a] group-hover:underline">
          Read story →
        </span>
      </div>
    </button>
  )
}
