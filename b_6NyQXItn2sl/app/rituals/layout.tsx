import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rituals | Techno Dojo',
  description: 'Guided meditation for burnout, grief, life transitions, new beginnings, and high-stakes moments. Science-backed practices for when life hands you something significant. Free on Spotify and YouTube.',
}

export default function RitualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
