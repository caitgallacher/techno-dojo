'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDojoOpen, setIsDojoOpen] = useState(false)

  const dojoLinks = [
    { label: 'SESSIONS', href: '/sessions' },
    { label: 'DAILY DOJO', href: '/daily-dojo' },
    { label: 'RITUALS', href: '/rituals' },
  ]

  const navLinks = [
    { label: 'LISTEN', href: '#listen' },
    { label: 'JOIN', href: '#join' },
  ]

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-stone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-1">
            <div className="font-bebas text-bone text-xl tracking-wider leading-none">TECHNO</div>
            <div className="font-montserrat text-gold text-xl tracking-tight font-weight-400 leading-none -translate-y-0.5">DOJO</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {/* Your DOJO Dropdown */}
            <div className="relative group">
              <button className="font-space-mono text-stone text-xs tracking-widest hover:text-bone transition-colors duration-300 flex items-center gap-2">
                YOUR DOJO
                <ChevronDown size={16} className="group-hover:text-gold transition-colors" />
              </button>
              <div className="absolute left-0 mt-0 w-40 bg-obsidian border border-stone/30 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                {dojoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-stone text-xs tracking-widest hover:text-bone hover:bg-stone/10 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-space-mono text-stone text-xs tracking-widest hover:text-bone transition-colors duration-300 hover:underline hover:underline-offset-4 hover:decoration-clay"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-bone hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-sm mt-20 flex flex-col items-center justify-center gap-8 pt-20">
          {/* Your DOJO Section */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsDojoOpen(!isDojoOpen)}
              className="font-space-mono text-bone text-base tracking-widest hover:text-gold transition-colors flex items-center gap-2"
            >
              YOUR DOJO
              <ChevronDown size={20} className={`transition-transform ${isDojoOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDojoOpen && (
              <div className="flex flex-col gap-3 pl-4 border-l border-stone/30">
                {dojoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-space-mono text-stone text-sm tracking-widest hover:text-bone transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-space-mono text-bone text-base tracking-widest hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
