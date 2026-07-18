'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailSubscribe } from '@/components/EmailSubscribe'
import { Music, Download } from 'lucide-react'

const PATREON_GENERAL = 'https://www.patreon.com/thetechnodojo'
const SPOTIFY_SHOW = 'https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm'
const YOUTUBE_CHANNEL = 'https://youtube.com/@thetechnodojo'

const days = [
  { day: 1, phase: 'CONTROL', pattern: '4-0-5-0', duration: '8:00',
    spotify: 'https://open.spotify.com/episode/7wJX9T7PZm8P6LAzbZFE3G',
    youtube: 'https://youtu.be/5YuRdCYrbOw',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-1-nose-for-162522264' },
  { day: 2, phase: 'CONTROL', pattern: '4-0-5-0', duration: '8:23',
    spotify: 'https://open.spotify.com/episode/3IkfwpR9glmKngjqSs9yKU',
    youtube: 'https://youtu.be/4ypz4ANJ-08',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-2-consistent-162522763' },
  { day: 3, phase: 'CONTROL', pattern: '4-0-5-0', duration: '9:11',
    spotify: 'https://open.spotify.com/episode/6w1aDsm5IzGZKwF1fiKthC',
    youtube: 'https://youtu.be/O0WPbmNkSFs',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-3-awareness-162522903' },
  { day: 4, phase: 'CONTROL', pattern: '4-0-6-0', duration: '8:25',
    spotify: 'https://open.spotify.com/episode/6TSv9dPA0JZ7OBgTlitmqT',
    youtube: 'https://youtu.be/pCFkOqgY1gk',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-4-vagus-30-162523119' },
  { day: 5, phase: 'CONTROL', pattern: '4-0-6-0', duration: '8:15',
    spotify: 'https://open.spotify.com/episode/3AkduXJgQhyzzOwFt020h7',
    youtube: 'https://youtu.be/0EhFH0qrz0E',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-5-nervous-30-162523214' },
  { day: 6, phase: 'CONTROL', pattern: '4-1-6-0', duration: '9:21',
    spotify: 'https://open.spotify.com/episode/23zEYni6M5cnXoow4Idceq',
    youtube: 'https://youtu.be/cpv5pRYxqKM',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-6-breath-for-162523288' },
  { day: 7, phase: 'CONTROL', pattern: '4-1-6-0', duration: '9:06',
    spotify: 'https://open.spotify.com/episode/3uVJ0nzIiygftZnbstfyYi',
    youtube: 'https://youtu.be/Lb0K-2zuIWo',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-7-building-162523395' },
  { day: 8, phase: 'CONTROL', pattern: '4-2-6-0', duration: '7:39',
    spotify: 'https://open.spotify.com/episode/2I2r9V9ZmdjwIYQkLZdlT3',
    youtube: 'https://youtu.be/annhNGIX12Q',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-8-extending-162523478' },
  { day: 9, phase: 'CONTROL', pattern: '4-2-6-0', duration: '7:19',
    spotify: 'https://open.spotify.com/episode/3cies1I9ZJW2tvRf0OtLFP',
    youtube: 'https://youtu.be/3xEsBXhWaM8',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-9-staying-30-162523564' },
  { day: 10, phase: 'CONTROL', pattern: '4-2-6-1', duration: '7:55',
    spotify: 'https://open.spotify.com/episode/0AwtHJHqWl0LigjqhU6s0v',
    youtube: 'https://youtu.be/hHTQg88SJ88',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-10-your-full-162523639' },
  { day: 11, phase: 'CAPACITY', pattern: '4-2-6-2', duration: '8:31',
    spotify: 'https://open.spotify.com/episode/5ro6NjEpCpUGLBRxjAgZ6S',
    youtube: 'https://youtu.be/V76cvztkvUw',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-11-box-for-162523735' },
  { day: 12, phase: 'CAPACITY', pattern: '4-2-6-2', duration: '7:59',
    spotify: 'https://open.spotify.com/episode/2Ree2e1d5wSn9Pg5EWxIg5',
    youtube: 'https://youtu.be/YU2a-NMxQtQ',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-12-cardiac-162523851' },
  { day: 13, phase: 'CAPACITY', pattern: '4-2-6-2', duration: '8:27',
    spotify: 'https://open.spotify.com/episode/6zrj71xwSUx8uH3Cp0T20q',
    youtube: 'https://youtu.be/Y8InKf8-HYA',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-13-training-162523937' },
  { day: 14, phase: 'CAPACITY', pattern: '5-3-7-3', duration: '8:19',
    spotify: 'https://open.spotify.com/episode/4BEqNeLk5Cail5F62sdd05',
    youtube: 'https://youtu.be/q7WbzyPYhqk',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-14-extending-162524045' },
 { day: 15, phase: 'CAPACITY', pattern: '5-3-7-3', duration: '8:29',
    spotify: 'https://open.spotify.com/episode/2afNvQMwVvvMjfL9eqESMd',
    youtube: 'https://youtu.be/g5-kaN26Wu8',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-15-and-30-162524521' },
  { day: 16, phase: 'CAPACITY', pattern: '5-4-7-4', duration: '8:45',
    spotify: 'https://open.spotify.com/episode/1MUxRlImg4DwMdDSaMahoS',
    youtube: 'https://youtu.be/-4aDhGuhPPw',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-16-stress-30-162525223' },
  { day: 17, phase: 'CAPACITY', pattern: '5-4-7-4', duration: '9:00',
    spotify: 'https://open.spotify.com/episode/4n4IGvt950fkXWKMPSpoZa',
    youtube: 'https://youtu.be/wGtcR_cgOYM',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-17-building-162581879' },
  { day: 18, phase: 'CAPACITY', pattern: '5-5-7-5', duration: '8:19',
    spotify: 'https://open.spotify.com/episode/5Ic7u2pLpa18B8viQFU6oa',
    youtube: 'https://youtu.be/AcKdQFYzZJY',
    patreon: 'https://www.patreon.com/thetechnodojo/posts/day-18-finding-162581941' },
  { day: 19, phase: 'CAPACITY', pattern: '5-5-7-5', duration: '9:08',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/owoeqX-Rd00', patreon: PATREON_GENERAL },
  { day: 20, phase: 'CAPACITY', pattern: '6-4-8-4', duration: '8:45',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/7iJgKfoB87Y', patreon: PATREON_GENERAL },
  { day: 21, phase: 'SELF-TRUST', pattern: '6-6-6-6', duration: '9:11',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/-j3kxExkeBo', patreon: PATREON_GENERAL },
  { day: 22, phase: 'SELF-TRUST', pattern: '6-4-8-4', duration: '8:11',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/KJDT9Ut18pA', patreon: PATREON_GENERAL },
  { day: 23, phase: 'SELF-TRUST', pattern: '6-4-8-4', duration: '7:57',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/t_U6nLOYuwM', patreon: PATREON_GENERAL },
  { day: 24, phase: 'SELF-TRUST', pattern: '6-6-6-6', duration: '8:56',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/_Af0iwAu1qA', patreon: PATREON_GENERAL },
  { day: 25, phase: 'SELF-TRUST', pattern: '6-6-6-6', duration: '8:45',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/Od3KhPQKkF0', patreon: PATREON_GENERAL },
  { day: 26, phase: 'SELF-TRUST', pattern: 'SELF-GUIDED', duration: '9:17',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/vZsgN8Nw-DE', patreon: PATREON_GENERAL },
  { day: 27, phase: 'SELF-TRUST', pattern: '6-6-6-6', duration: '8:31',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/PjkUbELaGtY', patreon: PATREON_GENERAL },
  { day: 28, phase: 'SELF-TRUST', pattern: 'SELF-GUIDED', duration: '8:31',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/0C4sEpaShc8', patreon: PATREON_GENERAL },
  { day: 29, phase: 'SELF-TRUST', pattern: 'SELF-GUIDED', duration: '9:21',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/TN2OhJ2U2Rw', patreon: PATREON_GENERAL },
  { day: 30, phase: 'SELF-TRUST', pattern: 'SELF-GUIDED', duration: '10:00',
    spotify: SPOTIFY_SHOW, youtube: 'https://youtu.be/IZQODmGrlKU', patreon: PATREON_GENERAL },
]

const phaseColor = {
  'CONTROL': { border: 'border-l-[#F2EDE4]', text: 'text-[#F2EDE4]' },
  'CAPACITY': { border: 'border-l-[#C4622D]', text: 'text-[#C4622D]' },
  'SELF-TRUST': { border: 'border-l-[#B89050]', text: 'text-[#B89050]' },
}

const PatreonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.82 2.41C18.78 2.41 22 5.65 22 9.62c0 3.96-3.22 7.19-7.18 7.19-3.96 0-7.19-3.23-7.19-7.19 0-3.97 3.23-7.21 7.19-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
)

const faqItems = [
  { q: 'What is a 30-day breathwork protocol?', a: 'A 30-day breathwork protocol is a structured daily breathing practice designed to progressively train breathing control and nervous system regulation. Unlike standalone breathwork sessions, a protocol builds in a deliberate sequence. Breath patterns, breath holds, and training intensity increase as your nervous system adapts. The Techno Dojo 30-Day Breathwork Protocol moves through three phases: Control (Days 1–10), Capacity (Days 11–20), and Self-Trust (Days 21–30). Each phase introduces new patterns and new science as you are ready for it. Less than 10 minutes a day. Free on Spotify, YouTube, and Patreon.' },
  { q: 'What does breathwork do for the nervous system?', a: 'Breathwork can influence autonomic nervous system activity. That is, the system that controls your stress response, recovery, and emotional regulation. Controlled breathing, particularly patterns with extended exhales, may increase vagal activity and support parasympathetic nervous system activity, helping the body shift out of fight-or-flight mode. Some forms of slow, controlled breathing have been shown to improve heart rate variability (HRV), a key biomarker of nervous system resilience, and build tolerance to air-hunger sensations, which may help you respond to internal stress signals more calmly. With consistent practice, regulation skills can become more familiar and easier to access. Your nervous system practices returning to regulation more quickly and efficiently, which it then applies when faced with real-world stress and pressure.' },
  { q: 'How does breathwork improve HRV?', a: 'Heart rate variability (HRV) reflects how flexibly your autonomic nervous system responds to stress, recovery, and changing demands. Higher HRV is often associated with greater autonomic flexibility, while chronically low HRV can be associated with stress load or reduced recovery. For driven, ambitious individuals, a chronically activated state can feel like being stuck in go-mode: high output, limited restoration. Slow, controlled breathing can improve HRV by increasing respiratory sinus arrhythmia and supporting vagal activity. Breathing at a slow pace, often around six breaths per minute, has been shown to coordinate breathing, heart-rate, and blood-pressure rhythms in a way that supports HRV, baroreflex function, and autonomic regulation. HRV biofeedback and resonance-breathing research suggest that consistent practice over several weeks can produce measurable improvements in HRV. This protocol is designed to build that consistency from Day 1.' },
  { q: 'Do I need experience with breathwork to start?', a: 'No. Day 1 starts from the beginning. The protocol is designed to be progressive. Each phase introduces new patterns and new science as you are ready. No experience required. Start on Day 1 and build to Day 30.' },
  { q: 'How is this different from other breathwork programs?', a: 'Most breathwork content is standalone sessions with no connection between them. This is a structured protocol with a deliberate progression through breath patterns, science, and affirmations that build over 30 days. The results compound because the training compounds.' },
  { q: 'How long are the sessions?', a: 'The sessions are less than 10 minutes per day and are designed to fit seamlessly into your day. Morning, evening, afternoon, or wherever you find time to train.' },
  { q: 'Is breathwork free?', a: 'Yes. The full 30-day protocol is free on Spotify, YouTube, and Patreon. No account or sign-up required to listen. The practice is the product.' },
  { q: 'What happens after Day 30?', a: 'Your breathwork practice becomes your own. By Day 30, the guidance has faded, and you are leading yourself. The regulation skills you have built are there to support you, and you know what you need depending on your state.' },
  { q: 'Is breathwork safe for everyone?', a: 'This protocol is designed to be gentle and beginner-friendly, but breathwork is not one-size-fits-all. If you are pregnant, have a heart condition, epilepsy, severe anxiety or panic symptoms, respiratory issues, or any medical condition that could be affected by breath holds or changes in breathing, consult a qualified healthcare professional before practicing. Never practice breathwork while driving, in water, or in any situation where dizziness could put you at risk.' },
]

export default function BreathworkPage() {
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
          <div className="flex flex-row gap-3 justify-center items-center pt-2 flex-wrap">
            <a href="#protocol"
              onClick={(e) => { e.preventDefault(); document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-6 py-3 rounded bg-clay text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105">
              JUMP TO THE PROTOCOL ↓
            </a>
          </div>
          <div className="flex flex-row gap-3 justify-center items-center pt-2 flex-wrap">
            <a href={SPOTIFY_SHOW} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <Music size={14} />
              Spotify
            </a>
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
            <a href={PATREON_GENERAL} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-bone text-bone font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <PatreonIcon size={14} />
              Patreon
            </a>
          </div>
          <div className="flex flex-row gap-6 justify-center items-center pt-2">
            <button
              onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300">
              JOIN THE LIST
            </button>
          </div>
        </div>
        <div className="h-px bg-clay w-12 mt-16" />
      </section>

      {/* WHAT THIS IS */}
      <section className="bg-obsidian py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">THE PROTOCOL</p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              This is a structured 30-day breathwork progression. Build your control, understand your capacity, and reinforce your self-trust.
            </p>
          </div>
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">THE SCIENCE</p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              Breathwork produces measurable changes in interoceptive awareness, your ability to read your own internal signals under pressure, nervous system regulation, heart rate variability, and CO2 tolerance. It doesn&apos;t just change how you feel. It changes what your nervous system can handle.
            </p>
          </div>
          <div className="text-center">
            <p className="font-space-mono text-clay text-xs tracking-widest uppercase mb-4">THE COMMITMENT</p>
            <p className="font-dm-sans text-[#9A9A92] text-sm leading-relaxed font-light">
              Less than 10 minutes. 30 days. The results compound.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 flex justify-center">
          <a href="/30-Day-Breathwork-Protocol-Science-Guide.pdf" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 rounded border border-stone/40 text-[#9A9A92] font-space-mono font-normal text-xs tracking-wider uppercase transition-all duration-300 hover:border-bone hover:text-bone flex items-center gap-2">
            <Download size={14} />
            Download the Science Guide
          </a>
        </div>
      </section>

      {/* THREE PHASES — updated to phase-coloured cards */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 — Bone */}
            <div className="border-l-4 border-l-[#F2EDE4] border border-stone/20 rounded-sm p-8 bg-obsidian/50">
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-2">PHASE 1</p>
              <h2 className="font-bebas text-[#F2EDE4] text-4xl sm:text-5xl tracking-tight mb-2">CONTROL</h2>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">DAYS 1–10</p>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light">
                You learn to regulate. You build the foundation everything else stands on.
              </p>
            </div>
            {/* Phase 2 — Clay */}
            <div className="border-l-4 border-l-[#C4622D] border border-stone/20 rounded-sm p-8 bg-obsidian/50">
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-2">PHASE 2</p>
              <h2 className="font-bebas text-[#C4622D] text-4xl sm:text-5xl tracking-tight mb-2">CAPACITY</h2>
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-6">DAYS 11–20</p>
              <p className="font-dm-sans text-[#9A9A92] text-base leading-relaxed font-light">
                You find out how far your range actually goes. Your body&apos;s stress signals get louder, and you stay regulated anyway.
              </p>
            </div>
            {/* Phase 3 — Gold */}
            <div className="border-l-4 border-l-[#B89050] border border-stone/20 rounded-sm p-8 bg-obsidian/50">
              <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase mb-2">PHASE 3</p>
              <h2 className="font-bebas text-[#B89050] text-4xl sm:text-5xl tracking-tight mb-2">SELF-TRUST</h2>
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
          <div className="font-bebas text-clay text-6xl sm:text-7xl tracking-tight">26,000</div>
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
            {days.map(({ day, phase, pattern, duration, spotify, youtube, patreon }) => {
              const colors = phaseColor[phase as keyof typeof phaseColor]
              return (
                <div key={day} className={`border-l-4 ${colors.border} border border-stone/20 rounded-sm p-4 bg-obsidian/50 flex flex-col gap-2`}>
                  <div className="font-bebas text-bone text-4xl leading-none">{day}</div>
                  <p className={`font-space-mono text-xs tracking-widest uppercase ${colors.text}`}>{phase}</p>
                  <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{pattern}</p>
                  <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">{duration}</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <a href={spotify} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded hover:bg-stone/10 transition-colors" title="Listen on Spotify">
                      <Music size={14} className="text-clay" />
                    </a>
                    <a href={youtube} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded hover:bg-stone/10 transition-colors" title="Watch on YouTube">
                      <svg className="w-3 h-3 text-clay" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a href={patreon} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-7 h-7 rounded hover:bg-stone/10 transition-colors" title="Listen on Patreon">
                      <PatreonIcon size={13} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FROM CAIT */}
      <section className="bg-bone py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-space-mono text-stone text-xs tracking-widest uppercase mb-8">FROM CAIT</p>
          <h2 className="font-bebas text-obsidian text-4xl sm:text-5xl tracking-tight mb-8">WHY I BUILT THIS</h2>
          <div className="space-y-6 font-dm-sans text-obsidian text-lg leading-relaxed font-light text-left">
            <p>I built this for my younger brother, and everyone like him. He was never the &ldquo;mindfulness&rdquo; type. But after months of big goals, full days, travel, training, and real momentum, even he started trying breathwork. When he told me, I knew I wanted to give him something practical. Not advice. A tool.</p>
            <p>I&apos;ve spent most of my life learning how to perform under pressure: elite sport, consulting, an MBA, building a business from scratch, and living on the move. Breathwork transformed something I didn&apos;t realise I could train: not my ambition, but my capacity to hold it.</p>
            <p>This 30-day protocol is for people building full lives at full intensity and who want to keep going. This builds the nervous system that supports you.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-obsidian py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-stone/30 rounded-sm p-6 bg-obsidian/50">
                <h3 className="font-space-mono text-clay text-sm tracking-widest uppercase mb-3">{item.q}</h3>
                <p className="font-dm-sans text-bone text-sm leading-relaxed font-light">{item.a}</p>
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
