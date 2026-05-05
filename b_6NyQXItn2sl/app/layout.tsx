import type { Metadata } from 'next'
import { Bebas_Neue, Montserrat, DM_Sans, Space_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const montserrat = Montserrat({ weight: ['400', '700'], subsets: ['latin'] })
const dmSans = DM_Sans({ weight: ['300', '400', '500', '700'], subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })
const playfairDisplay = Playfair_Display({ weight: '400', style: 'italic', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Techno Dojo | Guided Meditation and Breathwork for High Performers',
  description: 'Science-backed guided meditation and breathwork for high performers. Train your mind the same way you train your body. Free on Spotify and YouTube.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-obsidian">
      <head>
        <style>{`
          :root {
            --font-bebas: ${bebasNeue.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
            --font-dm-sans: ${dmSans.style.fontFamily};
            --font-space-mono: ${spaceMono.style.fontFamily};
            --font-playfair: ${playfairDisplay.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="font-dm-sans antialiased bg-obsidian text-bone">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
