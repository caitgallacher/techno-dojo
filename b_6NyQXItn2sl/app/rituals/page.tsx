'use client'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Music } from 'lucide-react'

export default function RitualsPage() {
  const faqItems = [
    {
      q: 'Is there a guided meditation for burnout?',
      a: 'Yes. Techno Dojo\'s Under Load series is specifically built for burnout and sustained emotional exhaustion in high performers. Unlike general relaxation meditations, these practices are science-backed and performance-focused — designed to help you rebuild capacity rather than simply rest. Available free on Spotify and YouTube.',
    },
    {
      q: 'What meditation should I do at the start of a new month?',
      a: 'Techno Dojo\'s New Month practice is a 17-minute guided meditation built around the Fresh Start Effect — Wharton School research showing the brain creates genuine psychological separation at temporal landmarks like the first of the month. It guides you through closing the last month deliberately and choosing who you are becoming in the next one. Free on Spotify and YouTube.',
    },
    {
      q: 'Is there a meditation for going through a major life transition?',
      a: 'Techno Dojo\'s Transitions series is built for significant life changes — breakups, moving cities, leaving a job, starting over. These practices help the nervous system process what it is carrying from the transition so you can move forward with clarity. Coming to Spotify and YouTube soon.',
    },
    {
      q: 'What is the best meditation for grief?',
      a: 'Techno Dojo\'s Under Load series includes practices for grief — the sustained, heavy emotional states that reshape daily life. These are not general mindfulness sessions. They are precise, science-backed practices for high performers carrying significant emotional weight. Free on Spotify and YouTube.',
    },
    {
      q: 'Is there a meditation to do before a high-stakes moment?',
      a: 'Techno Dojo\'s High Stakes series is built for the moments before and after something significant — a difficult conversation, a big decision, a performance, a setback. These practices train you to meet pressure with clarity rather than noise. Coming to Spotify and YouTube soon.',
    },
    {
      q: 'How is a Ritual different from a regular meditation session?',
      a: 'Techno Dojo\'s Sessions train ongoing mental performance skills you use daily. Rituals are moment-specific — tied to a particular life event, transition, or sustained emotional state. You return to a Ritual when the moment arrives, not as a daily or weekly habit.',
    },
  ]

  return (
    <main className="bg-obsidian">
      <Navigation />

      {/* HERO */}
      <section className="h-screen pt-40 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-4">
          Moment-Specific Practice
        </p>
        <h1 className="font-bebas text-bone text-6xl sm:text-7xl tracking-tight mb-6 text-balance">
          RITUALS
        </h1>
        <p className="font-dm-sans text-stone text-lg leading-relaxed max-w-2xl font-light">
          Whatever life just handed you. There is a practice for it.
        </p>
        <div className="border-t border-gold/30 w-12 mt-12"></div>
      </section>

      {/* EXPLAINER STRIP */}
      <section className="bg-obsidian py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                WHAT IT IS
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                A guided practice built for a specific moment in your life. Not a daily habit. Not a general relaxation tool. A precise practice for when something significant is happening.
              </p>
            </div>
            {/* Column 2 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                WHAT IT IS NOT
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                Not a recurring schedule. Not a wind-down. A deliberate act of meeting a moment that matters with your full attention rather than letting it pass unconsciously.
              </p>
            </div>
            {/* Column 3 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                WHY IT WORKS
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                Research on temporal landmarks shows the brain creates genuine psychological separation at significant moments. A ritual makes that separation deliberate so you can move forward with clarity rather than residual weight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THEME 01 — RESET POINTS */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">
            RESET POINTS
          </h2>
          <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-6">
            For New Beginnings. Fresh Starts. The Moments That Mark Time.
          </p>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-4">
            For the start of a new month. A new year. A birthday. The moments the calendar marks that your brain is already using to separate who you have been from who you are becoming. Research from the Wharton School identifies these temporal landmarks as genuine psychological reset points — moments where the brain creates real separation from your past self. Most high performers feel this shift at the start of a new month or new year. Very few use it deliberately. This is the practice that changes that.
          </p>
          <p className="font-space-mono text-stone text-xs mb-8">
            <a
              href="https://www.wharton.upenn.edu/knowledge/article/fresh-start-effect/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-bone transition-colors"
            >
              The Fresh Start Effect. Wharton School. Hengchen Dai et al.
            </a>
          </p>

          {/* RESET POINTS PRACTICES */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* NEW MONTH CARD */}
            <div className="flex-1 border border-stone/30 rounded-sm p-6 bg-forest/50">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">
                NEW MONTH
              </p>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-4">
                17 MIN
              </p>
              <div className="flex gap-3">
                <a
                  href="https://open.spotify.com/episode/1EB6TFYuu1xBYpzOnMrINr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-stone/10 transition-colors"
                  title="Listen on Spotify"
                >
                  <Music size={18} className="text-clay" />
                </a>
                <a
                  href="https://youtu.be/0MzghuT9GmI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-stone/10 transition-colors"
                  title="Watch on YouTube"
                >
                  <svg className="w-4 h-4 text-clay" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* NEW YEAR COMING SOON */}
            <div className="flex-1 border border-stone/30 rounded-sm p-6 bg-forest/50 opacity-50">
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                COMING SOON
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THEME 02 — TRANSITIONS */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">
            TRANSITIONS
          </h2>
          <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-6">
            For When Everything Is Changing.
          </p>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-8">
            For a breakup. A move. Leaving a job. Arriving somewhere new. The end of something you built. The beginning of something you cannot yet see clearly. Life transitions — even positive ones — involve real loss, and that loss deserves to be met with precision rather than powered through. This practice is for the in-between. The moment after something ends and before what comes next becomes clear. It gives the nervous system a place to put what it is carrying so you can move forward without dragging the past with you.
          </p>

          {/* COMING SOON */}
          <div className="text-center mb-8">
            <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-6">
              COMING SOON — MOVING COUNTRIES. STARTING OVER. ENDING A CHAPTER.
            </p>
            <button
              onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              JOIN THE LIST
            </button>
          </div>
        </div>
      </section>

      {/* THEME 03 — UNDER LOAD */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">
            UNDER LOAD
          </h2>
          <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-6">
            For Burnout. Grief. And The Sustained Weight That Will Not Lift.
          </p>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-4">
            For burnout. For grief. For the specific exhaustion of carrying something heavy for so long that you have forgotten what it feels like to put it down. These are not the practices for a bad day. They are for the sustained states — the ones that last weeks or months and reshape how you see yourself and what you believe is possible. Research confirms that regular meditation practice significantly reduces burnout symptoms including emotional exhaustion in high-stress professionals. This is not a relaxation exercise. It is a practice for rebuilding from the inside out.
          </p>
          <p className="font-space-mono text-stone text-xs mb-8">
            <a
              href="https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2024.1234567/full"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-bone transition-colors"
            >
              Frontiers in Public Health. Meditation and Burnout. 2024.
            </a>
          </p>

          {/* UNDER LOAD PRACTICES */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* MOTHER'S DAY CARD */}
<div className="flex-1 border border-stone/30 rounded-sm p-6 bg-forest/50">
  <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">
    MOTHER&apos;S DAY
  </p>
  <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-4">
    20 MIN
  </p>
  <div className="flex gap-3">
    
      href="https://open.spotify.com/episode/5wQ7TZUAjCs5gWthRzzpEl"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-stone/10 transition-colors"
      title="Listen on Spotify"
    >
      <svg className="w-4 h-4 text-clay" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    </a>
    
      href="https://youtu.be/MPKGFIQRFL0"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-stone/10 transition-colors"
      title="Watch on YouTube"
    >
      <svg className="w-4 h-4 text-clay" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </a>
  </div>

            {/* GRIEF COMING SOON */}
            <div className="flex-1 border border-stone/30 rounded-sm p-6 bg-forest/50 opacity-50">
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                COMING SOON
              </p>
            </div>

            {/* BURNOUT COMING SOON */}
            <div className="flex-1 border border-stone/30 rounded-sm p-6 bg-forest/50 opacity-50">
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                COMING SOON
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THEME 04 — HIGH STAKES */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-2">
            HIGH STAKES
          </h2>
          <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-6">
            For The Moments That Matter Most. Before And After.
          </p>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-8">
            For the night before something significant. The morning after a failure. The moment before a difficult conversation. The decision that will change things. High performers know this feeling — the specific weight of a moment where performance and outcome and identity all converge at once. This practice trains you to meet those moments with clarity rather than noise. Not to eliminate the pressure. To use it.
          </p>

          {/* COMING SOON */}
          <div className="text-center">
            <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-6">
              COMING SOON — BEFORE A BIG DECISION. AFTER A SETBACK. BEFORE A PERFORMANCE.
            </p>
            <button
              onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              JOIN THE LIST
            </button>
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
