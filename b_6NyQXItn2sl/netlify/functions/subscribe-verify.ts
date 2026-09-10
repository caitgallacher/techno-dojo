import type { Handler } from '@netlify/functions'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = '188720136122795593'

const mailerLiteHeaders = () => ({
  Authorization: `Bearer ${MAILERLITE_API_KEY}`,
  'Content-Type': 'application/json',
})

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { email, action, fields } = JSON.parse(event.body || '{}')

    if (!email || typeof email !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email required' }),
      }
    }

    if (!MAILERLITE_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      }
    }

    const cleanEmail = email.trim()

    // CHECK subscription status
    if (action === 'check') {
      const response = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(cleanEmail)}`,
        {
          headers: mailerLiteHeaders(),
        }
      )

      if (response.status === 404) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ subscribed: false }),
        }
      }

      if (!response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ subscribed: false }),
        }
      }

      const data = await response.json()
      const subscriber = data.data
      const isActive = subscriber?.status === 'active'

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ subscribed: isActive }),
      }
    }

    // FEEDBACK
    //
    // Only updates an EXISTING active subscriber.
    // It cannot create, subscribe, or reactivate someone.
    if (action === 'feedback') {
      const feedback =
        typeof fields?.transition_moments === 'string'
          ? fields.transition_moments.trim()
          : ''

      if (!feedback) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Feedback required',
          }),
        }
      }

      // Prevent accidentally sending an extremely large value
      if (feedback.length > 3000) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Feedback too long',
          }),
        }
      }

      // First check that this subscriber already exists
      const lookupResponse = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(cleanEmail)}`,
        {
          headers: mailerLiteHeaders(),
        }
      )

      if (!lookupResponse.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: false }),
        }
      }

      const lookupData = await lookupResponse.json()
      const subscriber = lookupData.data

      // Only allow feedback from existing ACTIVE subscribers
      if (!subscriber?.id || subscriber?.status !== 'active') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: false }),
        }
      }

      // Update ONLY the feedback field.
      // Do not change subscription status or groups.
      const updateResponse = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${subscriber.id}`,
        {
          method: 'PUT',
          headers: mailerLiteHeaders(),
          body: JSON.stringify({
            fields: {
              transition_moments: feedback,
            },
          }),
        }
      )

      if (!updateResponse.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: false }),
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      }
    }

    // NORMAL SUBSCRIBE action
    //
    // Keep this because the rest of your site already uses it.
    if (action === 'subscribe') {
      const response = await fetch(
        'https://connect.mailerlite.com/api/subscribers',
        {
          method: 'POST',
          headers: mailerLiteHeaders(),
          body: JSON.stringify({
            email: cleanEmail,
            groups: [MAILERLITE_GROUP_ID],
            status: 'active',
            ...(fields && { fields }),
          }),
        }
      )

      if (!response.ok) {
        const err = await response.json()

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: false,
            error: err?.message || 'Subscription failed',
          }),
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      }
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action' }),
    }
  } catch {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' }),
    }
  }
}