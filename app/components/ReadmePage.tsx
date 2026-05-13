const FEATURES = [
  {
    tag: 'Onboarding',
    tagStyle: 'bg-orange-100 text-orange-600',
    title: 'Tagged question buckets',
    lines: [
      "Patients completing health intake forms often feel interrogated — a long list of unrelated questions increases drop-off.",
      "We grouped questions into labelled sections (About you, Your goals, Medical history) to give the flow a clear rhythm.",
      "Each section feels purposeful. Patients understand the structure before they start answering.",
    ],
    where: 'Questionnaire — labelled question sections',
  },
  {
    tag: 'Community',
    tagStyle: 'bg-blue-100 text-blue-600',
    title: 'Peer Guides tab',
    lines: [
      "Before committing to a prescription, many patients want social proof from someone who has been through the same journey — not just clinical data.",
      "We built a dedicated tab connecting active patients with verified peer guides who have completed the weight loss program.",
      "Reduces pre-purchase anxiety and builds trust through lived experience, not marketing copy.",
    ],
    where: 'Dashboard → Peer Guides tab',
  },
  {
    tag: 'Clarity',
    tagStyle: 'bg-violet-100 text-violet-600',
    title: 'Treatment Timeline',
    lines: [
      "Patients abandon treatment funnels when next steps are vague — the 'what happens after I pay?' question is a major drop-off point.",
      "We added a horizontal milestone tracker on the Treatment page showing every step from assessment to medication delivery.",
      "Patients always know exactly where they are and what comes next, reducing anxiety-driven abandonment.",
    ],
    where: 'Treatment page → "Your care journey" card',
  },
  {
    tag: 'Conversion',
    tagStyle: 'bg-emerald-100 text-emerald-700',
    title: 'PDF order summary',
    lines: [
      "Adjacent platforms like Jane and Fullscript already offer shareable treatment summaries. Many patients — especially those from communities where seeking a second opinion is the norm — want to share their prescription before ordering.",
      "We built a downloadable PDF summary of the recommended treatment, generated once the practitioner approves.",
      "Makes the 'second opinion before ordering' workflow effortless, removing a key conversion blocker.",
    ],
    where: 'Treatment page → Continue → order summary',
  },
]

export function ReadmePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Intro */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#e8431a] mb-2">Prototype README</p>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-3">Felix Weight Loss Funnel</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Weight loss treatment is high-stakes and high-anxiety. We prototyped four UX changes to test whether better information design — not more features — can move patients from curiosity to commitment.
        </p>
      </div>

      {/* Cards — 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-white border border-[#e2e0db] p-5 flex flex-col"
          >
            {/* Tag */}
            <span className={`self-start rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-3 ${f.tagStyle}`}>
              {f.tag}
            </span>

            {/* Title */}
            <p className="text-base font-bold text-[#1a1a1a] mb-3 leading-snug">{f.title}</p>

            {/* Body lines */}
            <div className="space-y-2 flex-1">
              {f.lines.map((line, i) => (
                <p key={i} className="text-xs text-gray-500 leading-relaxed">{line}</p>
              ))}
            </div>

            {/* Location */}
            <p className="mt-4 pt-3 border-t border-[#f0ede8] text-[10px] text-gray-400 font-medium">
              {f.where}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-gray-400">Built with Claude Code · April 2026</p>
    </div>
  )
}
