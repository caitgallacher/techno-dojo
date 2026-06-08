import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Music } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Wordmark */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="font-bebas text-bone text-lg tracking-wider leading-none">TECHNO</div>
              <div className="font-montserrat text-gold text-lg tracking-tight font-weight-400 leading-none -translate-y-0.5">DOJO</div>
            </div>
            <div className="h-px bg-gold w-12" />
          </div>

          {/* Center: Social Icons */}
          <div className="flex justify-center gap-8 items-center">
            <a
              href="https://www.instagram.com/thetechnodojo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-bone transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://open.spotify.com/show/4Cz6WuByhIpTo1oeaGkIAm?si=a0b1bebb7f854974"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-bone transition-colors duration-300"
              aria-label="Spotify"
            >
              <Music size={20} />
            </a>
            <a
              href="https://youtube.com/@thetechnodojo?si=qAYMs3M1Kk71LuSt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-bone transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@thetechnodojo?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-bone transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05 1 .15V9.48a7.39 7.39 0 0 0-1-.08A5.64 5.64 0 0 0 3.96 15.07a5.64 5.64 0 0 0 5.63 5.63 5.63 5.63 0 0 0 5.63-5.63V8.07a7.7 7.7 0 0 0 4.77 1.72v-3.6a4.27 4.27 0 0 1-.677-.0552z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/techno-dojo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-bone transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Right: Tagline */}
          <div className="flex justify-end items-start text-right">
            <p className="font-space-mono text-stone text-xs tracking-widest">
Go hard.<br />Stay whole.            </p>
          </div>
        </div>

        {/* Bottom Rule */}
        <div className="h-px bg-stone/30" />
      </div>
    </footer>
  )
}
