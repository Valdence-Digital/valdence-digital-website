import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SimpleIcon } from 'simple-icons'
import SectionWrapper from '@/components/ui/SectionWrapper'
import {
  siDotnet,
  siNextdotjs,
  siReact,
  siTypescript,
  siPostgresql,
  siWordpress,
  siOvh,
} from 'simple-icons'
import IconCSharp from '@/components/ui/IconCSharp'

type TechItem = {
  label: string
  icon?: SimpleIcon
  CustomIcon?: ComponentType<{ className?: string }>
}

const techStack: TechItem[] = [
  { label: 'C#', CustomIcon: IconCSharp },
  { icon: siDotnet, label: '.NET' },
  { icon: siNextdotjs, label: 'Next.js' },
  { icon: siReact, label: 'React' },
  { icon: siTypescript, label: 'TypeScript' },
  { icon: siPostgresql, label: 'PostgreSQL' },
  { icon: siWordpress, label: 'WordPress' },
  { icon: siOvh, label: 'OVHcloud' },
]

const linkedInPath =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

export default function About() {
  return (
    <SectionWrapper id="about">
      <p className="text-base font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Qui suis-je
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-12">
        À propos
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Photo + identity */}
        <div className="shrink-0 flex flex-col items-center md:items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-teal/20">
            <Image
              src="/photo_yb_v2.webp"
              alt="Yannick Bernard"
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="font-sora font-bold text-foreground text-lg mt-4">Yannick Bernard</p>
          <p className="font-dm-sans text-base text-teal">CEO</p>
          <Link
            href="https://www.linkedin.com/in/bernardyannick/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-base font-dm-sans text-muted hover:text-teal transition-colors"
            aria-label="Profil LinkedIn de Yannick Bernard"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d={linkedInPath} />
            </svg>
            LinkedIn
          </Link>
        </div>

        {/* Bio */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4 font-dm-sans text-muted leading-relaxed">
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
          <div className="mt-10 pt-8 border-t border-teal/20">
            <p className="text-base font-dm-sans tracking-[0.2em] text-muted uppercase mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map(({ icon, CustomIcon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-teal/40 transition-colors"
                >
                  {CustomIcon && <CustomIcon className="w-5 h-5 shrink-0" aria-hidden="true" />}
                  {icon && (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                      style={{ fill: `#${icon.hex}` }}
                    >
                      <path d={icon.path} />
                    </svg>
                  )}
                  <span className="text-base font-dm-sans text-foreground/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
