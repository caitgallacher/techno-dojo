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
icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
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
