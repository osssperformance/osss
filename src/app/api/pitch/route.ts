import { NextRequest, NextResponse } from 'next/server'
import type { PitchFormData, PitchScore, PitchOffer } from '@/types/pitch'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, score, offer }: {
      formData: PitchFormData
      score: PitchScore
      offer: PitchOffer
    } = body

    // Submit to your CRM (replace with your actual CRM endpoint)
    const crmPayload = {
      // Lead basic info
      name: formData.fullName,
      email: formData.email,
      location: formData.location,
      linkedin_url: formData.linkedinUrl,
      
      // Idea details
      idea_summary: formData.ideaSummary,
      problem_solved: formData.problemSolved,
      target_segment: formData.targetSegment,
      current_workaround: formData.currentWorkaround,
      
      // Market info
      market_size: formData.marketSize,
      competitors: formData.competitors,
      switch_reason: formData.switchReason,
      
      // Business model
      revenue_model: formData.revenueModel,
      price_point: formData.pricePoint,
      year_one_goal: formData.yearOneGoal,
      
      // Commitment & traction
      commitment_hours: formData.commitmentHours,
      prior_launch: formData.priorLaunch,
      prior_launch_details: formData.priorLaunchDetails,
      traction_type: formData.tractionType,
      traction_value: formData.tractionValue,
      audience_assets: formData.audienceAssets,
      
      // Go-to-market
      first_100_plan: formData.first100Plan,
      primary_channel: formData.primaryChannel,
      launch_budget: formData.launchBudget,
      
      // Tech scope
      must_have_features: formData.mustHaveFeatures,
      nice_to_have_features: formData.niceToHaveFeatures,
      integrations_needed: formData.integrationsNeeded,
      platform: formData.platform,
      
      // Validation & deal
      validation_ready: formData.validationReady,
      ad_budget_range: formData.adBudgetRange,
      timeframe: formData.timeframe,
      deal_preference: formData.dealPreference,
      
      // Attachments
      pitch_deck_url: formData.pitchDeckUrl,
      loom_video_url: formData.loomVideoUrl,
      
      // Scoring results
      total_score: score.total,
      problem_clarity_score: score.problemClarity,
      market_score: score.market,
      switch_reason_score: score.switchReason,
      business_model_score: score.businessModel,
      founder_commitment_score: score.founderCommitment,
      traction_score: score.traction,
      gtm_plan_score: score.gtmPlan,
      validation_budget_score: score.validationBudget,
      tech_feasibility_score: score.techFeasibility,
      timeline_realism_score: score.timelineRealism,
      flags: score.flags.join(', '),
      
      // Offer details
      score_band: offer.scoreBand,
      recommended_package: offer.basePackage.name,
      package_price: offer.basePackage.price,
      total_offer_price: offer.totalPrice,
      next_step: offer.nextStep,
      
      // Meta
      submission_date: new Date().toISOString(),
      source: 'pitch-me-form'
    }

    // Send to your CRM API
    // Replace this URL with your actual CRM webhook or API endpoint
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/your-webhook-id'
    
    const crmResponse = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_API_KEY}` // if needed
      },
      body: JSON.stringify(crmPayload)
    })

    if (!crmResponse.ok) {
      throw new Error(`CRM submission failed: ${crmResponse.statusText}`)
    }

    // Send notification email to admin
    await sendAdminNotification(formData, score, offer)

    // Send confirmation email to user
    await sendUserConfirmation(formData, offer)

    return NextResponse.json({ 
      success: true, 
      message: 'Pitch submitted successfully',
      score: score.total,
      offer: offer.scoreBand
    })
    
  } catch (error) {
    console.error('Pitch submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit pitch. Please try again.' 
      },
      { status: 500 }
    )
  }
}

async function sendAdminNotification(formData: PitchFormData, score: PitchScore, offer: PitchOffer) {
  // Send email to admin about new pitch submission
  // You can integrate with your preferred email service (Resend, SendGrid, etc.)
  
  const emailPayload = {
    to: 'hello@spencertoogood.com',
    subject: `New Pitch Submission: ${formData.fullName} (Score: ${score.total})`,
    html: `
      <h2>New Pitch Submission</h2>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Score:</strong> ${score.total}/100 (${offer.scoreBand})</p>
      <p><strong>Idea:</strong> ${formData.ideaSummary}</p>
      <p><strong>Deal Preference:</strong> ${formData.dealPreference}</p>
      <p><strong>Validation Ready:</strong> ${formData.validationReady}</p>
      <p><strong>Recommended Package:</strong> ${offer.basePackage.name} - $${offer.totalPrice}</p>
      
      ${score.flags.length > 0 ? `<p><strong>Flags:</strong> ${score.flags.join(', ')}</p>` : ''}
      
      <h3>Score Breakdown:</h3>
      <ul>
        <li>Problem Clarity: ${score.problemClarity}/15</li>
        <li>Market: ${score.market}/15</li>
        <li>Switch Reason: ${score.switchReason}/10</li>
        <li>Business Model: ${score.businessModel}/10</li>
        <li>Founder Commitment: ${score.founderCommitment}/10</li>
        <li>Traction: ${score.traction}/10</li>
        <li>GTM Plan: ${score.gtmPlan}/10</li>
        <li>Validation Budget: ${score.validationBudget}/8</li>
        <li>Tech Feasibility: ${score.techFeasibility}/7</li>
        <li>Timeline Realism: ${score.timelineRealism}/5</li>
      </ul>
      
      <p><strong>Next Step:</strong> ${offer.nextStep}</p>
    `
  }

  // Implement your email sending logic here
  // Example with Resend:
  /*
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'noreply@spencertoogood.com',
      to: emailPayload.to,
      subject: emailPayload.subject,
      html: emailPayload.html
    })
  })
  */
}

async function sendUserConfirmation(formData: PitchFormData, offer: PitchOffer) {
  // Send confirmation email to user
  const emailContent = generateConfirmationEmail(formData, offer)
  
  const emailPayload = {
    to: formData.email,
    subject: `Your Pitch Assessment - ${offer.scoreBand === 'high' ? 'Strong Fit!' : offer.scoreBand === 'medium' ? 'Validation Recommended' : 'Preparation Needed'}`,
    html: emailContent
  }

  // Implement your email sending logic here
  console.log('Would send confirmation email to:', formData.email)
}

function generateConfirmationEmail(formData: PitchFormData, offer: PitchOffer): string {
  if (offer.scoreBand === 'high') {
    return `
      <h2>Great pitch, ${formData.fullName}!</h2>
      <p>You scored well on our assessment and are a strong fit for our Validate + Build program.</p>
      
      <h3>Your Next Steps:</h3>
      <p>${offer.nextStep}</p>
      
      <h3>Recommended Package:</h3>
      <p><strong>${offer.basePackage.name}</strong> - $${offer.totalPrice.toLocaleString()}</p>
      <p>${offer.basePackage.description}</p>
      
      ${offer.callBookingUrl ? `<p><a href="${offer.callBookingUrl}" style="background-color: #00ffff; color: #0a1e32; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Book Your Kickoff Call</a></p>` : ''}
      
      <p>We're excited to help validate and build your idea!</p>
      <p>Best regards,<br>Spencer</p>
    `
  } else if (offer.scoreBand === 'medium') {
    return `
      <h2>Thanks for your pitch, ${formData.fullName}!</h2>
      <p>Your idea has potential. We recommend starting with validation to prove market demand.</p>
      
      <h3>Your Next Steps:</h3>
      <p>${offer.nextStep}</p>
      
      <h3>Recommended Package:</h3>
      <p><strong>${offer.basePackage.name}</strong> - $${offer.totalPrice.toLocaleString()}</p>
      <p>${offer.basePackage.description}</p>
      
      ${offer.callBookingUrl ? `<p><a href="${offer.callBookingUrl}" style="background-color: #0a1e32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Book Consultation</a></p>` : ''}
      
      <p>Best regards,<br>Spencer</p>
    `
  } else {
    return `
      <h2>Thanks for your pitch, ${formData.fullName}!</h2>
      <p>We recommend strengthening your pitch before validation. Here are some preparation steps to get ready.</p>
      
      <h3>Areas to Strengthen:</h3>
      <ul>
        <li>Clarify your problem statement and solution</li>
        <li>Research your market size and competitors more thoroughly</li>
        <li>Build some initial traction (waitlist, pilot customers, etc.)</li>
        <li>Develop a detailed plan for acquiring your first 100 users</li>
      </ul>
      
      <p>When you've addressed these areas, reply to this email and we'll reassess your pitch.</p>
      
      <p>Best regards,<br>Spencer</p>
    `
  }
}