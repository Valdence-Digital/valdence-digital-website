import { describe, expect, it } from 'vitest'
import { transformReview } from '@/lib/google-places'

describe('transformReview', () => {
  it('maps Google API fields to GoogleReview type', () => {
    const raw = {
      author_name: 'Marie D.',
      rating: 5,
      text: 'Excellent travail, très professionnel.',
      time: 1700000000,
      profile_photo_url: 'https://example.com/photo.jpg',
    }
    expect(transformReview(raw)).toEqual({
      authorName: 'Marie D.',
      rating: 5,
      text: 'Excellent travail, très professionnel.',
      time: 1700000000,
      profilePhotoUrl: 'https://example.com/photo.jpg',
    })
  })

  it('defaults profilePhotoUrl to empty string when missing', () => {
    const raw = {
      author_name: 'Jean P.',
      rating: 4,
      text: 'Bon travail.',
      time: 1700000000,
      profile_photo_url: undefined,
    }
    expect(transformReview(raw).profilePhotoUrl).toBe('')
  })
})
