import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const ROOT = join(__dirname, '..')

const IGNORED_DIRS = new Set([
  '.git',
  '.next',
  '.claude',
  '.gstack',
  '.superpowers',
  'node_modules',
  'out',
  'build',
  'coverage',
])

// En dash (U+2013) and em dash (U+2014), as literal characters or HTML entities.
// Built from code points so this file never contains the characters it forbids.
const LONG_DASH = new RegExp(
  `[${String.fromCodePoint(0x2013, 0x2014)}]|&(?:ndash|mdash|#821[12]|#x201[34]);`,
  'gi',
)

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return IGNORED_DIRS.has(entry.name) ? [] : listFiles(path)
    return entry.isFile() ? [path] : []
  })
}

function findLongDashes(file: string): string[] {
  const buffer = readFileSync(file)
  // Same heuristic as git: a NUL byte means the file is binary.
  if (buffer.includes(0)) return []

  const name = relative(ROOT, file).replaceAll('\\', '/')
  return buffer
    .toString('utf8')
    .split('\n')
    .flatMap((line, index) =>
      [...line.matchAll(LONG_DASH)].map((match) => `${name}:${index + 1}:${match.index + 1}`),
    )
}

describe('long dashes', () => {
  it('finds no en dash or em dash in the repository (use a hyphen instead)', () => {
    expect(listFiles(ROOT).flatMap(findLongDashes)).toEqual([])
  })
})
