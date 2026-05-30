import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sessions | Techno Dojo',
  description: 'Science-backed guided meditation sessions that build specific nervous system capacities. No experience needed. Free on Spotify and YouTube.',
}

export default function SessionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
