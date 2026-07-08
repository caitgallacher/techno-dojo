'use client'

import { EmailSubscribe } from '@/components/EmailSubscribe'
import Link from 'next/link'

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-4">

      {/* Minimal wordmark — links home, no full nav */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <Link href="/" className="flex items-center gap-1">
          <div className="font-bebas text-bone text-xl tracking-wider leading-none">TECHNO</div>
          <div className="font-montserrat text-gold text-xl tracking-tight leading-none -translate-y-0.5">DOJO</div>
        </Link>
      </div>

      {/* Page content */}
      <div className="max-w-2xl w-full text-center space-y-6 pt-24 pb-16">
        <p className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase">
          NERVOUS SYSTEM TRAINING
        </p>
        <h1 className="font-bebas text-bone text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight">
          STAY IN THE DOJO
        </h1>
        <p className="font-dm-sans text-[#9A9A92] text-lg leading-relaxed font-light max-w-md mx-auto">
          New sessions, new science, new releases. No noise.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <EmailSubscribe
          headingText=""
          descriptionText=""
        />
      </div>

      {/* Quiet footer link */}
      <div className="mt-8 pb-8">
        <Link href="/" className="font-space-mono text-[#9A9A92] text-xs tracking-widest uppercase hover:text-bone transition-colors duration-300">
          BACK TO THE DOJO →
        </Link>
      </div>

    </main>
  )
}
