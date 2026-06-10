'use client'

import { motion } from 'framer-motion'

export default function AvinyanLoader() {
  const letters = [
    { char: 'A', font: "'Blanka-Regular', 'Blanka', sans-serif" },
    { char: 'V', font: "'Blanka-Regular', 'Blanka', sans-serif" },
    { char: 'I', font: "'Sirin Stencil', serif" },
    { char: 'N', font: "'Blanka-Regular', 'Blanka', sans-serif" },
    { char: 'Y', font: "'Blanka-Regular', 'Blanka', sans-serif" },
    { char: 'A', font: "'Blanka-Regular', 'Blanka', sans-serif" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#2A2A2A',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            animate={['visible', 'animate']}
            style={{
              fontFamily: letter.font,
              fontWeight: 800,
              fontSize: 'clamp(60px, 12vw, 120px)',
              color: 'var(--gold)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              userSelect: 'none',
              display: 'inline-block',
            }}
          >
            {letter.char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
