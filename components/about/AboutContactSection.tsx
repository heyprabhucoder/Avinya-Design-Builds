'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Linkedin } from 'lucide-react'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

const EASE = [0.4, 0, 0.2, 1] as const

/* ─────────────────────────────────────────────
   PULSING DOT
───────────────────────────────────────────── */
function PulseDot() {
  return (
    <>
      <span className="asc-pulse-dot" />
      <style>{`
        .asc-pulse-dot {
          display:        inline-block;
          width:          7px;
          height:         7px;
          border-radius:  50%;
          background:     #22C55E;
          flex-shrink:    0;
          position:       relative;
        }
        .asc-pulse-dot::before {
          content:        '';
          position:       absolute;
          inset:          0;
          border-radius:  50%;
          background:     #22C55E;
          animation:      asc-pulse 2s ease-out infinite;
        }
        @keyframes asc-pulse {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </>
  )
}

/* ─────────────────────────────────────────────
   CONTACT ROW
───────────────────────────────────────────── */
const CONTACT_ROWS = [
  {
    icon: Phone,
    label: 'PHONE',
    content: (
      <a
        href="tel:+919159455001"
        style={{ color: 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s ease' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--navy)')}
      >
        +91 91594 55001
      </a>
    ),
  },
  {
    icon: Mail,
    label: 'EMAIL',
    content: (
      <a
        href="mailto:info@avinyaindia.com"
        style={{ color: 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s ease' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--navy)')}
      >
        info@avinyaindia.com
      </a>
    ),
  },
  {
    icon: MapPin,
    label: 'LOCATION',
    content: (
      <span style={{ lineHeight: 1.5 }}>
        Chennai, Tamil Nadu<br />India
      </span>
    ),
  },
  {
    icon: Clock,
    label: 'RESPONSE TIME',
    content: <span>Within 1 business day</span>,
  },
]

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function AboutContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--off-white, #F6F4F0)',
        width:      '100%',
        padding:    '100px 0 110px 0',
      }}
    >
      {/* ── Fading gold gradient rule ── */}
      <div className="asc-outer">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0, ease: EASE }}
          style={{
            width:           '100%',
            height:          2,
            background:      'linear-gradient(to right, transparent 0%, var(--gold, #F5A82A) 20%, var(--gold, #F5A82A) 80%, transparent 100%)',
            marginBottom:    80,
            transformOrigin: 'center',
          }}
        />

        {/* ── Content grid ── */}
        <div className="asc-grid">

          {/* ════════════════════════════════
              LEFT COLUMN — Narrative + CTA
          ════════════════════════════════ */}
          <div>

            {/* Eyebrow with gold vertical bar */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 18 }}>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                style={{
                  width:           3,
                  height:          40,
                  background:      'var(--gold)',
                  borderRadius:    2,
                  flexShrink:      0,
                  transformOrigin: 'top',
                  marginTop:       2,
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    500,
                  fontSize:      11,
                  color:         'var(--mist, #8A8A8A)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.20em',
                }}
              >
                START A CONVERSATION
              </motion.div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 24, overflow: 'hidden' }}>
              {['Ready to bring your', 'project to life?'].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontWeight:    800,
                    fontSize:      'clamp(38px, 4vw, 58px)',
                    color:         'var(--navy, #1B2F4E)',
                    lineHeight:    1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   16,
                color:      '#555555',
                lineHeight: 1.75,
                maxWidth:   440,
                marginBottom: 36,
              }}
            >
              Whether you&apos;re a landowner, developer, investor, or business owner — we&apos;d love to understand your project and show you how Avinya can help. Sanjai and Anjana personally review every new enquiry.
            </motion.p>

            {/* Avatar row */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}
            >
              {/* Overlapping avatars */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: '3px solid var(--off-white, #F6F4F0)',
                  overflow: 'hidden', position: 'relative', flexShrink: 0,
                }}>
                  <Image
                    src="/images/leader-sanjai.jpg"
                    alt="Sanjai Gopalan"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="48px"
                  />
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: '3px solid var(--off-white, #F6F4F0)',
                  overflow: 'hidden', position: 'relative', flexShrink: 0,
                  marginLeft: -14,
                }}>
                  <Image
                    src="/images/leader-anjana.jpg"
                    alt="Anjana Sanjai"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="48px"
                  />
                </div>
              </div>

              {/* Text beside avatars */}
              <div style={{ marginLeft: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PulseDot />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize:   14,
                    color:      'var(--navy)',
                  }}>
                    Sanjai &amp; Anjana
                  </span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize:   13,
                  color:      'var(--mist)',
                  marginTop:  2,
                }}>
                  Respond within 1 business day
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              {/* Primary — Schedule a Consultation */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.65, ease: EASE }}
              >
                <Link
                  href="/contact"
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            12,
                    background:     'var(--navy, #1B2F4E)',
                    color:          '#FFFFFF',
                    fontFamily:     'var(--font-body)',
                    fontWeight:     600,
                    fontSize:       15,
                    padding:        '16px 28px',
                    borderRadius:   8,
                    textDecoration: 'none',
                    transition:     'background 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#0D1E33'
                    el.style.transform  = 'scale(1.02)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--navy, #1B2F4E)'
                    el.style.transform  = 'scale(1)'
                  }}
                >
                  Schedule a Consultation
                  <ArrowUpRight size={16} color="#FFFFFF" />
                </Link>
              </motion.div>

              {/* Secondary — WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.72, ease: EASE }}
              >
                <a
                  href="https://wa.me/919159455001?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Avinya."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            8,
                    background:     'transparent',
                    color:          'var(--navy)',
                    fontFamily:     'var(--font-body)',
                    fontWeight:     500,
                    fontSize:       15,
                    padding:        '16px 0',
                    border:         'none',
                    cursor:         'pointer',
                    textDecoration: 'none',
                    transition:     'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--navy)')}
                >
                  <WhatsAppIcon size={20} />
                  or chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT COLUMN — Contact card
          ════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{
              background:   '#FFFFFF',
              borderRadius: 24,
              padding:      '44px 40px',
              boxShadow:    '0 4px 24px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)',
              border:       '1px solid rgba(0,0,0,0.04)',
            }}
          >
            {/* Card header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   32,
              flexWrap:       'wrap',
              gap:            12,
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize:   18,
                color:      'var(--navy)',
              }}>
                Contact Information
              </span>
              {/* Accepting Projects badge */}
              <div style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          6,
                background:   'rgba(34,197,94,0.10)',
                border:       '1px solid rgba(34,197,94,0.25)',
                borderRadius: 999,
                padding:      '5px 12px',
              }}>
                <PulseDot />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize:   11,
                  color:      '#16A34A',
                }}>
                  Accepting Projects
                </span>
              </div>
            </div>

            {/* Contact rows */}
            <div style={{ borderTop: '1px solid var(--border-light, #E4E0D8)' }}>
              {CONTACT_ROWS.map((row, i) => {
                const Icon = row.icon
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07, ease: EASE }}
                    style={{
                      padding:             '18px 0',
                      display:             'grid',
                      gridTemplateColumns: '36px 1fr',
                      columnGap:           16,
                      alignItems:          'flex-start',
                      borderBottom:        '1px solid var(--border-light, #E4E0D8)',
                    }}
                  >
                    {/* Icon cell */}
                    <div style={{
                      width:           36,
                      height:          36,
                      background:      'var(--gold-wash, #FBF0D9)',
                      borderRadius:    8,
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      flexShrink:      0,
                    }}>
                      <Icon size={16} color="var(--gold)" />
                    </div>

                    {/* Content cell */}
                    <div>
                      <div style={{
                        fontFamily:    'var(--font-body)',
                        fontWeight:    500,
                        fontSize:      11,
                        color:         'var(--mist)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        marginBottom:  4,
                      }}>
                        {row.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize:   14,
                        color:      'var(--navy)',
                        lineHeight: 1.4,
                      }}>
                        {row.content}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.75, ease: EASE }}
              style={{
                marginTop:  24,
                display:    'flex',
                alignItems: 'center',
                gap:        12,
                flexWrap:   'wrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   13,
                color:      'var(--mist)',
                marginRight: 4,
              }}>
                Connect with us:
              </span>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/avinya-design-build"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  background:     'var(--navy)',
                  color:          '#FFFFFF',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  fontSize:       13,
                  padding:        '9px 16px',
                  borderRadius:   8,
                  textDecoration: 'none',
                  transition:     'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#0D1E33'
                  el.style.transform  = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--navy)'
                  el.style.transform  = 'scale(1)'
                }}
              >
                <Linkedin size={14} color="#FFFFFF" />
                LinkedIn
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919159455001"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  background:     '#25D366',
                  color:          '#FFFFFF',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  fontSize:       13,
                  padding:        '9px 16px',
                  borderRadius:   8,
                  textDecoration: 'none',
                  transition:     'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#1DA851'
                  el.style.transform  = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#25D366'
                  el.style.transform  = 'scale(1)'
                }}
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scoped responsive styles ── */}
      <style>{`
        .asc-outer {
          max-width: 1320px;
          margin:    0 auto;
          padding:   0 64px;
        }
        .asc-grid {
          display:               grid;
          grid-template-columns: 48fr 52fr;
          column-gap:            80px;
          align-items:           center;
        }

        @media (max-width: 1023px) and (min-width: 768px) {
          .asc-outer { padding: 0 40px; }
          .asc-grid  { column-gap: 48px; }
        }

        @media (max-width: 767px) {
          section[data-asc] { padding: 72px 0 80px 0 !important; }
          .asc-outer { padding: 0 24px; }
          .asc-grid  {
            grid-template-columns: 1fr;
            column-gap:            0;
            row-gap:               52px;
          }
        }
      `}</style>
    </section>
  )
}
