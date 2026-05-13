export type QuestionType = 'single' | 'multi' | 'metrics'

export interface InsightRule {
  trigger: string | string[]
  text: string
  type?: 'info' | 'warning' | 'positive'
}

export interface Question {
  id: string
  section: string
  sectionIndex: number
  totalInSection: number
  title: string
  subtitle: string
  type: QuestionType
  options?: string[]
  insightRules?: InsightRule[]
  noneOption?: boolean
}

export const SECTIONS = [
  'Your goals',
  'Lifestyle',
  'Medical history',
  'Past attempts',
  'Body metrics',
  'Lab readiness',
]

export const QUESTIONS: Question[] = [
  {
    id: 'weight_duration',
    section: 'Your goals',
    sectionIndex: 1,
    totalInSection: 2,
    title: 'How long have you had concerns about your weight?',
    subtitle: 'Understanding the timeline of your concern helps us gauge the scope of support that may be most helpful.',
    type: 'single',
    options: ['Less than 6 months', '6–12 months', '1–5 years', 'More than 5 years'],
    insightRules: [
      {
        trigger: 'More than 5 years',
        text: 'Long-term weight concerns often suggest lifestyle changes alone may not be sufficient. Medical treatment paths may be worth exploring.',
        type: 'info',
      },
      {
        trigger: '1–5 years',
        text: 'This duration suggests your weight journey is ongoing. We\'ll use this to tailor which support options may fit best.',
        type: 'info',
      },
    ],
  },
  {
    id: 'health_impact',
    section: 'Your goals',
    sectionIndex: 2,
    totalInSection: 2,
    title: 'Does your weight negatively affect your physical or mental health?',
    subtitle: 'This helps us understand the urgency and scope of care that may be most appropriate for you.',
    type: 'single',
    options: ['Yes, a lot', 'Yes, somewhat', 'Not much', 'Not at all'],
    insightRules: [
      {
        trigger: 'Yes, a lot',
        text: 'This suggests a higher need for timely support and may make treatment-led care more relevant for your situation.',
        type: 'info',
      },
      {
        trigger: 'Yes, somewhat',
        text: 'Health impact is a key signal. We\'ll factor this into which treatment paths may be most appropriate for you.',
        type: 'info',
      },
    ],
  },
  {
    id: 'diet',
    section: 'Lifestyle',
    sectionIndex: 1,
    totalInSection: 3,
    title: 'How would you describe your diet in the past month?',
    subtitle: 'Understanding your diet helps us identify whether lifestyle-only support may work, or whether medication could be more appropriate.',
    type: 'single',
    options: ['Very healthy', 'Somewhat healthy', 'Neither healthy or unhealthy', 'Somewhat unhealthy', 'Very unhealthy'],
    insightRules: [
      {
        trigger: 'Very healthy',
        text: 'Your answers suggest this may not be only a lifestyle issue, so we\'ll also evaluate medical treatment fit alongside diet-based approaches.',
        type: 'positive',
      },
    ],
  },
  {
    id: 'activity',
    section: 'Lifestyle',
    sectionIndex: 2,
    totalInSection: 3,
    title: 'Which level of activity best describes your lifestyle?',
    subtitle: '"Active" can mean any kind of activity, from standing to high-intensity workouts.',
    type: 'single',
    options: ['Not active', 'Somewhat active', 'Very active'],
  },
  {
    id: 'eating_disorder',
    section: 'Lifestyle',
    sectionIndex: 3,
    totalInSection: 3,
    title: 'Are you currently affected by an eating disorder?',
    subtitle: 'Some treatment approaches may need added care or may not be suitable depending on your answer.',
    type: 'single',
    options: ['No', 'No, but I have been in the past', 'Yes'],
    insightRules: [
      {
        trigger: ['No, but I have been in the past', 'Yes'],
        text: 'This is important context because some treatment approaches may need added care or may not be suitable. We\'ll prioritize options that account for this.',
        type: 'warning',
      },
    ],
  },
  {
    id: 'medical_history',
    section: 'Medical history',
    sectionIndex: 1,
    totalInSection: 1,
    title: 'Do any of the following apply to you?',
    subtitle: 'Select all that apply — past or present. This helps us understand which treatments may or may not be appropriate.',
    type: 'multi',
    options: [
      'Liver problems',
      'Kidney problems',
      'Diabetes',
      'Diabetic retinopathy',
      'Gallbladder disease',
      'Gastrointestinal problems',
      'High cholesterol',
      'Anxiety or depression',
      'Pancreatitis',
      'Personal or family history of medullary thyroid cancer',
      'Personal history of Multiple Endocrine Neoplasia Type 2',
      'Opioid use or opioid agonist use (eg. oxycodone, methadone, buprenorphine, etc)',
      'Schizophrenia, mania/hypomania or bipolar disorder',
      'Seizures',
      'Abnormal heart rate',
      'Glaucoma',
      'Heart disease',
      'Obstructive sleep apnea',
    ],
    noneOption: true,
    insightRules: [
      {
        trigger: 'Diabetes',
        text: 'Diabetes can make weight loss more complex, but it also helps narrow which treatments may be more suitable for you.',
        type: 'info',
      },
      {
        trigger: ['Heart disease', 'Abnormal heart rate'],
        text: 'Some weight loss medications may be less suitable when cardiovascular conditions are present. We\'ll prioritize safer paths in this demo.',
        type: 'warning',
      },
      {
        trigger: ['Gastrointestinal problems', 'Pancreatitis', 'Gallbladder disease'],
        text: 'Digestive history can affect whether certain GLP-1 style medications are a good fit for your profile.',
        type: 'warning',
      },
      {
        trigger: ['Personal or family history of medullary thyroid cancer', 'Personal history of Multiple Endocrine Neoplasia Type 2'],
        text: 'Some medication families may not be appropriate with this history, which is why we ask about it.',
        type: 'warning',
      },
    ],
  },
  {
    id: 'past_attempts',
    section: 'Past attempts',
    sectionIndex: 1,
    totalInSection: 1,
    title: 'How have you tried to lose weight in the past?',
    subtitle: 'Select all that apply. Prior attempts help us understand what may or may not have worked for you.',
    type: 'multi',
    options: [
      'Surgery',
      'Prescription weight loss medication',
      'Laxatives or diuretics',
      'Supplements or over-the-counter products',
      'Counselling',
      'Therapy',
      'Dieting',
      'Dietician support',
      'Exercise',
      'Other',
    ],
    noneOption: true,
    insightRules: [
      {
        trigger: 'Prescription weight loss medication',
        text: 'Previous medication use helps us avoid recommending something that may have already failed or caused side effects.',
        type: 'info',
      },
      {
        trigger: ['Dieting', 'Exercise'],
        text: 'You\'ve already tried core lifestyle approaches, which may make structured medical support more relevant to your profile.',
        type: 'info',
      },
    ],
  },
  {
    id: 'metrics',
    section: 'Body metrics',
    sectionIndex: 1,
    totalInSection: 1,
    title: 'What is your height and weight?',
    subtitle: "We'll use this to determine your Body Mass Index (BMI) for your profile. Remember, BMI is a measure of size — not health.",
    type: 'metrics',
  },
  {
    id: 'blood_work',
    section: 'Lab readiness',
    sectionIndex: 1,
    totalInSection: 1,
    title: 'Have you had blood work done in the last 3 years?',
    subtitle: 'Some medication paths may require up-to-date lab work before treatment is approved.',
    type: 'single',
    options: ['Yes', 'No'],
    insightRules: [
      {
        trigger: 'Yes',
        text: 'Recent blood work may speed up next steps if treatment requires a baseline review.',
        type: 'positive',
      },
      {
        trigger: 'No',
        text: 'Some medication paths may require up-to-date lab work before treatment is approved.',
        type: 'info',
      },
    ],
  },
]

