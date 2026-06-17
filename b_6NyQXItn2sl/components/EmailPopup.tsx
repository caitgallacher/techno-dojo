'use client'

import { useEffect, useState, useRef } from 'react'
import { useEmailSubscribe } from '@/hooks/useEmailSubscribe'
import { X } from 'lucide-react'

const STORAGE_KEY = 'td_popup_dismissed'

export function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const { subscribe, isLoading, message, messageType } = useEmailSubscribe()
  const hasTriggered = useRef(false)

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    const triggerOnce = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true
      setVisible(true)
    }

    const timer = setTimeout(triggerOnce, 5000)

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= 50) {
        triggerOnce()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await subscribe(email)
    }
  }

  useEffect(() => {
    if (messageType === 'success') {
      const t = setTimeout(dismiss, 2000)
      return () => clearTimeout(t)
    }
  }, [messageType])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-obsidian/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-forest border border-stone/30 rounded-sm p-8 sm:p-10">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-stone hover:text-bone transition-colors duration-300"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6">
          <h2 className="font-bebas text-bone text-3xl sm:text-4xl tracking-tight text-balance">
            STAY IN THE DOJO
          </h2>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light">
            New sessions, new science, new releases. No noise.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="px-4 py-3 bg-bone/10 border border-bone/20 rounded text-bone placeholder-stone/50 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors duration-300 disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'LOADING...' : 'JOIN'}
            </button>
          </form>

          {message && (
            <p className={`font-space-mono text-xs tracking-widest uppercase ${
              messageType === 'success' ? 'text-bone' : 'text-stone'
            }`}>
              {message}
            </p>
          )}
          {!message && (
            <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
