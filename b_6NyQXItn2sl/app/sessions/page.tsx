'use client'

import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Music } from 'lucide-react'

export default function SessionsPage() {
  const faqItems = [
    {
      q: 'Do I need experience to start?',
      a: 'No. Every session works for someone sitting down for the first time. Explore Sessions for an introduction to meditation, Daily Dojo for short daily practices, and Rituals for moment-specific practices.',
    },
    {
      q: 'How long are the sessions?',
      a: 'Sessions run between 20 and 30 minutes. Long enough to go somewhere real. Short enough to do before work.',
    },
    {
      q: 'Is this meditation?',
      a: 'It is guided meditation, science-backed and built to train the nervous system. No spirituality. No prior experience needed. Just a quiet place and a pair of headphones.',
    },
    {
      q: 'Why no music?',
      a: 'Music during a meditation can pull your attention, become a distraction, create conditional reliance, or interfere with your natural thoughts. The voice is your anchor and the silence is what enables you to explore your own mind.',
    },
    {
      q: 'How often should I listen?',
      a: 'Frequency matters more than duration. Showing up consistently, even briefly, produces stronger results than occasional longer sessions.',
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
          SESSIONS
        </h1>
        <p className="font-dm-sans text-stone text-lg leading-relaxed max-w-2xl font-light mb-8">
          Each session builds a specific nervous system capacity. Science-backed. No experience needed. Start anywhere.
        </p>
        <div className="h-px bg-clay w-12" />
      </section>

      {/* EXPLAINER STRIP */}
      <section className="bg-obsidian py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              The Format
            </p>
            <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
              Audio only. Voice guided. No music. Your full attention on one thing.
            </p>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              The Length
            </p>
            <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
              20 to 30 minutes. Long enough to go somewhere. Short enough to do before work.
            </p>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              The Result
            </p>
            <p className="font-dm-sans text-stone text-sm leading-relaxed font-light">
              Not relaxation. A trained nervous system. Eight weeks of practice produces measurable differences in the brain.
            </p>
          </div>
        </div>
      </section>

      {/* SESSION 01 */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Metadata */}
            <div className="flex-shrink-0 lg:w-1/3">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">
                Session 01
              </p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-4">
                ELIMINATING PAST AND FUTURE
              </h2>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                20 MIN. GUIDED MEDITATION
              </p>
            </div>

            {/* Right: Description and CTAs */}
            <div className="flex-grow lg:w-2/3">
              <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-6">
                Most people spend 47% of their waking hours somewhere other than the present moment. Not thinking about what is in front of them, replaying what happened or rehearsing what might. This session trains the return. The ability to notice you have drifted and come back. Not once. Every time.
              </p>
              <p className="font-space-mono text-stone text-xs italic mb-6">
                <a
                  href="https://science.sciencemag.org/content/330/6006/932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors"
                >
                  Harvard University. Killingsworth and Gilbert. 2010.
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://open.spotify.com/episode/7LlbbTTSGIhfBiNmPCbYHC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  <Music size={16} />
                  Listen on Spotify
                </a>
                <a
                  href="https://youtu.be/0v5j4Dqc0DU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded border-2 border-bone text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SESSION 02 */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Metadata */}
            <div className="flex-shrink-0 lg:w-1/3">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">
                Session 02
              </p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-4">
                THE SIGNALS
              </h2>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                30 MIN. GUIDED MEDITATION
              </p>
            </div>

            {/* Right: Description and CTAs */}
            <div className="flex-grow lg:w-2/3">
              <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-6">
                Your body is running a continuous real-time assessment of your state before your conscious mind catches up. Research on interoceptive accuracy shows a direct link between reading your own internal signals and performance under pressure. Cambridge traders with the highest body awareness outperformed their peers and survived longer in the markets. This session trains that precision.
              </p>
              <p className="font-space-mono text-stone text-xs italic mb-6">
                <a
                  href="https://www.nature.com/articles/srep32986"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors"
                >
                  Scientific Reports. 2016. Cambridge Trading Floor Study.
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://open.spotify.com/episode/07BrKYpXTCLx76DLdD9r6Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  <Music size={16} />
                  Listen on Spotify
                </a>
                <a
                  href="https://youtu.be/4K-BXQ7KMac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded border-2 border-bone text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SESSION 03 */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Metadata */}
            <div className="flex-shrink-0 lg:w-1/3">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-2">
                Session 03
              </p>
              <h2 className="font-bebas text-bone text-4xl sm:text-5xl tracking-tight mb-4">
                THE GAP
              </h2>
              <p className="font-space-mono text-stone text-xs tracking-widest uppercase">
                20 MIN. GUIDED MEDITATION
              </p>
            </div>

            {/* Right: Description and CTAs */}
            <div className="flex-grow lg:w-2/3">
              <p className="font-dm-sans text-bone text-base leading-relaxed font-light mb-6">
                Between what happens to you and how you respond, there is a gap. For most people it is too small to access. The threat response fires in milliseconds and bypasses the decision-making centre entirely. Harvard neuroscientist Sara Lazar used MRI imaging to confirm that meditation physically thickens the prefrontal cortex and makes the amygdala measurably less reactive. Eight weeks. Structural changes you can see on a scan.
              </p>
              <p className="font-space-mono text-stone text-xs italic mb-6">
                <a
                  href="https://news.harvard.edu/gazette/story/2011/01/eight-weeks-to-a-better-brain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors"
                >
                  Harvard Gazette. Sara Lazar. MGH. 2011.
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
                  className="px-6 py-3 rounded border-2 border-bone text-bone font-space-mono font-normal tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center sm:justify-start"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
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

      {/* BOTTOM CTA */}
      <EmailSubscribe
        headingText="NEW SESSIONS RELEASING REGULARLY"
        descriptionText="New sessions, new science, new releases. No noise."
      />

      <Footer />
    </main>
  )
}
