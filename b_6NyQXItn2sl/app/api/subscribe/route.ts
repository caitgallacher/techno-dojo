import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
    const apiServer = process.env.MAILCHIMP_API_SERVER

    if (!apiKey || !audienceId || !apiServer) {
      console.error('Missing Mailchimp environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Subscribe user to Mailchimp audience
    const url = `https://${apiServer}.api.mailchimp.com/3.0/lists/${audienceId}/members`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })

    const data = await response.json()

    // Handle success and already-subscribed cases
    if (response.ok || (response.status === 400 && data.title === 'Member Exists')) {
      return NextResponse.json(
        { success: true, message: "You're in the Dojo." },
        { status: 200 }
      )
    }

    // Handle errors
    console.error('Mailchimp error:', data)
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Try again.' },
      { status: 500 }
    )
  }
}
