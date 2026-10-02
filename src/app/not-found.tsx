import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Page introuvable - Valdence Digital',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="font-sora text-8xl md:text-9xl font-bold text-teal/20 select-none leading-none mb-6">
          404
        </p>
        <h1 className="font-sora text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page introuvable
        </h1>
        <p className="font-dm-sans text-muted text-base max-w-sm mb-10">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-teal text-white font-dm-sans font-semibold text-base rounded-sm hover:bg-teal/90 transition-colors"
        >
          Retour à l&apos;accueil →
        </Link>
      </section>
      <Footer />
    </main>
  )
}
