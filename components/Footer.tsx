'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ─── Constants ─── */
const EASE     = [0.4, 0, 0.2, 1] as const
const EASE_EXP = [0.16, 1, 0.3, 1] as const

/* ─── Data ─── */
const NAV_LINKS = ['Home', 'Services', 'Projects', 'About', 'Contact']

const CONTACT_ITEMS = [
  { label: 'info@avinyaindia.com', href: 'mailto:info@avinyaindia.com', type: 'link' },
  { label: '+91 91594 55001',      href: 'tel:+919159455001',           type: 'link' },
  { label: 'LinkedIn',             href: '#',                            type: 'link', target: '_blank' },
]

const ADDRESS_LINES = [
  'Avinya Design and Build Pvt Ltd',
  'Chennai, Tamil Nadu',
  'India',
]

/* ─── Decorative vertical stripe bars ─── */
const BARS = [
  { width: 14, bg: 'rgba(255,255,255,0.06)' },
  { width: 10, bg: 'rgba(255,255,255,0.03)' },
  { width: 18, bg: 'rgba(245,168,42,0.35)' },  /* gold 35% */
  { width:  8, bg: 'rgba(255,255,255,0.05)' },
  { width: 22, bg: 'rgba(245,168,42,0.55)' },  /* gold 55% */
  { width: 12, bg: 'rgba(255,255,255,0.04)' },
  { width: 28, bg: 'rgba(245,168,42,0.70)' },  /* gold 70% */
  { width: 16, bg: 'rgba(245,168,42,0.45)' },  /* gold 45% */
]

/* ─── NavLink with gold hover ─── */
function NavLink({ label, delay, isInView }: { label: string; delay: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily:     'var(--font-body)',
          fontWeight:     400,
          fontSize:       17,
          color:          hovered ? 'var(--gold)' : 'rgba(255,255,255,0.80)',
          textDecoration: 'none',
          transition:     'color 0.2s ease',
          display:        'block',
        }}
      >
        {label}
      </a>
    </motion.li>
  )
}

/* ─── Contact item with gold hover ─── */
function ContactItem({
  label,
  href,
  target,
  delay,
  isInView,
}: {
  label:   string
  href:    string
  target?: string
  delay:   number
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily:     'var(--font-body)',
          fontWeight:     400,
          fontSize:       15,
          color:          hovered ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
          textDecoration: hovered ? 'underline' : 'none',
          transition:     'color 0.2s ease',
          lineHeight:     1.5,
          display:        'block',
        }}
      >
        {label}
      </a>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   MAIN FOOTER COMPONENT
