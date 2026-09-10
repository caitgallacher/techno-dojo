'use client'

import { useEffect, useRef, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

// ── Utility: respect prefers-reduced-motion ──────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// ── Utility: intersection observer trigger ───────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0C0C0A] border border-[#6B6B62]/30 rounded-sm px-3 py-2">
        <p className="font-space-mono text-[#9A9A92] text-xs mb-1">{label}</p>
        {payload.map((e: any, i: number) => (
          <p key={i} className="font-dm-sans text-xs" style={{ color: e.color }}>
            {e.name}: {e.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// ── Dot Grid — 23 respondents ─────────────────────────────────────────────────
function DotGrid({ highlighted, label, color = '#C4622D' }: {
  highlighted: number; label: string; color?: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView(0.3)
  const dots = Array.from({ length: 23 }, (_, i) => i)

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {dots.map((i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full transition-all"
            style={{
              backgroundColor: i < highlighted
                ? color
                : '#2a2a28',
              transitionDuration: reduced ? '0ms' : `${200 + i * 40}ms`,
              transitionDelay: inView && !reduced ? `${i * 30}ms` : '0ms',
              transform: inView ? 'scale(1)' : reduced ? 'scale(1)' : 'scale(0.3)',
              opacity: inView ? 1 : reduced ? 1 : 0,
            }}
          />
        ))}
      </div>
      <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">
        {highlighted} of 23 — {label}
      </p>
    </div>
  )
}

// ── Seam visual ───────────────────────────────────────────────────────────────
function SeamBlock({ left, right, expanded = false, showProduct = false }: {
  left: string; right: string; expanded?: boolean; showProduct?: boolean
}) {
  return (
    <div className="flex items-stretch gap-0 w-full rounded-sm overflow-hidden">
      <div className="flex-1 bg-[#1a1a18] border border-[#2a2a28] px-4 py-3 flex items-center">
        <span className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{left}</span>
      </div>
      <div
        className="flex items-center justify-center transition-all duration-700 ease-in-out flex-shrink-0"
        style={{ width: expanded ? (showProduct ? '120px' : '48px') : '8px', background: expanded ? 'transparent' : '#0C0C0A' }}
      >
        {showProduct && (
          <div className="border border-[#B89050]/60 rounded-sm px-2 py-1 bg-[#B89050]/10 text-center">
            <p className="font-space-mono text-[#B89050] text-[9px] tracking-widest uppercase leading-tight">TRANSITION<br />POINT</p>
          </div>
        )}
        {expanded && !showProduct && (
          <div className="w-px h-full bg-[#C4622D]/40" />
        )}
      </div>
      <div className="flex-1 bg-[#1a1a18] border border-[#2a2a28] px-4 py-3 flex items-center justify-end">
        <span className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{right}</span>
      </div>
    </div>
  )
}

// ── Animated seam sequence ────────────────────────────────────────────────────
function AnimatedSeams() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView(0.2)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!inView || reduced) { if (reduced) setStage(3); return }
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced])

  const pairs = [
    { left: 'MEETING', right: 'DEEP WORK' },
    { left: 'WORK', right: 'HOME' },
    { left: 'HARD CONVERSATION', right: 'WHAT COMES NEXT' },
    { left: 'BEFORE SOMETHING IMPORTANT', right: 'ARRIVE' },
  ]

  return (
    <div ref={ref} className="space-y-3">
      {pairs.map(({ left, right }, i) => (
        <SeamBlock
          key={i}
          left={left}
          right={right}
          expanded={stage >= 1}
          showProduct={stage >= 3}
        />
      ))}
    </div>
  )
}

// ── Reach vs Restore chart ────────────────────────────────────────────────────
const reachRestoreData = [
  { activity: 'Exercise', reach: 20, restore: 18 },
  { activity: 'Sleep', reach: 14, restore: 14 },
  { activity: 'Nature / outside', reach: 12, restore: 11 },
  { activity: 'Phone / social media', reach: 12, restore: 0 },
  { activity: 'TV / movies', reach: 11, restore: 1 },
]

// ── Format friction data ──────────────────────────────────────────────────────
const formatData = [
  { label: 'Backed by real science', n: 14 },
  { label: 'Fits my schedule', n: 12 },
  { label: 'Under 10 minutes', n: 9 },
  { label: 'Alongside work/training', n: 9 },
  { label: 'Completely alone', n: 8 },
]

// ── Netlify form CTA ──────────────────────────────────────────────────────────
const chipOptions = [
  'BETWEEN MEETINGS',
  'WORK → HOME',
  'BEFORE SOMETHING IMPORTANT',
  'AFTER SOMETHING DIFFICULT',
  'BEFORE SLEEP',
  'OTHER',
]

function ResearchCTA() {
  const [selected, setSelected] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const toggle = (chip: string) => {
    setSelected(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/.netlify/functions/subscribe-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          action: 'subscribe',
          fields: { transition_moments: selected.join(', ') },
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
        setSubmitting(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="font-bebas text-[#B89050] text-4xl tracking-tight">YOU&apos;RE ON THE LIST.</p>
        <p className="font-dm-sans text-[#9A9A92] text-sm font-light">
          We&apos;ll reach out when Transition Points is ready for early access.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div className="flex flex-wrap gap-3">
        {chipOptions.map(chip => (
          <button
            key={chip}
            type="button"
            onClick={() => toggle(chip)}
            className="px-4 py-2 rounded-sm font-space-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              background: selected.includes(chip) ? '#C4622D' : 'transparent',
              color: selected.includes(chip) ? '#F2EDE4' : '#9A9A92',
              border: `1px solid ${selected.includes(chip) ? '#C4622D' : '#6B6B62'}`,
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-md">
        <p className="font-bebas text-[#F2EDE4] text-2xl tracking-tight">
          WANT TO BE ONE OF THE FIRST TO TRY IT?
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 bg-[#1a1a18] border border-[#6B6B62]/40 rounded-sm text-[#F2EDE4] placeholder-[#6B6B62] font-dm-sans text-sm focus:outline-none focus:border-[#C4622D]/60"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-3 rounded-sm bg-[#C4622D] text-[#F2EDE4] font-space-mono text-xs tracking-widest uppercase transition-all duration-200 hover:bg-[#b35828] disabled:opacity-50"
          >
            {submitting ? '...' : 'GET EARLY ACCESS'}
          </button>
        </div>
                {error && <p className="font-dm-sans text-[#C4622D] text-xs">{error}</p>}
      </div>
    </form>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ResearchFindingsPage() {
  const reduced = useReducedMotion()

  // Hero animation
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroStage, setHeroStage] = useState(0)
  useEffect(() => {
    if (reduced) { setHeroStage(3); return }
    const t1 = setTimeout(() => setHeroStage(1), 300)
    const t2 = setTimeout(() => setHeroStage(2), 900)
    const t3 = setTimeout(() => setHeroStage(3), 1600)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [reduced])

  // Dot grid stage 2 — coexistence
  const [dotStage, setDotStage] = useState<'stress' | 'coexist'>('stress')
  const dotRef = useRef<HTMLDivElement>(null)
  const [dotInView, setDotInView] = useState(false)
  useEffect(() => {
    const el = dotRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDotInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!dotInView || reduced) { if (reduced) setDotStage('coexist'); return }
    const t = setTimeout(() => setDotStage('coexist'), 1200)
    return () => clearTimeout(t)
  }, [dotInView, reduced])

  return (
    <main className="min-h-screen bg-[#0C0C0A]">
      <Navigation />

      {/* ── SECTION 1 · HERO ───────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-4 md:px-8" ref={heroRef}>
        <div className="max-w-6xl mx-auto">

          <p
            className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-10 transition-all duration-500"
            style={{ opacity: heroStage >= 1 ? 1 : 0, transform: heroStage >= 1 ? 'none' : 'translateY(8px)' }}
          >
            RESEARCH FINDINGS · 2026
          </p>

          <h1
            className="font-bebas text-[#F2EDE4] text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tight mb-16 transition-all duration-700"
            style={{ opacity: heroStage >= 1 ? 1 : 0, transform: heroStage >= 1 ? 'none' : 'translateY(16px)' }}
          >
            YOU BELIEVE<br />IN REST.
          </h1>

          {/* Asymmetric belief → contradiction layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-10">

            {/* Left: WHAT WE BELIEVE — two smaller stats */}
            <div
              className="lg:col-span-2 border border-[#2a2a28] rounded-sm p-6 space-y-6 transition-all duration-700"
              style={{ opacity: heroStage >= 2 ? 1 : 0, transform: heroStage >= 2 ? 'none' : 'translateY(12px)' }}
            >
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase">WHAT WE BELIEVE</p>
              <div className="space-y-4">
                <div>
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none">83%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-sm font-light mt-1 leading-relaxed">
                    said adequate rest strongly affects how well they perform
                  </p>
                </div>
                <div className="h-px bg-[#2a2a28]" />
                <div>
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none">87%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-sm font-light mt-1 leading-relaxed">
                    said it strongly affects how they feel emotionally
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow connector */}
            <div
              className="hidden lg:flex items-center justify-center transition-all duration-500"
              style={{ opacity: heroStage >= 3 ? 1 : 0 }}
            >
              <div className="text-[#C4622D] font-bebas text-2xl tracking-widest">AND YET →</div>
            </div>

            {/* Right: THE CONTRADICTION — dominant */}
            <div
              className="lg:col-span-2 bg-[#C4622D]/10 border border-[#C4622D]/40 rounded-sm p-6 flex flex-col justify-center transition-all duration-700"
              style={{ opacity: heroStage >= 3 ? 1 : 0, transform: heroStage >= 3 ? 'none' : 'translateY(12px)' }}
            >
              <div className="font-bebas text-[#C4622D] text-8xl sm:text-9xl leading-none mb-3">91%</div>
              <p className="font-dm-sans text-[#F2EDE4] text-base font-light leading-relaxed">
                keep pushing at least sometimes — even when they believe rest would help
              </p>
            </div>
          </div>

          {/* Supporting detail */}
          <div
            className="border-l-2 border-[#C4622D]/30 pl-4 mb-12 transition-all duration-700"
            style={{ opacity: heroStage >= 3 ? 1 : 0 }}
          >
            <p className="font-dm-sans text-[#6B6B62] text-sm font-light leading-relaxed">
              18 of 23 respondents rated rest as highly important for both performance and emotional wellbeing.
              16 of those 18 still pushed through at least sometimes when they believed rest would help.
            </p>
          </div>

          {/* First conclusion */}
          <div
            className="transition-all duration-700"
            style={{ opacity: heroStage >= 3 ? 1 : 0 }}
          >
            <p className="font-bebas text-[#F2EDE4] text-4xl sm:text-5xl tracking-tight">
              KNOWING ISN&apos;T THE PROBLEM.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 · INTENSITY ISN'T A BAD LIFE ─────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-6">
                AN INTENSE LIFE ISN&apos;T A BAD LIFE.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-4">
                Stress wasn&apos;t replacing what made life feel good. Both were happening in the same lives, in the same weeks.
              </p>
              <p className="font-bebas text-[#F2EDE4] text-2xl tracking-tight mt-8">
                INTENSITY AND POSITIVE EMOTION CAN COEXIST.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-sm font-light mt-2">
                The goal isn&apos;t necessarily less intensity.
              </p>

              {/* Secondary metrics — small, subordinate */}
              <div className="grid grid-cols-2 gap-2 mt-8">
                {[
                  { n: '91%', label: 'curiosity or excitement weekly+' },
                  { n: '83%', label: 'joy or lightheartedness weekly+' },
                  { n: '83%', label: 'connection to others weekly+' },
                  { n: '65%', label: 'accomplishment or pride weekly+' },
                ].map(({ n, label }) => (
                  <div key={label} className="border border-[#2a2a28] rounded-sm p-3">
                    <div className="font-bebas text-[#B89050] text-2xl leading-none">{n}</div>
                    <p className="font-dm-sans text-[#6B6B62] text-xs font-light mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot grid — animates from stress → coexistence */}
            <div ref={dotRef}>
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">
                {dotStage === 'stress' ? '20 OF 23 — GENERAL STRESS AT LEAST WEEKLY' : '19 OF 23 — BOTH STRESS AND CURIOSITY/EXCITEMENT WEEKLY'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: 23 }, (_, i) => {
                  const isStress = i < 20
                  const isCoexist = i < 19
                  let bg = '#2a2a28'
                  if (dotStage === 'stress' && isStress) bg = '#C4622D'
                  if (dotStage === 'coexist') {
                    if (isCoexist) bg = '#B89050'
                    else if (isStress) bg = '#C4622D'
                  }
                  return (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full transition-all duration-500"
                      style={{ backgroundColor: bg, transitionDelay: reduced ? '0ms' : `${i * 25}ms` }}
                    />
                  )
                })}
              </div>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C4622D]" />
                  <span className="font-dm-sans text-[#6B6B62] text-xs">stress only</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#B89050]" />
                  <span className="font-dm-sans text-[#6B6B62] text-xs">stress + excitement coexisting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 · RECOVERY ISN'T INTEGRATED ───────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-12">
            RECOVERY ISN&apos;T BUILT INTO THE DAY.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* 23-unit segmented strip */}
            <div>
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">
                HOW PUSHING AND RECOVERING FIT TOGETHER — n=23
              </p>
              {[
                { label: 'Comes in waves', n: 6, color: '#9A9A92' },
                { label: 'Depends on the season of life', n: 6, color: '#9A9A92' },
                { label: 'Feels like a trade-off', n: 5, color: '#9A9A92' },
                { label: 'Fit together easily', n: 3, color: '#F2EDE4' },
                { label: "Hadn't thought about it this way", n: 3, color: '#6B6B62' },
              ].map(({ label, n, color }) => (
                <div key={label} className="mb-3">
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 23 }, (_, i) => (
                      <div
                        key={i}
                        className="h-3 flex-1 rounded-sm transition-colors duration-300"
                        style={{ backgroundColor: i < n ? color : '#1a1a18' }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bebas text-[#F2EDE4] text-lg leading-none">{n}</span>
                    <span className="font-dm-sans text-[#6B6B62] text-xs font-light">{label}</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 border border-[#C4622D]/30 rounded-sm p-4 bg-[#C4622D]/5">
                <div className="font-bebas text-[#C4622D] text-4xl leading-none mb-1">ONLY 3 OF 23</div>
                <p className="font-dm-sans text-[#F2EDE4] text-sm font-light">said pushing hard and recovering fit together easily.</p>
              </div>
            </div>

            {/* Managing vs preventing */}
            <div>
              <h3 className="font-bebas text-[#F2EDE4] text-3xl sm:text-4xl leading-none tracking-tight mb-6">
                WE&apos;RE BETTER AT DEALING WITH STRESS THAN PREVENTING IT.
              </h3>
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">
                RATED THEMSELVES 1–2 OUT OF 5 (INEFFECTIVE)
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-dm-sans text-[#9A9A92] text-sm font-light">Managing stress once present</span>
                    <span className="font-bebas text-[#F2EDE4] text-2xl">5 / 23</span>
                  </div>
                  <div className="h-2 bg-[#1a1a18] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9A9A92] rounded-full" style={{ width: `${(5/23)*100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-dm-sans text-[#9A9A92] text-sm font-light">Preventing stress from building</span>
                    <span className="font-bebas text-[#C4622D] text-2xl">14 / 23</span>
                  </div>
                  <div className="h-2 bg-[#1a1a18] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4622D] rounded-full" style={{ width: `${(14/23)*100}%` }} />
                  </div>
                </div>
              </div>

              <p className="font-playfair text-[#F2EDE4] text-xl italic leading-relaxed mt-8">
                Recovery often becomes reactive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 · A BREAK ISN'T ALWAYS RECOVERY ───────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-4">
                A BREAK ISN&apos;T ALWAYS RECOVERY.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-8">
                What people reached for when stressed and what they said usually left them restored were not always the same.
              </p>

              {/* The phone callout — hero of this section */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-5">
                  <div className="font-bebas text-[#C4622D] text-5xl leading-none mb-2">12 / 23</div>
                  <p className="font-dm-sans text-[#F2EDE4] text-sm font-light leading-relaxed">reached for phone or social media when stressed</p>
                </div>
                <div className="border border-[#2a2a28] rounded-sm p-5">
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none mb-2">0 / 23</div>
                  <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed">selected it as something that usually left them restored</p>
                </div>
              </div>
              <p className="font-dm-sans text-[#6B6B62] text-xs font-light italic">
                Reflects respondents&apos; own reported experience, not proof of objective effectiveness.
              </p>
            </div>

            {/* Reach vs restore chart */}
            <div>
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">
                REACHED FOR WHEN STRESSED VS. SELECTED AS USUALLY RESTORATIVE — out of 23
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachRestoreData} layout="vertical" barGap={2} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 23]} tick={{ fill: '#6B6B62', fontSize: 10, fontFamily: 'Space Mono' }} tickFormatter={v => `${v}`} />
                    <YAxis type="category" dataKey="activity" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'DM Sans', width: 130 }} width={140} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reach" name="Reached for" fill="#C4622D" radius={[0, 2, 2, 0]} />
                    <Bar dataKey="restore" name="Usually restorative" fill="#B89050" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · FORMAT FRICTION ──────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-4">
            THE FORMAT IS THE FRICTION.
          </h2>
          <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-12 max-w-xl">
            People weren&apos;t rejecting recovery. A recurring issue was that existing practices didn&apos;t fit how they lived.
          </p>

          {/* Two dominant friction cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-8">
              <div className="font-bebas text-[#C4622D] text-6xl leading-none mb-3">7 OF 12</div>
              <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight tracking-tight">DIDN&apos;T FIT MY SCHEDULE</p>
            </div>
            <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-8">
              <div className="font-bebas text-[#C4622D] text-6xl leading-none mb-3">7 OF 12</div>
              <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight tracking-tight">TOO SLOW OR PASSIVE FOR HOW I LIVE</p>
            </div>
          </div>
          <p className="font-dm-sans text-[#6B6B62] text-xs font-light italic mb-12">
            Among respondents with experience of wellness or recovery practices who answered this question.
          </p>

          {/* Product requirements — peer metrics row */}
          <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-4">
            WHAT WOULD MAKE A PRACTICE MORE APPEALING — out of 23
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formatData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 23]} tick={{ fill: '#6B6B62', fontSize: 10, fontFamily: 'Space Mono' }} />
                <YAxis type="category" dataKey="label" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'DM Sans', width: 150 }} width={160} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="n" name="Respondents" radius={[0, 2, 2, 0]}>
                  {formatData.map((_, i) => (
                    <Cell key={i} fill={i < 2 ? '#C4622D' : '#6B6B62'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · DESIGN REQUIREMENTS BRIDGE ───────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">WHAT THAT GAVE US</p>
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-12">
            THE PRACTICE HAS TO FIT THE LIFE.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { word: 'SHORT.', sub: 'Under 90 seconds.' },
              { word: 'CONTEXTUAL.', sub: 'Tied to a specific moment.' },
              { word: 'CREDIBLE.', sub: 'Backed by real science.' },
              { word: 'NO NEW\nCALENDAR BLOCK.', sub: 'It attaches to what already happens.' },
            ].map(({ word, sub }) => (
              <div key={word} className="border border-[#2a2a28] rounded-sm p-5 space-y-2">
                <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight whitespace-pre-line">{word}</p>
                <p className="font-dm-sans text-[#6B6B62] text-xs font-light leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 · SECONDARY RESEARCH / THE SEAM ────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-6">
            SO WE LOOKED BETWEEN THINGS.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-6">
                The survey told us recovery struggled to find a reliable place inside demanding days. Research on attention, role transitions, habits, and short breaks pointed toward an overlooked part of the day: the thresholds between one context and the next.
              </p>
              <div className="border-l-2 border-[#B89050]/40 pl-4 space-y-2 mb-8">
                <p className="font-dm-sans text-[#6B6B62] text-xs font-light">Attention residue when switching tasks</p>
                <p className="font-dm-sans text-[#6B6B62] text-xs font-light">Role and boundary transitions</p>
                <p className="font-dm-sans text-[#6B6B62] text-xs font-light">Stable context cues and habit formation</p>
                <p className="font-dm-sans text-[#6B6B62] text-xs font-light">Micro-break research</p>
              </div>
              <div className="border border-[#B89050]/30 rounded-sm p-4 bg-[#B89050]/5">
                <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed">
                  <span className="text-[#F2EDE4]">The literature gave us a place to look.</span> Not a finished answer.
                </p>
              </div>
            </div>

            {/* Seam animation */}
            <div>
              <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-6">
                THE TRANSITION IS ALREADY THERE
              </p>
              <AnimatedSeams />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 · PRODUCT REVEAL ────────────────────────────────────── */}
      <section className="py-32 px-4 md:px-8 bg-[#2E3D28]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-8">WHAT WE&apos;RE BUILDING</p>

          <h2 className="font-bebas text-[#F2EDE4] text-7xl sm:text-8xl lg:text-[10rem] leading-none tracking-tight mb-6">
            TRANSITION<br />POINTS
          </h2>

          <p className="font-space-mono text-[#B89050] text-sm tracking-widest uppercase mb-12">
            60–90 SECONDS TO ARRIVE IN WHAT COMES NEXT.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-dm-sans text-[#F2EDE4] text-lg font-light leading-relaxed mb-4">
                Short guided audio practices built for the threshold moments already inside a demanding day.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-8">
                Instead of asking you to schedule another routine, each practice attaches to a context shift that already happens. Between two meetings. Before you walk through the door at home. After a hard conversation. At the start of something important.
              </p>
              <div className="space-y-3 border-t border-[#F2EDE4]/10 pt-8">
                <p className="font-bebas text-[#F2EDE4] text-3xl sm:text-4xl leading-tight tracking-tight">
                  THEY DON&apos;T ASK YOU TO STOP.
                </p>
                <p className="font-bebas text-[#B89050] text-3xl sm:text-4xl leading-tight tracking-tight">
                  THEY TRAIN YOU TO ARRIVE.
                </p>
              </div>
            </div>

            {/* Context flow examples */}
            <div className="space-y-4">
              {[
                { top: 'MEETING', bottom: 'DEEP WORK' },
                { top: 'WORK', bottom: 'HOME' },
                { top: 'HARD CONVERSATION', bottom: 'WHAT COMES NEXT' },
                { top: 'BEFORE SOMETHING IMPORTANT', bottom: 'ARRIVE' },
              ].map(({ top, bottom }) => (
                <div key={top} className="flex flex-col items-center gap-1">
                  <div className="w-full bg-[#1a2e16] border border-[#F2EDE4]/10 rounded-sm px-4 py-2 text-center">
                    <span className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{top}</span>
                  </div>
                  <div className="border border-[#B89050]/60 bg-[#B89050]/10 rounded-sm px-6 py-2 text-center w-48">
                    <span className="font-space-mono text-[#B89050] text-xs tracking-widest uppercase">TRANSITION POINT</span>
                  </div>
                  <div className="w-full bg-[#1a2e16] border border-[#F2EDE4]/10 rounded-sm px-4 py-2 text-center">
                    <span className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{bottom}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9 · CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-4xl sm:text-5xl leading-none tracking-tight mb-4">
            WHERE IN YOUR DAY DO YOU MOST NEED A MOMENT TO ARRIVE?
          </h2>
          <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed mb-10">
            Select everything that applies.
          </p>
          <ResearchCTA />
        </div>
      </section>

      {/* ── METHODOLOGY FOOTER ────────────────────────────────────────────── */}
      <section className="py-12 px-4 md:px-8 border-t border-[#2a2a28]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#6B6B62] text-xs tracking-widest uppercase mb-4">EXPLORATORY RESEARCH</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-bebas text-[#9A9A92] text-lg mb-1">SURVEY</p>
              <p className="font-dm-sans text-[#6B6B62] text-xs font-light leading-relaxed">
                n=23. Exploratory, not statistically representative. Percentages refer to the survey sample unless otherwise stated. Directional findings only.
              </p>
            </div>
            <div>
              <p className="font-bebas text-[#9A9A92] text-lg mb-1">INTERVIEWS</p>
              <p className="font-dm-sans text-[#6B6B62] text-xs font-light leading-relaxed">
                Qualitative interviews to explore themes in depth. Participant quotes are not published without explicit permission.
              </p>
            </div>
            <div>
              <p className="font-bebas text-[#9A9A92] text-lg mb-1">SECONDARY RESEARCH</p>
              <p className="font-dm-sans text-[#6B6B62] text-xs font-light leading-relaxed">
                Published literature on attention residue, role transitions, micro-breaks, and habit formation. This informed product direction, not claimed as proof of effect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}