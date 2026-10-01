'use client'

import { useState, useRef, useEffect } from 'react'

const MAX_LINES = 5

export default function ExpandableText({
  text,
  className = '',
  buttonClassName = '',
}: {
  text: string
  className?: string
  buttonClassName?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    // scrollHeight = hauteur du texte complet, que le paragraphe soit tronqué ou non
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      setOverflows(el.scrollHeight > lineHeight * MAX_LINES + 1)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`flex flex-col ${className}`}>
      <p
        ref={textRef}
        className={`font-dm-sans text-muted text-base leading-relaxed ${expanded ? '' : 'line-clamp-5'}`}
      >
        {text}
      </p>

      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`relative z-10 flex min-h-11 items-center text-left font-dm-sans text-sm text-teal cursor-pointer hover:underline focus:outline-none focus-visible:underline ${buttonClassName}`}
        >
          {expanded ? 'Voir moins' : 'Voir plus…'}
        </button>
      )}
    </div>
  )
}
