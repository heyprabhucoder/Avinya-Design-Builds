'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Briefcase, Clock, Building2, ChevronDown, ChevronUp } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as const

/* ─────────────────────────────────────────────
   LEADER DATA
───────────────────────────────────────────── */
const LEADERS = [
  {
    id: 'sanjai',
    eyebrow: 'FOUNDER',
    name: 'Sanjai Gopalan',
    role: 'Founder',
    imageSrc: '/images/leader-sanjai.jpg',
    imageAlt: 'Sanjai Gopalan, Founder of Avinya Design and Build',
    pillIcon: 'clock' as const,
    pillText: '12+ Years Experience',
    imageLeft: true,
    paragraphs: [
      'Sanjai Gopalan is the Founder of Avinya Design and Build and brings over 12 years of experience in construction management, real estate development, project execution, and business operations across North America.',
      'Throughout his career, Sanjai has been involved in the planning, development, construction, and management of commercial, hospitality, retail, restaurant, and multifamily residential projects. His expertise spans the entire project lifecycle, including feasibility analysis, budgeting, construction management, procurement, project execution, and operational strategy.',
      'Having established successful operations in North America, Sanjai founded Avinya with a vision to bring world-class construction management practices, transparency, and client-focused solutions to the Indian market. His experience in both construction and business operations enables Avinya to provide clients with a comprehensive approach that goes beyond building structures to creating long-term value and successful investments.',
      'Today, Sanjai continues to guide the strategic growth and vision of Avinya Design and Build, ensuring that every project is delivered with professionalism, quality, and a commitment to excellence.',
    ],
    tags: [
      'Construction Management',
      'Real Estate Development',
      'North America Experience',
      'Project Lifecycle',
      'Business Operations',
    ],
  },
  {
    id: 'anjana',
    eyebrow: 'MANAGING DIRECTOR – INDIA OPERATIONS',
    name: 'Anjana Sanjai',
    role: 'Managing Director – India Operations',
    imageSrc: '/images/leader-anjana.jpg',
    imageAlt: 'Anjana Sanjai, Managing Director of Avinya Design and Build India Operations',
    pillIcon: 'building' as const,
    pillText: '6+ Years Corporate Experience',
    imageLeft: false,
    paragraphs: [
      'Anjana Sanjai serves as the Managing Director of Avinya Design and Build and leads the company\'s operations and growth across India. With over six years of experience at globally recognized organizations including EY and PayPal, she brings a strong background in business operations, process management, and organizational leadership.',
      'Her corporate experience has equipped her with the skills to implement efficient systems, drive operational excellence, and build scalable business processes. Over the years, Anjana has worked closely alongside Sanjai in supporting construction and real estate ventures in North America, gaining a deep understanding of project management, client expectations, and quality control.',
      'Born and raised in Chennai, Anjana has a strong connection to the city and a passion for contributing to its growth and development. She is committed to bringing North American standards of project management, customer service, and quality assurance to the Indian construction industry.',
      'Under her leadership, Avinya Design and Build aims to establish itself as a trusted partner for homeowners, investors, developers, and business owners across India. Her vision extends beyond Chennai — she plans to expand Avinya\'s presence across major metropolitan markets throughout India, combining international expertise with local knowledge and execution.',
    ],
    tags: [
      'EY · PayPal Experience',
      'Business Operations',
      'Process Management',
      'India Market Strategy',
      'Client Service Excellence',
    ],
  },
]

const STAT_PILLS = [
  { num: '12+', label: 'Years of construction management experience' },
  { num: '6+',  label: 'Years with global corporations (EY, PayPal)' },
  { num: '2',   label: 'Leaders. One shared vision for India.' },
]

