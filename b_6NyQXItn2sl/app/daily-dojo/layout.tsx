import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daily Dojo | Techno Dojo',
  description: 'A growing suite of daily nervous system training practices. Five to ten minutes. Built for the window before your day makes its demands. Free on Spotify and YouTube.',
}

export default function DailyDojoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
