'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────────────── */

type TabKey = 'mission' | 'vision' | 'values'

interface TabData {
  label:      string
  body:       string
  checklist:  [string, string]
}

/* ─── Content ───────────────────────────────────────────────────── */

const TABS: Record<TabKey, TabData> = {
  mission: {
    label: 'Mission',
    body:  'To deliver projects that exceed expectations through disciplined project management, superior quality, transparent communication, and unwavering commitment to every client\'s success.',
    checklist: [
      'International project management standards',
      'Transparent pricing and milestone reporting',
    ],
  },
  vision: {
    label: 'Vision',
    body:  'To become one of India\'s most trusted design-build and construction management companies — known for disciplined execution, premium quality, and partnerships built on integrity.',
    checklist: [
      'Trusted by developers and landowners across Chennai',
      'Recognised for on-time, on-budget delivery',
    ],
  },
  values: {
    label: 'Core Values',
    body:  'Accountability, transparency, and quality are not aspirations — they are the standards we hold ourselves to on every project, from the first consultation to the final handover.',
    checklist: [
      'Single point of responsibility on every project',
      'No shortcuts — international standards, every time',
    ],
  },
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]

/* ─── Gold checkmark icon ───────────────────────────────────────── */

function GoldCheck() {
  return (
    <span
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          20,
        height:         20,
        borderRadius:   '50%',
        background:     'var(--gold, #F5A82A)',
        flexShrink:     0,
        marginTop:      2,
      }}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 3.5L3.8 6.5L9 1"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/* ─── Counter hook ──────────────────────────────────────────────── */

