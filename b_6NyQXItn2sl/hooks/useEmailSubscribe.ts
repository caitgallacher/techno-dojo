import { useState } from 'react'

export function useEmailSubscribe() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null)

  const subscribe = async (email: string) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("You're in the Dojo.")
        setMessageType('success')
      } else {
        setMessage('Something went wrong. Try again.')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Something went wrong. Try again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return { subscribe, isLoading, message, messageType }
}