/* ─────────────────────────────────────────────
   PROFILE CARD
───────────────────────────────────────────── */
function LeaderProfile({
  leader,
  isExpanded,
  onToggle,
}: {
  leader: typeof LEADERS[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  const rowRef   = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px 0px' })

  const imageDelay = leader.imageLeft ? 0 : 0.2
  const textDelay  = leader.imageLeft ? 0.2 : 0

  const imageXStart = leader.imageLeft ? -40 : 40
  const textXStart  = leader.imageLeft ? 32 : -32

  const badgeRotate = leader.imageLeft ? -8 : 8

  /* Image column */
  const imageCol = (
    <motion.div
      initial={{ opacity: 0, x: imageXStart }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: imageDelay, ease: EASE }}
      className="ls-img-col"
      style={{ position: 'relative', paddingBottom: 40 }}
    >
      {/* Photo */}
      <div className="ls-photo-wrap">
        <Image
          src={leader.imageSrc}
          alt={leader.imageAlt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 38vw"
        />
      </div>

      {/* Name badge — floats below photo */}
      <motion.div
        initial={{ scale: 0, rotate: badgeRotate }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        className="ls-badge"
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          background: '#FFFFFF',
          borderRadius: 14,
          padding: '18px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        <div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--navy)',
            marginBottom: 4,
          }}>
            {leader.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 13,
            color: 'var(--mist)',
          }}>
            {leader.role}
          </div>
        </div>
        <div style={{
          width: 36,
          height: 36,
          background: 'var(--gold)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Briefcase size={16} color="var(--navy)" />
        </div>
      </motion.div>
    </motion.div>
  )

  /* Text column */
  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: textXStart }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: textDelay, ease: EASE }}
      style={{ paddingTop: 8 }}
    >
      {/* Eyebrow */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 11,
        color: 'var(--gold)',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        marginBottom: 12,
      }}>
        {leader.eyebrow}
      </div>

      {/* Name heading */}
      <h3 style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'clamp(36px, 3.5vw, 52px)',
        color: 'var(--navy)',
        lineHeight: 1.0,
        letterSpacing: '-0.01em',
        marginBottom: 8,
      }}>
        {leader.name}
      </h3>

      {/* Experience pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--gold-wash)',
        border: '1px solid rgba(245,168,42,0.25)',
        borderRadius: 999,
        padding: '6px 14px',
        marginBottom: 28,
      }}>
        {leader.pillIcon === 'clock'
          ? <Clock size={13} color="var(--gold)" />
          : <Building2 size={13} color="var(--gold)" />
        }
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 12,
          color: 'var(--navy)',
        }}>
          {leader.pillText}
        </span>
      </div>

      {/* Gold rule */}
      <div style={{
        width: 40,
        height: 2,
        background: 'var(--gold)',
        borderRadius: 999,
        marginBottom: 24,
      }} />

      {/* Bio paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* First paragraph — always visible */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 15,
          color: '#444444',
          lineHeight: 1.80,
          margin: 0,
        }}>
          {leader.paragraphs[0]}
        </p>

        {/* Paragraphs 2–4 — animated reveal */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {leader.paragraphs.slice(1).map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 15,
                    color: '#444444',
                    lineHeight: 1.80,
                    margin: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Read More / Read Less toggle */}
      <button
        onClick={onToggle}
        style={{
          marginTop: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--gold)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Read Less ↑' : 'Read More ↓'}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isExpanded
            ? <ChevronUp size={14} color="var(--gold)" />
            : <ChevronDown size={14} color="var(--gold)" />
          }
        </motion.span>
      </button>

      {/* Expertise tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
        {leader.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.05, ease: EASE }}
            style={{
              background: 'var(--off-white)',
              border: '1px solid var(--border-light)',
              borderRadius: 999,
              padding: '6px 14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 12,
              color: 'var(--navy)',
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div ref={rowRef} className={`ls-profile-row ${leader.imageLeft ? 'ls-img-left' : 'ls-img-right'}`}>
      {leader.imageLeft ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   VISION CLOSER
───────────────────────────────────────────── */
function VisionCloser() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div
      className="ls-closer-outer"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginTop: 100,
        background: 'linear-gradient(135deg, #1B2F4E 0%, #0D1E33 100%)',
      }}
    >
      <div
        ref={ref}
        className="ls-closer-inner"
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '58fr 38fr',
          columnGap: 80,
          alignItems: 'center',
          padding: '80px 64px',
        }}
      >
        {/* ── Left: Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 120,
            color: 'var(--gold)',
            lineHeight: 0.6,
            marginBottom: 8,
            opacity: 0.8,
          }}>
            &ldquo;
          </span>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(22px, 2.5vw, 34px)',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            marginBottom: 28,
            fontStyle: 'italic',
          }}>
            Our goal is not only to build quality projects but to redefine the client experience by bringing proven North American construction management practices to India.
          </p>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{
              width: 32,
              height: 2,
              background: 'var(--gold)',
              flexShrink: 0,
            }} />
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
              }}>
                Sanjai Gopalan &amp; Anjana Sanjai
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                marginTop: 2,
              }}>
                Co-founders, Avinya Design and Build
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Vision block ── */}
        <div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 11,
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: 16,
          }}>
            OUR LEADERSHIP VISION
          </div>

          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'clamp(28px, 2.8vw, 40px)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Building India&apos;s most trusted construction partner.
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75,
            marginBottom: 32,
          }}>
            Together, Sanjai and Anjana combine expertise in construction management, real estate development, business operations, and strategic growth. Their shared vision is to deliver international standards of quality, transparency, and client satisfaction across India.
          </p>

          {/* Stat pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STAT_PILLS.map((pill, i) => (
              <motion.div
                key={pill.num}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 12,
                  padding: '14px 20px',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 28,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  minWidth: 56,
                }}>
                  {pill.num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 1.4,
                }}>
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: 80 }}>
      {/* Gold rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0, ease: EASE }}
        style={{
          width: 48,
          height: 3,
          background: 'var(--gold)',
          borderRadius: 999,
          margin: '0 auto 20px auto',
          transformOrigin: 'left',
        }}
      />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 11,
          color: 'var(--mist)',
          textTransform: 'uppercase',
          letterSpacing: '0.20em',
          marginBottom: 16,
        }}
      >
        THE PEOPLE BEHIND AVINYA
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 'clamp(44px, 4.5vw, 64px)',
          color: 'var(--navy)',
          lineHeight: 1.0,
          letterSpacing: '-0.01em',
          marginBottom: 20,
        }}
      >
        Our Leadership<br />Team.
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 17,
          color: '#555555',
          lineHeight: 1.75,
          textAlign: 'center',
          maxWidth: 520,
          margin: '0 auto',
        }}
      >
        Two leaders. One shared vision. Built on international experience and a deep commitment to Chennai.
      </motion.p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function LeadershipSection() {
  const [sanjaiExpanded, setSanjaiExpanded] = useState(false)
  const [anjanaExpanded, setAnjanaExpanded] = useState(false)

  const expanded = [sanjaiExpanded, anjanaExpanded]
  const toggles  = [
    () => setSanjaiExpanded(v => !v),
    () => setAnjanaExpanded(v => !v),
  ]

  return (
    <section style={{
      background: '#FFFFFF',
      width: '100%',
      padding: '120px 0 0 0',
    }}>
      {/* Content wrapper */}
      <div className="ls-wrapper">

        {/* Sub-section 1 — header */}
        <SectionHeader />

        {/* Sub-section 2 — profiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
          {LEADERS.map((leader, i) => (
            <LeaderProfile
              key={leader.id}
              leader={leader}
              isExpanded={expanded[i]}
              onToggle={toggles[i]}
            />
          ))}
        </div>

      </div>

      {/* Sub-section 3 — vision closer (full-width, outside wrapper) */}
      <VisionCloser />

      <style>{`
        /* ── Layout wrapper ── */
        .ls-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 64px;
        }

        /* ── Profile row ── */
        .ls-profile-row {
          display: grid;
          column-gap: 80px;
          align-items: start;
        }
        .ls-img-left {
          grid-template-columns: 38fr 58fr;
        }
        .ls-img-right {
          grid-template-columns: 58fr 38fr;
        }

        /* ── Photo ── */
        .ls-photo-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: var(--off-white);
          transition: transform 0.6s ease;
        }
        .ls-photo-wrap:hover {
          transform: scale(1.03);
        }

        /* ── Badge bottom offset ── */
        .ls-badge {
          bottom: -28px;
        }

        /* ── Vision closer ── */
        .ls-closer-outer {
          overflow: hidden;
        }

        /* ══════════════════════════════════
           TABLET (768–1023px)
        ══════════════════════════════════ */
        @media (max-width: 1023px) and (min-width: 768px) {
          .ls-wrapper {
            padding: 0 40px;
          }
          .ls-profile-row {
            grid-template-columns: 1fr !important;
            row-gap: 48px;
            column-gap: 0;
          }
          .ls-img-right .ls-img-col {
            order: -1;
          }
          .ls-photo-wrap {
            aspect-ratio: 4 / 3 !important;
          }
          .ls-badge {
            bottom: -20px !important;
            left: 16px !important;
            right: 16px !important;
          }
          .ls-closer-inner {
            grid-template-columns: 1fr !important;
            row-gap: 48px;
          }
        }

        /* ══════════════════════════════════
           MOBILE (< 768px)
        ══════════════════════════════════ */
        @media (max-width: 767px) {
          section {
            padding: 80px 0 0 0 !important;
          }
          .ls-wrapper {
            padding: 0 24px;
          }
          .ls-profile-row {
            grid-template-columns: 1fr !important;
            row-gap: 48px;
            column-gap: 0;
          }
          .ls-img-right .ls-img-col {
            order: -1;
          }
          .ls-profile-row + .ls-profile-row {
            margin-top: 72px;
          }
          .ls-photo-wrap {
            aspect-ratio: 1 / 1 !important;
          }
          .ls-badge {
            bottom: -20px !important;
            left: 12px !important;
            right: 12px !important;
          }
          .ls-closer-outer {
            margin-top: 72px !important;
          }
          .ls-closer-inner {
            grid-template-columns: 1fr !important;
            row-gap: 48px;
            padding: 56px 24px !important;
          }
          .ls-closer-inner span[style*="font-size: 120px"] {
            font-size: 80px !important;
          }
        }
      `}</style>
    </section>
  )
}