import { describe, it, expect } from 'vitest'
import { buildHomeJsonLd, serializeJsonLd, IDS } from '@/lib/structured-data'
import { services } from '@/data/services'

type Node = Record<string, unknown> & { '@id'?: string; '@type': string }

const graph = buildHomeJsonLd()['@graph'] as Node[]
const byId = new Map(graph.map((n) => [n['@id'], n]))

// Récupère toutes les références { "@id": ... } imbriquées
function refs(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => refs(v, out))
  else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (Object.keys(obj).length === 1 && typeof obj['@id'] === 'string') out.push(obj['@id'])
    else Object.values(obj).forEach((v) => refs(v, out))
  }
  return out
}

describe('JSON-LD de la page d’accueil', () => {
  it('déclare un nœud Service par service affiché', () => {
    for (const s of services) {
      const node = byId.get(IDS.service(s.slug))
      expect(node?.['@type']).toBe('Service')
      expect(node?.name).toBe(s.title)
      expect(node?.description).toBe(s.description)
    }
  })

  it('ne contient aucune référence @id orpheline', () => {
    const missing = refs(graph).filter((r) => !byId.has(r) && r !== IDS.catalog && r !== IDS.audit)
    expect(missing).toEqual([])
  })

  it('a des @id uniques', () => {
    const ids = graph.map((n) => n['@id'])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('échappe les chevrons à la sérialisation', () => {
    expect(serializeJsonLd({ a: '</script><script>' })).not.toContain('<')
  })
})
