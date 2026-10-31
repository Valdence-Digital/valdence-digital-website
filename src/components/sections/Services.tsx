import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import { services } from '@/data/services'
import { freeAudit } from '@/data/audit'

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
        Créer votre site, améliorer celui que vous avez déjà, et faire en sorte qu&apos;on vous trouve.
        Avec l&apos;IA comme alliée, pour vous et pour vos outils.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Offre d'entrée : audit offert */}
      <div
        id="audit"
        className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-xl bg-teal-dark p-8 md:p-10"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-dm-sans tracking-[0.3em] text-teal uppercase mb-2">
            Offert
          </p>
          <h3 className="font-sora text-2xl font-semibold text-white mb-3">
            Votre site mérite mieux&nbsp;? Je l&apos;audite gratuitement.
          </h3>
          <p className="font-dm-sans text-white/70 leading-relaxed">
            Vitesse, référencement Google, visibilité dans les IA, affichage mobile&nbsp;: vous recevez
            un bilan clair et une liste d&apos;améliorations prioritaires. Sans engagement.
          </p>
        </div>
        <Button href={`#${freeAudit.anchor}`} variant="primary" className="shrink-0 self-start md:self-center">
          Demander mon audit offert <ArrowRight className="inline w-4 h-4" />
        </Button>
      </div>
    </SectionWrapper>
  )
}
