'use client'

import { useEffect, useRef } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

// ─── Recharts bar chart component ───────────────────────────────────────────
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, Legend
} from 'recharts'

const recoveryData = [
  { label: 'Managing stress once present', effective: 30, neutral: 48, ineffective: 22 },
  { label: 'Preventing stress from building', effective: 13, neutral: 26, ineffective: 61 },
]

const formatData = [
  { label: 'Backed by real science', pct: 61 },
  { label: 'Fits my schedule', pct: 52 },
  { label: 'Low or no cost', pct: 48 },
  { label: 'Under 10 minutes', pct: 39 },
  { label: 'Alongside work/training', pct: 39 },
  { label: 'Completely alone', pct: 35 },
  { label: 'Shows measurable results', pct: 26 },
]

const reachRestoreData = [
  { activity: 'Exercise', reach: 87, restore: 78 },
  { activity: 'Time with loved ones', reach: 65, restore: 57 },
  { activity: 'Sleep', reach: 61, restore: 61 },
  { activity: 'Nature / outside', reach: 52, restore: 48 },
  { activity: 'Phone / social media', reach: 52, restore: 0 },
  { activity: 'TV / movies', reach: 48, restore: 4 },
]

const intensityData = [
  { subject: 'Stress', value: 87 },
  { subject: 'Anxiety', value: 78 },
  { subject: 'Trouble focusing', value: 65 },
  { subject: 'Physical tension', value: 61 },
]

const positiveData = [
  { subject: 'Curiosity/excitement', value: 91 },
  { subject: 'Joy', value: 83 },
  { subject: 'Connection', value: 83 },
  { subject: 'Accomplishment', value: 65 },
]

// ─── Giscus comments component ───────────────────────────────────────────────
function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'caitgallacher/techno-dojo')
script.setAttribute('data-repo-id', 'R_kgDOSUwnKQ')
  script.setAttribute('data-category', 'Research Findings')
