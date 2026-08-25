import type { Handler } from '@netlify/functions'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = '188720136122795593'

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { email, action } = JSON.parse(event.body || '{}')

    if (!email) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email required' }) }
    }

    if (!MAILERLITE_API_KEY) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) }
    }

    // CHECK subscription status
    if (action === 'check') {
      const response = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 404) {
        return { statusCode: 200, headers, body: JSON.stringify({ subscribed: false }) }
      }

      if (!response.ok) {
        return { statusCode: 200, headers, body: JSON.stringify({ subscribed: false }) }
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

    // SUBSCRIBE action
    if (action === 'subscribe') {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          groups: [MAILERLITE_GROUP_ID],
          status: 'active',
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: false, error: err?.message || 'Subscription failed' }),
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      }
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid action' }) }

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' }),
    }
  }
}