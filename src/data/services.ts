import { Globe, Wrench, SearchCheck, TrendingUp, Sparkles, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Service = {
  /** Identifiant stable, utilisé dans les @id du JSON-LD */
  slug: string
  Icon: LucideIcon
  /** Titre affiché sur la carte */
  title: string
  /** Texte affiché sur la carte, repris tel quel dans le JSON-LD */
  description: string
  /** Libellé explicite pour les moteurs (JSON-LD serviceType) */
  serviceType: string
}

export const services: Service[] = [
  {
    slug: 'sites-vitrines-e-commerce',
    Icon: Globe,
    title: 'Sites vitrines & e-commerce',
    description:
      'Un site qui vous représente, rassure vos visiteurs et les transforme en clients. De la vitrine à la boutique en ligne, rapide, facile à maintenir et pensé pour être trouvé.',
    serviceType: 'Création de site vitrine et de site e-commerce',
  },
  {
    slug: 'applications-web',
    Icon: Wrench,
    title: 'Applications web',
    description:
      'Outils métier sur mesure, robustes, évolutifs et bien documentés. Des solutions pensées pour votre usage réel, pas pour une démo.',
    serviceType: "Développement d'application web sur mesure",
  },
  {
    slug: 'audit-amelioration-site',
    Icon: SearchCheck,
    title: 'Audit & amélioration de votre site',
    description:
      "Votre site existe mais ne vous rapporte rien ? J'analyse sa vitesse, son référencement, son affichage mobile et sa sécurité, puis je corrige, modernise ou migre ce qui doit l'être.",
    serviceType: 'Audit de site web, refonte et migration',
  },
  {
    slug: 'referencement-google-ia',
    Icon: TrendingUp,
    title: 'Référencement Google & IA',
    description:
      'Être trouvé par vos futurs clients : référencement local sur Google et Google Maps, contenus optimisés, et visibilité dans les réponses des IA comme ChatGPT ou Perplexity.',
    serviceType: 'Référencement naturel (SEO), SEO local et visibilité dans les moteurs IA (GEO)',
  },
  {
    slug: 'integration-ia-automatisation',
    Icon: Sparkles,
    title: 'Intégration IA & automatisation',
    description:
      "L'IA là où elle vous fait gagner du temps : assistants, automatisation de tâches répétitives, traitement de vos contenus et de vos données. Utile, concret, intégré à vos outils.",
    serviceType: "Intégration d'intelligence artificielle et automatisation",
  },
  {
    slug: 'consulting-assistance-technique',
    Icon: Users,
    title: 'Consulting & Assistance Technique',
    description:
      "Accompagnement technique en entreprise : audit, conseil, renfort d'équipe. Une expertise full-stack disponible quand vous en avez besoin.",
    serviceType: 'Conseil technique et assistance technique full-stack',
  },
]

/** Audit offert mis en avant sous les services (section #audit) */
export const freeAudit = {
  name: 'Audit offert de votre site web',
  description:
    "Vitesse, référencement Google, visibilité dans les IA, affichage mobile : un bilan clair et une liste d'améliorations prioritaires. Sans engagement.",
}
