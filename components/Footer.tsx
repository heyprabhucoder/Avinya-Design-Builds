'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import TextReveal from './TextReveal'

/* ─── Constants ─── */
const EASE = [0.4, 0, 0.2, 1] as const
const EASE_EXP = [0.16, 1, 0.3, 1] as const

/* ─── Data ─── */
const NAV_LINKS = ['Home', 'Services', 'Projects', 'About', 'Contact']

const CONTACT_ITEMS: { label: string; href: string; type: string; target?: string }[] = [
  { label: 'info@avinyadesignbuild.com', href: 'mailto:info@avinyadesignbuild.com', type: 'link' },
  { label: '+91 91594 55001',            href: 'tel:+919159455001',                 type: 'link' },
]
const ROUTES: Record<string, string> = {
  Home: '/',
  Services: '/services',
  Projects: '/projects',
  About: '/about',
  Contact: '/contact',
}

const ADDRESS_LINES = [
  'Avinya Design and Build Pvt Ltd',
  '54/2 15th Avenue, Indira Colony, Ashok Nagar',
  'Chennai, Tamil Nadu 600083',
  'India',
]

/* ─── Instagram icon (inline SVG — lucide-react has no Instagram) ─── */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ─── Decorative vertical stripe bars ─── */
const BARS = [
  { width: 14, bg: 'rgba(255,255,255,0.06)' },
  { width: 10, bg: 'rgba(255,255,255,0.03)' },
  { width: 18, bg: 'rgba(245,168,42,0.35)' },  /* gold 35% */
  { width: 8, bg: 'rgba(255,255,255,0.05)' },
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
      <Link
        href={ROUTES[label] ?? '/'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 17,
          color: hovered ? 'var(--gold)' : 'rgba(255,255,255,0.80)',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          display: 'block',
        }}
      >
        {label}
      </Link>
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
  label: string
  href: string
  target?: string
  delay: number
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
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 15,
          color: hovered ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
          textDecoration: hovered ? 'underline' : 'none',
          transition: 'color 0.2s ease',
          lineHeight: 1.5,
          display: 'block',
        }}
      >
        {label}
      </a>
    </motion.div>
  )
}

/* ─── Instagram icon link ─── */
function InstagramLink({ isInView, delay }: { isInView: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <a
        href="https://www.instagram.com/avinyadesignbuild/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Avinya Design and Build on Instagram"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:           40,
          height:          40,
          borderRadius:   '50%',
          border:         '1.5px solid rgba(255,255,255,0.25)',
          background:     hovered
            ? 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
            : 'transparent',
          color:          hovered ? '#FFFFFF' : 'rgba(255,255,255,0.70)',
          transition:     'background 0.3s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
          transform:      hovered ? 'scale(1.12)' : 'scale(1)',
          borderColor:    hovered ? 'transparent' : 'rgba(255,255,255,0.25)',
          textDecoration: 'none',
        }}
      >
        <InstagramIcon size={18} />
      </a>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   MAIN FOOTER COMPONENT
