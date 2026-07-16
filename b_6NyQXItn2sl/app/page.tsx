'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { EmailPopup } from '@/components/EmailPopup'
import { Play, Music } from 'lucide-react'

const PatreonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.82 2.41C18.78 2.41 22 5.65 22 9.62c0 3.96-3.22 7.19-7.18 7.19-3.96 0-7.19-3.23-7.19-7.19 0-3.97 3.23-7.21 7.19-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
)

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(['hero', 'philosophy', 'why', 'products', 'science', 'listen', 'join'])
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('[data-fade]')
    elements.forEach((el) => { observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const fadeClass = (id: string) => (visibleSections.has(id) ? 'opacity-100' : 'opacity-0')

  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <EmailPopup />

      {/* HERO */}
      <section id="hero" data-fade className={`${fadeClass('hero')} min-h-screen pt-40 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-600`}>
        <div className="space-y-8 max-w-3xl">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase">NERVOUS SYSTEM TRAINING</p>
          <h1 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-balance">
            Go hard.<br />Stay whole.
          </h1>
          <p className="font-dm-sans text-stone text-lg sm:text-xl leading-relaxed text-balance max-w-2xl mx-auto font-light">
            You go hard. You live at full intensity. This practice builds the nervous system that makes sure you can keep going.
          </p>
          <div className="flex flex-row gap-3 justify-center items-center pt-4 flex-wrap">
            <a href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm?si=a0b1bebb7f854974" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <Music size={14} />
              Spotify
            </a>
            <a href="https://youtube.com/@thetechnodojo?si=qAYMs3M1Kk71LuSt" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <Play size={14} className="fill-current" />
              YouTube
            </a>
            <a href="https://www.patreon.com/thetechnodojo" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <PatreonIcon size={14} />
              Patreon
            </a>
          </div>
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase pt-2">Available on Spotify, YouTube, and Patreon</p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" data-fade className={`${fadeClass('philosophy')} py-32 px-4 bg-obsidian transition-opacity duration-600`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="space-y-4">
              <h2 className="font-bebas text-clay text-5xl sm:text-6xl tracking-tight text-balance">TECHNO</h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">The relentless pursuit of excellence in any field.</p>
            </div>
            <div className="space-y-4">
              <h2 className="font-montserrat text-gold text-5xl sm:text-6xl tracking-tight text-balance">DOJO</h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">The inner state that makes excellence possible.</p>
            </div>
          </div>
          <div className="h-px bg-stone/30 my-12" />
          <div className="max-w-3xl mx-auto text-center space-y-6 my-8">
            <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed">
              &quot;The intensity requires the stillness. The stillness runs as deep as the intensity that needs it.&quot;
            </p>
          </div>
          <div className="h-px bg-stone/30 mt-8" />
        </div>
      </section>

      {/* WHY YOU ARE HERE */}
      <section id="why" data-fade className={`${fadeClass('why')} py-32 px-4 bg-obsidian transition-opacity duration-600`}>
        <div className="max-w-3xl mx-auto">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-16">WHY YOU ARE HERE</p>
          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">YOU GO HARD.</h2>
            <p className="font-dm-sans font-light text-stone text-lg leading-relaxed">
              Your life is full and intense, and you want to keep it that way. But something is changing. Sleep doesn&apos;t feel as restorative. Energy is slower to arrive. The things you love aren&apos;t as fulfilling. You feel &ldquo;almost&rdquo; yourself, but not quite.
            </p>
          </div>
          <div className="h-px bg-stone/20 mb-12" />
          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">YOU WANT TO KEEP GOING, BUT SOMETHING IS OFF.</h2>
            <p className="font-dm-sans font-light text-stone text-lg leading-relaxed">
              It shows up in small ways. Slightly shorter temper. Harder to be present. Half-listening, half mind-racing. Less time for the things that once defined you. There simply isn&apos;t enough space.
            </p>
          </div>
          <div className="h-px bg-stone/20 mb-12" />
          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">THE VERSION OF YOU DOING THE LIVING FEELS LESS ALIVE.</h2>
            <p className="font-dm-sans font-light text-stone text-lg leading-relaxed">
              You&apos;re still living at full intensity. But you need a foundation that makes it sustainable. Long-term.
            </p>
          </div>
          <div className="h-px bg-stone/20 mb-12" />
          <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed">
            This is your practice. It doesn&apos;t ask you to slow down. It builds the nervous system that makes life at full intensity possible.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" data-fade className={`${fadeClass('products')} py-32 px-4 bg-obsidian transition-opacity duration-600`}>
        <div className="max-w-7xl mx-auto">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase text-center mb-16">What We Build</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/sessions">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">SESSIONS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">Science-backed guided meditations. Each session builds a specific nervous system capacity. No prior experience needed.</p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">20 to 30 min</p>
              </div>
            </Link>
            <Link href="/daily-dojo">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">DAILY DOJO</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">A growing collection of training practices for every part of your day. Starting with Morning Dojo, Monday through Friday, five to ten minutes each morning.</p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">Daily Practice</p>
              </div>
            </Link>
            <Link href="/rituals">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">RITUALS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">Practices tied to specific moments in time. Anchored in milestones. Return to them when the time is right.</p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">Moment-Specific</p>
              </div>
            </Link>
            <Link href="/breathwork">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">30-DAY BREATHWORK</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">A structured 30-day protocol that builds your nervous system&apos;s capacity to match the life you&apos;re living.</p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">Now Live</p>
              </div>
            </Link>
            <div className="border border-stone/20 rounded-sm p-8 bg-obsidian/50 opacity-60 cursor-not-allowed h-full">
              <h3 className="font-bebas text-stone text-2xl tracking-tight mb-4">DOJO DNA</h3>
              <p className="font-dm-sans text-stone/70 text-sm leading-relaxed mb-6 font-light">The science beneath the practice. Short audio essays on the research that makes the Dojo work.</p>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" data-fade className={`${fadeClass('science')} py-32 px-4 bg-obsidian transition-opacity duration-600`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="font-bebas text-clay text-6xl sm:text-7xl tracking-tight text-balance">47%</div>
            <p className="font-dm-sans text-bone text-xl sm:text-2xl leading-relaxed font-light">
              of waking hours, the average mind is somewhere other than the present moment. That is not a character flaw. It is an untrained default.
            </p>
          </div>
          <a href="https://science.sciencemag.org/content/330/6006/932" target="_blank" rel="noopener noreferrer"
            className="font-space-mono text-stone text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300 inline-block">
            Harvard University. Killingsworth and Gilbert. 250,000 data points.
          </a>
          <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed pt-8">The Dojo trains your return.</p>
        </div>
      </section>

      {/* LISTEN NOW */}
      <section id="listen" data-fade className={`${fadeClass('listen')} py-32 px-4 bg-obsidian transition-opacity duration-600`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight text-balance">START YOUR PRACTICE</h2>
          <p className="font-dm-sans text-stone text-lg leading-relaxed font-light">Your nervous system is trainable. Every session builds your capacity to keep living life at full intensity.</p>
          <div className="flex flex-row gap-3 justify-center pt-4 flex-wrap">
            <a href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm?si=a0b1bebb7f854974" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center">
              <Music size={14} />
              Spotify
            </a>
            <a href="https://youtube.com/@thetechnodojo?si=qAYMs3M1Kk71LuSt" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center">
              <Play size={14} className="fill-current" />
              YouTube
            </a>
            <a href="https://www.patreon.com/thetechnodojo" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center">
              <PatreonIcon size={14} />
              Patreon
            </a>
          </div>
        </div>
      </section>

      <EmailSubscribe />
      <Footer />
    </main>
  )
}
