'use client'

import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Music } from 'lucide-react'

export default function DailyDojoPage() {
  const practices = [
    {
      day: 'MONDAY',
      title: 'FOCUS',
      duration: '7 MIN',
      description: 'You have a 90-minute window of peak performance after waking up. Use it before the week fragments your attention.',
      spotifyLink: 'https://open.spotify.com/episode/2T1OlXpNcMyRGYikT9tRgN',
      youtubeLink: 'https://youtu.be/0ZwVLE4nZXQ',
    },
    {
      day: 'TUESDAY',
      title: 'CONTINUATION',
      duration: '8 MIN',
      description: 'Identity-based commitment outperforms motivation every time. Train the decision about who you are in relation to the things you do.',
      spotifyLink: 'https://open.spotify.com/episode/5sTEMohMPhhJ6CZDkxcccs',
      youtubeLink: 'https://youtu.be/ZM3mf_5H1kU',
    },
    {
      day: 'WEDNESDAY',
      title: 'CLARITY',
      duration: '6 MIN',
      description: 'Decision fatigue is measurable. By midweek, your prefrontal cortex is flooded with competing inputs. Get clear on your priorities now to close the week strong.',
      spotifyLink: 'https://open.spotify.com/episode/1CByE91uQXnN2davCHbgyR',
      youtubeLink: 'https://youtu.be/sqn2t6ghoII',
    },
    {
      day: 'THURSDAY',
      title: 'STEADINESS',
      duration: '7 MIN',
      description: 'Emotional regulation is the first to degrade when you\'re tired. Hold yourself to your own high standards through the fatigue.',
      spotifyLink: 'https://open.spotify.com/episode/30DSYaTN9MfZBduyG6VrCl',
      youtubeLink: 'https://youtu.be/M26T6qL1xXs',
    },
    {
      day: 'FRIDAY',
      title: 'COMPLETION',
      duration: '10 MIN',
      description: 'The Zeigarnik effect means an unfinished week travels into your weekend. Train the full stop. Close the week, all the way. Use the weekend to reset.',
      spotifyLink: 'https://open.spotify.com/episode/4t5wqcSetRwcJukKT6toiG',
      youtubeLink: 'https://youtu.be/a4ZigEn8BW0',
    },
  ]

  const faqItems = [
    {
      q: 'What is the Daily Dojo?',
      a: 'The Daily Dojo is a growing collection of short guided practices built for specific moments in your day. Each series targets a different time and a different capacity, targeting specific challenges many people face on that day of the week. The Morning Dojo is the first series available now.',
    },
    {
      q: 'When should I listen?',
      a: 'That depends on the series. The Morning Dojo is designed for first thing in the morning. Evening and bedtime series are coming. Each practice is built for the moment it serves.',
    },
    {
      q: 'Do I need to follow the series in order?',
      a: 'Each practice stands alone. You can start anywhere on any day of the week.',
    },
    {
      q: 'How is this different from the Sessions?',
      a: 'Sessions go deep on one concept, 20 to 30 minutes. The Daily Dojo is a daily training practice; shorter and targeted to specific challenges people face throughout the week.',
    },
    {
      q: 'Is it free?',
      a: 'Yes. Every Daily Dojo practice is free on Spotify and YouTube. No sign-up required.',
    },
  ]

  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />

      {/* HERO Section */}
      <section className="h-screen pt-40 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-4">
          Your Dojo
        </p>
        <h1 className="font-bebas text-bone text-7xl sm:text-8xl tracking-wider mb-6">
          DAILY DOJO
        </h1>
        <p className="font-dm-sans text-stone text-lg leading-relaxed max-w-2xl font-light mb-8">
          Training practices for every part of your day. Different practices for different day-to-day moments. Short enough to do consistently and precise enough to build real results.
        </p>
        <div className="h-px bg-clay w-12" />
      </section>

      {/* THE PRACTICE */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Column 1 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                THE PRACTICE
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                A structured training sequence. Each practice targets a specific nervous system capacity. Together they build a comprehensive system.
              </p>
            </div>
            {/* Column 2 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                THE LENGTH
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                Each practice is designed for the time of day it serves. From five minutes in the morning to a longer wind-down at night. Always efficient. Never wasted.
              </p>
            </div>
            {/* Column 3 */}
            <div className="text-center">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                THE RESULT
              </p>
              <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
                Consistency matters more than duration. Show up every day, even briefly, and structural change happens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MORNING DOJO SPOTLIGHT */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-space-mono text-bone text-xs tracking-widest uppercase mb-2">
            NOW AVAILABLE
          </p>
          <h2 className="font-bebas text-bone text-5xl sm:text-6xl tracking-tight mb-4">
            MORNING DOJO
          </h2>
          <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-6">
            The first Daily Dojo series. Five days, five skills. Five to ten minutes each morning before your day starts.
          </p>
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
            SERIES 01 OF THE DAILY DOJO
          </p>
        </div>
      </section>

      {/* DAILY PRACTICES */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Practices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {practices.map((practice, idx) => (
              <div key={idx} className="border border-stone/30 rounded-sm p-6 bg-obsidian/50 flex flex-col">
                <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-3">
                  {practice.day}
                </p>
                <h3 className="font-bebas text-bone text-2xl tracking-tight mb-2">
                  {practice.title}
                </h3>
                <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-4">
                  {practice.duration}
                </p>
                <p className="font-dm-sans text-bone text-sm leading-relaxed font-light mb-6 flex-grow">
                  {practice.description}
                </p>
                {/* Icon Links */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={practice.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-stone/10 transition-colors"
                    title="Listen on Spotify"
                  >
                    <Music size={18} className="text-clay" />
                  </a>
                  <a
                    href={practice.youtubeLink}
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
            ))}
          </div>

          {/* Coming Soon Strip */}
          <div className="border-t border-b border-stone/30 py-12">
            <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-2 text-center">
              THE DAILY DOJO IS GROWING
            </p>
            <h3 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight text-center mb-4">
              EVENING DOJO. BEDTIME DOJO.
            </h3>
            <p className="font-dm-sans text-stone text-base leading-relaxed font-light text-center max-w-2xl mx-auto">
              More series are coming. Each one built for a specific moment in your day. Stay in the Dojo to be notified when they drop.
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

      {/* STAY IN THE DOJO */}
      <EmailSubscribe />

      <Footer />
    </main>
  )
}
