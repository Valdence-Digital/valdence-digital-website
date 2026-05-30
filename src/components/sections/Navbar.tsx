'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LogoDark from '@/components/ui/LogoDark'
import SocialLinks from '@/components/ui/SocialLinks'

const navLinks = [
  { label: 'Mes services', href: '#services' },
  { label: 'Pourquoi Valdence', href: '#why-us' },
  { label: 'Réalisations', href: '#portfolio' },
  { label: 'À propos', href: '#about' },
  { label: 'Avis', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const href = (anchor: string) => (isHome ? anchor : `/${anchor}`)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        <a href={isHome ? '#' : '/'} aria-label="Valdence Digital — retour en haut">
          <LogoDark className="h-14 w-auto" />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={href(link.href)}
                className="text-sm font-dm-sans text-foreground/70 hover:text-teal transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={href('#contact')}
            className="hidden md:inline-flex px-5 py-2 bg-teal text-white text-sm font-semibold font-dm-sans rounded-sm hover:bg-teal/90 transition-colors"
          >
            Parlons de votre projet
          </a>
          <SocialLinks />
        </div>

        {/* Mobile burger button */}
        <button
          className="md:hidden p-2 text-foreground"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={href(link.href)}
                  className="block text-sm font-dm-sans text-foreground/70 hover:text-teal py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={href('#contact')}
            className="mt-4 block text-center px-5 py-2 bg-teal text-white text-sm font-semibold font-dm-sans rounded-sm"
            onClick={() => setMenuOpen(false)}
          >
            Parlons de votre projet
          </a>
          <SocialLinks size="lg" gap="gap-6" className="mt-8 justify-center" />
        </div>
      )}
    </header>
  )
}
