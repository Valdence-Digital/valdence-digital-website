import Image from 'next/image'
import SectionWrapper from '@/components/ui/SectionWrapper'

const projects = [
  {
    title: "Sagesse d'Âme",
    category: 'Site vitrine',
    image: '/portfolio/sagesse-holistique.webp',
    url: 'https://www.sagesse-holistique.fr/',
    description:
      "Conception et développement complets d'un site vitrine en Next.js (App Router) : architecture moderne, performances optimisées et SEO intégré dès la conception. Hébergement pris en charge sur une infrastructure souveraine européenne, incluant le déploiement, la supervision et les sauvegardes automatisées. Maintien en condition opérationnelle et évolutions fonctionnelles assurés en continu, selon les besoins du client.",
  },
  {
    title: 'Jonathan Deymier',
    category: 'Refonte WordPress',
    image: '/portfolio/jonathan-deymier.webp',
    url: 'https://www.jonathandeymier.com/',
    description:
      "Intervention sur un site WordPress existant : mise à jour des contenus textuels et visuels de plusieurs pages ciblées. Reprise de la mise en page de ces pages pour garantir la cohérence graphique et améliorer l'expérience utilisateur. Livraison après validation du client et tests de rendu sur ordinateur et mobile.",
  },
  {
    title: 'Harmonie Piano',
    category: 'Application e-learning',
    image: '/portfolio/harmonie-piano.webp',
    url: 'https://formation.harmonie-piano.com/',
    description:
      "Migration vers Next.js d'une application e-learning WordPress, pour la rendre robuste, rapide et simple à faire évoluer, en conservant le design existant. L'intégralité des exercices de piano a été recodée en TypeScript pour répondre au cahier des charges : des exercices plus beaux, plus rapides et débarrassés des bugs existants. Mise en place de webhooks systeme.io pour gérer les ventes des différentes offres de formation, avec automatisation de l'invitation à l'inscription et de l'activation des formations achetées. Création d'un tableau de bord complet d'administration des élèves, pour pallier d'éventuelles défaillances des webhooks (webhook non envoyé, par exemple) ou des problèmes sur les comptes des élèves.",
  },
  {
    title: 'Club Business Invincible',
    category: 'Site vitrine',
    image: '/portfolio/club-business-invincible.webp',
    url: 'https://www.club-business-invincible.fr/',
    description:
      "Conception et développement complets d'un site vitrine en Next.js (App Router) : architecture moderne, performances optimisées et SEO intégré dès la conception. Déploiement et mise en ligne sur l'hébergement du client.",
  },
]

export default function Portfolio() {
  return (
    <SectionWrapper id="portfolio">
      <p className="text-sm font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Mes réalisations
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Projets récents
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        Quelques-uns des projets que j&apos;ai eu le plaisir de réaliser.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:border-teal/30 hover:shadow-lg focus-within:border-teal/30 focus-within:shadow-lg transition-all duration-300"
          >
            <div className="relative w-full h-52 overflow-hidden bg-gray-50">
              <Image
                src={project.image}
                alt={`Aperçu du projet ${project.title}`}
                fill
                priority={i === 0}
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-sm font-dm-sans font-medium text-teal bg-teal/10 px-2 py-0.5 rounded mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-sora text-lg font-semibold text-foreground">{project.title}</h3>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-base font-dm-sans text-teal group-hover:underline mt-1 whitespace-nowrap after:absolute after:inset-0 after:content-['']"
                  aria-label={`Voir le site ${project.title}`}
                >
                  Voir le site →
                </a>
              </div>
              <p className="font-dm-sans text-muted text-base leading-relaxed mt-4">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
