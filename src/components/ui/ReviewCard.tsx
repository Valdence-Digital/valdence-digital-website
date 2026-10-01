import Image from 'next/image'
import type { GoogleReview } from '@/lib/google-places'
import ExpandableText from '@/components/ui/ExpandableText'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export default function ReviewCard({ review }: { review: GoogleReview }) {
  const date = new Date(review.time * 1000).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
      <StarRating rating={review.rating} />

      <ExpandableText
        text={`“${review.text}”`}
        className="flex-1"
        textClassName="text-foreground/80 whitespace-pre-line"
      />

      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        {review.profilePhotoUrl && (
          <Image
            src={review.profilePhotoUrl}
            alt={review.authorName}
            width={36}
            height={36}
            className="rounded-full shrink-0"
          />
        )}
        <div className="flex-1 flex items-center justify-between">
          <p className="font-dm-sans font-semibold text-base text-foreground">{review.authorName}</p>
          <p className="font-dm-sans text-sm text-muted">{date}</p>
        </div>
      </div>
    </div>
  )
}
