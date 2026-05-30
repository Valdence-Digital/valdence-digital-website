import LogoLight from '@/components/ui/LogoLight'
import SocialLinks from '@/components/ui/SocialLinks'

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white/80 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <SocialLinks variant="light" size="lg" gap="gap-6" className="md:hidden" />
        <div className="flex items-center gap-6">
          <LogoLight className="h-24 w-auto" />
          <p className="font-dm-sans text-base text-white/50">
            © 2026 Valdence Digital — Tous droits réservés
          </p>
        </div>
        <SocialLinks variant="light" size="md" className="hidden md:flex" />
        <nav aria-label="Liens légaux">
          <ul className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <li>
              <a
                href="/mentions-legales"
                className="font-dm-sans text-base text-white/60 hover:text-white transition-colors"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/politique-de-confidentialite"
                className="font-dm-sans text-base text-white/60 hover:text-white transition-colors"
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
