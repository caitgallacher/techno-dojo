'use client'

import { useEffect, useRef, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'

// ── prefers-reduced-motion ───────────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handleChange = () => setReduced(mq.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])
  return reduced
}

// ── intersection observer ────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── coexistence percentage visual ────────────────────────────────────────────
function CoexistDots() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView(0.2)

  const bothPct = 83
  const stressOnlyPct = 4
  const stressTotalPct = bothPct + stressOnlyPct

  return (
    <div>
      <div
        ref={ref}
        className="flex gap-1.5 items-center flex-wrap"
        role="img"
        aria-label="83% reported both weekly stress and weekly curiosity or excitement; 4% reported weekly stress without weekly curiosity or excitement"
      >
        {Array.from({ length: 10 }, (_, i) => {
          const segmentStart = i * 10
          const segmentEnd = segmentStart + 10
          const bothShare = Math.max(0, Math.min(segmentEnd, bothPct) - Math.max(segmentStart, 0)) * 10
          const stressOnlyShare = Math.max(0, Math.min(segmentEnd, stressTotalPct) - Math.max(segmentStart, bothPct)) * 10
          const filledShare = bothShare + stressOnlyShare

          let background = 'transparent'
          if (bothShare === 100) background = '#B89050'
          else if (stressOnlyShare === 100) background = '#C4622D'
          else if (filledShare > 0) {
            background = `linear-gradient(90deg, #B89050 0% ${bothShare}%, #C4622D ${bothShare}% ${filledShare}%, transparent ${filledShare}% 100%)`
          }

          return (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-[#6B6B62] transition-all duration-500 flex-shrink-0"
              style={{
                background,
                transitionDelay: inView && !reduced ? `${i * 60}ms` : '0ms',
                opacity: inView ? 1 : reduced ? 1 : 0,
                transform: inView ? 'scale(1)' : reduced ? 'scale(1)' : 'scale(0.4)',
              }}
            />
          )
        })}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#B89050]" />
          <span className="font-dm-sans text-[#9A9A92] text-sm">stress + excitement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#C4622D]" />
          <span className="font-dm-sans text-[#9A9A92] text-sm">stress without excitement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-[#6B6B62]" />
          <span className="font-dm-sans text-[#9A9A92] text-sm">not weekly stress</span>
        </div>
      </div>
    </div>
  )
}

// ── 10-segment percentage visual ─────────────────────────────────────────────
function TenSegments({ pct, color = '#9A9A92' }: { pct: number; color?: string }) {
  const filled = Math.floor(pct / 10)
  const partial = (pct % 10) / 10

  return (
    <div className="flex gap-1 mb-1.5" role="img" aria-label={`${pct}%`}>
      {Array.from({ length: 10 }, (_, i) => {
        const isFilled = i < filled
        const isPartial = i === filled && partial > 0
        return (
          <div
            key={i}
            className="h-3 flex-1 rounded-sm overflow-hidden"
            style={{
              background: isFilled
                ? color
                : isPartial
                ? `linear-gradient(90deg, ${color} ${partial * 100}%, #1a1a18 ${partial * 100}%)`
                : '#1a1a18',
            }}
          />
        )
      })}
    </div>
  )
}

// ── Seam block ───────────────────────────────────────────────────────────────
function SeamBlock({ left, right, expanded = false, showProduct = false }: {
  left: string; right: string; expanded?: boolean; showProduct?: boolean
}) {
  return (
    <div className="flex items-stretch gap-0 w-full rounded-sm overflow-hidden">
      <div className="flex-1 bg-[#1a1a18] border border-[#2a2a28] px-4 py-3 flex items-center">
        <span className="font-space-mono text-[#9A9A92] text-xs sm:text-sm tracking-widest uppercase">{left}</span>
      </div>
      <div
        className="flex items-center justify-center transition-all duration-700 ease-in-out flex-shrink-0"
        style={{ width: expanded ? (showProduct ? '130px' : '48px') : '8px', background: expanded ? 'transparent' : '#0C0C0A' }}
      >
        {showProduct && (
          <div className="border border-[#B89050]/60 rounded-sm px-2 py-1.5 bg-[#B89050]/10 text-center">
            <p className="font-space-mono text-[#B89050] text-[10px] tracking-widest uppercase leading-tight">TRANSITION<br />POINT</p>
          </div>
        )}
        {expanded && !showProduct && <div className="w-px h-full bg-[#C4622D]/40" />}
      </div>
      <div className="flex-1 bg-[#1a1a18] border border-[#2a2a28] px-4 py-3 flex items-center justify-end">
        <span className="font-space-mono text-[#9A9A92] text-xs sm:text-sm tracking-widest uppercase">{right}</span>
      </div>
    </div>
  )
}

function AnimatedSeams() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView(0.2)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setStage(2)
      return
    }

    const t = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1200),
    ]

    return () => t.forEach(clearTimeout)
  }, [inView, reduced])

  return (
    <div ref={ref} className="space-y-3">
      {[
        { left: 'MEETING', right: 'DEEP WORK' },
        { left: 'WORK', right: 'HOME' },
        { left: 'HARD CONVERSATION', right: 'WHAT COMES NEXT' },
        { left: 'BEFORE SOMETHING IMPORTANT', right: 'ARRIVE' },
      ].map(({ left, right }, i) => (
        <SeamBlock
          key={i}
          left={left}
          right={right}
          expanded={stage >= 1}
          showProduct={false}
        />
      ))}
    </div>
  )
}

