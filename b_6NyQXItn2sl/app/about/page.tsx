'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />

      {/* HERO */}
      <section className="pt-40 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">
            FOUNDER
          </p>
          <h1 className="font-bebas text-bone text-5xl sm:text-6xl tracking-tight">
            ABOUT
          </h1>
        </div>
      </section>

      {/* PHOTO + WHO I AM */}
      <section className="bg-obsidian pb-0 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex md:gap-10">

            {/* LEFT: Photo + caption */}
            <div className="md:w-72 flex-shrink-0 mb-8 md:mb-0">
              <div className="rounded-sm overflow-hidden mb-4">
                <img
                  src="/Cait.jpg"
                  alt="Cait Gallacher, founder of Techno Dojo"
                  className="w-full object-cover object-top"
                />
              </div>
              <div className="font-bebas text-bone text-lg tracking-wider leading-none mb-2">
                CAIT GALLACHER
              </div>
              <p className="font-dm-sans text-[#9A9A92] text-xs leading-relaxed font-light italic">
                Former management consultant and entrepreneur. MBA. National athlete, Team Canada All-Star Cheerleading. 200-hour yoga teacher training. 100-hour breathwork and meditation certification. Full-time traveller.
              </p>
            </div>

            {/* RIGHT: WHO I AM */}
            <div className="flex-1">
              <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
                WHO I AM
              </p>
              <div className="space-y-3 font-dm-sans font-light text-[#9A9A92] text-base leading-relaxed">
                <p>I have spent most of my life being two things at once. Both Techno and Dojo.</p>
                <p>The Techno: the athlete, the big-city consultant, the person who wants to build exceptional things and is willing to work insanely hard to do it. That version of me measures herself against the highest standards and genuinely loves the pursuit of excellence.</p>
                <p>And there&apos;s the other side.</p>
                <p>The Dojo: the person who believes, at her core, that the point of life is to feel alive. That the most important thing you can do is feel genuine joy and have fun, every day. The person who values deep connection to the people around her. The endless optimist.</p>
                <p>For a long time, I couldn&apos;t find a way of life that let me be both.</p>
                <p>The corporate world felt restricting, like play was a bad thing. The spiritual world felt almost allergic to ambition. I found myself being forced to choose: slow down or speed up, achieve or surrender, perform or be at peace.</p>
                <p>I don&apos;t want to choose. I want both. And I couldn&apos;t find anything built for someone like me.</p>
                <p className="text-bone">So I built it.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REMAINING SECTIONS */}
      <section className="bg-obsidian py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* TURNING POINT */}
          <div>
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              THE TURNING POINT
            </p>
            <div className="space-y-3 font-dm-sans font-light text-[#9A9A92] text-base leading-relaxed">
              <p>I hired a coach who changed my life. Completely.</p>
              <p>She gave me a question I have carried with me every day since: <span className="italic text-bone">Who am I becoming, and am I living in alignment with that person?</span></p>
              <p>That question ended my habit of promising myself I&apos;d get to it tomorrow. I stopped waiting until next week, next month, or next year to become the version of myself I already knew I wanted to be. I made my internal work as serious and as worthy of investment as any external goal I had ever set.</p>
              <p>And then I started seeing it everywhere. In old colleagues, teammates, friends. Genuinely brilliant people who work incredibly hard and have everything it takes. Functioning at the highest level, but running on something that won&apos;t last. They&apos;re missing an ability to go hard without slowly hollowing out.</p>
              <p>Most of them might never walk into a meditation studio or sign up for a breathwork class. The language of that world doesn&apos;t belong to them.</p>
              <p className="text-bone">But the need does.</p>
            </div>
          </div>

          <div className="h-px bg-stone/20" />

          {/* WHY THIS EXISTS */}
          <div>
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              WHY THIS EXISTS
            </p>
            <div className="space-y-3 font-dm-sans font-light text-[#9A9A92] text-base leading-relaxed">
              <p>My younger brother is the clearest version of this story.</p>
              <p>He is driven, disciplined, and far from the stereotypical mindfulness type. But after months of intense pursuit, even he turned to breathwork. When he told me, I didn&apos;t feel surprised. I felt the gap close. I knew what I was building.</p>
              <p className="text-bone">That&apos;s who Techno Dojo is for.</p>
              <p>Something is shifting in how people think about their health.</p>
              <p>Some are deep in biometric data: HRV scores, recovery percentages, readiness ratings. But they don&apos;t know what to do with any of it.</p>
              <p>Others have stepped back from tracking altogether, burned out by the pressure to track everything and still feel behind.</p>
              <p>Both responses make sense, but neither of them addresses the core challenge.</p>
              <p>Your HRV score tells you what happened. Your nervous system determines what happens next: how you respond to pressure, how you recover, how present you are for the people you love, how you show up for the things that matter. Nervous system training is the missing piece.</p>
              <p>Techno Dojo is the third option. Not tracking more or tracking less, but building the foundation that makes everything your data is trying to tell you actionable.</p>
              <p className="text-bone">The practice isn&apos;t asking you to become someone different. It&apos;s asking you to build the nervous system that makes you more capable, more present, and more alive in every part of your life.</p>
            </div>
          </div>

          <div className="h-px bg-stone/20" />

          {/* WHERE THIS IS GOING */}
          <div>
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">
              WHERE THIS IS GOING
            </p>
            <div className="space-y-3 font-dm-sans font-light text-[#9A9A92] text-base leading-relaxed">
              <p>Today, Techno Dojo is a library of guided practices: meditations, breathwork, rituals for specific moments.</p>
              <p className="text-bone">But Techno Dojo is not a content library. It&apos;s a training system.</p>
              <p>The question that drives everything here is: what does this person need, right now, given everything true about them today?</p>
              <p>Your nervous system is as unique as you are. It deserves training that reflects that.</p>
              <p>That is where this is going: a nervous system operating system. Built on the science of how human beings regulate, recover, and perform. A system that learns who you are, adapts to you, and becomes more useful the longer you use it.</p>
              <p className="text-bone">We&apos;re at the beginning. The rest is being built.</p>
            </div>
          </div>

        </div>
      </section>

      {/* PHILOSOPHY PULL QUOTE */}
      <section className="bg-forest py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-playfair text-bone text-2xl sm:text-3xl italic leading-relaxed">
            &quot;The intensity requires the stillness. The stillness runs as deep as the intensity that needs it.&quot;
          </p>
        </div>
      </section>

      <EmailSubscribe />
      <Footer />
    </main>
  )
}