═══════════════════════════════════════ */
export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null)
  const zone1Ref   = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  /* Zone 1 reveal */
  const isZone1InView = useInView(zone1Ref, { once: true, margin: '-60px 0px' })

  /* Wordmark reveal */
  const isWordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px 0px' })

  /* Wordmark horizontal parallax — subtle x drift on scroll */
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })
  const wordmarkX = useTransform(scrollYProgress, [0.7, 1.0], ['2%', '-2%'])

  /* CTA button hover */
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#2A2A2A',
        width:      '100%',
        overflow:   'hidden',
        position:   'relative',
      }}
    >
      {/* ════════════════════════════════════════════════
          DECORATIVE VERTICAL STRIPE BARS
          position: absolute, full height of footer,
          right edge — overlays both zones
      ════════════════════════════════════════════════ */}
      <div
        className="footer-bars"
        style={{
          position:      'absolute',
          top:           0,
          right:         0,
          height:        '100%',
          width:         220,
          pointerEvents: 'none',
          zIndex:        2,
          display:       'flex',
          alignItems:    'stretch',
        }}
      >
        {BARS.map((bar, i) => (
          <div
            key={i}
            style={{
              width:      bar.width,
              background: bar.bg,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          ZONE 1 — INFORMATION AREA
      ════════════════════════════════════════════════ */}
      <div
        ref={zone1Ref}
        className="footer-zone1"
        style={{
          padding: '80px 64px 72px 64px',
          display: 'grid',
          gridTemplateColumns: '45fr 25fr 28fr',
          columnGap: 48,
          alignItems: 'start',
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ maxWidth: 560 }}>
          {/* Large editorial body text */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0, ease: EASE }}
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(22px, 2.2vw, 34px)',
              color:         'rgba(255,255,255,0.90)',
              lineHeight:    1.45,
              letterSpacing: '-0.01em',
              marginBottom:  40,
              margin:        '0 0 40px 0',
            }}
          >
            Residential, commercial, hospitality, and joint venture
            developments — delivered with international standards,
            transparent communication, and unwavering accountability.
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            <button
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display:         'inline-block',
                background:      ctaHovered ? '#E09420' : 'var(--gold)',
                color:           'var(--navy)',
                fontFamily:      'var(--font-body)',
                fontWeight:      600,
                fontSize:        15,
                padding:         '16px 32px',
                borderRadius:    6,
                border:          'none',
                cursor:          'pointer',
                transform:       ctaHovered ? 'scale(1.02)' : 'scale(1)',
                transition:      'background 0.2s ease, transform 0.2s ease',
                letterSpacing:   '0.01em',
              }}
            >
              Request Consultation
            </button>
          </motion.div>
        </div>

        {/* ── CENTRE COLUMN — Menu ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    500,
              fontSize:      13,
              color:         'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom:  28,
            }}
          >
            Menu
          </motion.div>

          <ul
            style={{
              listStyle:     'none',
              padding:       0,
              margin:        0,
              display:       'flex',
              flexDirection: 'column',
              gap:           16,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link}
                label={link}
                delay={0.15 + i * 0.05}
                isInView={isZone1InView}
              />
            ))}
          </ul>
        </div>

        {/* ── RIGHT COLUMN — Contact ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    500,
              fontSize:      13,
              color:         'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom:  28,
            }}
          >
            Contact
          </motion.div>

          {/* Contact links */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           12,
              marginBottom:  24,
            }}
          >
            {CONTACT_ITEMS.map((item, i) => (
              <ContactItem
                key={item.label}
                label={item.label}
                href={item.href}
                target={item.target}
                delay={0.2 + i * 0.04}
                isInView={isZone1InView}
              />
            ))}
          </div>

          {/* Address stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           4,
            }}
          >
            {ADDRESS_LINES.map((line) => (
              <span
                key={line}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize:   15,
                  color:      'rgba(255,255,255,0.75)',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          THIN RULE — between Zone 1 and Zone 2
      ════════════════════════════════════════════════ */}
      <div
        style={{
          width:      'calc(100% - 128px)',
          margin:     '0 64px',
          height:     1,
          background: 'rgba(255,255,255,0.08)',
        }}
        className="footer-rule"
      />

      {/* ════════════════════════════════════════════════
          ZONE 2 — GIANT WORDMARK
          Zero padding — letters bleed to both edges.
          line-height: 0.82 crops the descender area,
          anchoring letters visually to the "ground".
      ════════════════════════════════════════════════ */}
      <div
        ref={wordmarkRef}
        style={{
          position: 'relative',
          width:    '100%',
          overflow: 'hidden',
          padding:  0,
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 80 }}
          animate={isWordmarkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_EXP }}
          style={{
            x:             wordmarkX,
            fontFamily:    'var(--font-body)',
            fontWeight:    800,
            fontSize:      'clamp(120px, 17vw, 240px)',
            color:         'rgba(255,255,255,0.90)',
            lineHeight:    0.82,
            letterSpacing: '-0.04em',
            whiteSpace:    'nowrap',
            textTransform: 'uppercase',
            display:       'block',
            width:         '100%',
            textAlign:     'center',
            userSelect:    'none',
          }}
        >
          AVINYA
        </motion.span>
      </div>

      {/* ════════════════════════════════════════════════
          COPYRIGHT — overlaid on wordmark, bottom-left
      ════════════════════════════════════════════════ */}
      <div
        className="footer-copyright"
        style={{
          position: 'absolute',
          bottom:   24,
          left:     64,
          zIndex:   3,
          display:  'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize:   12,
            color:      'rgba(255,255,255,0.30)',
          }}
        >
          © 2025 Avinya Design and Build Pvt Ltd · All rights reserved.
        </span>
      </div>

      {/* Location — bottom right, avoids bars */}
      <div
        className="footer-location"
        style={{
          position: 'absolute',
          bottom:   24,
          right:    240,   /* clears the 220px bars + buffer */
          zIndex:   3,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize:   12,
            color:      'rgba(255,255,255,0.25)',
          }}
        >
          Chennai, Tamil Nadu, India
        </span>
      </div>

      {/* ─── Responsive CSS ─── */}
      <style>{`
        /* ── Tablet 768–1023px ── */
        @media (max-width: 1023px) {
          .footer-zone1 {
            grid-template-columns: 1fr 1fr !important;
            padding: 64px 48px 56px !important;
          }
          /* Left col spans full width */
          .footer-zone1 > div:first-child {
            grid-column: 1 / 3;
            margin-bottom: 48px;
          }
          .footer-bars {
            width: 140px !important;
          }
          .footer-rule {
            width: calc(100% - 96px) !important;
            margin: 0 48px !important;
          }
          .footer-copyright {
            left: 48px !important;
          }
          .footer-location {
            right: 160px !important;
          }
        }

        /* ── Mobile < 768px ── */
        @media (max-width: 767px) {
          .footer-zone1 {
            grid-template-columns: 1fr !important;
            padding: 56px 24px 48px !important;
            gap: 40px !important;
          }
          .footer-zone1 > div:first-child {
            grid-column: 1 / 2 !important;
            margin-bottom: 0 !important;
          }
          /* Hide decorative bars — too cramped on mobile */
          .footer-bars {
            display: none !important;
          }
          .footer-rule {
            width: calc(100% - 48px) !important;
            margin: 0 24px !important;
          }
          /* Copyright goes static */
          .footer-copyright {
            position: static !important;
            padding: 16px 24px 24px !important;
            display: block !important;
          }
          .footer-location {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  )
}
