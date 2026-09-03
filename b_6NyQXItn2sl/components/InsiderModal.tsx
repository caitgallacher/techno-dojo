'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface InsiderModalProps {
  isOpen: boolean
  onClose: () => void
  session: {
    title: string
    duration: string
    description: string
    audioUrl: string
    stripeUrl: string
  }
}

type ModalState = 'landing' | 'entering-email' | 'checking' | 'subscribed' | 'not-subscribed' | 'subscribing' | 'subscribed-new' | 'error'

const trackPlay = (title: string, accessType: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'insider_session_play', {
      session_title: title,
      access_type: accessType,
    })
  }
}

export function InsiderModal({ isOpen, onClose, session }: InsiderModalProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<ModalState>('landing')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    setEmail('')
    setState('landing')
    setErrorMessage('')
    onClose()
  }

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('checking')

    try {
      const res = await fetch('/.netlify/functions/subscribe-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'check' }),
      })
      const data = await res.json()

      if (data.subscribed) {
        setState('subscribed')
      } else {
        setState('not-subscribed')
      }
    } catch {
      setState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleSubscribe = async () => {
    setState('subscribing')
    try {
      const res = await fetch('/.netlify/functions/subscribe-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'subscribe' }),
      })
      const data = await res.json()

      if (data.success) {
        setState('subscribed-new')
      } else {
        setState('error')
        setErrorMessage('Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-obsidian/80 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-[#F2EDE4] rounded-sm p-8 sm:p-10 shadow-2xl">

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-obsidian/40 hover:text-obsidian transition-colors duration-200"
        >
          <X size={20} />
        </button>

        {/* Session info — always visible */}
        <div className="mb-6">
          <p className="font-space-mono text-[#C4622D] text-xs tracking-widest uppercase mb-2">
            INSIDER SESSION
          </p>
          <h2 className="font-bebas text-obsidian text-3xl sm:text-4xl tracking-tight mb-1">
            {session.title}
          </h2>
          <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-4">
            {session.duration}
          </p>
          <p className="font-dm-sans text-obsidian/70 text-sm leading-relaxed font-light">
            {session.description}
          </p>
        </div>

        <div className="h-px bg-obsidian/10 mb-6" />

        {/* LANDING STATE — two CTAs */}
        {state === 'landing' && (
          <div className="space-y-4">
            <a
              href={session.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 rounded bg-[#C4622D] text-[#F2EDE4] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              LISTEN FOR €5.99
            </a>
            <button
              onClick={() => setState('entering-email')}
              className="block w-full text-center px-6 py-3 rounded bg-[#B89050] text-[#F2EDE4] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              FREE FOR DOJO SUBSCRIBERS
            </button>
          </div>
        )}

        {/* ENTERING EMAIL STATE — form only, no result yet */}
        {(state === 'entering-email' || state === 'checking') && (
          <div className="space-y-4">
            <p className="font-dm-sans text-obsidian text-sm leading-relaxed font-light">
              Enter your email. If you&apos;re subscribed to the Dojo, you&apos;ll get instant access.
            </p>
            <form onSubmit={handleCheck} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'checking'}
                required
                className="px-4 py-3 bg-obsidian/5 border border-obsidian/20 rounded text-obsidian placeholder-obsidian/30 font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C4622D]/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state === 'checking'}
                className="px-6 py-3 rounded bg-[#C4622D] text-[#F2EDE4] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {state === 'checking' ? 'CHECKING...' : 'ACCESS MY SESSION'}
              </button>
            </form>
            <button
              onClick={() => setState('landing')}
              className="font-space-mono text-obsidian/40 text-xs tracking-widest uppercase hover:text-obsidian transition-colors"
            >
              ← BACK
            </button>
          </div>
        )}

        {/* NOT SUBSCRIBED STATE — check completed, email not on list */}
        {state === 'not-subscribed' && (
          <div className="space-y-4">
            <p className="font-dm-sans text-obsidian text-sm leading-relaxed font-light">
              That email isn&apos;t on the list yet. Subscribe free to access this session and everything in the Dojo.
            </p>
            <button
              onClick={handleSubscribe}
              className="block w-full text-center px-6 py-3 rounded bg-[#B89050] text-[#F2EDE4] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              JOIN THE DOJO FREE
            </button>
            <a
              href={session.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 rounded border border-obsidian/20 text-obsidian font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:border-obsidian"
            >
              LISTEN FOR €5.99
            </a>
            <button
              onClick={() => setState('entering-email')}
              className="font-space-mono text-obsidian/40 text-xs tracking-widest uppercase hover:text-obsidian transition-colors"
            >
              ← TRY A DIFFERENT EMAIL
            </button>
          </div>
        )}

        {/* SUBSCRIBED STATE — audio player */}
        {state === 'subscribed' && (
          <div className="space-y-4">
            <p className="font-space-mono text-[#C4622D] text-xs tracking-widest uppercase">
              YOU&apos;RE IN THE DOJO.
            </p>
            <p className="font-dm-sans text-obsidian text-sm leading-relaxed font-light">
              Press play when you&apos;re ready.
            </p>
            <audio
              controls
              className="w-full rounded"
              style={{ accentColor: '#C4622D' }}
              preload="metadata"
              onPlay={() => trackPlay(session.title, 'subscriber')}
            >
              <source src={session.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* SUBSCRIBING STATE */}
        {state === 'subscribing' && (
          <div className="space-y-4">
            <p className="font-space-mono text-obsidian/40 text-xs tracking-widest uppercase">
              JOINING...
            </p>
          </div>
        )}

        {/* NEWLY SUBSCRIBED STATE — show player */}
        {state === 'subscribed-new' && (
          <div className="space-y-4">
            <p className="font-space-mono text-[#C4622D] text-xs tracking-widest uppercase">
              WELCOME TO THE DOJO.
            </p>
            <p className="font-dm-sans text-obsidian text-sm leading-relaxed font-light">
              You&apos;re now subscribed. Check your inbox for the welcome email. Press play when you&apos;re ready.
            </p>
            <audio
              controls
              className="w-full rounded"
              style={{ accentColor: '#C4622D' }}
              preload="metadata"
              onPlay={() => trackPlay(session.title, 'new_subscriber')}
            >
              <source src={session.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* ERROR STATE */}
        {state === 'error' && (
          <div className="space-y-4">
            <p className="font-dm-sans text-obsidian text-sm">{errorMessage}</p>
            <button
              onClick={() => setState('landing')}
              className="font-space-mono text-obsidian/40 text-xs tracking-widest uppercase hover:text-obsidian transition-colors"
            >
              ← TRY AGAIN
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
