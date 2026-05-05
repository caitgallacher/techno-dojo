'use client'

import { useState } from 'react'
import { useEmailSubscribe } from '@/hooks/useEmailSubscribe'

interface EmailSubscribeProps {
  headingText?: string
  descriptionText?: string
  buttonText?: string
  fineText?: string
}

export function EmailSubscribe({
  headingText = 'STAY IN THE DOJO',
  descriptionText = 'New sessions, new science, new releases. No noise.',
  buttonText = 'JOIN',
  fineText = 'No spam. Unsubscribe anytime.',
}: EmailSubscribeProps) {
  const [email, setEmail] = useState('')
  const { subscribe, isLoading, message, messageType } = useEmailSubscribe()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await subscribe(email)
      if (messageType === 'success') {
        setEmail('')
      }
    }
  }

  return (
    <section className="bg-forest py-32 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="font-bebas text-bone text-3xl sm:text-4xl tracking-tight text-balance">
          {headingText}
        </h2>
        <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
          {descriptionText}
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-bone/10 border border-bone/20 rounded text-bone placeholder-stone/50 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors duration-300 disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? 'LOADING...' : buttonText}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className={`font-space-mono text-xs tracking-widest uppercase ${
            messageType === 'success' ? 'text-bone' : 'text-stone'
          }`}>
            {message}
          </p>
        )}

        {!message && (
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
            {fineText}
          </p>
        )}
      </div>
    </section>
  )
}
