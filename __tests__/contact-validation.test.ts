import { describe, expect, it } from 'vitest'
import { contactSchema } from '@/lib/contact-validation'

const valid = {
  nom: 'Bernard',
  prenom: 'Yannick',
  entreprise: '',
  email: 'yannick@valdence.com',
  codePostal: '75001',
  telephone: '+33612345678',
  message: "Bonjour, je souhaite discuter d'un projet.",
  website: '',
  rgpd: 'on',
}

function firstError(data: object): string | undefined {
  const result = contactSchema.safeParse(data)
  if (result.success) return undefined
  return result.error.issues[0].message
}

describe('contactSchema', () => {
  it('parses valid complete data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts when entreprise is empty (optional)', () => {
    expect(contactSchema.safeParse({ ...valid, entreprise: '' }).success).toBe(true)
  })

  it('returns error when nom is missing', () => {
    expect(firstError({ ...valid, nom: '' })).toBe('Le nom est requis')
  })

  it('returns error when prenom is whitespace only', () => {
    expect(firstError({ ...valid, prenom: '   ' })).toBe('Le prénom est requis')
  })

  it('returns error for invalid email', () => {
    expect(firstError({ ...valid, email: 'pas-un-email' })).toBe('Adresse email invalide')
  })

  it('returns error for phone too short', () => {
    expect(firstError({ ...valid, telephone: '1234' })).toBe('Numéro de téléphone invalide')
  })

  it('accepts national format 0612345678', () => {
    expect(contactSchema.safeParse({ ...valid, telephone: '0612345678' }).success).toBe(true)
  })

  it('accepts +33 with spaces', () => {
    expect(contactSchema.safeParse({ ...valid, telephone: '+33 6 12 34 56 78' }).success).toBe(true)
  })

  it('returns error when RGPD not accepted', () => {
    expect(firstError({ ...valid, rgpd: '' })).toBe('Vous devez accepter les conditions RGPD.')
  })

  it('returns error when message is empty', () => {
    expect(firstError({ ...valid, message: '' })).toBe('Le message est requis')
  })
})
