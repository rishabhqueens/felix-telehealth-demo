export type StepStatus = 'complete' | 'current' | 'upcoming'

export interface JourneyStep {
  id: string
  label: string
  shortLabel: string
  status: StepStatus
  currentDescription: string // shown below tracker only when this step is current
}

export interface JourneyVariant {
  id: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
  currentStepId: string
  completeStepIds: string[]
}

const STEP_DESCRIPTIONS: Record<string, string> = {
  'assessment':   'Your intake questionnaire has been submitted. A licensed practitioner will begin your clinical assessment.',
  'choose-drug':  'Based on your profile, a primary treatment has been recommended. You can review alternatives before proceeding.',
  'visit-fee':    'Your visit fee covers the clinical assessment and practitioner consultation. You only pay for medication after approval.',
  'practitioner': 'You are scheduled to meet your practitioner. They will review your intake, discuss your goals, and confirm eligibility.',
  'approved':     'Your practitioner has reviewed and approved your prescription. Your treatment plan is confirmed.',
  'pay-rx':       'Pay for your first prescription to trigger dispatch. You will only be charged once approved.',
  'dispatched':   'Your prescription has been dispensed and is on its way — kept cold throughout the entire journey.',
  'delivered':    'Your medication has arrived. Your Felix care journey begins now.',
}

export const BASE_STEPS: Omit<JourneyStep, 'status'>[] = [
  { id: 'assessment',   label: 'Initial assessment',       shortLabel: 'Assessment',  currentDescription: STEP_DESCRIPTIONS['assessment'] },
  { id: 'choose-drug',  label: 'Choose treatment',         shortLabel: 'Treatment',   currentDescription: STEP_DESCRIPTIONS['choose-drug'] },
  { id: 'visit-fee',    label: 'Pay visit fee',             shortLabel: 'Visit fee',   currentDescription: STEP_DESCRIPTIONS['visit-fee'] },
  { id: 'practitioner', label: 'Meet practitioner',        shortLabel: 'Consult',     currentDescription: STEP_DESCRIPTIONS['practitioner'] },
  { id: 'approved',     label: 'Prescription approved',    shortLabel: 'Approved',    currentDescription: STEP_DESCRIPTIONS['approved'] },
  { id: 'pay-rx',       label: 'Pay for prescription',     shortLabel: 'Pay Rx',      currentDescription: STEP_DESCRIPTIONS['pay-rx'] },
  { id: 'dispatched',   label: 'Dispatched',               shortLabel: 'Dispatched',  currentDescription: STEP_DESCRIPTIONS['dispatched'] },
  { id: 'delivered',    label: 'Delivered',                shortLabel: 'Delivered',   currentDescription: STEP_DESCRIPTIONS['delivered'] },
]

export const JOURNEY_VARIANTS: JourneyVariant[] = [
  { id: 'A', label: 'Choose treatment', currentStepId: 'choose-drug',  completeStepIds: ['assessment'] },
  { id: 'B', label: 'Visit fee',        currentStepId: 'visit-fee',    completeStepIds: ['assessment', 'choose-drug'] },
  { id: 'C', label: 'Consult',          currentStepId: 'practitioner', completeStepIds: ['assessment', 'choose-drug', 'visit-fee'] },
  { id: 'D', label: 'Approved',         currentStepId: 'approved',     completeStepIds: ['assessment', 'choose-drug', 'visit-fee', 'practitioner'] },
  { id: 'E', label: 'Dispatched',       currentStepId: 'dispatched',   completeStepIds: ['assessment', 'choose-drug', 'visit-fee', 'practitioner', 'approved', 'pay-rx'] },
]

export function buildSteps(variant: JourneyVariant): JourneyStep[] {
  return BASE_STEPS.map(s => ({
    ...s,
    status: variant.completeStepIds.includes(s.id)
      ? 'complete'
      : s.id === variant.currentStepId
      ? 'current'
      : 'upcoming',
  }))
}
