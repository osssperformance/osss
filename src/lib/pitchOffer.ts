import type { PitchFormData, PitchScore, PitchOffer } from '@/types/pitch'

export function buildOffer(data: PitchFormData, score: PitchScore, selectedAddOns: string[]): PitchOffer {
  const scoreBand = getScoreBand(score.total)
  const basePackage = getBasePackage(data, score, scoreBand)
  const addOns = getAddOns(data, selectedAddOns)
  
  const totalPrice = basePackage.price + addOns.reduce((sum, addon) => 
    addon.triggered ? sum + addon.price : sum, 0
  )
  
  return {
    scoreBand,
    nextStep: getNextStep(scoreBand, data, score),
    basePackage,
    addOns,
    totalPrice,
    callBookingUrl: getCallBookingUrl(scoreBand, score),
    paymentUrl: getPaymentUrl(basePackage, totalPrice)
  }
}

function getScoreBand(total: number): 'high' | 'medium' | 'low' {
  if (total >= 75) return 'high'
  if (total >= 55) return 'medium'
  return 'low'
}

function getBasePackage(data: PitchFormData, score: PitchScore, scoreBand: 'high' | 'medium' | 'low') {
  if (scoreBand === 'high' && data.validationReady === 'yes' && 
      (data.adBudgetRange === '500' || data.adBudgetRange === '1000+')) {
    return {
      name: 'Validate + Build Track',
      price: 1500,
      description: 'Market validation with credit toward build. Includes prototype, landing page, ad testing, and market report.'
    }
  }
  
  if (scoreBand === 'medium' || data.validationReady === 'no') {
    return {
      name: 'Validation Only',
      price: 1500,
      description: 'Fast market test to validate demand. Build decision after results.'
    }
  }
  
  // Low score
  return {
    name: 'Validation Consultation',
    price: 0,
    description: 'Feedback on your pitch and recommended preparation steps before validation.'
  }
}

function getAddOns(data: PitchFormData, selectedAddOns: string[]): Array<{
  name: string
  price: number
  description: string
  triggered: boolean
}> {
  const addOns = []
  
  // Launch Plan addon
  if (data.first100Plan && data.first100Plan.length < 40) {
    addOns.push({
      name: 'Launch Plan Service',
      price: 1000,
      description: 'Complete go-to-market strategy including ICP, channels, funnels, and first 500 users roadmap',
      triggered: selectedAddOns.includes('launch-plan')
    })
  }
  
  // Audience Build Sprint addon
  if ((data.tractionValue === '0' || !data.tractionValue) && 
      (!data.audienceAssets || data.audienceAssets === '0')) {
    addOns.push({
      name: 'Audience Build Sprint',
      price: 1000,
      description: 'Build initial audience and gather market insights before validation',
      triggered: selectedAddOns.includes('audience-build')
    })
  }
  
  // Integration Planning (for complex integrations)
  if (data.integrationsNeeded && data.integrationsNeeded.split(',').length > 3) {
    addOns.push({
      name: 'Integration Planning',
      price: 500,
      description: 'Technical architecture and API planning for complex integrations',
      triggered: selectedAddOns.includes('integration-planning')
    })
  }
  
  return addOns
}

function getNextStep(scoreBand: 'high' | 'medium' | 'low', data: PitchFormData, score: PitchScore): string {
  if (scoreBand === 'high') {
    return 'Book a kickoff call to discuss validation scope and timeline. Payment secures your slot.'
  }
  
  if (scoreBand === 'medium') {
    return 'Start with validation to prove market demand. Build decision after results.'
  }
  
  // Low score
  return 'We recommend strengthening your pitch before validation. Here\'s a preparation plan to get ready.'
}

function getCallBookingUrl(scoreBand: 'high' | 'medium' | 'low', score: PitchScore): string | undefined {
  if (scoreBand === 'high') {
    return 'https://calendly.com/spencertoogood/validation-kickoff'
  }
  
  if (scoreBand === 'medium') {
    return 'https://calendly.com/spencertoogood/validation-consultation'
  }
  
  return undefined
}

function getPaymentUrl(basePackage: any, totalPrice: number): string | undefined {
  if (totalPrice > 0) {
    return `https://buy.stripe.com/validation?amount=${totalPrice * 100}`
  }
  
  return undefined
}

export function generateDeclineEmail(data: PitchFormData, score: PitchScore): string {
  return `Hi ${data.fullName},

Thanks for your pitch. Based on your submission, we suggest focusing on validation before any build work.

Your pitch scored ${score.total}/100. Here are the key areas to strengthen:

${score.problemClarity < 10 ? '• Clarify your problem statement and solution\n' : ''}
${score.market < 10 ? '• Research your market size and competitors more thoroughly\n' : ''}
${score.founderCommitment < 5 ? '• Increase your time commitment to the project\n' : ''}
${score.traction === 0 ? '• Build some initial traction (waitlist, pilot customers, etc.)\n' : ''}
${score.gtmPlan < 5 ? '• Develop a detailed plan for acquiring your first 100 users\n' : ''}
${score.validationBudget === 0 ? '• Prepare a budget for market validation\n' : ''}

Here's a short preparation plan:

1. **Strengthen Your Pitch**: Rewrite your one-liner and problem statement with specific details
2. **Research Competition**: Identify 3-5 direct competitors and your differentiation
3. **Build Traction**: Start a waitlist, find pilot customers, or build an email list
4. **Plan Distribution**: Write a detailed strategy for finding your first 100 users
5. **Set Validation Budget**: Prepare $500+ for market testing

When you've addressed these areas, reply to this email and we'll reassess your pitch.

Best regards,
Spencer`
}

export function generateQualifiedEmail(data: PitchFormData, offer: PitchOffer): string {
  return `Hi ${data.fullName},

Great pitch! You scored well on our assessment and are a strong fit for our Validate + Build program.

**Your Next Steps:**
${offer.nextStep}

**Package Summary:**
• ${offer.basePackage.name}: $${offer.basePackage.price.toLocaleString()}
${offer.addOns.filter(a => a.triggered).map(addon => 
  `• ${addon.name}: $${addon.price.toLocaleString()}`
).join('\n')}

**Total Investment:** $${offer.totalPrice.toLocaleString()}

**What's Included:**
- Market validation study (1-2 weeks)
- Prototype of key screens
- Landing page and ad testing
- Market insights report
- Credit toward build if validation succeeds

${offer.callBookingUrl ? `**Book Your Kickoff Call:** ${offer.callBookingUrl}` : ''}
${offer.paymentUrl ? `**Secure Your Slot:** ${offer.paymentUrl}` : ''}

We're excited to help validate and build your idea!

Best regards,
Spencer`
}