import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digital.valdence.com'),
  title: 'Valdence Digital - Sites web, référencement & IA à Toulouse',
  description:
    'Création, audit et référencement de sites web à Toulouse : SEO local, visibilité dans les IA, intégration IA. Yannick Bernard, développeur full-stack depuis 2014.',
  alternates: {
    canonical: 'https://digital.valdence.com',
  },
  openGraph: {
    title: 'Valdence Digital - Sites web, référencement & IA à Toulouse',
    description:
      'Création, audit et référencement de sites web à Toulouse : SEO local, visibilité dans les IA, intégration IA. Yannick Bernard, développeur full-stack depuis 2014.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }], 
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
