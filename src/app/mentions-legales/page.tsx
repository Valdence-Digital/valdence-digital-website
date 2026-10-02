import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import SectionWrapper from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title: 'Mentions légales - Valdence Digital',
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <main>
      <Navbar />
      <SectionWrapper>
        <h1 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-10">
          Mentions légales
        </h1>

        <div className="font-dm-sans text-base text-foreground/80 space-y-8 max-w-3xl">

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">1. Éditeur du site</h2>
            <p>Le site <strong>digital.valdence.com</strong> est édité par :</p>
            <ul className="mt-2 space-y-1 list-none">
              <li><strong>Raison sociale :</strong> Valdence Digital</li>
              <li><strong>Forme juridique :</strong> Société par Actions Simplifiée Unipersonnelle (SASU)</li>
              <li><strong>Capital social :</strong> 500 €</li>
              <li><strong>SIRET :</strong> 994 469 914 00018</li>
              <li><strong>N° TVA intracommunautaire :</strong> FR57994469914</li>
              <li><strong>Siège social :</strong> 15 Rue de la Serre, 31460 Le Cabanial, France</li>
              <li><strong>Email :</strong> contact@valdence.com</li>
              <li><strong>Téléphone :</strong> 06 73 90 63 51</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">2. Responsable de publication</h2>
            <p>Le responsable de la publication est <strong>Yannick Bernard</strong>, en qualité de Président de la société Valdence Digital.</p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">3. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-2 space-y-1 list-none">
              <li><strong>Société :</strong> OVH SAS</li>
              <li><strong>Siège social :</strong> 2 Rue Kellermann, 59100 Roubaix, France</li>
              <li><strong>Datacenter :</strong> Paris, France</li>
              <li><strong>Site web :</strong> ovhcloud.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments constituant ce site (textes, graphismes, logotypes, images, sons, vidéos, etc.)
              est la propriété exclusive de Valdence Digital ou de ses partenaires. Toute reproduction, représentation,
              modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le
              procédé utilisé, est interdite sans autorisation écrite préalable de Valdence Digital.
            </p>
            <p className="mt-2">
              Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient est considérée
              comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et
              suivants du Code de Propriété Intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">5. Limitation de responsabilité</h2>
            <p>
              Valdence Digital s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
              Cependant, Valdence Digital ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
              mises à disposition sur ce site. En conséquence, Valdence Digital décline toute responsabilité pour toute
              imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">6. Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens hypertextes vers d&apos;autres sites internet. Valdence Digital ne dispose d&apos;aucun
              moyen pour contrôler les sites en connexion avec le sien et ne répond pas de la disponibilité de tels sites et
              sources externes, ni ne la garantit. Valdence Digital ne peut être tenue responsable de tout dommage, de quelque
              nature que ce soit, résultant du contenu de ces sites ou sources externes.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>
          </section>

          <p className="text-sm text-muted pt-4 border-t border-gray-100">
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}
