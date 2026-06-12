'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  type?: 'words' | 'chars'
  delay?: number
  duration?: number
  stagger?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
  y?: string | number
  threshold?: number
}

const EASE = [0.25, 1, 0.5, 1] as const // Premium cubic-bezier easeOutExpo-like

export default function TextReveal({
  text,
  type = 'words',
  delay = 0,
  duration = 0.8,
  stagger,
  className = '',
  style = {},
  once = true,
  y = '100%',
  threshold = 0.15,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const actualStagger = stagger ?? (type === 'chars' ? 0.015 : 0.05)

  if (type === 'chars') {
    // Split into words first, then chars — each word gets white-space:nowrap
    // so the browser can only break at word boundaries, never mid-word.
    const words = text.split(' ')
    let charIndex = 0

    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: 'inline',
          ...style,
        }}
      >
        {words.map((word, wordIdx) => {
          const wordChars = Array.from(word)
          const wordStartIndex = charIndex
          charIndex += word.length + 1 // +1 for the space

          return (
            <span
              key={wordIdx}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',   // ← prevents mid-word breaks
                verticalAlign: 'bottom',
              }}
            >
              {/* Individual character spans */}
              {wordChars.map((char, ci) => (
                <span
                  key={ci}
                  style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}
                >
                  <motion.span
                    initial={{ y }}
                    animate={isInView ? { y: 0 } : { y }}
                    transition={{
                      duration,
                      delay: delay + (wordStartIndex + ci) * actualStagger,
                      ease: EASE,
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}

              {/* Word spacer — renders after every word except the last */}
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block', width: '0.28em' }} />
              )}
            </span>
          )
        })}
      </span>
    )
  }

  // Words mode
  const words = text.split(' ')
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {words.map((word, index) => {
        return (
          <span
            key={index}
            style={{
              overflow: 'hidden',
              display: 'inline-block',
              verticalAlign: 'bottom',
              marginRight: '0.22em', // standard word spacing
            }}
          >
            <motion.span
              initial={{ y }}
              animate={isInView ? { y: 0 } : { y }}
              transition={{
                duration,
                delay: delay + index * actualStagger,
                ease: EASE,
              }}
              style={{
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
