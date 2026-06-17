'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/* ─── Types ───────────────────────────────────────────────────── */

interface Breadcrumb {
  label: string
  href?: string
}

export interface PageTitleBannerProps {
  title:       string
  imageSrc:    string
  imageAlt:    string
  breadcrumbs: Breadcrumb[]
}

/* ─── Component ───────────────────────────────────────────────── */

export default function PageTitleBanner({
  title,
  imageSrc,
  imageAlt,
  breadcrumbs,
}: PageTitleBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  /* Parallax — photo moves at 0.4× scroll speed */
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 500], ['0%', '18%'])

  /* ── Chevron shared entrance transition ── */
  const chevronTransition = {
    duration: 0.65,
    delay:    0.40,
    ease:     [0.4, 0, 0.2, 1] as [number, number, number, number],
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width:      '100%',
        margin:        '0 auto',
        paddingTop:    '10px',
        paddingLeft:   '10px',
        paddingRight:  '10px',
        paddingBottom: 0,
        position:      'relative', /* ← chevrons anchor here */
      }}
    >

      {/* ═══════════════════════════════════════════════════════
          BANNER CONTAINER
      ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          position:     'relative',
          width:        '100%',
          height:       'clamp(200px, 60vh, 480px)',
          borderRadius: 'clamp(14px, 1.8vw, 20px)',
          overflow:     'hidden',
          background:   'var(--navy, #1B2F4E)',
        }}
      >

        {/* Layer 1 — Parallax background photo */}
        <motion.div
          style={{
            position: 'absolute',
            inset:    0,
            height:   '115%',
            top:      '-7.5%',
            y:        photoY,
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </motion.div>

        {/* Layer 2 — Left colour overlay: navy → gold-tint → transparent */}
        <div
          style={{
            position:      'absolute',
            inset:         0,
            pointerEvents: 'none',
            zIndex:        1,
            background:    `linear-gradient(
              to right,
              rgba(27, 47, 78, 0.88)  0%,
              rgba(27, 47, 78, 0.60)  28%,
              rgba(245, 168, 42, 0.18) 54%,
              transparent              78%
            )`,
          }}
        />

        {/* Layer 3 — Bottom scrim for text legibility */}
        <div
          style={{
            position:      'absolute',
            bottom:        0,
            left:          0,
            right:         0,
            height:        '65%',
            pointerEvents: 'none',
            zIndex:        2,
            background:    `linear-gradient(
              to top,
              rgba(0, 0, 0, 0.52)  0%,
              rgba(0, 0, 0, 0.22)  38%,
              transparent          100%
            )`,
          }}
        />

        {/* Layer 4 — Text content */}
        <div
          style={{
            position:      'absolute',
            bottom:        'clamp(20px, 3.5vw, 36px)',
            left:          'clamp(20px, 4vw, 44px)',
            zIndex:        3,
            pointerEvents: 'none',
          }}
        >

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.70, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily:    'var(--font-body, Inter, sans-serif)',
              fontWeight:    800,
              fontSize:      'clamp(28px, 5.5vw, 72px)',
              color:         '#FFFFFF',
              lineHeight:    1.0,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin:        0,
              textShadow:    '0 2px 16px rgba(0,0,0,0.38)',
            }}
          >
            {title}
          </motion.h1>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════════
          BREADCRUMB ROW
      ═══════════════════════════════════════════════════════ */}
      <nav
        aria-label="Breadcrumb"
        style={{
          marginTop:  14,
          display:    'flex',
          alignItems: 'center',
          gap:        6,
          flexWrap:   'wrap',
        }}
        className="banner-breadcrumbs"
      >
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1
          return (
            <span
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {i > 0 && (
                <span
                  style={{
                    fontFamily: 'var(--font-body, Inter, sans-serif)',
                    fontSize:   'clamp(11px, 1.1vw, 13px)',
                    color:      'var(--mist, #8A8A8A)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              {isLast || !crumb.href ? (
                <span
                  style={{
                    fontFamily:  'var(--font-body, Inter, sans-serif)',
                    fontWeight:  400,
                    fontSize:    'clamp(11px, 1.1vw, 13px)',
                    color:       'var(--ink, #1A1A1A)',
                    lineHeight:  1,
                  }}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  style={{
                    fontFamily:         'var(--font-body, Inter, sans-serif)',
                    fontWeight:         400,
                    fontSize:           'clamp(11px, 1.1vw, 13px)',
                    color:              'var(--mist, #8A8A8A)',
                    textDecoration:     'underline',
                    textUnderlineOffset:'3px',
                    lineHeight:         1,
                    transition:         'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--navy, #1B2F4E)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--mist, #8A8A8A)')}
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>

      {/* Hide chevrons on mobile via CSS */}
      <style>{`
        @media (max-width: 767px) {
          .banner-chevron { display: none !important; }
        }
      `}</style>
    </div>
  )
}