'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Music, Download } from 'lucide-react'

export default function BreathworkPage() {
  const days = [
    { day: 1, phase: 'CONTROL' }, { day: 2, phase: 'CONTROL' }, { day: 3, phase: 'CONTROL' },
    { day: 4, phase: 'CONTROL' }, { day: 5, phase: 'CONTROL' }, { day: 6, phase: 'CONTROL' },
    { day: 7, phase: 'CONTROL' }, { day: 8, phase: 'CONTROL' }, { day: 9, phase: 'CONTROL' },
    { day: 10, phase: 'CONTROL' }, { day: 11, phase: 'CAPACITY' }, { day: 12, phase: 'CAPACITY' },
    { day: 13, phase: 'CAPACITY' }, { day: 14, phase: 'CAPACITY' }, { day: 15, phase: 'CAPACITY' },
    { day: 16, phase: 'CAPACITY' }, { day: 17, phase: 'CAPACITY' }, { day: 18, phase: 'CAPACITY' },
    { day: 19, phase: 'CAPACITY' }, { day: 20, phase: 'CAPACITY' }, { day: 21, phase: 'SELF-TRUST' },
    { day: 22, phase: 'SELF-TRUST' }, { day: 23, phase: 'SELF-TRUST' }, { day: 24, phase: 'SELF-TRUST' },
    { day: 25, phase: 'SELF-TRUST' }, { day: 26, phase: 'SELF-TRUST' }, { day: 27, phase: 'SELF-TRUST' },
    { day: 28, phase: 'SELF-TRUST' }, { day: 29, phase: 'SELF-TRUST' }, { day: 30, phase: 'SELF-TRUST' },
  ]

  const faqItems = [
    {
      q: 'What is a 30-day breathwork protocol?',
      a: 'A 30-day breathwork protocol is a structured daily breathing practice designed to progressively train breathing control and nervous system regulation. Unlike standalone breathwork sessions, a protocol builds in a deliberate sequence. Breath patterns, breath holds, and training intensity increase as your nervous system adapts. The Techno Dojo 30-Day Breathwork Protocol moves through three phases: Control (Days 1–10), Capacity (Days 11–20), and Self-Trust (Days 21–30). Each phase introduces new patterns and new science as you are ready for it. Less than 10 minutes a day. Free on Spotify and YouTube.',
    },
    {
      q: 'What does breathwork do for the nervous system?',
      a: 'Breathwork can influence autonomic nervous system activity. That is, the system that controls your stress response, recovery, and emotional regulation. Controlled breathing, particularly patterns with extended exhales, may increase vagal activity and support parasympathetic nervous system activity, helping the body shift out of fight-or-flight mode. Some forms of slow, controlled breathing have been shown to improve heart rate variability (HRV), a key biomarker of nervous system resilience, and build tolerance to air-hunger sensations, which may help you respond to internal stress signals more calmly. With consistent practice, regulation skills can become more familiar and easier to access. Your nervous system practices returning to regulation more quickly and efficiently, which it then applies when faced with real-world stress and pressure.',
    },
    {
      q: 'How does breathwork improve HRV?',
      a: 'Heart rate variability (HRV) reflects how flexibly your autonomic nervous system responds to stress, recovery, and changing demands. Higher HRV is often associated with greater autonomic flexibility, while chronically low HRV can be associated with stress load or reduced recovery. For driven, ambitious individuals, a chronically activated state can feel like being stuck in go-mode: high output, limited restoration. Slow, controlled breathing can improve HRV by increasing respiratory sinus arrhythmia and supporting vagal activity. Breathing at a slow pace, often around six breaths per minute, has been shown to coordinate breathing, heart-rate, and blood-pressure rhythms in a way that supports HRV, baroreflex function, and autonomic regulation. HRV biofeedback and resonance-breathing research suggest that consistent practice over several weeks can produce measurable improvements in HRV. This protocol is designed to build that consistency from Day 1.',
    },
    {
      q: 'Do I need experience with breathwork to start?',
      a: 'No. Day 1 starts from the beginning. The protocol is designed to be progressive. Each phase introduces new patterns and new science as you are ready. No experience required. Start on Day 1 and build to Day 30.',
    },
    {
      q: 'How is this different from other breathwork programs?',
      a: 'Most breathwork content is standalone sessions with no connection between them. This is a structured protocol with a deliberate progression through breath patterns, science, and affirmations that build over 30 days. The results compound because the training compounds.',
    },
    {
      q: 'How long are the sessions?',
      a: 'The sessions are less than 10 minutes per day and are designed to fit seamlessly into your day. Morning, evening, afternoon, or wherever you find time to train.',
    },
    {
      q: 'Is breathwork free?',
      a: 'Yes. The full 30-day protocol is free on Spotify and YouTube. No account or sign-up required to listen. The practice is the product.',
    },
    {
      q: 'What happens after Day 30?',
      a: 'Your breathwork practice becomes your own. By Day 30, the guidance has faded, and you are leading yourself. The regulation skills you have built are there to support you, and you know what you need depending on your state.',
    },
    {
      q: 'Is breathwork safe for everyone?',
      a: 'This protocol is designed to be gentle and beginner-friendly, but breathwork is not one-size-fits-all. If you are pregnant, have a heart condition, epilepsy, severe anxiety or panic symptoms, respiratory issues, or any medical condition that could be affected by breath holds or changes in breathing, consult a qualified healthcare professional before practicing. Never practice breathwork while driving, in water, or in any situation where dizziness could put you at risk.',
    },
  ]

  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />

      {/* HERO */}
      <section className="min-h-screen pt-40 flex flex-col items-center justify-center px-4 text-center">
        <div className="space-y-8 max-w-3xl">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">
            THE BREATHWORK PROTOCOL
          </p>
          <h1 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-balance">
            A 30-Day Nervous System Training Program
          </h1>
          <p className="font-dm-sans text-[#9A9A92] text-lg sm:text-xl leading-relaxed text-balance max-w-2xl mx-auto font-light">
            Three phases. One transformation. Train your nervous system to live resiliently, at full intensity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <Music size={16} />
              Listen on Spotify
            </a>
            <a
              href="https://youtube.com/@thetechnodojo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded border-2 border-bone text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2">
            <button
              onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300"
            >
              JOIN THE LIST
            </button>
            <a
              href="#protocol"
              onClick={(e) => { e.preventDefault(); document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-6 py-3 rounded border border-stone/40 text-[#9A9A92] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:border-bone hover:text-bone"
            >
              JUMP TO THE PROTOCOL ↓
            </a>
          </div>
        </div>
        <div className="h-px bg-clay w-12 mt-16" />
      </section>

      {/* WHAT THIS IS */}
      <section className="bg-obsidian py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              THE PROTOCOL
            </p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              This is a structured 30-day breathwork progression. Build your control, understand your capacity, and reinforce your self-trust.
            </p>
          </div>
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              THE SCIENCE
            </p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              Breathwork produces measurable changes in interoceptive awareness, your ability to read your own internal signals under pressure, nervous system regulation, heart rate variability, and CO2 tolerance. It doesn&apos;t just change how you feel. It changes what your nervous system can handle.
            </p>
          </div>
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              THE COMMITMENT
            </p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              Less than 10 minutes. 30 days. The results compound.
            </p>
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="max-w-7xl mx-auto mt-12 flex justify-center">
          <a
            href="/30-Day-Breathwork-Protocol-Science-Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border border-stone/40 text-[#9A9A92] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:border-bone hover:text-bone flex items-center gap-2"
          >
            <Download size={14} />
            Download the Science Guide
          </a>
        </div>
      </section>

      {/* THREE PHASES */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Phase 1 */}
            <div className="p-8 md:pr-12 border-b md:border-b-0 border-[#2E3D28]">
              <p className="font-space-mono text-bone text-xs tracking-widest uppercase mb-2">PHASE 1</p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">CONTROL</h2>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">DAYS 1–10</p>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light">
                You learn to regulate. You build the foundation everything else stands on.
              </p>
            </div>
            {/* Phase 2 */}
            <div className="p-8 md:px-12 border-b md:border-b-0 md:border-l border-[#2E3D28]">
              <p className="font-space-mono text-bone text-xs tracking-widest uppercase mb-2">PHASE 2</p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">CAPACITY</h2>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">DAYS 11–20</p>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light">
                You find out how far your range actually goes. Your body&apos;s stress signals get louder, and you stay regulated anyway.
              </p>
            </div>
            {/* Phase 3 */}
            <div className="p-8 md:pl-12 md:border-l border-[#2E3D28]">
              <p className="font-space-mono text-bone text-xs tracking-widest uppercase mb-2">PHASE 3</p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">SELF-TRUST</h2>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">DAYS 21–30</p>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light">
                The guidance fades and you lead yourself. By Day 30 the voice is nearly gone. The practice is yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE CALLOUT */}
      <section className="bg-obsidian py-32 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="font-bebas text-clay text-6xl sm:text-7xl tracking-tight">
            26,000
          </div>
          <p className="font-dm-sans text-bone text-xl sm:text-2xl leading-relaxed font-light">
            breaths per day. 26,000 chances to regulate, reset, and train the nervous system that carries you through your life at full intensity. Most people breathe on autopilot. This practice changes that.
          </p>
        </div>
      </section>

      {/* THE PROTOCOL — EPISODE GRID */}
      <section id="protocol" className="bg-obsidian py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase text-center mb-12">
            THE PROTOCOL
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {days.map(({ day, phase }) => (
              <div key={day} className="border border-stone/30 rounded-sm p-4 bg-obsidian/50 flex flex-col gap-3">
                <div className="font-bebas text-clay text-4xl leading-none">{day}</div>
                <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{phase}</p>
                <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">&lt; 10 MIN</p>
                <div className="flex gap-3 mt-auto pt-2 opacity-30">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded">
                    <Music size={16} className="text-clay" />
                  </div>
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded">
                    <svg className="w-4 h-4 text-clay" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROM CAIT */}
      <section className="bg-bone py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-8">
            FROM CAIT
          </p>
          <h2 className="font-bebas text-obsidian text-4xl sm:text-5xl tracking-tight mb-8">
            WHY I BUILT THIS
          </h2>
          <div className="space-y-6 font-dm-sans text-obsidian text-lg leading-relaxed font-light text-left">
            <p>
              I built this for my younger brother, and everyone like him. He was never the &ldquo;mindfulness&rdquo; type. But after months of big goals, full days, travel, training, and real momentum, even he started trying breathwork. When he told me, I knew I wanted to give him something practical. Not advice. A tool.
            </p>
            <p>
              I&apos;ve spent most of my life learning how to perform under pressure: elite sport, consulting, an MBA, building a business from scratch, and living on the move. Breathwork transformed something I didn&apos;t realise I could train: not my ambition, but my capacity to hold it.
            </p>
            <p>
              This 30-day protocol is for people building full lives at full intensity and who want to keep going. This builds the nervous system that supports you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-stone/30 rounded-sm p-6 bg-obsidian/50">
                <h3 className="font-space-mono text-clay text-sm tracking-widest uppercase mb-3">
                  {item.q}
                </h3>
                <p className="font-dm-sans text-bone text-sm leading-relaxed font-light">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <div id="email-capture">
        <EmailSubscribe />
      </div>

      <Footer />
    </main>
  )
}
