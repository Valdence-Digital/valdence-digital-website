# Valdence Digital - One-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Next.js 16 one-page site for Valdence Digital with 9 sections, a contact form via SMTP OVH, and dynamic Google Reviews.

**Architecture:** Single `app/page.tsx` importing all section components. Contact form uses a Server Action backed by a pure validation utility (testable). Google Reviews fetched server-side via Google Places API with ISR (`revalidate=86400`). Deployed via Dockerfile multi-stage build on Coolify/OVH.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Nodemailer, Google Places API, Simple Icons, Sora + DM Sans (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-05-19-valdence-digital-onepage-design.md`

---

## File Map

### Created
| Path | Responsibility |
|---|---|
| `app/layout.tsx` | Global metadata (SEO), font variables, `lang="fr"` |
| `app/globals.css` | CSS variables, `scroll-behavior: smooth`, base font rules |
| `app/page.tsx` | One-page composition - imports all sections |
| `app/actions/contact.ts` | Server Action: extract FormData → validate → send via Nodemailer |
| `lib/contact-validation.ts` | Pure validation logic (no side effects, fully testable) |
| `lib/google-places.ts` | Google Places API fetch + `transformReview` utility |
| `components/ui/Button.tsx` | Reusable button (primary / outline) |
| `components/ui/SectionWrapper.tsx` | Section container with consistent padding and optional `id` |
| `components/sections/Navbar.tsx` | Sticky nav, scroll glass effect, mobile burger (Client) |
| `components/sections/Hero.tsx` | Hero with teal circles, accroche, 2 CTAs |
| `components/sections/Services.tsx` | 4 service cards grid |
| `components/sections/WhyUs.tsx` | 3 differentiators |
| `components/sections/Portfolio.tsx` | 2 project cards with screenshots |
| `components/sections/About.tsx` | Photo placeholder + bio + LinkedIn + tech badges |
| `components/sections/Reviews.tsx` | Google reviews (async Server Component) + fallback |
| `components/sections/Contact.tsx` | Form with Server Action, honeypot, RGPD (Client) |
| `components/sections/Footer.tsx` | Logo light + copyright + legal links |
| `public/logo-dark.svg` | Logo placeholder - noir (fond clair) |
| `public/logo-light.svg` | Logo placeholder - blanc (footer) |
| `public/portfolio/sagesse-holistique.webp` | Screenshot 800×500 - à remplacer |
| `public/portfolio/jonathan-deymier.webp` | Screenshot 800×500 - à remplacer |
| `.env.example` | Variables d'env template (commité) |
| `Dockerfile` | Multi-stage build standalone pour Coolify |
| `__tests__/contact-validation.test.ts` | Unit tests validation formulaire |
| `__tests__/google-places.test.ts` | Unit tests transformReview |
| `jest.config.ts` | Configuration Jest + ts-jest |

### Modified
| Path | Change |
|---|---|
| `next.config.ts` | `output: 'standalone'` |
| `tailwind.config.ts` | Palette + font families |
| `.gitignore` | Already updated in brainstorm session |

---

## Task 1: Scaffold Next.js 16 project

**Files:** `next.config.ts`, `tailwind.config.ts`, `.env.local`, `.env.example`

- [ ] **Step 1: Initialize project**

Run from `c:\Github\site-valdence-digital`:
```bash
npx create-next-app@16 . --typescript --tailwind --app --no-src-dir --no-turbopack --eslint --import-alias "@/*"
```
Accept all prompts. This scaffolds Next.js 16 into the current directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install nodemailer simple-icons
npm install -D @types/nodemailer jest ts-jest @types/jest
```

- [ ] **Step 3: Configure standalone output**

Replace `next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig
```

- [ ] **Step 4: Configure Tailwind theme**

Replace `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f7f6',
        foreground: '#111827',
        muted: '#6b7280',
        teal: {
          DEFAULT: '#0d9488',
          dark: '#0f2a27',
        },
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Create .env.local and .env.example**

Create `.env.local` (non commité - configure avec tes vraies valeurs) :
```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@valdence.com
SMTP_PASS=your_password_here
SMTP_TO=contact@valdence.com
GOOGLE_PLACES_API_KEY=your_google_api_key
GOOGLE_PLACE_ID=your_place_id
```

Create `.env.example` (commité comme référence) :
```
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
SMTP_TO=
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
```

- [ ] **Step 6: Configure Jest**

Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default config
```

- [ ] **Step 7: Verify dev server**

```bash
npm run dev
```
Expected: Server starts on http://localhost:3000, default Next.js page visible.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 with Tailwind, standalone config, Jest, and env template"
```

---

## Task 2: Global layout, fonts, and placeholder logos

**Files:** `app/globals.css`, `app/layout.tsx`, `public/logo-dark.svg`, `public/logo-light.svg`

- [ ] **Step 1: Update globals.css**

Replace `app/globals.css`:
```css
@import 'tailwindcss';

html {
  scroll-behavior: smooth;
}

body {
  background-color: #f5f7f6;
  color: #111827;
}
```

- [ ] **Step 2: Update app/layout.tsx**

```typescript
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
  title: 'Valdence Digital - Développement web & consulting',
  description:
    'Sites vitrines, e-commerce, applications web et consulting technique - Yannick Bernard, développeur full-stack indépendant depuis 2014.',
  openGraph: {
    title: 'Valdence Digital - Développement web & consulting',
    description:
      'Sites vitrines, e-commerce, applications web et consulting technique - Yannick Bernard, développeur full-stack indépendant depuis 2014.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Create placeholder SVG logos**

Create `public/logo-dark.svg` (remplacer par le vrai logo) :
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="36" viewBox="0 0 160 36">
  <text x="0" y="26" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#111827">VALDENCE</text>
</svg>
```

Create `public/logo-light.svg` :
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="36" viewBox="0 0 160 36">
  <text x="0" y="26" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff">VALDENCE</text>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css public/logo-dark.svg public/logo-light.svg
git commit -m "feat: configure layout, Sora/DM Sans fonts, SEO metadata, placeholder logos"
```

---

## Task 3: Shared UI components

**Files:** `components/ui/Button.tsx`, `components/ui/SectionWrapper.tsx`

- [ ] **Step 1: Create Button.tsx**

```typescript
// components/ui/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  href?: string
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 font-dm-sans font-semibold text-sm tracking-wide rounded-sm transition-all duration-200'
  const variants = {
    primary: 'bg-teal text-white hover:bg-teal/90',
    outline: 'border border-teal text-teal hover:bg-teal/5',
  }
  const classes = `${base} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create SectionWrapper.tsx**

```typescript
// components/ui/SectionWrapper.tsx
type SectionWrapperProps = {
  id?: string
  className?: string
  children: React.ReactNode
}

export default function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx components/ui/SectionWrapper.tsx
git commit -m "feat: add Button and SectionWrapper UI primitives"
```

---

## Task 4: Navbar

**Files:** `components/sections/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```typescript
// components/sections/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pourquoi Valdence', href: '#why-us' },
  { label: 'Réalisations', href: '#portfolio' },
  { label: 'À propos', href: '#about' },
  { label: 'Avis', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <a href="#" aria-label="Valdence Digital - retour en haut">
          <Image src="/logo-dark.svg" alt="Valdence Digital" width={140} height={35} priority />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-dm-sans text-foreground/70 hover:text-teal transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 bg-teal text-white text-sm font-semibold font-dm-sans rounded-sm hover:bg-teal/90 transition-colors"
        >
          Parlons de votre projet
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-foreground"
          aria-label="Ouvrir le menu"
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
                  href={link.href}
                  className="block text-sm font-dm-sans text-foreground/70 hover:text-teal py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-4 block text-center px-5 py-2 bg-teal text-white text-sm font-semibold font-dm-sans rounded-sm"
            onClick={() => setMenuOpen(false)}
          >
            Parlons de votre projet
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Navbar.tsx
git commit -m "feat: add sticky Navbar with scroll glass effect and mobile menu"
```

---

## Task 5: Hero section

**Files:** `components/sections/Hero.tsx`, `app/page.tsx`

- [ ] **Step 1: Create Hero.tsx**

```typescript
// components/sections/Hero.tsx
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden pt-16">
      {/* Teal decorative circles */}
      <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none select-none">
        <div className="w-[520px] h-[520px] rounded-full border border-teal/8 absolute -top-36 -right-36" />
        <div className="w-[360px] h-[360px] rounded-full border border-teal/12 absolute -top-16 -right-16" />
        <div className="w-[210px] h-[210px] rounded-full border border-teal/18 absolute top-8 right-8" />
        <div className="w-4 h-4 rounded-full bg-teal/20 absolute top-28 right-72" />
        <div className="w-2 h-2 rounded-full bg-teal/35 absolute top-44 right-52" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 relative z-10">
        <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-6">
          Valdence Digital
        </p>
        <h1 className="font-sora text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
          Du code au clic -{' '}
          <span className="text-teal">construisons ensemble.</span>
        </h1>
        <p className="font-dm-sans text-lg text-muted max-w-xl mb-10 leading-relaxed">
          Développeur full-stack indépendant, nous travaillons avec vous - pas à votre
          place - pour créer des outils digitaux qui vous ressemblent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="#contact" variant="primary">Parlons de votre projet →</Button>
          <Button href="#services" variant="outline">Nos services</Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create initial app/page.tsx**

```typescript
// app/page.tsx
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```
Open http://localhost:3000. Expected: hero avec cercles teal en coin supérieur droit, deux boutons, navbar transparente qui devient opaque au scroll.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with teal circle decoration and CTAs"
```

---

## Task 6: Services section

**Files:** `components/sections/Services.tsx`

- [ ] **Step 1: Create Services.tsx**

```typescript
// components/sections/Services.tsx
import SectionWrapper from '@/components/ui/SectionWrapper'

const services = [
  {
    icon: '🪟',
    title: 'Sites vitrines',
    description:
      'Présence en ligne professionnelle, rapide à lancer et facile à maintenir. Un site qui vous représente et rassure vos visiteurs dès le premier regard.',
  },
  {
    icon: '🛒',
    title: 'Sites e-commerce',
    description:
      'Boutiques performantes, conçues pour convertir et fidéliser. Du catalogue produits au tunnel de paiement, pensés pour la croissance.',
  },
  {
    icon: '⚙️',
    title: 'Applications web',
    description:
      "Outils métier sur mesure, robustes, évolutifs et bien documentés. Des solutions pensées pour votre usage réel, pas pour une démo.",
  },
  {
    icon: '🤝',
    title: 'Consulting / AT',
    description:
      "Accompagnement technique en entreprise : audit, conseil, renfort d'équipe. Une expertise full-stack disponible quand vous en avez besoin.",
  },
]

export default function Services() {
  return (
    <SectionWrapper id="services">
      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Ce que nous faisons
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Nos services
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        Quatre offres complémentaires pour couvrir l&apos;ensemble de vos besoins digitaux.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-lg p-8 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="text-3xl mb-4" aria-hidden="true">{service.icon}</div>
            <h3 className="font-sora text-xl font-semibold text-foreground mb-3 group-hover:text-teal transition-colors">
              {service.title}
            </h3>
            <p className="font-dm-sans text-muted leading-relaxed text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Services.tsx app/page.tsx
git commit -m "feat: add Services section with 4 cards"
```

---

## Task 7: WhyUs section

**Files:** `components/sections/WhyUs.tsx`

- [ ] **Step 1: Create WhyUs.tsx**

```typescript
// components/sections/WhyUs.tsx
import SectionWrapper from '@/components/ui/SectionWrapper'

const reasons = [
  {
    number: '01',
    title: 'Expertise technique',
    description:
      'Full-stack confirmé (C#/.NET, Next.js, PostgreSQL…), plus de 10 ans de pratique en entreprise et en indépendant. Nous maîtrisons les technologies que nous recommandons.',
  },
  {
    number: '02',
    title: 'Accompagnement sur mesure',
    description:
      "Chaque projet est unique. Nous adaptons notre approche à votre contexte, vos contraintes et vos objectifs - pas l'inverse.",
  },
  {
    number: '03',
    title: 'Un partenaire, pas un exécutant',
    description:
      "Nous construisons avec vous, pas à votre place. Votre compréhension du projet est notre priorité - nous ne livrons pas une boîte noire, nous vous l'expliquons.",
  },
]

export default function WhyUs() {
  return (
    <SectionWrapper id="why-us" className="bg-teal/5 rounded-2xl">
      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Notre différence
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-12">
        Pourquoi Valdence Digital
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reasons.map((reason) => (
          <div key={reason.number} className="flex flex-col gap-4">
            <span className="font-sora text-5xl font-bold text-teal/20">{reason.number}</span>
            <h3 className="font-sora text-xl font-semibold text-foreground">{reason.title}</h3>
            <p className="font-dm-sans text-muted text-sm leading-relaxed">{reason.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'

export default function Home() {
  return (
    <main>
      <Navbar /><Hero /><Services /><WhyUs />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhyUs.tsx app/page.tsx
git commit -m "feat: add WhyUs section with 3 differentiators"
```

---

## Task 8: Portfolio section

**Files:** `components/sections/Portfolio.tsx`, `public/portfolio/*.webp`

- [ ] **Step 1: Ajouter les captures d'écran**

Prendre une capture d'écran de chaque site (800×500px, WebP) et les placer dans `public/portfolio/` :
- https://www.sagesse-holistique.fr/ → `public/portfolio/sagesse-holistique.webp`
- https://www.jonathandeymier.com/ → `public/portfolio/jonathan-deymier.webp`

Sur Windows, utiliser l'outil Capture ou un navigateur (F12 → Device toolbar → 800×500). Convertir en WebP via un outil comme Squoosh (squoosh.app) si nécessaire.

- [ ] **Step 2: Create Portfolio.tsx**

```typescript
// components/sections/Portfolio.tsx
import Image from 'next/image'
import SectionWrapper from '@/components/ui/SectionWrapper'

const projects = [
  {
    title: 'Sagesse Holistique',
    category: 'Site vitrine',
    image: '/portfolio/sagesse-holistique.webp',
    url: 'https://www.sagesse-holistique.fr/',
  },
  {
    title: 'Jonathan Deymier',
    category: 'Refonte WordPress',
    image: '/portfolio/jonathan-deymier.webp',
    url: 'https://www.jonathandeymier.com/',
  },
]

export default function Portfolio() {
  return (
    <SectionWrapper id="portfolio">
      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Nos réalisations
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Projets récents
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        Quelques-uns des projets que nous avons eu le plaisir de réaliser.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white hover:border-teal/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-full h-52 overflow-hidden bg-gray-50">
              <Image
                src={project.image}
                alt={`Aperçu du projet ${project.title}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 flex items-start justify-between">
              <div>
                <span className="inline-block text-xs font-dm-sans font-medium text-teal bg-teal/10 px-2 py-0.5 rounded mb-2">
                  {project.category}
                </span>
                <h3 className="font-sora text-lg font-semibold text-foreground">{project.title}</h3>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-sm font-dm-sans text-teal hover:underline mt-1 whitespace-nowrap"
                aria-label={`Voir le site ${project.title}`}
              >
                Voir le site →
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'

export default function Home() {
  return (
    <main>
      <Navbar /><Hero /><Services /><WhyUs /><Portfolio />
    </main>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Portfolio.tsx public/portfolio/ app/page.tsx
git commit -m "feat: add Portfolio section with 2 project cards"
```

---

## Task 9: About section

**Files:** `components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

Les icônes tech viennent de `simple-icons`. Chaque icône expose `path` (SVG path data) et `hex` (couleur sans `#`). Si un nom d'icône n'est pas trouvé à l'import, vérifier le nom exact dans `node_modules/simple-icons/icons/`.

```typescript
// components/sections/About.tsx
import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import {
  siCsharp,
  siDotnet,
  siNextdotjs,
  siReact,
  siTypescript,
  siPostgresql,
  siMicrosoftsqlserver,
  siWordpress,
} from 'simple-icons'

const techStack = [
  { icon: siCsharp, label: 'C#' },
  { icon: siDotnet, label: '.NET' },
  { icon: siNextdotjs, label: 'Next.js' },
  { icon: siReact, label: 'React' },
  { icon: siTypescript, label: 'TypeScript' },
  { icon: siPostgresql, label: 'PostgreSQL' },
  { icon: siMicrosoftsqlserver, label: 'SQL Server' },
  { icon: siWordpress, label: 'WordPress' },
]

const linkedInIcon =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

export default function About() {
  return (
    <SectionWrapper id="about">
      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Qui sommes-nous
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-12">
        À propos
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Photo + identity */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 border-2 border-teal/20 flex items-center justify-center">
            {/* Remplacer ce bloc par <Image src="/photo-yannick.webp" ... /> quand la photo est disponible */}
            <span className="font-sora text-5xl font-bold text-teal/40">YB</span>
          </div>
          <p className="font-sora font-bold text-foreground text-lg mt-4">Yannick Bernard</p>
          <p className="font-dm-sans text-sm text-teal">CEO</p>
          <Link
            href="https://www.linkedin.com/in/bernardyannick/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-dm-sans text-muted hover:text-teal transition-colors"
            aria-label="Profil LinkedIn de Yannick Bernard"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d={linkedInIcon} />
            </svg>
            LinkedIn
          </Link>
        </div>

        {/* Bio */}
        <div className="flex-1">
          <div className="space-y-4 font-dm-sans text-muted leading-relaxed">
            <p>
              Développeur full-stack indépendant depuis 2014, je conçois et réalise des sites
              vitrines, boutiques en ligne, applications web et intégrations sur mesure. Mon
              parcours en entreprise - de l&apos;e-commerce grand public (Chausson.fr) aux
              marketplaces B2C/B2B (Opisto), en passant par des projets de R&amp;D et de
              réalité augmentée - m&apos;a forgé une vision à la fois technique et produit,
              rare chez un prestataire indépendant.
            </p>
            <p>
              Je travaille avec une attention constante portée à la qualité du code, à la
              maintenabilité et à l&apos;évolution de votre projet dans le temps.
            </p>
            <p>
              Ce qui me distingue&nbsp;: je ne sous-traite pas vos besoins, je les comprends.
              Chaque projet démarre par une vraie conversation - pour livrer quelque chose qui
              vous ressemble et qui fonctionne.
            </p>
          </div>

          {/* Tech badges */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-xs font-dm-sans tracking-[0.2em] text-muted uppercase mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-teal/40 transition-colors"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                    style={{ fill: `#${icon.hex}` }}
                  >
                    <path d={icon.path} />
                  </svg>
                  <span className="text-xs font-dm-sans text-foreground/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Navbar /><Hero /><Services /><WhyUs /><Portfolio /><About />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx app/page.tsx
git commit -m "feat: add About section with bio, LinkedIn, and Simple Icons tech badges"
```

---

## Task 10: Google Places utility + Reviews section (TDD)

**Files:** `lib/google-places.ts`, `__tests__/google-places.test.ts`, `components/sections/Reviews.tsx`

- [ ] **Step 1: Write failing test**

```typescript
// __tests__/google-places.test.ts
import { transformReview } from '@/lib/google-places'

describe('transformReview', () => {
  it('maps Google API fields to GoogleReview type', () => {
    const raw = {
      author_name: 'Marie D.',
      rating: 5,
      text: 'Excellent travail, très professionnel.',
      time: 1700000000,
      profile_photo_url: 'https://example.com/photo.jpg',
    }
    expect(transformReview(raw)).toEqual({
      authorName: 'Marie D.',
      rating: 5,
      text: 'Excellent travail, très professionnel.',
      time: 1700000000,
      profilePhotoUrl: 'https://example.com/photo.jpg',
    })
  })

  it('defaults profilePhotoUrl to empty string when missing', () => {
    const raw = {
      author_name: 'Jean P.',
      rating: 4,
      text: 'Bon travail.',
      time: 1700000000,
      profile_photo_url: undefined,
    }
    expect(transformReview(raw).profilePhotoUrl).toBe('')
  })
})
```

- [ ] **Step 2: Run test - confirm it fails**

```bash
npx jest __tests__/google-places.test.ts
```
Expected: FAIL - `transformReview` is not defined.

- [ ] **Step 3: Create lib/google-places.ts**

```typescript
// lib/google-places.ts

export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  time: number
  profilePhotoUrl: string
}

export type ReviewsResult =
  | { ok: true; reviews: GoogleReview[]; placeUrl: string }
  | { ok: false; placeUrl: string }

type RawReview = {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url?: string
}

export function transformReview(raw: RawReview): GoogleReview {
  return {
    authorName: raw.author_name,
    rating: raw.rating,
    text: raw.text,
    time: raw.time,
    profilePhotoUrl: raw.profile_photo_url ?? '',
  }
}

export async function getGoogleReviews(): Promise<ReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  const placeUrl = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : 'https://www.google.com/maps'

  if (!apiKey || !placeId) return { ok: false, placeUrl }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=fr&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return { ok: false, placeUrl }

    const data = await res.json()
    const reviews = (data.result?.reviews ?? []).map(transformReview)
    return { ok: true, reviews, placeUrl }
  } catch {
    return { ok: false, placeUrl }
  }
}
```

- [ ] **Step 4: Run test - confirm it passes**

```bash
npx jest __tests__/google-places.test.ts
```
Expected: PASS - 2 tests.

- [ ] **Step 5: Create Reviews.tsx (async Server Component)**

```typescript
// components/sections/Reviews.tsx
import { getGoogleReviews, type GoogleReview } from '@/lib/google-places'
import SectionWrapper from '@/components/ui/SectionWrapper'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const date = new Date(review.time * 1000).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
  })
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
      <StarRating rating={review.rating} />
      <p className="font-dm-sans text-foreground/80 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <p className="font-dm-sans font-semibold text-sm text-foreground">{review.authorName}</p>
        <p className="font-dm-sans text-xs text-muted">{date}</p>
      </div>
    </div>
  )
}

export default async function Reviews() {
  const result = await getGoogleReviews()

  return (
    <SectionWrapper id="reviews">
      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Ce qu&apos;ils en disent
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-12">
        Avis clients
      </h2>

      {result.ok && result.reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-dm-sans text-muted mb-6">
            Découvrez nos avis directement sur Google.
          </p>
          <a
            href={result.placeUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-teal text-teal font-dm-sans font-semibold text-sm rounded-sm hover:bg-teal/5 transition-colors"
          >
            Voir nos avis sur Google Maps →
          </a>
        </div>
      )}
    </SectionWrapper>
  )
}
```

- [ ] **Step 6: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Reviews from '@/components/sections/Reviews'

export default function Home() {
  return (
    <main>
      <Navbar /><Hero /><Services /><WhyUs /><Portfolio /><About /><Reviews />
    </main>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add lib/google-places.ts components/sections/Reviews.tsx __tests__/google-places.test.ts app/page.tsx
git commit -m "feat: add Google Places utility with tests and async Reviews section"
```

---

## Task 11: Contact Server Action (TDD)

**Files:** `lib/contact-validation.ts`, `__tests__/contact-validation.test.ts`, `app/actions/contact.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// __tests__/contact-validation.test.ts
import { validateContactForm } from '@/lib/contact-validation'

const valid = {
  nom: 'Bernard',
  prenom: 'Yannick',
  entreprise: '',
  email: 'yannick@valdence.com',
  codePostal: '75001',
  telephone: '+33612345678',
  message: "Bonjour, je souhaite discuter d'un projet.",
  website: '',
  rgpd: 'on',
}

describe('validateContactForm', () => {
  it('returns null for valid complete data', () => {
    expect(validateContactForm(valid)).toBeNull()
  })

  it('returns null when entreprise is empty (optional field)', () => {
    expect(validateContactForm({ ...valid, entreprise: '' })).toBeNull()
  })

  it('returns null silently when honeypot is filled', () => {
    expect(validateContactForm({ ...valid, website: 'spam' })).toBeNull()
  })

  it('returns error when nom is missing', () => {
    expect(validateContactForm({ ...valid, nom: '' })).toBe(
      'Tous les champs obligatoires doivent être remplis.'
    )
  })

  it('returns error when prenom is missing', () => {
    expect(validateContactForm({ ...valid, prenom: '   ' })).toBe(
      'Tous les champs obligatoires doivent être remplis.'
    )
  })

  it('returns error for invalid email', () => {
    expect(validateContactForm({ ...valid, email: 'pas-un-email' })).toBe(
      'Adresse email invalide.'
    )
  })

  it('returns error for phone too short', () => {
    expect(validateContactForm({ ...valid, telephone: '1234' })).toBe(
      'Numéro de téléphone invalide.'
    )
  })

  it('accepts national format 0612345678', () => {
    expect(validateContactForm({ ...valid, telephone: '0612345678' })).toBeNull()
  })

  it('accepts +33 with spaces', () => {
    expect(validateContactForm({ ...valid, telephone: '+33 6 12 34 56 78' })).toBeNull()
  })

  it('returns error when RGPD not accepted', () => {
    expect(validateContactForm({ ...valid, rgpd: '' })).toBe(
      'Vous devez accepter les conditions RGPD.'
    )
  })
})
```

- [ ] **Step 2: Run tests - confirm they fail**

```bash
npx jest __tests__/contact-validation.test.ts
```
Expected: FAIL - `validateContactForm` not found.

- [ ] **Step 3: Create lib/contact-validation.ts**

```typescript
// lib/contact-validation.ts

export type ContactFormData = {
  nom: string
  prenom: string
  entreprise: string
  email: string
  codePostal: string
  telephone: string
  message: string
  website: string
  rgpd: string
}

export function validateContactForm(data: ContactFormData): string | null {
  if (data.website) return null // honeypot filled - silently pass

  const requiredFields: (keyof ContactFormData)[] = [
    'nom', 'prenom', 'email', 'codePostal', 'telephone', 'message',
  ]
  for (const field of requiredFields) {
    if (!data[field]?.trim()) {
      return 'Tous les champs obligatoires doivent être remplis.'
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Adresse email invalide.'
  }

  const tel = data.telephone.replace(/[\s.\-()]/g, '')
  if (!/^(\+33|0033|0)[1-9][0-9]{8}$/.test(tel)) {
    return 'Numéro de téléphone invalide.'
  }

  if (data.rgpd !== 'on') {
    return 'Vous devez accepter les conditions RGPD.'
  }

  return null
}
```

- [ ] **Step 4: Run tests - confirm they pass**

```bash
npx jest __tests__/contact-validation.test.ts
```
Expected: PASS - 10 tests.

- [ ] **Step 5: Create app/actions/contact.ts**

```typescript
// app/actions/contact.ts
'use server'

import nodemailer from 'nodemailer'
import { validateContactForm, type ContactFormData } from '@/lib/contact-validation'

export type ContactFormState = {
  success?: boolean
  error?: string
}

function extractFormData(formData: FormData): ContactFormData {
  return {
    nom: (formData.get('nom') as string) ?? '',
    prenom: (formData.get('prenom') as string) ?? '',
    entreprise: (formData.get('entreprise') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    codePostal: (formData.get('codePostal') as string) ?? '',
    telephone: (formData.get('telephone') as string) ?? '',
    message: (formData.get('message') as string) ?? '',
    website: (formData.get('website') as string) ?? '',
    rgpd: (formData.get('rgpd') as string) ?? '',
  }
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data = extractFormData(formData)

  // Honeypot: silently reject without feedback
  if (data.website) return { success: true }

  const error = validateContactForm(data)
  if (error) return { error }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const lines = [
    `Nom : ${data.nom}`,
    `Prénom : ${data.prenom}`,
    data.entreprise ? `Entreprise : ${data.entreprise}` : null,
    `Email : ${data.email}`,
    `Code postal : ${data.codePostal}`,
    `Téléphone : ${data.telephone}`,
    '',
    'Message :',
    data.message,
  ].filter((l): l is string => l !== null)

  await transporter.sendMail({
    from: `"Valdence Digital" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO,
    replyTo: data.email,
    subject: `Nouveau contact - ${data.prenom} ${data.nom}`,
    text: lines.join('\n'),
    html: `
      <h2>Nouveau contact - Valdence Digital</h2>
      <table cellpadding="6">
        <tr><td><strong>Nom</strong></td><td>${data.nom}</td></tr>
        <tr><td><strong>Prénom</strong></td><td>${data.prenom}</td></tr>
        ${data.entreprise ? `<tr><td><strong>Entreprise</strong></td><td>${data.entreprise}</td></tr>` : ''}
        <tr><td><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td><strong>Code postal</strong></td><td>${data.codePostal}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.telephone}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  })

  return { success: true }
}
```

- [ ] **Step 6: Commit**

```bash
git add lib/contact-validation.ts app/actions/contact.ts __tests__/contact-validation.test.ts
git commit -m "feat: add contact validation utility with tests and Server Action with Nodemailer"
```

---

## Task 12: Contact form UI

**Files:** `components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```typescript
// components/sections/Contact.tsx
'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions/contact'
import SectionWrapper from '@/components/ui/SectionWrapper'

const RGPD_TEXT =
  "J'ai été informé.e de mon droit de suppression, mon droit de consultation, et mon droit de modification des données personnelles récoltées sur ce formulaire. Mais aussi de la procédure d'exercice de mes droits, de la durée de conservation de mes données, et des conditions de gestions de ces dernières."

const inputClass =
  'w-full px-4 py-3 rounded-sm border border-gray-200 bg-white font-dm-sans text-sm text-foreground placeholder-muted focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors'

export default function Contact() {
  const [state, action, isPending] = useActionState(submitContact, {})

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Decorative circle */}
      <div aria-hidden="true" className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full border border-teal/8 pointer-events-none" />

      <p className="text-xs font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Travaillons ensemble
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Parlons de votre projet
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        Partagez-nous vos besoins et nous reviendrons vers vous dans les plus brefs délais.
      </p>

      {state.success ? (
        <div className="bg-teal/10 border border-teal/30 rounded-lg p-8 text-center max-w-lg">
          <p className="font-sora text-xl font-semibold text-teal mb-2">Message envoyé !</p>
          <p className="font-dm-sans text-muted text-sm">
            Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form action={action} className="max-w-2xl space-y-5" noValidate>
          {/* Honeypot - invisible pour les humains */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: 'none' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="nom" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
                Nom <span className="text-teal" aria-hidden="true">*</span>
              </label>
              <input id="nom" name="nom" type="text" required autoComplete="family-name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
                Prénom <span className="text-teal" aria-hidden="true">*</span>
              </label>
              <input id="prenom" name="prenom" type="text" required autoComplete="given-name" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="entreprise" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
              Nom de l&apos;entreprise{' '}
              <span className="text-muted font-normal text-xs">(Facultatif)</span>
            </label>
            <input id="entreprise" name="entreprise" type="text" autoComplete="organization" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
                Email <span className="text-teal" aria-hidden="true">*</span>
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
            </div>
            <div>
              <label htmlFor="codePostal" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
                Code postal <span className="text-teal" aria-hidden="true">*</span>
              </label>
              <input id="codePostal" name="codePostal" type="text" required autoComplete="postal-code" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
              Téléphone <span className="text-teal" aria-hidden="true">*</span>
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+33 6 12 34 56 78"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-dm-sans font-medium text-foreground mb-1.5">
              Message <span className="text-teal" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Dites-nous en plus sur votre projet"
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="rgpd"
              name="rgpd"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-teal"
            />
            <label htmlFor="rgpd" className="text-xs font-dm-sans text-muted leading-relaxed">
              {RGPD_TEXT}
            </label>
          </div>

          {state.error && (
            <p role="alert" className="text-sm font-dm-sans text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 bg-teal text-white font-dm-sans font-semibold text-sm rounded-sm hover:bg-teal/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? 'Envoi en cours…' : 'Envoyer le message →'}
          </button>
        </form>
      )}
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar /><Hero /><Services /><WhyUs /><Portfolio /><About /><Reviews /><Contact />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx app/page.tsx
git commit -m "feat: add Contact form with honeypot, RGPD checkbox, and useActionState"
```

---

## Task 13: Footer

**Files:** `components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```typescript
// components/sections/Footer.tsx
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white/80 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image src="/logo-light.svg" alt="Valdence Digital" width={140} height={35} />
          <p className="font-dm-sans text-xs text-white/50">
            © 2026 Valdence Digital - Tous droits réservés
          </p>
        </div>
        <nav aria-label="Liens légaux">
          <ul className="flex gap-6">
            <li>
              <a
                href="/mentions-legales"
                className="font-dm-sans text-sm text-white/60 hover:text-white transition-colors"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/politique-de-confidentialite"
                className="font-dm-sans text-sm text-white/60 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Finalize page.tsx**

```typescript
// app/page.tsx - état final
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Run all tests + build**

```bash
npx jest
```
Expected: PASS - 12 tests (10 contact-validation + 2 google-places).

```bash
npm run build
```
Expected: build complète sans erreur. `.next/standalone/` créé.

- [ ] **Step 4: Vérifier en local**

```bash
node .next/standalone/server.js
```
Ouvrir http://localhost:3000. Vérifier visuellement toutes les sections de haut en bas.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx
git commit -m "feat: add Footer, finalize page composition, verify build"
```

---

## Task 14: Dockerfile et .env.example

**Files:** `Dockerfile`, `.env.example`

- [ ] **Step 1: Create Dockerfile**

```dockerfile
# Stage 1 - Dependencies + build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 - Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
```

- [ ] **Step 2: Vérifier le build Docker (si Docker Desktop est installé)**

```bash
docker build -t valdence-digital .
```
Expected: image construite sans erreur.

```bash
docker run -p 3000:3000 --env-file .env.local valdence-digital
```
Expected: site accessible à http://localhost:3000 avec toutes les sections.

- [ ] **Step 3: Commit final**

```bash
git add Dockerfile .env.example
git commit -m "feat: add Dockerfile multi-stage for Coolify deployment"
```

---

## Couverture spec

| Exigence spec | Tâche |
|---|---|
| Next.js 16 + TypeScript + Tailwind | Task 1 |
| `output: 'standalone'` | Task 1 |
| Sora + DM Sans (Google Fonts) | Task 2 |
| Palette teal, fond, texte | Task 1 (Tailwind) |
| Logo dark / light SVG | Task 2 |
| Cercles décoratifs teal | Task 5 (Hero), Task 12 (Contact) |
| Navbar sticky + mobile | Task 4 |
| Hero "Du code au clic" + 2 CTAs | Task 5 |
| 4 cartes Services | Task 6 |
| 3 arguments WhyUs | Task 7 |
| Portfolio 2 projets WebP 800×500 | Task 8 |
| À propos + bio + LinkedIn | Task 9 |
| Tech badges Simple Icons | Task 9 |
| Google Reviews ISR revalidate=86400 | Task 10 |
| Fallback + bouton Google Maps | Task 10 |
| Formulaire 7 champs + honeypot + RGPD | Task 12 |
| Server Action Nodemailer SMTP OVH | Task 11 |
| Variables env SMTP + Google | Task 1 |
| `.env.example` | Task 14 |
| Footer © 2026 + liens légaux | Task 13 |
| `.gitignore` mis à jour | Déjà fait (session brainstorming) |
| SEO metadata + `lang="fr"` | Task 2 |
| Dockerfile multi-stage Coolify | Task 14 |
| Tests unitaires validation + Places | Tasks 10-11 |