export type Answers = Record<string, string | string[] | { feet: string; inches: string; weight: string }>

export function computeRecommendation(answers: Answers) {
  const medical = (answers.medical_history as string[]) || []
  const past = (answers.past_attempts as string[]) || []
  const metrics = answers.metrics as { feet: string; inches: string; weight: string } | undefined
  const diet = answers.diet as string
  const bloodWork = answers.blood_work as string
  const healthImpact = answers.health_impact as string

  let bmi = 0
  if (metrics?.feet && metrics?.weight) {
    const heightInches = parseInt(metrics.feet) * 12 + parseInt(metrics.inches || '0')
    const weightLbs = parseInt(metrics.weight)
    if (heightInches > 0 && weightLbs > 0) {
      bmi = Math.round(((weightLbs / (heightInches * heightInches)) * 703) * 10) / 10
    }
  }

  const hasCardio = medical.includes('Heart disease') || medical.includes('Abnormal heart rate')
  const hasDiabetes = medical.includes('Diabetes')
  const hasGI = medical.includes('Gastrointestinal problems') || medical.includes('Pancreatitis') || medical.includes('Gallbladder disease')
  const hasThyroid = medical.includes('Personal or family history of medullary thyroid cancer') || medical.includes('Personal history of Multiple Endocrine Neoplasia Type 2')
  const triedLifestyle = past.includes('Dieting') || past.includes('Exercise')
  const triedMeds = past.includes('Prescription weight loss medication')
  const manyConditions = medical.length >= 3
  const highImpact = healthImpact === 'Yes, a lot'

  const rationale: string[] = []

  if (bmi >= 27) rationale.push('Your BMI range suggests medication-supported treatment may be appropriate alongside lifestyle change')
  if (hasDiabetes) rationale.push('Diabetes-related context makes a GLP-1 pathway a stronger fit for your profile')
  if (hasCardio) rationale.push('We\'ve prioritized options that account for your cardiovascular history')
  if (triedLifestyle) rationale.push('Since lifestyle-only approaches have already been tried, structured medical support may offer more')
  if (triedMeds) rationale.push('Prior medication history has been factored in to avoid recommending the same path')
  if (highImpact) rationale.push('Given the significant impact on your health, timely treatment-led care may be most relevant')
  if (diet === 'Very healthy') rationale.push('A healthy diet with ongoing weight concerns suggests a non-lifestyle cause, making medical support more relevant')

  let profile = 'General wellness'
  let profileSignals: string[] = []

  if (manyConditions || hasDiabetes) {
    profile = 'Metabolic-risk aware'
    profileSignals = ['Metabolic complexity noted', 'Multiple health signals present', 'Structured medical review may be appropriate']
  } else if (triedLifestyle && bmi >= 27) {
    profile = 'Lifestyle-experienced'
    profileSignals = ['Core lifestyle approaches already tried', 'Elevated BMI range noted', 'Medical augmentation may help']
  } else {
    profile = 'Early intervention candidate'
    profileSignals = ['Relatively early in weight journey', 'Some lifestyle factors present', 'Multiple options remain open']
  }

  const recommendation = hasThyroid
    ? 'Oral medication path'
    : hasCardio
    ? 'Lifestyle + monitored support path'
    : hasDiabetes || bmi >= 30
    ? 'GLP-1 treatment path'
    : triedLifestyle
    ? 'GLP-1 treatment path'
    : 'Lifestyle-supported program'

  return {
    bmi,
    recommendation,
    rationale: rationale.length ? rationale : ['Your profile has been reviewed for available treatment options'],
    hasCardio,
    hasDiabetes,
    hasGI,
    hasThyroid,
    triedLifestyle,
    triedMeds,
    manyConditions,
    profile,
    profileSignals,
    needsBloodWork: bloodWork === 'No',
    highImpact,
  }
}
