'use client'

import { useActionState, useEffect, useState } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { submitContact } from '@/app/actions/contact'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { contactSchema } from '@/lib/contact-validation'
import { freeAudit } from '@/data/audit'

const RGPD_TEXT =
  "J'ai été informé.e de mon droit de suppression, mon droit de consultation, et mon droit de modification des données personnelles récoltées sur ce formulaire. Mais aussi de la procédure d'exercice de mes droits, de la durée de conservation de mes données, et des conditions de gestions de ces dernières."

type FieldName = 'nom' | 'prenom' | 'entreprise' | 'email' | 'codePostal' | 'telephone' | 'message' | 'rgpd'

const REQUIRED: FieldName[] = ['nom', 'prenom', 'email', 'codePostal', 'telephone', 'message', 'rgpd']

const emptyValues: Record<FieldName, string> = {
  nom: '', prenom: '', entreprise: '', email: '',
  codePostal: '', telephone: '', message: '', rgpd: '',
}

const baseInputClass =
  'w-full px-4 py-3 rounded-sm border font-dm-sans text-base text-foreground placeholder-muted focus:outline-none focus:ring-1 transition-colors'

function inputClass(hasError: boolean) {
  return hasError
    ? `${baseInputClass} border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-400`
    : `${baseInputClass} border-gray-200 bg-white focus:border-teal focus:ring-teal`
}

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContact, {})
  const [values, setValues] = useState<Record<FieldName, string>>(emptyValues)
  const [dirty, setDirty] = useState<Partial<Record<FieldName, boolean>>>({})

  const zodResult = contactSchema.safeParse({ ...values, website: '' })
  const allErrors: Partial<Record<FieldName, string>> = {}
  if (!zodResult.success) {
    for (const issue of zodResult.error.issues) {
      const f = issue.path[0] as FieldName
      if (!allErrors[f]) allErrors[f] = issue.message
    }
  }

  const err = (f: FieldName) => (dirty[f] ? allErrors[f] : undefined)

  const change = (f: FieldName, v: string) => setValues((p) => ({ ...p, [f]: v }))
  const blur = (f: FieldName) => setDirty((p) => ({ ...p, [f]: true }))

  // Boutons « audit offert » : pré-remplit le message s'il est encore vide.
  // Écoute les clics (la navigation par ancre de next/link ne déclenche pas hashchange)
  // et l'ancre présente au chargement (lien partagé).
  useEffect(() => {
    const prefill = () =>
      setValues((p) => (p.message.trim() ? p : { ...p, message: freeAudit.prefilledMessage }))

    if (window.location.hash === `#${freeAudit.anchor}`) prefill()

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest('a')
      if (link?.hash === `#${freeAudit.anchor}`) prefill()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    setDirty(Object.fromEntries(REQUIRED.map((f) => [f, true])) as Record<FieldName, boolean>)
    if (!zodResult.success) e.preventDefault()
  }

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Cible des boutons « audit offert » (même position que #contact) */}
      <div id={freeAudit.anchor} aria-hidden="true" className="absolute top-0" />
      <div aria-hidden="true" className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full border border-teal/8 pointer-events-none" />

      <p className="text-sm font-dm-sans tracking-[0.3em] text-teal uppercase mb-3">
        Travaillons ensemble
      </p>
      <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-4">
        Parlons de votre projet
      </h2>
      <p className="font-dm-sans text-muted max-w-xl mb-12">
        Partagez-moi vos besoins et je reviendrai vers vous dans les plus brefs délais.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          {state.success ? (
            <div className="bg-teal/10 border border-teal/30 rounded-lg p-8 text-center max-w-lg">
              <p className="font-sora text-xl font-semibold text-teal mb-2">Message envoyé !</p>
              <p className="font-dm-sans text-muted text-base">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form action={formAction} onSubmit={handleSubmit} className="space-y-5" noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value=""
                onChange={() => {}}
                style={{ position: 'absolute', left: '-9999px' }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nom" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                    Nom <span className="text-teal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="nom" name="nom" type="text" autoComplete="family-name"
                    value={values.nom}
                    onChange={(e) => change('nom', e.target.value)}
                    onBlur={() => blur('nom')}
                    className={inputClass(!!err('nom'))}
                  />
                  {err('nom') && <p className="text-sm text-red-600 mt-1">{err('nom')}</p>}
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                    Prénom <span className="text-teal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="prenom" name="prenom" type="text" autoComplete="given-name"
                    value={values.prenom}
                    onChange={(e) => change('prenom', e.target.value)}
                    onBlur={() => blur('prenom')}
                    className={inputClass(!!err('prenom'))}
                  />
                  {err('prenom') && <p className="text-sm text-red-600 mt-1">{err('prenom')}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="entreprise" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                  Nom de l&apos;entreprise{' '}
                  <span className="text-muted font-normal text-sm">(Facultatif)</span>
                </label>
                <input
                  id="entreprise" name="entreprise" type="text" autoComplete="organization"
                  value={values.entreprise}
                  onChange={(e) => change('entreprise', e.target.value)}
                  className={inputClass(false)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                    Email <span className="text-teal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    value={values.email}
                    onChange={(e) => change('email', e.target.value)}
                    onBlur={() => blur('email')}
                    className={inputClass(!!err('email'))}
                  />
                  {err('email') && <p className="text-sm text-red-600 mt-1">{err('email')}</p>}
                </div>
                <div>
                  <label htmlFor="codePostal" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                    Code postal <span className="text-teal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="codePostal" name="codePostal" type="text" autoComplete="postal-code"
                    value={values.codePostal}
                    onChange={(e) => change('codePostal', e.target.value)}
                    onBlur={() => blur('codePostal')}
                    className={inputClass(!!err('codePostal'))}
                  />
                  {err('codePostal') && <p className="text-sm text-red-600 mt-1">{err('codePostal')}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="telephone" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                  Téléphone <span className="text-teal" aria-hidden="true">*</span>
                </label>
                <input
                  id="telephone" name="telephone" type="tel" autoComplete="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={values.telephone}
                  onChange={(e) => change('telephone', e.target.value)}
                  onBlur={() => blur('telephone')}
                  className={inputClass(!!err('telephone'))}
                />
                {err('telephone') && <p className="text-sm text-red-600 mt-1">{err('telephone')}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-dm-sans font-medium text-foreground mb-1.5">
                  Message <span className="text-teal" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message" name="message" rows={10}
                  placeholder="Dites-moi en plus sur votre projet"
                  maxLength={2000}
                  value={values.message}
                  onChange={(e) => change('message', e.target.value)}
                  onBlur={() => blur('message')}
                  className={`${inputClass(!!err('message'))} resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {err('message')
                    ? <p className="text-sm text-red-600">{err('message')}</p>
                    : <span />}
                  <p className={`text-sm font-dm-sans ${values.message.length >= 2000 ? 'text-red-500' : 'text-muted'}`}>
                    {values.message.length}/2000
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="rgpd" name="rgpd" type="checkbox"
                    checked={values.rgpd === 'on'}
                    onChange={(e) => change('rgpd', e.target.checked ? 'on' : '')}
                    onBlur={() => blur('rgpd')}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-teal shrink-0"
                  />
                  <label htmlFor="rgpd" className="text-base font-dm-sans text-muted leading-relaxed">
                    {RGPD_TEXT}
                  </label>
                </div>
                {err('rgpd') && <p className="text-sm text-red-600 mt-2">{err('rgpd')}</p>}
              </div>

              {state.error && (
                <p role="alert" className="text-base font-dm-sans text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-teal text-white font-dm-sans font-semibold text-base rounded-sm hover:bg-teal/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? 'Envoi en cours…' : 'Envoyer le message →'}
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="lg:w-72 flex flex-col gap-8">
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 text-teal mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-dm-sans font-semibold text-lg text-foreground mb-1">Villes</p>
              <p className="font-dm-sans text-lg text-muted">Toulouse</p>
              <p className="font-dm-sans text-lg text-muted mt-1">Télétravail possible</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="w-5 h-5 text-teal mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-dm-sans font-semibold text-lg text-foreground mb-1">Téléphone</p>
              <a
                href="tel:+33673906351"
                className="font-dm-sans text-lg text-muted hover:text-teal transition-colors underline"
              >
                06 73 90 63 51
              </a>
              <p className="font-dm-sans text-lg text-muted mt-1">
                Du lundi au vendredi de 9h30 à 18h
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
