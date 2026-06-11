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
    const chars = Array.from(text)
    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: 'inline-block',
          ...style,
        }}
      >
        {chars.map((char, index) => {
          const isSpace = char === ' '
          return (
            <span
              key={index}
              style={{
                overflow: 'hidden',
                display: isSpace ? 'inline' : 'inline-block',
                verticalAlign: 'bottom',
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
                  whiteSpace: 'pre',
                }}
              >
                {isSpace ? ' ' : char}
              </motion.span>
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
