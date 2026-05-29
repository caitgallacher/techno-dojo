import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0C0C0A',
        bone: '#F2EDE4',
        clay: '#C4622D',
        gold: '#B89050',
        forest: '#2E3D28',
        stone: '#9A9A92',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
      },
      fontFamily: {
        bebas: 'var(--font-bebas)',
        montserrat: 'var(--font-montserrat)',
        'dm-sans': 'var(--font-dm-sans)',
        'space-mono': 'var(--font-space-mono)',
        playfair: 'var(--font-playfair)',
      },
      fontSize: {
        'display-xl': '4.5rem',
        'display-lg': '3.75rem',
        'display-md': '3rem',
        'display-sm': '2.25rem',
        'heading-lg': '2rem',
        'heading-md': '1.5rem',
        'heading-sm': '1.25rem',
        'body-lg': '1.125rem',
        'body-md': '1rem',
        'body-sm': '0.875rem',
        'label': '0.75rem',
        'tiny': '0.625rem',
      },
      spacing: {
        section: '6rem',
      },
    },
  },
  plugins: [],
}

export default config
