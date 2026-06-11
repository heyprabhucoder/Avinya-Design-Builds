'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface CTAButtonProps {
  href?: string
  label: string
  variant?: 'gold' | 'outline' | 'navy'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { padding: '10px 20px', fontSize: 13 },
  md: { padding: '14px 28px', fontSize: 14 },
  lg: { padding: '16px 36px', fontSize: 15 },
}

const FILL_COLORS: Record<string, string> = {
  gold:    'var(--navy)',   // navy fills over gold
  navy:    'var(--gold)',   // gold fills over navy
  outline: 'var(--navy)',   // navy fills over transparent
}

const TEXT_COLORS: Record<string, { base: string; hover: string }> = {
  gold:    { base: 'var(--navy)', hover: '#FFFFFF' },
  navy:    { base: '#FFFFFF',     hover: 'var(--navy)' },
  outline: { base: 'var(--navy)', hover: '#FFFFFF' },
}

export default function CTAButton({
  href,
  label,
  variant = 'gold',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
}: CTAButtonProps) {
  const [hovered, setHovered] = useState(false)

  const { padding, fontSize } = SIZES[size]
  const fillColor = FILL_COLORS[variant]
  const { base: baseColor, hover: hoverColor } = TEXT_COLORS[variant]

  const baseStyle: React.CSSProperties = {
    position:      'relative',
    display:       'inline-flex',
    alignItems:    'center',
    justifyContent:'center',
    padding,
    borderRadius:  999,
    fontFamily:    'var(--font-body)',
    fontWeight:    600,
    fontSize,
    cursor:        disabled ? 'not-allowed' : 'pointer',
    textDecoration:'none',
    overflow:      'hidden',
    whiteSpace:    'nowrap',
    transition:    'transform 0.2s ease, opacity 0.2s ease',
    transform:     hovered && !disabled ? 'scale(1.03)' : 'scale(1)',
    opacity:       disabled ? 0.6 : 1,
    // Variant-specific backgrounds / borders
    background:   variant === 'gold'    ? 'var(--gold)'
                : variant === 'navy'    ? 'var(--navy)'
                : 'transparent',
    border:       variant === 'outline' ? '1.5px solid var(--navy)' : 'none',
  }

  const inner = (
    <>
      <span
        style={{
          position: 'relative',
          zIndex:   2,
          color:    hovered && !disabled ? hoverColor : baseColor,
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered && !disabled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position:        'absolute',
          inset:           0,
          background:      fillColor,
          transformOrigin: 'bottom',
          zIndex:          1,
          borderRadius:    'inherit',
        }}
      />
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{ ...baseStyle, background: baseStyle.background as string }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </button>
  )
}