script.setAttribute('data-category-id', 'DIC_kwDOSUwnKc4DFQsJ')
  script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'dark_dimmed')
  script.setAttribute('data-lang', 'en')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
    return () => { if (ref.current) ref.current.innerHTML = '' }
  }, [])
  return <div ref={ref} />
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ stat, label, sub }: { stat: string; label: string; sub?: string }) {
  return (
    <div className="border border-stone/20 rounded-sm p-6 bg-obsidian/60 flex flex-col gap-2">
      <div className="font-bebas text-clay text-5xl leading-none">{stat}</div>
      <div className="font-dm-sans text-bone text-sm leading-relaxed font-light">{label}</div>
      {sub && <div className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mt-1">{sub}</div>}
    </div>
  )
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian border border-stone/30 rounded-sm p-3">
        <p className="font-space-mono text-bone text-xs tracking-widest uppercase mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="font-dm-sans text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ResearchFindingsPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">
            SUBSCRIBER EXCLUSIVE · RESEARCH FINDINGS
          </p>

          {/* Big headline + key stat side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <h1 className="font-bebas text-bone text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-balance">
                YOU BELIEVE<br />IN REST.
              </h1>
              <p className="font-dm-sans text-[#9A9A92] text-lg leading-relaxed font-light mt-6 max-w-lg">
                We asked driven people what recovery actually looks like in their demanding lives. We thought we might find a belief problem. We found neither.
              </p>
            </div>

            {/* Three hero stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="border-l-4 border-l-[#C4622D] pl-5">
                <div className="font-bebas text-bone text-5xl leading-none">83%</div>
                <div className="font-dm-sans text-[#9A9A92] text-sm font-light mt-1">said adequate rest strongly affects how well they perform</div>
              </div>
              <div className="border-l-4 border-l-[#B89050] pl-5">
                <div className="font-bebas text-bone text-5xl leading-none">87%</div>
                <div className="font-dm-sans text-[#9A9A92] text-sm font-light mt-1">said it strongly affects how they feel emotionally</div>
              </div>
              <div className="border-l-4 border-l-[#F2EDE4] pl-5">
                <div className="font-bebas text-bone text-5xl leading-none">91%</div>
                <div className="font-dm-sans text-[#9A9A92] text-sm font-light mt-1">keep pushing at least sometimes when they know rest would help</div>
              </div>
            </div>
          </div>

          {/* Closing hook */}
          <div className="border-t border-stone/20 pt-8">
            <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed max-w-3xl">
              So the question changed. If we already believe in recovery, why does it keep losing?
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 · INTENSITY + POSITIVE EMOTION ──────────────────────── */}
      <section className="py-20 px-4 bg-[#0f0f0d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-bebas text-bone text-5xl sm:text-6xl leading-none tracking-tight mb-4">
                AN INTENSE LIFE ISN&apos;T A BAD LIFE.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light mb-6">
                The people we heard from weren&apos;t describing lives empty of excitement, connection or accomplishment. They are living with high activation and a lot of what makes life feel good.
              </p>
              <p className="font-playfair text-bone text-xl italic leading-relaxed">
                The goal isn&apos;t to escape intensity. It&apos;s to experience it differently.
              </p>
            </div>

            {/* Dual stat grid */}
            <div className="space-y-4">
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-4">
                % EXPERIENCING EACH AT LEAST WEEKLY
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">HIGH ACTIVATION</p>
                </div>
                <StatCard stat="87%" label="General stress" />
                <StatCard stat="78%" label="Anxiety or racing thoughts" />
                <StatCard stat="65%" label="Trouble focusing" />
                <StatCard stat="61%" label="Physical tension" />
                <div className="col-span-2 pt-2">
                  <p className="font-space-mono text-gold text-xs tracking-widest uppercase mb-2">POSITIVE EXPERIENCE</p>
                </div>
                <StatCard stat="91%" label="Curiosity or excitement" />
                <StatCard stat="83%" label="Joy or lightheartedness" />
                <StatCard stat="83%" label="Connection to others" />
                <StatCard stat="65%" label="Accomplishment or pride" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · RECOVERY ARRIVES LATE ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-bebas text-bone text-5xl sm:text-6xl leading-none tracking-tight mb-4">
                RECOVERY ARRIVES LATE.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light mb-8">
                We&apos;re better at handling stress than preventing it from building.
              </p>

              {/* How push/recover fit together */}
              <div className="space-y-2">
                <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-4">HOW PUSHING AND RECOVERING FIT TOGETHER</p>
                {[
                  { label: 'Comes in waves', pct: 26 },
                  { label: 'Depends on the season of life', pct: 26 },
                  { label: 'Feels like a trade-off', pct: 22 },
                  { label: "Fits together easily", pct: 13 },
                  { label: "Haven't thought about it this way", pct: 13 },
                ].map(({ label, pct }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-32 flex-shrink-0">
                      <div className="h-1.5 bg-stone/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-clay rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="font-bebas text-bone text-xl leading-none w-10">{pct}%</span>
                    <span className="font-dm-sans text-[#9A9A92] text-xs font-light">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-clay/30 rounded-sm p-4 bg-clay/5">
                <p className="font-bebas text-clay text-3xl leading-none mb-1">Only 13%</p>
                <p className="font-dm-sans text-bone text-sm font-light">said pushing and recovering fit together easily.</p>
              </div>
            </div>

            {/* Managing vs preventing chart */}
            <div>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">
                EFFECTIVENESS RATING (1–5 SCALE)
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={recoveryData}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a28" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'Space Mono' }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="label" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'DM Sans', width: 140 }} width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'Space Mono', color: '#9A9A92' }} />
                    <Bar dataKey="effective" name="Effective (4-5/5)" stackId="a" fill="#C4622D" />
                    <Bar dataKey="neutral" name="Neutral (3/5)" stackId="a" fill="#6B6B62" />
                    <Bar dataKey="ineffective" name="Ineffective (1-2/5)" stackId="a" fill="#2E3D28" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="font-dm-sans text-[#9A9A92] text-xs font-light mt-6 leading-relaxed">
                Recovery exists. It just isn&apos;t reliably built into the everyday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · A BREAK ISN'T ALWAYS RECOVERY ─────────────────────── */}
      <section className="py-20 px-4 bg-[#0f0f0d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="font-bebas text-bone text-5xl sm:text-6xl leading-none tracking-tight mb-4">
              A BREAK ISN&apos;T ALWAYS RECOVERY.
            </h2>
            <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light max-w-2xl">
              What we reach for and what actually restores us aren&apos;t always the same.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Dumbbell chart as grouped bars */}
            <div>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">
                REACHED FOR WHEN STRESSED VS. ACTUALLY RESTORES
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={reachRestoreData}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    barGap={2}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a28" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'Space Mono' }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="activity" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'DM Sans', width: 130 }} width={140} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'Space Mono', color: '#9A9A92' }} />
                    <Bar dataKey="reach" name="Reached for" fill="#C4622D" radius={[0, 2, 2, 0]} />
                    <Bar dataKey="restore" name="Actually restores" fill="#B89050" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Callout */}
            <div className="space-y-6">
              <div className="border border-stone/20 rounded-sm p-6 bg-obsidian">
                <div className="font-bebas text-clay text-5xl leading-none mb-2">52%</div>
                <p className="font-dm-sans text-bone text-sm font-light leading-relaxed">
                  reached for their phone or social media when stressed.
                </p>
              </div>
              <div className="border border-stone/20 rounded-sm p-6 bg-obsidian">
                <div className="font-bebas text-bone text-5xl leading-none mb-2">0%</div>
                <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed">
                  chose it as something that usually leaves them more restored.
                </p>
              </div>
              <p className="font-dm-sans text-[#9A9A92] text-xs font-light leading-relaxed italic">
                This shows what people reached for, not proof of what works.
              </p>
              <p className="font-playfair text-bone text-lg italic leading-relaxed">
                Sometimes we&apos;re taking a break. That doesn&apos;t mean we&apos;re recovering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · FORMAT PROBLEM ─────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-bebas text-bone text-5xl sm:text-6xl leading-none tracking-tight mb-4">
                RECOVERY HAS A FORMAT PROBLEM.
              </h2>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light mb-6">
                People aren&apos;t rejecting recovery. They&apos;re rejecting the format.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed mb-4">
                Only <span className="text-bone font-normal">26%</span> said wellness or mindfulness practices were actively part of their lives.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="border border-clay/30 rounded-sm p-4 bg-clay/5">
                  <div className="font-bebas text-clay text-3xl leading-none mb-1">58%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-xs font-light">didn&apos;t fit my schedule</p>
                </div>
                <div className="border border-clay/30 rounded-sm p-4 bg-clay/5">
                  <div className="font-bebas text-clay text-3xl leading-none mb-1">58%</div>
                  <p className="font-dm-sans text-[#9A9A92] text-xs font-light">too slow or passive for how I live</p>
                </div>
              </div>
              <p className="font-dm-sans text-[#9A9A92] text-xs font-light italic">Follow-up respondents n=12</p>
            </div>

            {/* What would make it more appealing */}
            <div>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">
                WHAT WOULD MAKE A PRACTICE MORE APPEALING
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formatData}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a28" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'Space Mono' }} domain={[0, 80]} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="label" tick={{ fill: '#9A9A92', fontSize: 10, fontFamily: 'DM Sans', width: 140 }} width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pct" name="Selected" radius={[0, 2, 2, 0]}>
                      {formatData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#C4622D' : '#6B6B62'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-stone/20 pt-8">
            <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed max-w-3xl">
              The finding isn&apos;t &ldquo;convince me recovery matters.&rdquo; It&apos;s closer to &ldquo;make recovery work inside the life I&apos;m living.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 · NOT A DISCIPLINE PROBLEM ───────────────────────────── */}
      <section className="py-16 px-4 bg-[#0f0f0d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2">
              <div className="flex items-baseline gap-4 mb-4">
                <div className="font-bebas text-clay text-7xl leading-none">87%</div>
                <div className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed max-w-sm">
                  had intentionally kept an adult habit for at least three months.
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="font-space-mono text-bone text-xs tracking-widest uppercase">HABIT</div>
                <div className="flex-1 h-px bg-clay/40 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-clay" />
                  </div>
                </div>
                <div className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">LIFE CHANGES</div>
                <div className="flex-1 h-px bg-stone/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-stone/40" />
                  </div>
                </div>
                <div className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">HABIT BREAKS</div>
              </div>
            </div>
            <div className="border border-stone/20 rounded-sm p-6 bg-obsidian">
              <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed">
                Of those who lost the habit, the causes named were things like changing circumstances, relocation, or health. Not lack of willpower.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07-08 · THE TURN ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight mb-8">
            SO WE STARTED LOOKING<br />BETWEEN &ldquo;THE THINGS&rdquo;.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light mb-6">
                A demanding day isn&apos;t one continuous event. It&apos;s made up of a bunch of different contexts. A meeting ends. A commute begins. A front door opens. A conversation finishes. An important event is about to start.
              </p>
              <p className="font-dm-sans text-bone text-base leading-relaxed font-light">
                And between those contexts are small thresholds that already exist.
              </p>
            </div>

            {/* Transition points visual */}
            <div>
              <div className="space-y-2">
                {[
                  { label: 'Meeting ends', accent: true },
                  { label: '← threshold →', accent: false, dim: true },
                  { label: 'Commute begins', accent: true },
                  { label: '← threshold →', accent: false, dim: true },
                  { label: 'Walk through the front door', accent: true },
                  { label: '← threshold →', accent: false, dim: true },
                  { label: 'Something important starts', accent: true },
                ].map(({ label, accent, dim }, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 rounded-sm text-sm font-dm-sans font-light ${
                      dim
                        ? 'text-clay text-xs font-space-mono tracking-widest text-center'
                        : accent
                        ? 'bg-obsidian/60 border border-stone/20 text-bone'
                        : 'text-[#9A9A92]'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="mt-6 border border-gold/30 rounded-sm p-4 bg-gold/5">
                <p className="font-bebas text-gold text-2xl leading-none mb-1">TRANSITION POINTS</p>
                <p className="font-dm-sans text-[#9A9A92] text-xs font-light">
                  The time is already there. We just haven&apos;t been looking at it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 · PRODUCT REVEAL ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#2E3D28]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-4">INTRODUCING</p>
              <h2 className="font-bebas text-bone text-6xl sm:text-7xl leading-none tracking-tight mb-4">
                TRANSITION<br />POINTS
              </h2>
              <p className="font-space-mono text-gold text-xs tracking-widest uppercase mb-6">
                60–90 SECONDS TO ARRIVE IN WHAT COMES NEXT.
              </p>
              <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-4">
                Transition Points are short guided audio practices made for the threshold moments inside a demanding day. Between two meetings, before you walk in the door at home, after a hard conversation, or at the start of something important.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light mb-4">
                They don&apos;t ask you to change your life, build another twenty-minute routine or slow down. They live in the seams, the pockets of time that are already there in your everyday.
              </p>
              <p className="font-dm-sans text-bone text-sm font-normal leading-relaxed">
                Evidence-informed. Specific. No mysticism. No filler.
              </p>
            </div>

            {/* Supporting stat */}
            <div className="border border-bone/20 rounded-sm p-8 bg-obsidian/30">
              <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed mb-6">
                The problem was never that people don&apos;t believe in recovery. Almost everyone we asked already did. The problem is giving recovery a reliable place to happen inside the day-to-day.
              </p>
              <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed mb-6">
                Otherwise, it waits: for the free evening, the quiet weekend, or the vacation. And demanding lives have a funny way of taking those moments back.
              </p>
              <div className="border-t border-bone/10 pt-6">
                <p className="font-bebas text-bone text-2xl leading-tight mb-2">
                  Transition Points are built for moments that don&apos;t need a place on your calendar.
                </p>
                <p className="font-dm-sans text-gold text-sm font-normal">
                  They don&apos;t ask you to stop. They train you to arrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 · RESEARCH FOOTER ────────────────────────────────────── */}
      <section className="py-12 px-4 border-t border-stone/20">
        <div className="max-w-6xl mx-auto">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-4">ABOUT THE RESEARCH</p>
          <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed max-w-3xl">
            This project combines an exploratory survey of people living demanding lives, qualitative interviews, and secondary research into recovery, work transitions, and micro-breaks. Survey results are directional, not population estimates. Percentages refer to the survey sample unless otherwise stated.
          </p>
        </div>
      </section>

      {/* ── 11 · CTA + COMMENTS ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0f0f0d]">
        <div className="max-w-3xl mx-auto">
          <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">YOU HELPED BUILD THIS</p>
          <h2 className="font-bebas text-bone text-5xl sm:text-6xl leading-none tracking-tight mb-4">
            LET US KNOW<br />WHAT YOU THINK.
          </h2>
          <p className="font-dm-sans text-[#9A9A92] text-base font-light leading-relaxed mb-4">
            Where in your day do you most need a moment to arrive?
          </p>
          <p className="font-dm-sans text-[#9A9A92] text-sm font-light leading-relaxed mb-12">
            Sign in with GitHub to leave a comment, react, or reply to others below.
          </p>

          {/* Giscus embed */}
          <GiscusComments />
        </div>
      </section>

      <Footer />
    </main>
  )
}
