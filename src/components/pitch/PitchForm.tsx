'use client'

import { useState, useEffect } from 'react'
import type { PitchFormData, ConditionalPrompt } from '@/types/pitch'
import { calculateScore } from '@/lib/pitchScoring'
import { buildOffer } from '@/lib/pitchOffer'

interface PitchFormProps {
  onSubmit: (data: PitchFormData, offer: any) => void
}

const PitchForm = ({ onSubmit }: PitchFormProps) => {
  const [formData, setFormData] = useState<Partial<PitchFormData>>({})
  const [currentSection, setCurrentSection] = useState(0)
  const [conditionalPrompts, setConditionalPrompts] = useState<ConditionalPrompt[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sections = [
    'Founder',
    'Your Idea',
    'Market & Competition', 
    'Business Model',
    'Commitment & Traction',
    'Go-to-Market',
    'Tech Scope',
    'Validation & Deal',
    'Review & Submit'
  ]

  // Update conditional prompts when form data changes
  useEffect(() => {
    updateConditionalPrompts()
  }, [formData]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateConditionalPrompts = () => {
    const prompts: ConditionalPrompt[] = []
    
    // Launch Plan addon trigger
    if (formData.first100Plan && formData.first100Plan.length < 40) {
      prompts.push({
        id: 'launch-plan',
        condition: () => true,
        type: 'addon',
        title: 'Launch Plan Service',
        description: 'Include ICP, channels, funnels, first 500 users roadmap',
        price: 1000,
        field: 'launchPlan'
      })
    }

    // Validation warning
    if (formData.validationReady === 'no') {
      prompts.push({
        id: 'validation-warning',
        condition: () => true,
        type: 'warning',
        title: 'Validation Required',
        description: 'We only build after validation. You can book Validation only.',
        field: 'validationWarning'
      })
    }

    // Audience Build Sprint addon
    if (formData.tractionValue === '0' && (!formData.audienceAssets || formData.audienceAssets === '0')) {
      prompts.push({
        id: 'audience-build',
        condition: () => true,
        type: 'addon',
        title: 'Audience Build Sprint',
        description: 'Build initial audience and gather market insights',
        price: 1000,
        field: 'audienceBuild'
      })
    }

    setConditionalPrompts(prompts)
  }

  const handleInputChange = (field: keyof PitchFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Validate required fields before submission
    if (!isFormValid()) {
      setIsSubmitting(false)
      return
    }
    
    // Calculate score and build offer
    const score = calculateScore(formData as PitchFormData)
    const offer = buildOffer(formData as PitchFormData, score, selectedAddOns)
    
    // Submit to CRM (we'll implement this)
    await submitToCRM(formData, score, offer)
    
    onSubmit(formData as PitchFormData, offer)
  }

  const isFormValid = (): boolean => {
    return !!(
      formData.fullName &&
      formData.email &&
      formData.ideaSummary &&
      formData.problemSolved &&
      formData.targetSegment &&
      formData.switchReason &&
      formData.revenueModel &&
      formData.pricePoint &&
      formData.yearOneGoal &&
      formData.commitmentHours &&
      formData.priorLaunch &&
      formData.tractionType &&
      formData.first100Plan &&
      formData.primaryChannel &&
      formData.mustHaveFeatures &&
      formData.platform &&
      formData.validationReady &&
      formData.adBudgetRange &&
      formData.dealPreference
    )
  }

  const submitToCRM = async (data: any, score: any, offer: any) => {
    try {
      const response = await fetch('https://agent-mofos-backend.onrender.com/api/crm/contacts/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          total_score: score.total,
          source: 'pitch-me-form',
          idea_summary: data.ideaSummary,
          problem_solved: data.problemSolved,
          target_segment: data.targetSegment,
          switch_reason: data.switchReason,
          revenue_model: data.revenueModel,
          price_point: data.pricePoint,
          year_one_goal: data.yearOneGoal,
          commitment_hours: data.commitmentHours,
          prior_launch: data.priorLaunch,
          traction_type: data.tractionType,
          first_100_plan: data.first100Plan,
          primary_channel: data.primaryChannel,
          must_have_features: data.mustHaveFeatures,
          platform: data.platform,
          validation_ready: data.validationReady,
          ad_budget_range: data.adBudgetRange,
          deal_preference: data.dealPreference,
          offer_package: offer.package,
          offer_price: offer.price,
          score_breakdown: JSON.stringify(score.breakdown),
          flags: JSON.stringify(score.flags)
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Submission failed: ${response.status} ${errorText}`)
      }
      
      console.log('Successfully submitted to CRM')
    } catch (error) {
      console.error('CRM submission error:', error)
      // Continue with the flow even if CRM submission fails
      // The user will still see their results
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Founder
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName || ''}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedinUrl || ''}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
          </div>
        )

      case 1: // Your Idea
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">One-sentence app description *</label>
              <textarea
                value={formData.ideaSummary || ''}
                onChange={(e) => handleInputChange('ideaSummary', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-24"
                placeholder="Describe your app idea in one clear sentence..."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Problem solved *</label>
              <textarea
                value={formData.problemSolved || ''}
                onChange={(e) => handleInputChange('problemSolved', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-32"
                placeholder="What specific problem does your app solve?"
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Target user segment *</label>
              <input
                type="text"
                value={formData.targetSegment || ''}
                onChange={(e) => handleInputChange('targetSegment', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. Small business owners, College students, etc."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Current workaround used by target users</label>
              <textarea
                value={formData.currentWorkaround || ''}
                onChange={(e) => handleInputChange('currentWorkaround', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-24"
                placeholder="How do your target users currently solve this problem?"
              />
            </div>
          </div>
        )

      case 2: // Market & Competition
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Market size estimate *</label>
              <input
                type="text"
                value={formData.marketSize || ''}
                onChange={(e) => handleInputChange('marketSize', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. $10M market, 50K potential users, etc."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Top 3 competitors</label>
              <textarea
                value={formData.competitors || ''}
                onChange={(e) => handleInputChange('competitors', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-24"
                placeholder="List your main competitors and what they do..."
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Why users would switch *</label>
              <textarea
                value={formData.switchReason || ''}
                onChange={(e) => handleInputChange('switchReason', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-32"
                placeholder="What's your unique advantage over existing solutions?"
                required
              />
            </div>
          </div>
        )

      case 3: // Business Model
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Revenue model *</label>
              <select
                value={formData.revenueModel || ''}
                onChange={(e) => handleInputChange('revenueModel', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select revenue model</option>
                <option value="subscription">Subscription</option>
                <option value="one-off">One-off purchase</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Planned price point *</label>
              <input
                type="text"
                value={formData.pricePoint || ''}
                onChange={(e) => handleInputChange('pricePoint', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. $29/month, $99 one-time, etc."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Year-one revenue goal *</label>
              <input
                type="text"
                value={formData.yearOneGoal || ''}
                onChange={(e) => handleInputChange('yearOneGoal', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. $100K, $1M, etc."
                required
              />
            </div>
          </div>
        )

      case 4: // Commitment & Traction
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Hours per week you&apos;ll commit *</label>
              <select
                value={formData.commitmentHours || ''}
                onChange={(e) => handleInputChange('commitmentHours', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select commitment level</option>
                <option value="0-5">0-5 hours</option>
                <option value="5-10">5-10 hours</option>
                <option value="10-20">10-20 hours</option>
                <option value="20+">20+ hours</option>
              </select>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Have you launched a product before? *</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priorLaunch"
                    value="yes"
                    checked={formData.priorLaunch === 'yes'}
                    onChange={(e) => handleInputChange('priorLaunch', 'yes')}
                    className="mr-3"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priorLaunch"
                    value="no"
                    checked={formData.priorLaunch === 'no'}
                    onChange={(e) => handleInputChange('priorLaunch', 'no')}
                    className="mr-3"
                  />
                  No
                </label>
              </div>
              {formData.priorLaunch === 'yes' && (
                <textarea
                  value={formData.priorLaunchDetails || ''}
                  onChange={(e) => handleInputChange('priorLaunchDetails', e.target.value)}
                  className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-24 mt-3"
                  placeholder="Tell us about your previous launch..."
                />
              )}
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Current traction *</label>
              <select
                value={formData.tractionType || ''}
                onChange={(e) => handleInputChange('tractionType', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select traction type</option>
                <option value="paying-users">Paying users</option>
                <option value="pilots">Pilot customers</option>
                <option value="waitlist">Waitlist</option>
                <option value="none">None yet</option>
              </select>
            </div>
            {formData.tractionType && formData.tractionType !== 'none' && (
              <div>
                <label className="block text-st-navy font-semibold mb-2">Traction count</label>
                <input
                  type="number"
                  value={formData.tractionValue || ''}
                  onChange={(e) => handleInputChange('tractionValue', e.target.value)}
                  className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                  placeholder="Number of users, signups, etc."
                />
              </div>
            )}
            <div>
              <label className="block text-st-navy font-semibold mb-2">Audience assets</label>
              <input
                type="text"
                value={formData.audienceAssets || ''}
                onChange={(e) => handleInputChange('audienceAssets', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="Email list size, social followers, partnerships..."
              />
            </div>
          </div>
        )

      case 5: // Go-to-Market
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">First 100 users plan *</label>
              <textarea
                value={formData.first100Plan || ''}
                onChange={(e) => handleInputChange('first100Plan', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-32"
                placeholder="Describe your specific plan to get your first 100 users..."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Primary channel *</label>
              <select
                value={formData.primaryChannel || ''}
                onChange={(e) => handleInputChange('primaryChannel', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select primary channel</option>
                <option value="paid-ads">Paid advertising</option>
                <option value="partnerships">Partnerships</option>
                <option value="content">Content marketing</option>
                <option value="seo">SEO</option>
                <option value="direct-sales">Direct sales</option>
              </select>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Budget for launch month</label>
              <input
                type="text"
                value={formData.launchBudget || ''}
                onChange={(e) => handleInputChange('launchBudget', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. $5K, $10K, etc."
              />
            </div>
          </div>
        )

      case 6: // Tech Scope
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Must-have features *</label>
              <textarea
                value={formData.mustHaveFeatures || ''}
                onChange={(e) => handleInputChange('mustHaveFeatures', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-32"
                placeholder="List the core features that are essential for launch..."
                required
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Nice-to-have features</label>
              <textarea
                value={formData.niceToHaveFeatures || ''}
                onChange={(e) => handleInputChange('niceToHaveFeatures', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan h-24"
                placeholder="Features that would be great but aren't required for launch..."
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Integrations needed</label>
              <input
                type="text"
                value={formData.integrationsNeeded || ''}
                onChange={(e) => handleInputChange('integrationsNeeded', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="Payments, email, CRM, analytics, etc."
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Platform *</label>
              <select
                value={formData.platform || ''}
                onChange={(e) => handleInputChange('platform', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select platform</option>
                <option value="web">Web app</option>
                <option value="ios">iOS app</option>
                <option value="android">Android app</option>
                <option value="combo">Web + Mobile</option>
              </select>
            </div>
          </div>
        )

      case 7: // Validation & Deal
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-st-navy font-semibold mb-2">Ready to invest in validation? *</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="validationReady"
                    value="yes"
                    checked={formData.validationReady === 'yes'}
                    onChange={(e) => handleInputChange('validationReady', 'yes')}
                    className="mr-3"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="validationReady"
                    value="no"
                    checked={formData.validationReady === 'no'}
                    onChange={(e) => handleInputChange('validationReady', 'no')}
                    className="mr-3"
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Test ad budget range *</label>
              <select
                value={formData.adBudgetRange || ''}
                onChange={(e) => handleInputChange('adBudgetRange', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select budget range</option>
                <option value="0">$0</option>
                <option value="200">$200</option>
                <option value="500">$500</option>
                <option value="1000+">$1000+</option>
              </select>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Preferred timeframe to start</label>
              <input
                type="text"
                value={formData.timeframe || ''}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="e.g. Immediately, 1 month, 3 months..."
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Deal preference *</label>
              <select
                value={formData.dealPreference || ''}
                onChange={(e) => handleInputChange('dealPreference', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                required
              >
                <option value="">Select deal structure</option>
                <option value="5k-10percent">$5k + 10%</option>
                <option value="1k-25percent">$1k + 25%</option>
                <option value="0-40to50percent">$0 + 40-50%</option>
                <option value="open">Open to recommendation</option>
              </select>
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Pitch deck URL (optional)</label>
              <input
                type="url"
                value={formData.pitchDeckUrl || ''}
                onChange={(e) => handleInputChange('pitchDeckUrl', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="Link to your pitch deck"
              />
            </div>
            <div>
              <label className="block text-st-navy font-semibold mb-2">Loom video URL (optional)</label>
              <input
                type="url"
                value={formData.loomVideoUrl || ''}
                onChange={(e) => handleInputChange('loomVideoUrl', e.target.value)}
                className="w-full px-4 py-3 border border-st-gray-200 rounded-lg focus:outline-none focus:border-st-cyan"
                placeholder="Link to your pitch video"
              />
            </div>
          </div>
        )

      case 8: // Review & Submit
        return (
          <div className="space-y-8">
            <div className="bg-st-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-st-navy mb-4">Review Your Pitch</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Idea:</strong> {formData.ideaSummary}</p>
                  <p><strong>Target:</strong> {formData.targetSegment}</p>
                </div>
                <div>
                  <p><strong>Revenue Model:</strong> {formData.revenueModel}</p>
                  <p><strong>Commitment:</strong> {formData.commitmentHours} hours/week</p>
                  <p><strong>Validation Ready:</strong> {formData.validationReady}</p>
                  <p><strong>Deal Preference:</strong> {formData.dealPreference}</p>
                </div>
              </div>
            </div>

            {/* Conditional Prompts */}
            {conditionalPrompts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-st-navy">Recommended Add-ons</h3>
                {conditionalPrompts.map((prompt) => (
                  <div key={prompt.id} className={`p-4 rounded-lg border-2 ${
                    prompt.type === 'addon' ? 'border-st-cyan bg-blue-50' :
                    prompt.type === 'warning' ? 'border-orange-400 bg-orange-50' :
                    'border-st-gray-200 bg-st-gray-100'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-st-navy">{prompt.title}</h4>
                        <p className="text-st-gray-600">{prompt.description}</p>
                        {prompt.price && <p className="font-bold text-st-navy mt-2">${prompt.price.toLocaleString()}</p>}
                      </div>
                      {prompt.type === 'addon' && (
                        <label className="flex items-center ml-4">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(prompt.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAddOns([...selectedAddOns, prompt.id])
                              } else {
                                setSelectedAddOns(selectedAddOns.filter(id => id !== prompt.id))
                              }
                            }}
                            className="mr-2"
                          />
                          Add this
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-st-navy text-white px-8 py-4 rounded-full hover:bg-st-cyan hover:text-st-navy transition-all duration-300 transform hover:scale-105 font-semibold text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Pitch'}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-st-navy">
              {sections[currentSection]}
            </h2>
            <span className="text-st-gray-600">
              {currentSection + 1} of {sections.length}
            </span>
          </div>
          <div className="w-full bg-st-gray-200 rounded-full h-2">
            <div 
              className="bg-st-cyan h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          {renderSection()}
        </div>

        {/* Navigation */}
        {currentSection < sections.length - 1 && (
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSection === 0}
              className="px-6 py-3 border border-st-gray-300 text-st-gray-600 rounded-lg hover:bg-st-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-st-navy text-white rounded-lg hover:bg-st-cyan hover:text-st-navy transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PitchForm