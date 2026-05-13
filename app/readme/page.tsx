import Link from 'next/link'
import { FelixLogo } from '../components/FelixLogo'
import { ReadmePage } from '../components/ReadmePage'

export default function ReadmeRoute() {
  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <header className="flex items-center justify-between border-b border-[#e2e0db] px-8 py-5">
        <FelixLogo className="text-2xl" />
        <Link
          href="/"
          className="rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors"
        >
          ← Back to prototype
        </Link>
      </header>
      <ReadmePage />
    </div>
  )
}
