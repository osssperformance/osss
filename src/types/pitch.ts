export interface PitchFormData {
  // Founder
  fullName: string
  email: string
  location: string
  linkedinUrl: string

  // Idea
  ideaSummary: string
  problemSolved: string
  targetSegment: string
  currentWorkaround: string

  // Market and competition
  marketSize: string
  competitors: string
  switchReason: string

  // Business model
  revenueModel: 'subscription' | 'one-off' | 'other'
  pricePoint: string
  yearOneGoal: string

  // Commitment and traction
  commitmentHours: string
  priorLaunch: 'yes' | 'no'
  priorLaunchDetails?: string
  tractionType: 'waitlist' | 'paying-users' | 'pilots' | 'none'
  tractionValue: string
  audienceAssets: string

  // Go-to-market plan
  first100Plan: string
  primaryChannel: 'paid-ads' | 'partnerships' | 'content' | 'seo' | 'direct-sales'
  launchBudget: string

  // Tech scope
  mustHaveFeatures: string
  niceToHaveFeatures: string
  integrationsNeeded: string
  platform: 'web' | 'ios' | 'android' | 'combo'

  // Validation readiness
  validationReady: 'yes' | 'no'
  adBudgetRange: '0' | '200' | '500' | '1000+'
  timeframe: string

  // Deal preference
  dealPreference: '5k-10percent' | '1k-25percent' | '0-40to50percent' | 'open'

  // Attachments
  pitchDeckUrl?: string
  loomVideoUrl?: string
}

export interface PitchScore {
  problemClarity: number
  market: number
  switchReason: number
  businessModel: number
  founderCommitment: number
  traction: number
  gtmPlan: number
  validationBudget: number
  techFeasibility: number
  timelineRealism: number
  total: number
  flags: string[]
}

export interface PitchOffer {
  scoreBand: 'high' | 'medium' | 'low'
  nextStep: string
  basePackage: {
    name: string
    price: number
    description: string
  }
  addOns: Array<{
    name: string
    price: number
    description: string
    triggered: boolean
  }>
  totalPrice: number
  callBookingUrl?: string
  paymentUrl?: string
}

export interface ConditionalPrompt {
  id: string
  condition: (data: PitchFormData) => boolean
  type: 'addon' | 'info' | 'warning'
  title: string
  description: string
  price?: number
  field?: string
}