═══════════════════════════════════════ */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const zone1Ref = useRef<HTMLDivElement>(null)
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
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        marginTop: 20,
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
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 220,
          pointerEvents: 'none',
          zIndex: 2,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {BARS.map((bar, i) => (
          <div
            key={i}
            style={{
              width: bar.width,
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
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(22px, 2.2vw, 34px)',
              color: 'rgba(255,255,255,0.90)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
              marginBottom: 40,
              margin: '0 0 40px 0',
            }}
          >
            <TextReveal
              text="Residential, commercial, hospitality, and joint venture developments — delivered with international standards, transparent communication, and unwavering accountability."
              type="words"
              delay={0.0}
              stagger={0.03}
            />
          </p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            <Link
              href="/contact"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 15,
                padding: '16px 32px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                transform: ctaHovered ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  zIndex: 2,
                  color: ctaHovered ? '#FFFFFF' : 'var(--navy)',
                  transition: 'color 0.3s ease',
                }}
              >
                Request Consultation
              </span>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: ctaHovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--navy)',
                  transformOrigin: 'bottom',
                  zIndex: 1,
                }}
              />
            </Link>
          </motion.div>
        </div>

        {/* ── CENTRE COLUMN — Menu ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom: 28,
            }}
          >
            Menu
          </motion.div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
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
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom: 28,
            }}
          >
            Contact
          </motion.div>

          {/* Contact links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 24,
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

            {/* Instagram icon link */}
            <InstagramLink isInView={isZone1InView} delay={0.28} />
          </div>

          {/* Address stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isZone1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {ADDRESS_LINES.map((line) => (
              <span
                key={line}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.75)',
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
          width: 'calc(100% - 128px)',
          margin: '0 64px',
          height: 1,
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
          width: '100%',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <motion.span
          className="footer-wordmark"
          style={{
            x: wordmarkX,
            fontWeight: 800,
            fontSize: 'clamp(120px, 17vw, 240px)',
            color: 'var(--gold)',
            lineHeight: 0.82,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Blanka-Regular', 'Blanka', sans-serif" }}
            >
              A
            </motion.span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Blanka-Regular', 'Blanka', sans-serif" }}
            >
              V
            </motion.span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.26, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Sirin Stencil', serif" }}
            >
              I
            </motion.span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Blanka-Regular', 'Blanka', sans-serif" }}
            >
              N
            </motion.span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Blanka-Regular', 'Blanka', sans-serif" }}
            >
              Y
            </motion.span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isWordmarkInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'inline-block', fontFamily: "'Blanka-Regular', 'Blanka', sans-serif" }}
            >
              A
            </motion.span>
          </span>
        </motion.span>
      </div>

      {/* ════════════════════════════════════════════════
          COPYRIGHT — overlaid on wordmark, bottom-left
      ════════════════════════════════════════════════ */}
      <div
        className="footer-copyright"
        style={{
          position: 'absolute',
          bottom: 24,
          left: 64,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 12,
            color: 'rgba(255,255,255,0.30)',
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
          bottom: 24,
          right: 240,   /* clears the 220px bars + buffer */
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Chennai, Tamil Nadu, India
        </span>
      </div>

      {/* \u2500\u2500\u2500 Responsive CSS \u2500\u2500\u2500 */}
      <style>{`
        /* \u2500\u2500 Tablet 768\u20131023px \u2500\u2500 */
        @media (max-width: 1023px) {
          .footer-zone1 {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto !important;
            padding: 64px 48px 56px !important;
          }
          /* Left col spans full width on top row */
          .footer-zone1 > div:first-child {
            grid-column: 1 / 3 !important;
            grid-row: 1 / 2 !important;
            margin-bottom: 40px !important;
            max-width: none !important;
          }
          /* Menu + Contact side by side on second row */
          .footer-zone1 > div:nth-child(2) {
            grid-column: 1 / 2 !important;
            grid-row: 2 / 3 !important;
          }
          .footer-zone1 > div:nth-child(3) {
            grid-column: 2 / 3 !important;
            grid-row: 2 / 3 !important;
          }
          .footer-bars { width: 140px !important; }
          .footer-rule { width: calc(100% - 96px) !important; margin: 0 48px !important; }
          .footer-copyright { left: 48px !important; }
          .footer-location  { right: 160px !important; }
        }

        /* \u2500\u2500 Mobile < 768px \u2500\u2500 */
        @media (max-width: 767px) {
          .footer-zone1 {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            padding: 48px 20px 40px !important;
            gap: 40px !important;
          }
          .footer-zone1 > div:first-child {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
            margin-bottom: 0 !important;
          }
          .footer-zone1 > div:nth-child(2) {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
          }
          .footer-zone1 > div:nth-child(3) {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
          }
          /* Hide decorative bars \u2014 too cramped */
          .footer-bars { display: none !important; }
          .footer-rule {
            width: calc(100% - 40px) !important;
            margin: 0 20px !important;
          }
          /* Copyright goes static on mobile */
          .footer-copyright {
            position: static !important;
            display: block !important;
            padding: 16px 20px 20px !important;
          }
          .footer-location { display: none !important; }
        }

        /* ── Very small screens < 500px ── */
        @media (max-width: 499px) {
          .footer-wordmark {
            font-size: clamp(48px, 14vw, 72px) !important;
          }
        }
      `}</style>
    </footer>
  )
}
