import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { freeAudit } from '@/data/audit'

export default function Hero() {
  return (
    <section className="relative bg-background overflow-hidden pt-24 pb-2 md:pb-4">
      {/* Teal decorative circles */}
      <div aria-hidden="true" className="absolute top-0 right-0 pointer-events-none select-none">
        <div className="w-130 h-130 rounded-full border border-teal/8 absolute -top-36 -right-36" />
        <div className="w-90 h-90 rounded-full border border-teal/12 absolute -top-16 -right-16" />
        <div className="w-52.5 h-52.5 rounded-full border border-teal/18 absolute top-8 right-8" />
        <div className="w-4 h-4 rounded-full bg-teal/20 absolute top-28 right-72" />
        <div className="w-2 h-2 rounded-full bg-teal/35 absolute top-44 right-52" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 relative z-10">
        <p className="text-sm font-dm-sans tracking-[0.3em] text-teal uppercase mb-6">
          Valdence Digital
        </p>
        <h1 className="font-sora text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
          Je ne code pas pour vous.{' '}
          <span className="text-teal">Je crée avec vous.</span>
        </h1>
        <p className="font-dm-sans text-xl text-muted max-w-xl mb-10 leading-relaxed">
          Développeur full-stack indépendant, je crée, j&apos;améliore et je fais connaître vos sites web. Référencement Google, visibilité dans les IA et outils sur mesure, à votre image.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="#contact" variant="primary">Parlons de votre projet <ArrowRight className="inline w-4 h-4" /></Button>
          <Button href={`#${freeAudit.anchor}`} variant="outline">Audit offert de votre site</Button>
        </div>
      </div>
    </section>
  )
}