function ProductTransitionCard({ label, left, right }: { label: string; left: string; right: string }) {
  return (
    <div className="border border-[#F2EDE4]/10 bg-[#1a2e16]/35 rounded-sm p-4 sm:p-5">
      <p className="font-space-mono text-[#B89050] text-xs sm:text-sm tracking-widest uppercase mb-4">{label}</p>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-stretch">
        <div className="min-w-0 bg-[#1a2e16] border border-[#F2EDE4]/10 rounded-sm px-2 sm:px-3 py-3 flex items-center justify-center text-center">
          <span className="font-space-mono text-[#9A9A92] text-[10px] sm:text-xs tracking-widest uppercase leading-relaxed">{left}</span>
        </div>
        <div className="w-[92px] sm:w-[116px] border border-[#B89050]/60 bg-[#B89050]/10 rounded-sm px-2 py-2 flex items-center justify-center text-center">
          <span className="font-space-mono text-[#B89050] text-[9px] sm:text-[10px] tracking-widest uppercase leading-tight">TRANSITION<br />POINT</span>
        </div>
        <div className="min-w-0 bg-[#1a2e16] border border-[#F2EDE4]/10 rounded-sm px-2 sm:px-3 py-3 flex items-center justify-center text-center">
          <span className="font-space-mono text-[#9A9A92] text-[10px] sm:text-xs tracking-widest uppercase leading-relaxed">{right}</span>
        </div>
      </div>
    </div>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0C0C0A] border border-[#6B6B62]/30 rounded-sm px-3 py-2">
      <p className="font-space-mono text-[#9A9A92] text-xs mb-1">{label}</p>
      {payload.map((e: any, i: number) => {
        const color = e.dataKey === 'restore' ? '#B89050' : e.dataKey === 'reach' ? '#C4622D' : '#F2EDE4'
        return <p key={i} className="font-dm-sans text-sm" style={{ color }}>{e.name}: {e.value}%</p>
      })}
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const reachRestoreData = [
  { activity: 'Exercise', reach: 87, restore: 78 },
  { activity: 'Sleep', reach: 61, restore: 61 },
  { activity: 'Nature / outside', reach: 52, restore: 48 },
  { activity: 'Phone / social media', reach: 52, restore: 0 },
  { activity: 'TV / movies', reach: 48, restore: 4 },
]

const formatData = [
  { label: 'Backed by real science', pct: 61 },
  { label: 'Fits my schedule', pct: 52 },
  { label: 'Under 10 minutes', pct: 39 },
  { label: 'Alongside work / training', pct: 39 },
  { label: 'Completely alone', pct: 35 },
]

const chipOptions = ['BETWEEN MEETINGS', 'WORK → HOME', 'BEFORE SOMETHING IMPORTANT', 'AFTER SOMETHING DIFFICULT', 'BEFORE SLEEP', 'OTHER']


const transitionUseCases = [
  { label: 'BETWEEN MEETINGS', left: 'MEETING', right: 'NEXT MEETING' },
  { label: 'WORK → HOME', left: 'WORK', right: 'HOME' },
  { label: 'AFTER SOMETHING DIFFICULT', left: 'HARD CONVERSATION', right: 'WHAT COMES NEXT' },
  { label: 'BEFORE SOMETHING IMPORTANT', left: 'BEFORE', right: 'ARRIVE' },
]

const researchSources = [
  {
    theme: 'ATTENTION RESIDUE',
    citation: 'Leroy, S. (2009). Why is it so hard to do my work? The challenge of attention residue when switching between work tasks.',
    note: 'Switching away from unfinished work can leave attention on the previous task and reduce performance on the next.',
    href: 'https://doi.org/10.1016/j.obhdp.2009.04.002',
  },
  {
    theme: 'ROLE TRANSITIONS',
    citation: 'Ashforth, B. E., Kreiner, G. E., & Fugate, M. (2000). All in a Day’s Work: Boundaries and Micro Role Transitions.',
    note: 'Frames shifts between work, home, and other roles as recurring psychological boundary crossings, not merely changes in schedule.',
    href: 'https://doi.org/10.5465/amr.2000.3363315',
  },
  {
    theme: 'MICRO-BREAKS',
    citation: 'Albulescu, P. et al. (2022). Give me a break! A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance.',
    note: 'Short breaks showed small benefits for vigor and fatigue; overall performance benefits were not statistically significant.',
    href: 'https://doi.org/10.1371/journal.pone.0272460',
  },
  {
    theme: 'CONTEXT + HABIT',
    citation: 'Stojanovic, M. et al. (2022). Context Stability in Habit Building Increases Automaticity and Goal Attainment.',
    note: 'Greater context stability was associated with stronger automaticity and goal attainment during intentional habit formation.',
    href: 'https://doi.org/10.3389/fpsyg.2022.883795',
  },
]

// ── community feedback ──────────────────────────────────────────────────────
function ResearchFeedback() {
  const [selected, setSelected] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const toggle = (chip: string) =>
    setSelected(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (selected.length === 0 && !note.trim()) {
      setError('Choose a moment or leave us a note.')
      return
    }

    if (!email.trim()) {
      setError('Enter your subscriber email so we can attach your note.')
      return
    }

    setSubmitting(true)

    try {
      const feedback = [
        selected.length ? `Moments: ${selected.join(', ')}` : '',
        note.trim() ? `Note: ${note.trim()}` : '',
      ].filter(Boolean).join(' | ')

      const res = await fetch('/.netlify/functions/subscribe-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          action: 'subscribe',
          fields: {
            transition_moments: feedback,
          },
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div className="py-8 space-y-3">
      <p className="font-bebas text-[#B89050] text-5xl tracking-tight">GOT IT.</p>
      <p className="font-dm-sans text-[#9A9A92] text-lg font-light">Thank you for building this with us.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {chipOptions.map(chip => {
          const active = selected.includes(chip)
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(chip)}
              className="px-4 py-2.5 rounded-sm font-space-mono text-sm tracking-wider uppercase transition-all duration-200"
              style={{
                background: active ? '#C4622D' : 'transparent',
                color: active ? '#F2EDE4' : '#9A9A92',
                border: `1px solid ${active ? '#C4622D' : '#6B6B62'}`,
              }}
            >
              {chip}
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        <label htmlFor="research-note" className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase">
          TELL US ABOUT THAT MOMENT
        </label>
        <textarea
          id="research-note"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={5}
          placeholder="What happens there? What would help you arrive differently?"
          className="w-full resize-y px-4 py-3 bg-[#1a1a18] border border-[#6B6B62]/40 rounded-sm text-[#F2EDE4] placeholder-[#7D7D74] font-dm-sans text-base leading-relaxed focus:outline-none focus:border-[#C4622D]/60"
        />
      </div>

      <div className="space-y-2 max-w-lg">
        <label htmlFor="research-email" className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase">
          SUBSCRIBER EMAIL
        </label>
        <input
          id="research-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-3 bg-[#1a1a18] border border-[#6B6B62]/40 rounded-sm text-[#F2EDE4] placeholder-[#7D7D74] font-dm-sans text-base focus:outline-none focus:border-[#C4622D]/60"
        />
        <p className="font-dm-sans text-[#7D7D74] text-sm font-light">
          Just so we can attach your note to your subscriber profile.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-3 rounded-sm bg-[#C4622D] text-[#F2EDE4] font-space-mono text-sm tracking-widest uppercase transition-all duration-200 hover:bg-[#b35828] disabled:opacity-50"
      >
        {submitting ? 'SENDING...' : 'LEAVE US A NOTE'}
      </button>

      {error && <p className="font-dm-sans text-[#C4622D] text-sm">{error}</p>}
    </form>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ResearchFindingsPage() {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroStage, setHeroStage] = useState(0)
  useEffect(() => {
    if (reduced) { setHeroStage(3); return }
    const t = [setTimeout(() => setHeroStage(1), 300), setTimeout(() => setHeroStage(2), 900), setTimeout(() => setHeroStage(3), 1600)]
    return () => t.forEach(clearTimeout)
  }, [reduced])

  return (
    <main className="min-h-screen bg-[#0C0C0A]">
      <Navigation />

      {/* ── S1 · HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-4 md:px-8" ref={heroRef}>
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-10 transition-all duration-500"
            style={{ opacity: heroStage >= 1 ? 1 : 0, transform: heroStage >= 1 ? 'none' : 'translateY(8px)' }}>
            RESEARCH FINDINGS · 2026
          </p>
          <h1 className="font-bebas text-[#F2EDE4] text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tight mb-16 transition-all duration-700"
            style={{ opacity: heroStage >= 1 ? 1 : 0, transform: heroStage >= 1 ? 'none' : 'translateY(16px)' }}>
            YOU BELIEVE<br />IN REST.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-10">
            {/* BELIEF — two smaller stats grouped */}
            <div className="lg:col-span-2 border border-[#2a2a28] rounded-sm p-6 space-y-6 transition-all duration-700"
              style={{ opacity: heroStage >= 2 ? 1 : 0, transform: heroStage >= 2 ? 'none' : 'translateY(12px)' }}>
              <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase">WHAT WE BELIEVE</p>
              <div className="space-y-5">
                <div>
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none">83%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-base font-light mt-1 leading-relaxed">
                    said adequate rest strongly affects how well they perform
                  </p>
                </div>
                <div className="h-px bg-[#2a2a28]" />
                <div>
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none">87%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-base font-light mt-1 leading-relaxed">
                    said it strongly affects how they feel emotionally
                  </p>
                </div>
              </div>
            </div>

            {/* AND YET connector */}
            <div className="hidden lg:flex items-center justify-center transition-all duration-500"
              style={{ opacity: heroStage >= 3 ? 1 : 0 }}>
              <div className="text-[#C4622D] font-bebas text-2xl tracking-widest text-center leading-tight">AND<br />YET →</div>
            </div>

            {/* CONTRADICTION — dominant */}
            <div className="lg:col-span-2 bg-[#C4622D]/10 border border-[#C4622D]/40 rounded-sm p-6 flex flex-col justify-center transition-all duration-700"
              style={{ opacity: heroStage >= 3 ? 1 : 0, transform: heroStage >= 3 ? 'none' : 'translateY(12px)' }}>
              <div className="font-bebas text-[#C4622D] text-8xl sm:text-9xl leading-none mb-3">91%</div>
              <p className="font-dm-sans text-[#F2EDE4] text-lg font-light leading-relaxed">
                keep pushing at least sometimes, even when they believe rest would help
              </p>
            </div>
          </div>

          <div className="mt-12 transition-all duration-700" style={{ opacity: heroStage >= 3 ? 1 : 0 }}>
            <p className="font-bebas text-[#F2EDE4] text-4xl sm:text-5xl tracking-tight">
              KNOWING ISN&apos;T THE PROBLEM.
            </p>
          </div>
        </div>
      </section>

      {/* ── S2 · INTENSITY ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-6">
                AN INTENSE LIFE ISN&apos;T A BAD LIFE.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-4">
                Stress wasn&apos;t replacing what made life feel good. Both were happening in the same lives, in the same weeks.
              </p>
              <p className="font-bebas text-[#F2EDE4] text-2xl tracking-tight mt-8">
                INTENSITY AND POSITIVE EMOTION CAN COEXIST.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-base font-light mt-2">
                Less intensity wasn&apos;t the obvious answer.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-8">
                {[{ n: '91%', label: 'curiosity or excitement weekly' }, { n: '83%', label: 'joy or lightheartedness weekly' }, { n: '83%', label: 'connection to others weekly' }, { n: '65%', label: 'accomplishment or pride weekly' }]
                  .map(({ n, label }) => (
                    <div key={label} className="border border-[#2a2a28] rounded-sm p-3">
                      <div className="font-bebas text-[#B89050] text-2xl leading-none">{n}</div>
                      <p className="font-dm-sans text-[#7D7D74] text-sm font-light mt-1">{label}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Coexistence visual: same population, three states */}
            <div>
              <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-3">
                STRESS + CURIOSITY / EXCITEMENT · BOTH WEEKLY
              </p>
              <div className="font-bebas text-[#B89050] text-7xl sm:text-8xl leading-none mb-2">83%</div>
              <p className="font-dm-sans text-[#F2EDE4] text-lg font-light leading-relaxed mb-6 max-w-md">
                experienced both weekly stress and weekly curiosity or excitement.
              </p>
              <CoexistDots />
              <p className="font-dm-sans text-[#7D7D74] text-sm font-light mt-5">
                Only <span className="text-[#C4622D]">4%</span> reported weekly stress without weekly curiosity or excitement.
              </p>
              <p className="font-dm-sans text-[#7D7D74] text-sm font-light mt-2 italic">
                Each circle represents 10 percentage points; the split circle preserves the underlying percentages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── S3 · RECOVERY ISN'T BUILT IN ─────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-12">
            RECOVERY ISN&apos;T BUILT INTO THE DAY.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Segmented strip — percentages */}
            <div>
              <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-6">
                HOW PUSHING AND RECOVERING FIT TOGETHER
              </p>
              {[
                { label: 'Comes in waves', pct: 26, color: '#9A9A92' },
                { label: 'Depends on season of life', pct: 26, color: '#9A9A92' },
                { label: 'Feels like a trade-off', pct: 22, color: '#9A9A92' },
                { label: 'Fits together easily', pct: 13, color: '#F2EDE4' },
                { label: "Hadn't thought about it this way", pct: 13, color: '#6B6B62' },
              ].map(({ label, pct, color }) => (
                <div key={label} className="mb-4">
                  <TenSegments pct={pct} color={color} />
                  <div className="flex items-center gap-3">
                    <span className="font-bebas text-[#F2EDE4] text-xl leading-none w-10">{pct}%</span>
                    <span className="font-dm-sans text-[#9A9A92] text-base font-light">{label}</span>
                  </div>
                </div>
              ))}
              <div className="mt-6 border border-[#C4622D]/30 rounded-sm p-5 bg-[#C4622D]/5">
                <div className="font-bebas text-[#C4622D] text-5xl leading-none mb-1">ONLY 13%</div>
                <p className="font-dm-sans text-[#F2EDE4] text-base font-light">said pushing hard and recovering fit together easily.</p>
              </div>
            </div>

            {/* Managing vs preventing */}
            <div>
              <h3 className="font-bebas text-[#F2EDE4] text-3xl sm:text-4xl leading-tight tracking-tight mb-8">
                WE&apos;RE BETTER AT DEALING WITH STRESS THAN PREVENTING IT.
              </h3>
              <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-6">
                RATED THEMSELVES INEFFECTIVE AT:
              </p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-dm-sans text-[#9A9A92] text-base font-light">Managing stress once present</span>
                    <span className="font-bebas text-[#F2EDE4] text-3xl">22%</span>
                  </div>
                  <div className="h-3 bg-[#1a1a18] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9A9A92] rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-dm-sans text-[#9A9A92] text-base font-light">Preventing stress from building</span>
                    <span className="font-bebas text-[#C4622D] text-3xl">61%</span>
                  </div>
                  <div className="h-3 bg-[#1a1a18] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C4622D] rounded-full" style={{ width: '61%' }} />
                  </div>
                </div>
              </div>
              <p className="font-playfair text-[#F2EDE4] text-xl italic leading-relaxed mt-10">
                Recovery often becomes reactive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4 · A BREAK ISN'T ALWAYS RECOVERY ───────────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-4">
                A BREAK ISN&apos;T ALWAYS RECOVERY.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-8">
                What people reached for when stressed wasn&apos;t always what they said left them restored.
              </p>

              {/* Phone hero callout */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-5">
                  <div className="font-bebas text-[#C4622D] text-5xl leading-none mb-2">52%</div>
                  <p className="font-dm-sans text-[#F2EDE4] text-base font-light leading-relaxed">reached for phone or social media when stressed</p>
                </div>
                <div className="border border-[#2a2a28] rounded-sm p-5">
                  <div className="font-bebas text-[#F2EDE4] text-5xl leading-none mb-2">0%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed">selected it as something that usually left them restored</p>
                </div>
              </div>
              <p className="font-dm-sans text-[#7D7D74] text-sm font-light italic">
                Based on respondents&apos; reported experience; this does not establish objective effectiveness.
              </p>
            </div>

            {/* Reach vs restore chart */}
            <div>
              {/* Persistent legend above chart */}
              <div className="flex gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#C4622D]" />
                  <span className="font-dm-sans text-[#9A9A92] text-sm">Reached for when stressed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#B89050]" />
                  <span className="font-dm-sans text-[#9A9A92] text-sm">Usually restorative</span>
                </div>
              </div>
              <p className="font-space-mono text-[#7D7D74] text-xs tracking-widest uppercase mb-4">
                % OF RESPONDENTS · EXPLORATORY SURVEY
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachRestoreData} layout="vertical" barGap={3} margin={{ left: 0, right: 40, top: 0, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#7D7D74', fontSize: 12, fontFamily: 'Space Mono' }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="activity" tick={{ fill: '#9A9A92', fontSize: 13, fontFamily: 'DM Sans', width: 140 }} width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reach" name="Reached for" fill="#C4622D" radius={[0, 2, 2, 0]}>
                      <LabelList dataKey="reach" position="right" formatter={(v: number) => `${v}%`} style={{ fill: '#C4622D', fontSize: 12, fontFamily: 'Space Mono' }} />
                    </Bar>
                    <Bar dataKey="restore" name="Usually restorative" fill="#B89050" radius={[0, 2, 2, 0]}>
                      <LabelList dataKey="restore" position="right" formatter={(v: number) => v > 0 ? `${v}%` : '0%'} style={{ fill: '#B89050', fontSize: 12, fontFamily: 'Space Mono' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5 · FORMAT FRICTION ──────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-4">
            THE FORMAT IS THE FRICTION.
          </h2>
          <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-12 max-w-xl">
            People weren&apos;t rejecting recovery. A recurring issue was that existing practices didn&apos;t fit how they lived.
          </p>

          {/* Two dominant friction cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-8">
              <div className="font-bebas text-[#C4622D] text-7xl leading-none mb-3">58%</div>
              <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight tracking-tight">DIDN&apos;T FIT MY SCHEDULE</p>
            </div>
            <div className="border border-[#C4622D]/40 bg-[#C4622D]/5 rounded-sm p-8">
              <div className="font-bebas text-[#C4622D] text-7xl leading-none mb-3">58%</div>
              <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight tracking-tight">TOO SLOW OR PASSIVE FOR HOW I LIVE</p>
            </div>
          </div>
          <p className="font-dm-sans text-[#7D7D74] text-sm font-light italic mb-12">
            Among respondents who answered this follow-up question.
          </p>

          {/* Product requirements */}
          <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-4">
            WHAT WOULD MAKE A PRACTICE MORE APPEALING
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formatData} layout="vertical" margin={{ left: 0, right: 50, top: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#7D7D74', fontSize: 12, fontFamily: 'Space Mono' }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="label" tick={{ fill: '#9A9A92', fontSize: 13, fontFamily: 'DM Sans', width: 155 }} width={165} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="Selected" radius={[0, 2, 2, 0]}>
                  <LabelList dataKey="pct" position="right" formatter={(v: number) => `${v}%`} style={{ fill: '#9A9A92', fontSize: 12, fontFamily: 'Space Mono' }} />
                  {formatData.map((_, i) => <Cell key={i} fill={i < 2 ? '#C4622D' : '#6B6B62'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── S6 · DESIGN REQUIREMENTS BRIDGE ──────────────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-[#111110]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-6">WHAT THAT GAVE US</p>
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-12">
            THE PRACTICE HAS TO FIT THE LIFE.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { word: 'SHORT.', sub: 'Fits between contexts.' },
              { word: 'CONTEXTUAL.', sub: 'Tied to a specific moment.' },
              { word: 'CREDIBLE.', sub: 'Backed by real science.' },
              { word: 'NO NEW\nCALENDAR BLOCK.', sub: 'Attaches to what already happens.' },
            ].map(({ word, sub }) => (
              <div key={word} className="border border-[#2a2a28] rounded-sm p-5 space-y-3">
                <p className="font-bebas text-[#F2EDE4] text-2xl leading-tight whitespace-pre-line">{word}</p>
                <p className="font-dm-sans text-[#7D7D74] text-base font-light leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7 · THE SEAM ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-[#F2EDE4] text-5xl sm:text-6xl leading-none tracking-tight mb-6">
            SO WE LOOKED BETWEEN THINGS.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-6">
                The survey told us recovery struggled to find a reliable place inside demanding days. Research on attention, role transitions, habits, and short breaks pointed toward an overlooked part of the day: the thresholds between one context and the next.
              </p>
              <div className="border-l-2 border-[#B89050]/40 pl-4 space-y-2 mb-8">
                {['Attention residue when switching tasks', 'Role and boundary transitions', 'Stable context cues and habit formation', 'Micro-break research'].map(s => (
                  <p key={s} className="font-dm-sans text-[#7D7D74] text-base font-light">{s}</p>
                ))}
              </div>
              <div className="border border-[#B89050]/30 rounded-sm p-5 bg-[#B89050]/5">
                <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed">
                  <span className="text-[#F2EDE4]">The literature gave us a place to look.</span> Not a finished answer.
                </p>
              </div>

              <details className="group mt-5 border-t border-[#2a2a28] pt-5">
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-space-mono text-[#B89050] text-sm tracking-widest uppercase select-none">
                  <span>VIEW THE RESEARCH</span>
                  <span className="text-xl leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="space-y-5 pt-6">
                  {researchSources.map(source => (
                    <div key={source.theme} className="border-l border-[#B89050]/30 pl-4">
                      <p className="font-space-mono text-[#B89050] text-xs tracking-widest uppercase mb-1">{source.theme}</p>
                      <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed mb-1">{source.note}</p>
                      <p className="font-dm-sans text-[#7D7D74] text-xs leading-relaxed">{source.citation}</p>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 font-space-mono text-[#F2EDE4] text-xs tracking-wider uppercase hover:text-[#B89050] transition-colors"
                      >
                        READ PAPER ↗
                      </a>
                    </div>
                  ))}
                </div>
              </details>
            </div>
            <div>
              <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-6">THE TRANSITION IS ALREADY THERE</p>
              <AnimatedSeams />
            </div>
          </div>
        </div>
      </section>

      {/* ── S8 · PRODUCT REVEAL ───────────────────────────────────────────── */}
      <section className="py-32 px-4 md:px-8 bg-[#2E3D28]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#9A9A92] text-sm tracking-widest uppercase mb-8">WHAT WE&apos;RE BUILDING</p>
          <h2 className="font-bebas text-[#F2EDE4] text-7xl sm:text-8xl lg:text-[10rem] leading-none tracking-tight mb-6">
            TRANSITION<br />POINTS
          </h2>
          <p className="font-space-mono text-[#B89050] text-sm tracking-widest uppercase mb-12">
            60–90 SECONDS TO ARRIVE IN WHAT COMES NEXT.
          </p>
          <div className="max-w-2xl">
            <p className="font-dm-sans text-[#F2EDE4] text-xl font-light leading-relaxed mb-4">
              Short guided audio practices built for the threshold moments already inside a demanding day.
            </p>
            <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-8">
              Instead of asking you to schedule another routine, each practice attaches to a context shift that already happens.
            </p>
            <div className="space-y-3 border-t border-[#F2EDE4]/10 pt-8">
              <p className="font-bebas text-[#F2EDE4] text-3xl sm:text-4xl leading-tight tracking-tight">THEY DON&apos;T ASK YOU TO STOP.</p>
              <p className="font-bebas text-[#B89050] text-3xl sm:text-4xl leading-tight tracking-tight">THEY TRAIN YOU TO ARRIVE.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {transitionUseCases.map(useCase => (
              <ProductTransitionCard key={useCase.label} {...useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S9 · COMMUNITY NOTE ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-5">LEAVE US A NOTE</p>
          <h2 className="font-bebas text-[#F2EDE4] text-4xl sm:text-5xl leading-none tracking-tight mb-5">
            YOU HELPED BUILD THIS. TELL US WHAT YOU&apos;RE THINKING.
          </h2>
          <p className="font-dm-sans text-[#9A9A92] text-lg font-light leading-relaxed mb-8">
            Where in your day do you most need a moment to arrive? Select what applies, or tell us in your own words.
          </p>
          <ResearchFeedback />
        </div>
      </section>

      {/* ── METHODOLOGY ───────────────────────────────────────────────────── */}
      <section className="py-12 px-4 md:px-8 border-t border-[#2a2a28]">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#7D7D74] text-sm tracking-widest uppercase mb-4">EXPLORATORY RESEARCH</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'SURVEY', body: 'Exploratory survey of people living demanding lives. Survey findings are directional. Percentages refer to our survey unless otherwise stated.' },
              { title: 'INTERVIEWS', body: 'Qualitative interviews to explore themes in depth. Participant quotes are not published without explicit permission.' },
              { title: 'SECONDARY RESEARCH', body: 'Published literature on attention residue, role transitions, micro-breaks, and habit formation. This informed product direction, not claimed as proof of effect.' },
            ].map(({ title, body }) => (
              <div key={title}>
                <p className="font-bebas text-[#9A9A92] text-lg mb-2">{title}</p>
                <p className="font-dm-sans text-[#7D7D74] text-sm font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}