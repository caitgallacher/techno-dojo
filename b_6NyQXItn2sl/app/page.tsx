'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Play, Music } from 'lucide-react'

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(['hero', 'philosophy', 'products', 'featured', 'science', 'about', 'listen', 'join'])
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
    elements.forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const fadeClass = (id: string) => (visibleSections.has(id) ? 'opacity-100' : 'opacity-0')

  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />

      {/* HERO Section */}
      <section
        id="hero"
        data-fade
        className={`${fadeClass('hero')} min-h-screen pt-40 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-600`}
      >
        <div className="space-y-8 max-w-3xl">
          {/* Label */}
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
            Performance Meditation & Breathwork
          </p>

          {/* Main Headline */}
          <h1 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-balance">
            Train Relentlessly.<br />Live Effortlessly.
          </h1>

          {/* Subheading */}
          <p className="font-dm-sans text-stone text-lg sm:text-xl leading-relaxed text-balance max-w-2xl mx-auto font-light">
            Guided meditation and breathwork for high performers. Science-backed. Built for the intersection of performance and human experience.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm?si=a0b1bebb7f854974"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <Play size={16} className="fill-current" />
              Start Listening. It&apos;s Free
            </a>
          </div>

          {/* Availability */}
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase pt-4">
            Available on Spotify and YouTube
          </p>
        </div>
      </section>

      {/* PHILOSOPHY Section */}
      <section
        id="philosophy"
        data-fade
        className={`${fadeClass('philosophy')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {/* Left: TECHNO */}
            <div className="space-y-4">
              <h2 className="font-bebas text-clay text-5xl sm:text-6xl tracking-tight text-balance">
                TECHNO
              </h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
                The relentless pursuit of excellence in any field.
              </p>
            </div>

            {/* Right: DOJO */}
            <div className="space-y-4">
              <h2 className="font-montserrat text-gold text-5xl sm:text-6xl tracking-tight text-balance">
                DOJO
              </h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
                The inner state that makes excellence possible.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-stone/30 my-12" />

          {/* Pull Quote */}
          <div className="max-w-3xl mx-auto text-center space-y-6 my-8">
            <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed">
              &quot;The intensity requires the stillness. The stillness is only as deep as the intensity that earned it.&quot;
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-stone/30 mt-8" />
        </div>
      </section>

      {/* PRODUCTS Section */}
      <section
        id="products"
        data-fade
        className={`${fadeClass('products')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase text-center mb-16">
            What We Build
          </p>

          {/* Product Grid - 3 top, 2 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: SESSIONS */}
            <Link href="/sessions">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">SESSIONS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  Deep science-backed guided meditations. Each session trains a specific mental performance skill. No experience needed.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  20 to 30 min
                </p>
              </div>
            </Link>

            {/* Card 2: DAILY DOJO */}
            <Link href="/daily-dojo">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">DAILY DOJO</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  A growing suite of daily training practices for every part of your day. Starting with Morning Dojo, Monday through Friday, five to ten minutes each morning.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  Daily Practice
                </p>
              </div>
            </Link>

            {/* Card 3: RITUALS */}
            <Link href="/rituals">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">RITUALS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  Practices tied to specific moments in time. Not scheduled. Anchored. Return to it when the moment arrives.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  Moment-Specific
                </p>
              </div>
            </Link>

            {/* Card 4: 30-DAY BREATHWORK (Coming Soon) */}
            <div className="border border-stone/20 rounded-sm p-8 bg-obsidian/50 opacity-60 cursor-not-allowed h-full">
              <h3 className="font-bebas text-stone text-2xl tracking-tight mb-4">30-DAY BREATHWORK</h3>
              <p className="font-dm-sans text-stone/70 text-sm leading-relaxed mb-6 font-light">
                A structured 30-day protocol. Daily breathwork that builds capacity and trains the nervous system from the inside out.
              </p>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                Coming Soon
              </p>
            </div>

            {/* Card 5: DOJO DNA (Coming Soon) */}
            <div className="border border-stone/20 rounded-sm p-8 bg-obsidian/50 opacity-60 cursor-not-allowed h-full">
              <h3 className="font-bebas text-stone text-2xl tracking-tight mb-4">DOJO DNA</h3>
              <p className="font-dm-sans text-stone/70 text-sm leading-relaxed mb-6 font-light">
                The science beneath the practice. Short audio essays on the research that makes the Dojo work.
              </p>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SESSION Section */}
      <section
        id="featured"
        data-fade
        className={`${fadeClass('featured')} py-32 px-4 bg-forest transition-opacity duration-600`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="font-space-mono text-bone text-xs tracking-widest uppercase">
                Session 03
              </p>
              <h2 className="font-bebas text-bone text-5xl sm:text-6xl tracking-tight text-balance">
                THE GAP
              </h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
                Between what happens to you and how you respond, there is a gap. This session trains access to it. Harvard MRI research confirms 8 weeks of practice physically rewires the brain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://open.spotify.com/episode/4J9e984SZstjJRnBwImilx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  <Music size={16} />
                  Listen on Spotify
                </a>
                <a
                  href="https://youtu.be/yEBoKItb8kw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-space-mono text-stone text-xs tracking-widest uppercase underline underline-offset-4 hover:text-bone transition-colors duration-300 flex items-center gap-2"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>

            {/* Right Decorative Text */}
            <div className="flex items-center justify-center">
              <div className="text-stone/10 font-bebas text-8xl sm:text-9xl lg:text-[12rem] leading-none tracking-tighter break-words text-center">
                THE GAP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE Section */}
      <section
        id="science"
        data-fade
        className={`${fadeClass('science')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="font-bebas text-clay text-6xl sm:text-7xl tracking-tight text-balance">
              47%
            </div>
            <p className="font-dm-sans text-bone text-xl sm:text-2xl leading-relaxed font-light">
              of waking hours, the average mind is somewhere other than the present moment. That is not a character flaw. It is an untrained default.
            </p>
          </div>

          {/* Citation */}
          <a
            href="https://science.sciencemag.org/content/330/6006/932"
            target="_blank"
            rel="noopener noreferrer"
            className="font-space-mono text-stone text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300 inline-block"
          >
            Harvard University. Killingsworth and Gilbert. 250,000 data points.
          </a>

          {/* Conclusion */}
          <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed pt-8">
            The Dojo trains your return.
          </p>
        </div>
      </section>

      {/* ABOUT Section */}
      <section
        id="about"
        data-fade
        className={`${fadeClass('about')} py-32 px-4 bg-bone transition-opacity duration-600`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Founder Photo */}
<div className="aspect-square rounded-sm overflow-hidden">
  <img
    src="/Cait.jpg"
    alt="Cait Gallacher, founder of Techno Dojo, in Morocco at golden hour"
    className="w-full h-full object-cover object-top"
  />
</div>
            {/* Right: Bio */}
            <div className="space-y-6">
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                Founder
              </p>
              <h2 className="font-bebas text-obsidian text-4xl sm:text-5xl tracking-tight text-balance">
                CAIT GALLACHER
              </h2>
              <p className="font-dm-sans text-obsidian text-lg leading-relaxed font-light">
                Former management consultant. MBA. National athlete, Team Canada All-Star Cheerleading. 200-hour yoga teacher training. 100-hour breathwork and meditation certification. Full-time traveller. Techno Dojo exists because high performance and inner work are not opposites. They are the same practice from different directions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LISTEN NOW Section */}
      <section
        id="listen"
        data-fade
        className={`${fadeClass('listen')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight text-balance">
            START YOUR PRACTICE
          </h2>
          <p className="font-dm-sans text-stone text-lg leading-relaxed font-light">
            Free on Spotify and YouTube. No sign-up required.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm?si=a0b1bebb7f854974"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Music size={16} />
              Listen on Spotify
            </a>
            <a
              href="https://youtube.com/@thetechnodojo?si=qAYMs3M1Kk71LuSt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded border-2 border-bone text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Play size={16} className="fill-current" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE Section */}
      <EmailSubscribe />

      <Footer />
    </main>
  )
}