function useCounter(target: number, duration: number, startDelay: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const timeout = setTimeout(() => {
      const start      = performance.now()
      const tick = (now: number) => {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        // ease-out quad
        const eased    = 1 - (1 - progress) * (1 - progress)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
        else setCount(target)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [active, target, duration, startDelay])

  return count
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */

export default function AboutMainSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const [activeTab, setActiveTab] = useState<TabKey>('mission')

  /* stat counter — 0 → 15 over 1.2s, starts 700ms after section enters */
  const count = useCounter(15, 1200, 700, isInView)

  /* transition factory */
  const t = (delay: number, duration = 0.5) => ({
    duration,
    delay,
    ease: EASE,
  })

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        padding:    'clamp(72px, 8vw, 100px) 0 clamp(80px, 9vw, 120px)',
      }}
    >
      {/* ── Content wrapper ── */}
      <div
        style={{
          margin:              '0 auto',
          padding:             '20px',
          display:             'grid',
          gridTemplateColumns: 'clamp(0px, 42%, 560px) 1fr',
          columnGap:           'clamp(32px, 5vw, 72px)',
          alignItems:           'stretch',
        }}
        className="about-main-grid"
      >

        {/* ════════════════════════════════════════
            LEFT COLUMN — photo + badge
        ════════════════════════════════════════ */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Photo container */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={t(0, 0.8)}
            style={{
              position:     'relative',
              width:        '100%',
              flexGrow:     1,
              minHeight:    'clamp(360px, 60vh, 640px)',
              borderRadius: 20,
              overflow:     'hidden',
            }}
          >
            <Image
              src="/images/aboutus-section.jpeg"
              alt="Avinya construction team reviewing project plans in Chennai"
              fill
              priority
              quality={90}
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* inner shadow frame */}
            <div
              style={{
                position:     'absolute',
                inset:        0,
                borderRadius: 20,
                boxShadow:    'inset 0 0 0 1px rgba(0,0,0,0.08)',
                pointerEvents:'none',
                zIndex:       2,
              }}
            />
          </motion.div>

          {/* Logo badge — overlaps bottom-right of photo */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.50,
              delay:    0.60,
              ease:     [0.34, 1.56, 0.64, 1],
            }}
            style={{
              position:       'absolute',
              bottom:         -20,
              right:          -20,
              zIndex:         10,
              width:          112,
              height:         112,
              background:     'var(--gold, #F5A82A)',
              borderRadius:   16,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              boxShadow:      '0 8px 32px rgba(0,0,0,0.18)',
              pointerEvents:  'none',
            }}
          >
            {/* Avinya "A" badge mark */}
            <span
              style={{
                fontFamily:  'Blanka-Regular, Blanka',
                fontWeight:  700,
                fontSize:    120,
                color:       '#FFFFFF',
                lineHeight:  1,
                letterSpacing: '-0.04em',
                userSelect:  'none',
                marginTop:   -30,
              }}
            >
              A
            </span>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════
            RIGHT COLUMN
        ════════════════════════════════════════ */}
        <div>

          {/* ── Zone A: Eyebrow + Headline + Body ── */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={t(0.15)}
            style={{
              fontFamily:    'var(--font-body, Inter, sans-serif)',
              fontWeight:    500,
              fontSize:      12,
              color:         'var(--mist, #8A8A8A)',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              margin:        '0 0 18px',
            }}
          >
            About Avinya Design &amp; Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={t(0.25, 0.6)}
            style={{
              fontFamily:    'var(--font-body, Inter, sans-serif)',
              fontWeight:    800,
              fontSize:      'clamp(28px, 3.5vw, 52px)',
              color:         'var(--navy, #1B2F4E)',
              lineHeight:    1.08,
              letterSpacing: '-0.025em',
              margin:        '0 0 24px',
            }}
          >
            International Construction<br />
            Standards. Delivered Locally.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={t(0.35)}
            style={{
              fontFamily: 'var(--font-body, Inter, sans-serif)',
              fontWeight: 400,
              fontSize:   16,
              color:      '#555555',
              lineHeight: 1.75,
              maxWidth:   580,
              margin:     '0 0 36px',
            }}
          >
            At Avinya Design and Build, we combine international project
            management experience from North America with deep local execution
            in Chennai. We deliver the transparency, precision, and
            accountability that every property owner deserves.
          </motion.p>

          {/* ── Zone B: Tab switcher ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={t(0.45, 0.4)}
          >
            <div
              style={{
                display:      'flex',
                alignItems:   'flex-end',
                borderBottom: '1px solid #E8E4DC',
                marginBottom: 28,
              }}
            >
              {(Object.entries(TABS) as [TabKey, TabData][]).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    position:    'relative',
                    padding:     '0 0 14px',
                    marginRight: 40,
                    background:  'transparent',
                    border:      'none',
                    cursor:      'pointer',
                    fontFamily:  'var(--font-body, Inter, sans-serif)',
                    fontWeight:  600,
                    fontSize:    'clamp(14px, 1.2vw, 16px)',
                    color:       activeTab === key ? 'var(--gold, #F5A82A)' : 'var(--mist, #8A8A8A)',
                    transition:  'color 0.2s ease',
                    whiteSpace:  'nowrap',
                  }}
                >
                  {tab.label}

                  {/* Sliding gold underline */}
                  {activeTab === key && (
                    <motion.div
                      layoutId="tab-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      style={{
                        position:     'absolute',
                        bottom:       -1,
                        left:         0,
                        right:        0,
                        height:       2.5,
                        background:   'var(--gold, #F5A82A)',
                        borderRadius: 999,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Zone C: 2-col sub-grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={t(0.55, 0.4)}
            style={{
              display:             'grid',
              gridTemplateColumns: '55fr 42fr',
              columnGap:           40,
              alignItems:          'start',
            }}
            className="about-subgrid"
          >

            {/* ── Left: tab content panel ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {/* Body text */}
                <p
                  style={{
                    fontFamily: 'var(--font-body, Inter, sans-serif)',
                    fontWeight: 400,
                    fontSize:   15,
                    color:      '#444444',
                    lineHeight: 1.75,
                    maxWidth:   340,
                    margin:     '0 0 24px',
                  }}
                >
                  {TABS[activeTab].body}
                </p>

                {/* Checklist */}
                <div
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           12,
                    marginBottom:  36,
                  }}
                >
                  {TABS[activeTab].checklist.map((item, i) => (
                    <div
                      key={i}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                    >
                      <GoldCheck />
                      <span
                        style={{
                          fontFamily: 'var(--font-body, Inter, sans-serif)',
                          fontWeight: 500,
                          fontSize:   14,
                          color:      'var(--navy, #1B2F4E)',
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <CTALink />
              </motion.div>
            </AnimatePresence>

            {/* ── Right: image + stat ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={t(0.5, 0.6)}
            >
              {/* Small image */}
              <div
                style={{
                  width:        '100%',
                  aspectRatio:  '4 / 3',
                  borderRadius: 16,
                  overflow:     'hidden',
                  marginBottom: 20,
                  cursor:       'default',
                }}
                className="about-thumb"
              >
                <Image
                  src="/images/services2.jpeg"
                  alt="Avinya project team reviewing construction plans"
                  width={400}
                  height={300}
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'cover',
                    transition: 'transform 0.5s ease',
                    display:    'block',
                  }}
                  className="about-thumb-img"
                />
              </div>

              {/* Caption */}
              <p
                style={{
                  fontFamily: 'var(--font-body, Inter, sans-serif)',
                  fontWeight: 400,
                  fontSize:   14,
                  color:      '#666666',
                  lineHeight: 1.6,
                  marginBottom: 20,
                  margin:     '0 0 20px',
                }}
              >
                Our team brings direct experience from construction projects
                across the United States and Canada.
              </p>

              {/* Stat block */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span
                  style={{
                    fontFamily:    'var(--font-body, Inter, sans-serif)',
                    fontWeight:    800,
                    fontSize:      'clamp(48px, 5vw, 64px)',
                    color:         'var(--navy, #1B2F4E)',
                    lineHeight:    1.0,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {count}+
                </span>
                <div
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body, Inter, sans-serif)',
                      fontWeight: 600,
                      fontSize:   15,
                      color:      '#444444',
                      lineHeight: 1.3,
                    }}
                  >
                    Years of
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body, Inter, sans-serif)',
                      fontWeight: 600,
                      fontSize:   15,
                      color:      '#444444',
                      lineHeight: 1.3,
                    }}
                  >
                    Experience
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1023px) {
          .about-main-grid {
            grid-template-columns: 45fr 55fr !important;
            column-gap: 40px !important;
          }
          .about-subgrid {
            grid-template-columns: 1fr !important;
            row-gap: 32px;
          }
        }
        @media (max-width: 767px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            row-gap: 56px;
          }
          .about-subgrid {
            grid-template-columns: 1fr !important;
            row-gap: 32px;
          }
        }
        .about-thumb:hover .about-thumb-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  )
}

/* ─── CTA link (extracted to avoid re-creating on tab change) ─── */
function CTALink() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            10,
        background:     hovered ? '#E09420' : 'var(--gold, #F5A82A)',
        color:          'var(--navy, #1B2F4E)',
        fontFamily:     'var(--font-body, Inter, sans-serif)',
        fontWeight:     700,
        fontSize:       15,
        padding:        '15px 28px',
        borderRadius:   8,
        border:         'none',
        cursor:         'pointer',
        textDecoration: 'none',
        transform:      hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition:     'background 0.2s ease, transform 0.2s ease',
      }}
    >
      Contact Us Now
      <ArrowUpRight size={16} color="var(--navy, #1B2F4E)" />
    </Link>
  )
}
