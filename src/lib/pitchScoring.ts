import type { PitchFormData, PitchScore } from '@/types/pitch'

export function calculateScore(data: PitchFormData): PitchScore {
  const scores = {
    problemClarity: scoreProblemClarity(data),
    market: scoreMarket(data),
    switchReason: scoreSwitchReason(data),
    businessModel: scoreBusinessModel(data),
    founderCommitment: scoreFounderCommitment(data),
    traction: scoreTraction(data),
    gtmPlan: scoreGTMPlan(data),
    validationBudget: scoreValidationBudget(data),
    techFeasibility: scoreTechFeasibility(data),
    timelineRealism: scoreTimelineRealism(data)
  }

  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  const flags = generateFlags(data)

  return {
    ...scores,
    total,
    flags
  }
}

function scoreProblemClarity(data: PitchFormData): number {
  // 15 points max - based on idea summary and problem statement depth
  let score = 0
  
  if (data.ideaSummary) {
    if (data.ideaSummary.length > 50 && data.ideaSummary.length < 200) score += 7
    else if (data.ideaSummary.length >= 200) score += 5
    else score += 3
  }
  
  if (data.problemSolved) {
    if (data.problemSolved.length > 100) score += 8
    else if (data.problemSolved.length > 50) score += 5
    else score += 2
  }
  
  return Math.min(score, 15)
}

function scoreMarket(data: PitchFormData): number {
  // 15 points max - market size stated plus competitor awareness
  let score = 0
  
  if (data.marketSize) {
    // Check for specific numbers/estimates
    if (data.marketSize.match(/\$[\d,]+|\d+[KkMmBb]|\d+\s*(thousand|million|billion)/i)) {
      score += 8
    } else if (data.marketSize.length > 20) {
      score += 5
    } else {
      score += 2
    }
  }
  
  if (data.competitors) {
    if (data.competitors.length > 100) score += 7
    else if (data.competitors.length > 50) score += 4
    else if (data.competitors.length > 0) score += 2
  }
  
  return Math.min(score, 15)
}

function scoreSwitchReason(data: PitchFormData): number {
  // 10 points max
  if (!data.switchReason) return 0
  
  if (data.switchReason.length > 150) return 10
  if (data.switchReason.length > 75) return 7
  if (data.switchReason.length > 30) return 4
  return 2
}

function scoreBusinessModel(data: PitchFormData): number {
  // 10 points max
  let score = 0
  
  if (data.revenueModel) score += 3
  if (data.pricePoint) {
    // Check for specific pricing
    if (data.pricePoint.match(/\$\d+/)) score += 4
    else score += 2
  }
  if (data.yearOneGoal) {
    if (data.yearOneGoal.match(/\$[\d,]+[KkMmBb]?|\d+[KkMmBb]/)) score += 3
    else score += 1
  }
  
  return Math.min(score, 10)
}

function scoreFounderCommitment(data: PitchFormData): number {
  // 10 points max - 10 points if 10+ hours per week, 5 if 5–9, 0 if under 5
  switch (data.commitmentHours) {
    case '20+':
    case '10-20':
      return 10
    case '5-10':
      return 5
    case '0-5':
      return 0
    default:
      return 0
  }
}

function scoreTraction(data: PitchFormData): number {
  // 10 points max - 10 points for paying users, 7 for pilots, 4 for waitlist 100+, 0 none
  if (!data.tractionType || data.tractionType === 'none') return 0
  
  const tractionValue = parseInt(data.tractionValue || '0')
  
  switch (data.tractionType) {
    case 'paying-users':
      return 10
    case 'pilots':
      return 7
    case 'waitlist':
      return tractionValue >= 100 ? 4 : 2
    default:
      return 0
  }
}

function scoreGTMPlan(data: PitchFormData): number {
  // 10 points max
  let score = 0
  
  if (data.first100Plan) {
    if (data.first100Plan.length > 100) score += 6
    else if (data.first100Plan.length > 50) score += 4
    else if (data.first100Plan.length > 20) score += 2
  }
  
  if (data.primaryChannel) score += 2
  if (data.launchBudget && data.launchBudget.match(/\$[\d,]+/)) score += 2
  
  return Math.min(score, 10)
}

function scoreValidationBudget(data: PitchFormData): number {
  // 8 points max - 8 points if 500+ budget, 5 for 200, 0 for 0
  if (data.validationReady === 'no') return 0
  
  switch (data.adBudgetRange) {
    case '1000+':
      return 8
    case '500':
      return 8
    case '200':
      return 5
    case '0':
      return 0
    default:
      return 0
  }
}

function scoreTechFeasibility(data: PitchFormData): number {
  // 7 points max - penalize vague scope or heavy unknowns
  let score = 7
  
  if (!data.mustHaveFeatures || data.mustHaveFeatures.length < 50) score -= 3
  
  // Penalize complex integrations without details
  if (data.integrationsNeeded) {
    const complexIntegrations = ['payment', 'blockchain', 'ai', 'ml', 'machine learning']
    const hasComplex = complexIntegrations.some(term => 
      data.integrationsNeeded!.toLowerCase().includes(term)
    )
    if (hasComplex && data.mustHaveFeatures && data.mustHaveFeatures.length < 100) {
      score -= 2
    }
  }
  
  // Platform complexity
  if (data.platform === 'combo') score -= 1
  
  return Math.max(score, 0)
}

function scoreTimelineRealism(data: PitchFormData): number {
  // 5 points max
  let score = 5
  
  // Penalize unrealistic combinations
  if (data.platform === 'combo' && data.timeframe?.toLowerCase().includes('immediate')) {
    score -= 2
  }
  
  if (data.mustHaveFeatures && data.mustHaveFeatures.split(',').length > 10 && 
      data.timeframe?.toLowerCase().includes('1 month')) {
    score -= 2
  }
  
  return Math.max(score, 0)
}

function generateFlags(data: PitchFormData): string[] {
  const flags: string[] = []
  
  // Legal/compliance risk
  if (data.integrationsNeeded?.toLowerCase().includes('financial') || 
      data.integrationsNeeded?.toLowerCase().includes('payment') ||
      data.targetSegment?.toLowerCase().includes('healthcare') ||
      data.targetSegment?.toLowerCase().includes('finance')) {
    flags.push('Legal/compliance risk')
  }
  
  // Third-party dependency risk
  if (data.integrationsNeeded && data.integrationsNeeded.split(',').length > 5) {
    flags.push('High third-party dependency risk')
  }
  
  // Data privacy risk
  if (data.mustHaveFeatures?.toLowerCase().includes('personal data') ||
      data.mustHaveFeatures?.toLowerCase().includes('user data') ||
      data.targetSegment?.toLowerCase().includes('children')) {
    flags.push('Data privacy risk')
  }
  
  // Payment risk
  if (data.revenueModel === 'subscription' && !data.integrationsNeeded?.toLowerCase().includes('payment')) {
    flags.push('Payment integration needed')
  }
  
  return flags
}