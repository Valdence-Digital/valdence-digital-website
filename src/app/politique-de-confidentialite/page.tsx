import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import SectionWrapper from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Valdence Digital',
  robots: { index: false, follow: false },
}

export default function PolitiqueConfidentialite() {
  return (
    <main>
      <Navbar />
      <SectionWrapper>
        <h1 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-10">
          Politique de confidentialité
        </h1>

        <div className="font-dm-sans text-base text-foreground/80 space-y-8 max-w-3xl">

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <ul className="mt-2 space-y-1 list-none">
              <li><strong>Société :</strong> Valdence Digital (SASU)</li>
              <li><strong>Représentant :</strong> Yannick Bernard, Président</li>
              <li><strong>Adresse :</strong> 15 Rue de la Serre, 31460 Le Cabanial, France</li>
              <li><strong>Email :</strong> contact@valdence.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">2. Données collectées</h2>
            <p>
              Ce site collecte uniquement les données personnelles que vous nous transmettez volontairement via le
              formulaire de contact. Ces données sont :
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Code postal</li>
              <li>Nom de l&apos;entreprise (facultatif)</li>
              <li>Message libre relatif à votre projet</li>
            </ul>
            <p className="mt-2">
              Aucune autre donnée n&apos;est collectée. Ce site n&apos;utilise <strong>aucun cookie</strong>, traceur ou
              outil d&apos;analyse d&apos;audience.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">3. Finalité du traitement</h2>
            <p>Les données collectées via le formulaire de contact sont utilisées exclusivement pour :</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>Répondre à votre demande de contact ou de devis</li>
              <li>Étudier la faisabilité de votre projet</li>
              <li>Vous recontacter dans le cadre d&apos;une éventuelle collaboration professionnelle</li>
            </ul>
            <p className="mt-2">
              Ces données ne sont jamais utilisées à des fins commerciales, publicitaires ou de prospection.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données repose sur votre <strong>consentement explicite</strong>, exprimé lors de la
              soumission du formulaire de contact en cochant la case de consentement RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">5. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pour une durée maximale de <strong>3 ans</strong> à compter de
              votre dernier contact, sauf obligation légale contraire ou si une relation contractuelle est établie.
              Au-delà de ce délai, les données sont supprimées ou anonymisées.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">6. Destinataires des données</h2>
            <p>
              Vos données personnelles sont destinées exclusivement à <strong>Valdence Digital</strong>. Elles ne sont
              ni vendues, ni cédées, ni louées à des tiers. Elles peuvent être transmises à des sous-traitants
              techniques strictement nécessaires à l&apos;exploitation du service (hébergeur OVH Cloud) dans le respect
              du RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">7. Transfert hors Union Européenne</h2>
            <p>
              Vos données ne font l&apos;objet d&apos;aucun transfert en dehors de l&apos;Union Européenne. L&apos;ensemble des
              infrastructures utilisées sont hébergées en France (OVH Cloud, datacenter de Paris).
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">8. Cookies et traceurs</h2>
            <p>
              Ce site n&apos;utilise <strong>aucun cookie</strong>, ni traceur, ni outil de mesure d&apos;audience. Aucune
              donnée de navigation n&apos;est collectée ou stockée sur votre terminal.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">9. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la
              loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retrait du consentement :</strong> à tout moment, sans effet rétroactif</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à l&apos;adresse suivante :{' '}
              <a href="mailto:contact@valdence.com" className="text-teal hover:underline">
                contact@valdence.com
              </a>
            </p>
            <p className="mt-2">
              Nous nous engageons à répondre à votre demande dans un délai d&apos;un mois. Si vous estimez que vos droits
              ne sont pas respectés, vous pouvez introduire une réclamation auprès de la{' '}
              <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) :{' '}
              <span className="text-muted">www.cnil.fr</span>
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">10. Sécurité</h2>
            <p>
              Valdence Digital met en œuvre les mesures techniques et organisationnelles appropriées pour protéger
              vos données personnelles contre toute perte, utilisation abusive, accès non autorisé, divulgation,
              altération ou destruction. Le site est servi exclusivement en HTTPS.
            </p>
          </section>

          <section>
            <h2 className="font-sora text-xl font-semibold text-foreground mb-3">11. Modifications</h2>
            <p>
              Valdence Digital se réserve le droit de modifier la présente politique de confidentialité à tout moment.
              Les modifications entrent en vigueur dès leur publication sur cette page. Nous vous encourageons à la
              consulter régulièrement.
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
