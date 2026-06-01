import { Globe, ShoppingCart, Wrench, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'

const services: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Globe,
    title: 'Sites vitrines',
    description:
      'Présence en ligne professionnelle, rapide à lancer et facile à maintenir. Un site qui vous représente et rassure vos visiteurs dès le premier regard.',
  },
  {
    Icon: ShoppingCart,
    title: 'Sites e-commerce',
    description:
      'Boutiques performantes, conçues pour convertir et fidéliser. Du catalogue produits au tunnel de paiement, pensés pour la croissance.',
  },
  {
    Icon: Wrench,
    title: 'Applications web',
    description:
      "Outils métier sur mesure, robustes, évolutifs et bien documentés. Des solutions pensées pour votre usage réel, pas pour une démo.",
  },
  {
    Icon: Users,
    title: 'Consulting & Assistance Technique',
    description:
      "Accompagnement technique en entreprise : audit, conseil, renfort d'équipe. Une expertise full-stack disponible quand vous en avez besoin.",
  },
]

export default function Services() {
  return (
    <SectionWrapper id="services">
      <p className="text-sm font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Ce que je fais
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Mes services
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        De la vitrine au logiciel métier — et au renfort technique pour agences et équipes internes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-lg p-8 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all duration-200 group"
          >
            <Icon className="w-8 h-8 text-teal mb-4" aria-hidden="true" />
            <h3 className="font-sora text-xl font-semibold text-foreground mb-3 group-hover:text-teal transition-colors">
              {title}
            </h3>
            <p className="font-dm-sans text-muted leading-relaxed text-base">{description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
