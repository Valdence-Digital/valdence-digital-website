import { services, freeAudit } from '@/data/services'
import { socialLinks } from '@/data/social'

// Données structurées (JSON-LD) de la page d'accueil.
// Un seul @graph : chaque entité a un @id stable et les autres y font référence,
// ce qui aide Google (et son mode IA) à relier l'entreprise, la personne et les services.
// Tout ce qui est déclaré ici doit rester visible sur la page.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digital.valdence.com').replace(/\/$/, '')

const id = (fragment: string) => `${SITE_URL}/#${fragment}`

export const IDS = {
  website: id('website'),
  webpage: id('webpage'),
  business: id('business'),
  person: id('yannick-bernard'),
  catalog: id('services'),
  audit: id('audit'),
  service: (slug: string) => id(`service-${slug}`),
}

const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=3543542288884001866'

const knowsAbout = [
  'Développement web',
  'Création de site vitrine',
  'E-commerce',
  'Référencement naturel (SEO)',
  'SEO local',
  'Google Business Profile',
  'Generative Engine Optimization (GEO)',
  'Intelligence artificielle',
  'Automatisation',
  'Audit de site web',
  'Next.js',
  'React',
  'TypeScript',
  'C#',
  '.NET',
  'PostgreSQL',
  'WordPress',
]

const areaServed = [
  { '@type': 'City', name: 'Toulouse' },
  { '@type': 'Country', name: 'France' },
]

export function buildHomeJsonLd() {
  const serviceNodes = services.map((s) => ({
    '@type': 'Service',
    '@id': IDS.service(s.slug),
    name: s.title,
    serviceType: s.serviceType,
    description: s.description,
    url: `${SITE_URL}/#services`,
    provider: { '@id': IDS.business },
    areaServed,
  }))

  const auditService = services.find((s) => s.slug === 'audit-amelioration-site')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': IDS.website,
        url: SITE_URL,
        name: 'Valdence Digital',
        inLanguage: 'fr-FR',
        publisher: { '@id': IDS.business },
      },
      {
        '@type': 'WebPage',
        '@id': IDS.webpage,
        url: SITE_URL,
        name: 'Valdence Digital - Sites web, référencement & IA à Toulouse',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': IDS.website },
        about: { '@id': IDS.business },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/opengraph-image.png` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': IDS.business,
        name: 'Valdence Digital',
        url: SITE_URL,
        logo: `${SITE_URL}/logo-dark.svg`,
        image: `${SITE_URL}/opengraph-image.png`,
        description:
          'Création, audit et référencement de sites web à Toulouse : sites vitrines, e-commerce, applications web, SEO local, visibilité dans les IA et intégration de l\'IA.',
        slogan: 'Je ne code pas pour vous. Je crée avec vous.',
        telephone: '+33673906351',
        priceRange: 'Sur devis',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '15 Rue de la Serre',
          postalCode: '31460',
          addressLocality: 'Le Cabanial',
          addressRegion: 'Occitanie',
          addressCountry: 'FR',
        },
        areaServed,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:30',
          closes: '18:00',
        },
        hasMap: GOOGLE_MAPS_URL,
        sameAs: [GOOGLE_MAPS_URL, ...socialLinks.map((l) => l.href)],
        founder: { '@id': IDS.person },
        employee: { '@id': IDS.person },
        knowsAbout,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          '@id': IDS.catalog,
          name: 'Services Valdence Digital',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@id': IDS.service(s.slug) },
          })),
        },
        makesOffer: {
          '@type': 'Offer',
          '@id': IDS.audit,
          name: freeAudit.name,
          description: freeAudit.description,
          url: `${SITE_URL}/#audit`,
          price: '0',
          priceCurrency: 'EUR',
          validFrom: '2025-12-05',
          availability: 'https://schema.org/InStock',
          ...(auditService && { itemOffered: { '@id': IDS.service(auditService.slug) } }),
        },
      },
      {
        '@type': 'Person',
        '@id': IDS.person,
        name: 'Yannick Bernard',
        jobTitle: 'Fondateur et développeur full-stack',
        image: `${SITE_URL}/photo_yb_v2.webp`,
        url: `${SITE_URL}/#about`,
        worksFor: { '@id': IDS.business },
        sameAs: ['https://www.linkedin.com/in/bernardyannick/'],
        knowsAbout,
      },
      ...serviceNodes,
    ],
  }
}

/** Sérialise pour une balise <script type="application/ld+json"> (échappe "<" contre l'injection HTML). */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
