'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { EmailPopup } from '@/components/EmailPopup'
import { Play, Music } from 'lucide-react'

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(['hero', 'philosophy', 'why', 'products', 'science', 'about', 'listen', 'join'])
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
      <EmailPopup />

      {/* HERO Section */}
      <section
        id="hero"
        data-fade
        className={`${fadeClass('hero')} min-h-screen pt-40 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-600`}
      >
        <div className="space-y-8 max-w-3xl">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
            NERVOUS SYSTEM TRAINING
          </p>
          <h1 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-balance">
            Go hard.<br />Stay whole.
          </h1>
          <p className="font-dm-sans text-stone text-lg sm:text-xl leading-relaxed text-balance max-w-2xl mx-auto font-light">
            You were built for an intense life. This practice builds the nervous system that supports you while you live it. Science-backed. Free on Spotify and YouTube.
          </p>
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
            <div className="space-y-4">
              <h2 className="font-bebas text-clay text-5xl sm:text-6xl tracking-tight text-balance">
                TECHNO
              </h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
                The relentless pursuit of excellence in any field.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="font-montserrat text-gold text-5xl sm:text-6xl tracking-tight text-balance">
                DOJO
              </h2>
              <p className="font-dm-sans text-bone text-lg leading-relaxed font-light">
                The inner state that makes excellence possible.
              </p>
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

      {/* WHY YOU ARE HERE Section */}
      <section
        id="why"
        data-fade
        className={`${fadeClass('why')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-16">
            WHY YOU ARE HERE
          </p>

          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              YOU GO HARD.
            </h2>
            <p className="font-dm-sans font-light text-stone text-lg leading-relaxed">
              Your life is full and intense, and you want to keep it that way. But something is changing. Sleep doesn&apos;t feel as restorative. Energy is slower to arrive. The things you love aren&apos;t as fulfilling. You feel &ldquo;almost&rdquo; yourself, but not quite.
            </p>
          </div>

          <div className="h-px bg-stone/20 mb-12" />

          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              YOU WANT TO KEEP GOING, BUT SOMETHING IS OFF.
            </h2>
            <p className="font-dm-sans font-light text-stone text-lg leading-relaxed">
              It shows up in small ways. Slightly shorter temper. Harder to be present. Half-listening, half mind-racing. Less time for the things that once defined you. There simply isn&apos;t enough space.
            </p>
          </div>

          <div className="h-px bg-stone/20 mb-12" />

          <div className="mb-12">
            <h2 className="font-bebas text-bone text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              THE VERSION OF YOU DOING THE LIVING FEELS LESS ALIVE.
            </h2>
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

      {/* PRODUCTS Section */}
      <section
        id="products"
        data-fade
        className={`${fadeClass('products')} py-32 px-4 bg-obsidian transition-opacity duration-600`}
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase text-center mb-16">
            What We Build
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/sessions">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">SESSIONS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  Science-backed guided meditations. Each session builds a specific nervous system capacity. No prior experience needed.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  20 to 30 min
                </p>
              </div>
            </Link>
            <Link href="/daily-dojo">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">DAILY DOJO</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  A growing collection of training practices for every part of your day. Starting with Morning Dojo, Monday through Friday, five to ten minutes each morning.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  Daily Practice
                </p>
              </div>
            </Link>
            <Link href="/rituals">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">RITUALS</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  Practices tied to specific moments in time. Anchored in milestones. Return to them when the time is right.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  Moment-Specific
                </p>
              </div>
            </Link>

            {/* Card 4: 30-DAY BREATHWORK — NOW LIVE */}
            <Link href="/breathwork">
              <div className="card-lift border border-bone rounded-sm p-8 bg-obsidian hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-4">30-DAY BREATHWORK</h3>
                <p className="font-dm-sans text-stone text-sm leading-relaxed mb-6 font-light">
                  A structured 30-day protocol that builds your nervous system&apos;s capacity to match the life you&apos;re living.
                </p>
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase">
                  Coming Soon
                </p>
              </div>
            </Link>

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
          <a
            href="https://science.sciencemag.org/content/330/6006/932"
            target="_blank"
            rel="noopener noreferrer"
            className="font-space-mono text-stone text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300 inline-block"
          >
            Harvard University. Killingsworth and Gilbert. 250,000 data points.
          </a>
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
            <div className="aspect-square rounded-sm overflow-hidden">
              <img
                src="/Cait.jpg"
                alt="Cait Gallacher, founder of Techno Dojo, in Morocco at golden hour"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-6">
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                Founder
              </p>
              <h2 className="font-bebas text-obsidian text-4xl sm:text-5xl tracking-tight text-balance">
                CAIT GALLACHER
              </h2>
              <p className="font-dm-sans text-obsidian text-lg leading-relaxed font-light">
                Former management consultant. MBA. National athlete, Team Canada All-Star Cheerleading. 200-hour yoga teacher training. 100-hour breathwork and meditation certification. Full-time traveller. Techno Dojo exists because she learned, through all of it, that the intensity and the stillness are not in opposition. One builds the capacity for the other.
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
