export interface PeerGuide {
  id: string
  name: string
  age: number
  roleSummary: string
  hook: string
  avatarColor: string // tailwind bg class
  initials: string
  avatar?: string // optional photo path in /public
  timeInCare: string
  journey: {
    startingPoint: string
    worries: string
    process: string
    changed: string
    advice: string
  }
}

export const PEER_GUIDES: PeerGuide[] = [
  {
    id: 'maya',
    name: 'Maya',
    age: 34,
    roleSummary: 'Working professional balancing long hours and inconsistent routines',
    hook: '"I wanted support, but I didn\'t want the process to feel cold or salesy."',
    avatarColor: 'bg-rose-200',
    initials: 'MP',
    avatar: '/maya.jpg',
    timeInCare: '8 months',
    journey: {
      startingPoint: 'Before Felix, I felt like I had been stuck in the same cycle for years. I would start strong, try to be disciplined for a few weeks, and then fall off once work became stressful. It wasn\'t just about weight for me — it was the mental fatigue of always feeling like I was starting over.',
      worries: 'I was nervous that an online process would feel impersonal. I also didn\'t fully understand why I had to pay a visit fee before knowing whether I would be approved, which made me hesitate at first.',
      process: 'What helped me most was understanding that there were actual steps behind the scenes and that someone was reviewing my case. Once I understood the process better, it felt less like a checkout flow and more like a care journey.',
      changed: 'The biggest shift was emotional. I stopped feeling like I had to do everything perfectly from day one. I started to think more in terms of consistency instead of guilt.',
      advice: 'If you\'re unsure, it helps to think about whether you want a more structured path instead of another restart. For me, understanding the process was what made it feel more trustworthy.',
    },
  },
  {
    id: 'daniel',
    name: 'Daniel',
    age: 42,
    roleSummary: 'Parent with a busy home routine and little personal time',
    hook: '"My biggest concern was whether this would just become another thing I\'d pay for and abandon."',
    avatarColor: 'bg-blue-200',
    initials: 'DB',
    avatar: '/daniel.jpg',
    timeInCare: '10 months',
    journey: {
      startingPoint: 'I had tried to manage things on my own for a long time, but I was always fitting my health around everything else — work, kids, family obligations. That usually meant I came last.',
      worries: 'I was skeptical about whether a digital-first care experience could actually feel supportive. I also worried I\'d pay, get overwhelmed, and stop engaging.',
      process: 'What I appreciated was that the process felt step-by-step once I got into it. It was easier to keep going when I understood what stage I was in instead of feeling like I was waiting without context.',
      changed: 'I became more patient with myself. Instead of expecting dramatic change right away, I started paying attention to momentum — small improvements, better routines, and more confidence that I could stick with it.',
      advice: 'If your life is busy, clarity matters a lot. Knowing what happens next made the experience feel much more manageable for me.',
    },
  },
  {
    id: 'sofia',
    name: 'Sofia',
    age: 29,
    roleSummary: 'First-time treatment user who had mostly tried diet and exercise before',
    hook: '"I wasn\'t sure if this kind of care was really meant for someone like me."',
    avatarColor: 'bg-emerald-200',
    initials: 'SN',
    avatar: '/sofia.jpg',
    timeInCare: '7 months',
    journey: {
      startingPoint: 'For a long time I felt like I should be able to solve it on my own. I had tried healthier eating, exercise plans, and starting over more times than I can count. Every time it didn\'t stick, I felt like I had failed.',
      worries: 'I worried I would be judged, or that the process would feel like I was being pushed toward something I didn\'t fully understand. I needed it to feel thoughtful and not generic.',
      process: 'Reading through the steps and understanding how decisions were made helped me trust it more. I didn\'t feel like I was just being rushed toward a payment screen.',
      changed: 'The biggest difference for me was feeling less alone in the experience. I started to see it as a health journey rather than a personal shortcoming.',
      advice: 'You don\'t need to have everything figured out before you start. For me, trust came from understanding the process one step at a time.',
    },
  },
  {
    id: 'rachel',
    name: 'Rachel',
    age: 38,
    roleSummary: 'Had tried multiple programs before and wanted a more sustainable path',
    hook: '"I needed something that felt realistic, not extreme."',
    avatarColor: 'bg-violet-200',
    initials: 'RM',
    avatar: '/rachel.jpg',
    timeInCare: '9 months',
    journey: {
      startingPoint: 'I had a lot of frustration going in because I had already tried different programs and always ended up feeling like I was forcing my life around them. I wanted something that felt more sustainable and less all-or-nothing.',
      worries: 'My concern wasn\'t only whether it would work — it was whether it would feel trustworthy. I wanted transparency around what I was paying for and what would happen if I wasn\'t eligible.',
      process: 'The process became easier once I could see it as a sequence instead of a mystery. Knowing there was an assessment stage, a review stage, and clear next steps helped me feel more comfortable.',
      changed: 'I became less reactive and more consistent. Instead of chasing quick wins, I started building routines that felt easier to maintain over time.',
      advice: 'Ask yourself whether what you really need is more motivation — or more structure. For me, structure was the missing piece.',
    },
  },
  {
    id: 'priya',
    name: 'Priya',
    age: 31,
    roleSummary: 'Felt emotionally drained from repeated restarts and wanted reassurance',
    hook: '"I didn\'t need hype — I needed honesty and clarity."',
    avatarColor: 'bg-amber-200',
    initials: 'PS',
    avatar: '/priya.jpg',
    timeInCare: '8 months',
    journey: {
      startingPoint: 'By the time I found Felix, I was tired of feeling hopeful for two weeks and discouraged after that. My bigger issue wasn\'t effort — it was feeling like I could never build momentum that lasted.',
      worries: 'I wanted honesty. I didn\'t want big promises or before-and-after marketing. I wanted to understand what the experience would actually feel like and whether I would feel supported.',
      process: 'What stood out to me most was when the process felt clearly explained. Once I understood the steps, I felt much calmer about moving forward.',
      changed: 'I stopped thinking about success as one big end result and started noticing smaller emotional wins — more confidence, less shame, more willingness to stay engaged.',
      advice: 'If you\'re hesitant, that\'s normal. What helped me most was feeling like I had enough clarity to make a thoughtful decision, not an emotional one.',
    },
  },
]
