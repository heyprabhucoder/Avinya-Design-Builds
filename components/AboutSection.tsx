'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HardHat, Building2, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import TextReveal from './TextReveal'

/* ─── Constants ─── */
const EASE = [0.4, 0, 0.2, 1] as const

/* ─── Counter Hook ─── */
function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    let rafId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return value
}

/* ─── Gold Diamond Icon ─── */
function GoldDiamond() {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        background: 'var(--gold)',
        transform: 'rotate(45deg)',
        flexShrink: 0,
      }}
    />
  )
}

/* ─── Split CTA Button ─── */
function SplitCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        border: '1.5px solid var(--navy)',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        width: 'auto',
      }}
    >
      {/* Left — text */}
      <div
        style={{
          padding: '14px 24px',
          background: hovered ? 'var(--navy)' : '#FFFFFF',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 14,
          color: hovered ? '#FFFFFF' : 'var(--navy)',
          borderRight: '1.5px solid var(--navy)',
          transition: 'background 0.25s ease, color 0.25s ease',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Learn More
      </div>

      {/* Right — arrow box */}
      <div
        style={{
          padding: '14px 16px',
          background: hovered ? 'var(--navy)' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s ease',
        }}
      >
        <ArrowUpRight
          size={16}
          color={hovered ? '#FFFFFF' : 'var(--navy)'}
          style={{ transition: 'color 0.25s ease' }}
        />
      </div>
    </div>
  )
}

/* ─── Decorative Corner "A" Lettermark (Cell B top-right) ─── */
function CornerPattern() {
  return (
    <div
      style={{
        position: 'absolute',
        top: -50,
        right: -20,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Blanka-Regular', 'Blanka', sans-serif",
          fontWeight: 400,
          fontSize: 250,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '-0.04em',
          display: 'block',
        }}
      >
        A
      </span>
    </div>
  )
}

/* ─── Main Component ─── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  const count50 = useCounter(50, 1200, isInView)
  const count15 = useCounter(15, 1000, isInView)

  /* ─── Shared motion variant factory ─── */
  const fadeUp = (delay: number, y = 24, duration = 0.5) => ({
    initial: { opacity: 0, y },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration, delay, ease: EASE },
  })

  const scaleIn = (delay: number) => ({
    initial: { opacity: 0, scaleX: 0 },
    animate: isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 },
    transition: { duration: 0.4, delay, ease: EASE },
  })

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        padding: '80px 0',
      }}
    >
      {/* ── Inner container ── */}
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 64px',
          display: 'flex',
          flexDirection: 'row',
          gap: '4%',
          alignItems: 'flex-start',
        }}
        className="about-inner"
      >
        {/* ══════════════════════════════════════════
            LEFT COLUMN
        ══════════════════════════════════════════ */}
        <div style={{ width: '44%', flexShrink: 0 }} className="about-left">

          {/* 1. Eyebrow tag */}
          <motion.div {...fadeUp(0, 24, 0.5)} style={{ marginBottom: 24 }}>
            <span
              style={{
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                padding: '6px 14px',
                borderRadius: 999,
                display: 'inline-block',
              }}
            >
              <TextReveal text="WHO WE ARE" type="words" delay={0.0} />
            </span>
          </motion.div>

          {/* 2. Headline */}
          <motion.div {...fadeUp(0.1, 32, 0.6)} style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 3.8vw, 56px)',
                lineHeight: 1.05,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              <TextReveal text="Building with" type="chars" delay={0.1} stagger={0.02} />
              <br />
              <TextReveal text="International Standards." type="chars" delay={0.25} stagger={0.02} />
            </h2>
          </motion.div>

          {/* 3. Body text */}
          <motion.div {...fadeUp(0.2, 24, 0.5)} style={{ marginBottom: 40, maxWidth: 480 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 16,
                color: 'var(--ink)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              <TextReveal
                text="We combine international project management experience from North America with deep local execution — bringing the transparency, precision, and accountability that every property owner deserves."
                type="words"
                delay={0.3}
                stagger={0.03}
              />
            </p>
          </motion.div>

          {/* 4. Horizontal rule */}
          <motion.div
            {...scaleIn(0.3)}
            style={{
              transformOrigin: 'left',
              marginBottom: 36,
            }}
          >
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid #E4E0D8',
                margin: 0,
                width: '100%',
              }}
            />
          </motion.div>

          {/* 5. Approach / Company two-column */}
          <motion.div
            {...fadeUp(0.4, 20, 0.5)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 48,
            }}
          >
            {/* Approach */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: 'var(--navy)',
                  }}
                >
                  Approach
                </span>
                <GoldDiamond />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'var(--mist)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We construct buildings, facilities, and infrastructure that deliver
                international quality and strengthen communities across Chennai.
              </p>
            </div>

            {/* Company */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: 'var(--navy)',
                  }}
                >
                  Company
                </span>
                <GoldDiamond />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'var(--mist)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We know what it takes to get projects built — through innovative solutions,
                international management standards, and a team that owns every outcome.
              </p>
            </div>
          </motion.div>

          {/* 6. Split CTA */}
          <motion.div {...fadeUp(0.5, 16, 0.4)}>
            <SplitCTA />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT COLUMN — 2×2 VISUAL GRID
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            width: '52%',
            flexShrink: 0,
          }}
          className="about-right"
        >
          <div
            className="about-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto auto',
              gap: 0,
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* ── CELL A — Light blue stat ── */}
            <div
              className="about-cell-a"
              style={{
                gridColumn: '1 / 2',
                gridRow: '1 / 2',
                background: '#D8E4EE',
                padding: '36px 32px',
                position: 'relative',
                minHeight: 220,
              }}
            >
              <HardHat size={32} color="var(--navy)" style={{ marginBottom: 24, display: 'block' }} />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 64,
                  color: 'var(--navy)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {count50}+
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'rgba(27,47,78,0.70)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                With over{' '}
                <strong
                  style={{
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  50 projects
                </strong>{' '}
                completed
              </p>
            </div>

            {/* ── CELL B — Gold stat + corner pattern ── */}
            <div
              className="about-cell-b"
              style={{
                gridColumn: '2 / 3',
                gridRow: '1 / 2',
                background: 'var(--gold)',
                padding: '36px 32px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 220,
              }}
            >
              <CornerPattern />
              <Building2 size={32} color="var(--navy)" style={{ marginBottom: 24, display: 'block', position: 'relative', zIndex: 1 }} />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 64,
                  color: 'var(--navy)',
                  lineHeight: 1,
                  marginBottom: 8,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {count15}+
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'rgba(27,47,78,0.80)',
                  margin: 0,
                  lineHeight: 1.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                With over{' '}
                <strong
                  style={{
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  15 years
                </strong>{' '}
                of experience
              </p>
            </div>

            {/* ── CELL C — Full-width photo (hidden on mobile) ── */}
            <div className="about-cell-c" style={{ gridColumn: '1 / 3', gridRow: '2 / 3' }}>
              <PhotoCell />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 1023px) {
          .about-inner {
            flex-direction: column !important;
            padding: 0 48px !important;
            gap: 48px !important;
          }
          .about-left {
            width: 100% !important;
          }
          .about-right {
            width: 100% !important;
          }
        }

        @media (max-width: 767px) {
          .about-inner {
            padding: 0 20px !important;
            gap: 36px !important;
          }

          /* Stack Cell A and Cell B vertically */
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 18Ipx !important;
            border-radius: 0px !important;
          }

          .about-cell-a {
            grid-column: 1 / 2 !important;
            grid-row: 1 / 2 !important;
            min-height: 180px !important;
            padding: 28px 24px !important;
          }

          .about-cell-b {
            grid-column: 1 / 2 !important;
            grid-row: 2 / 3 !important;
            min-height: 180px !important;
            padding: 28px 24px !important;
          }

          /* Shrink stat numbers so they fit on mobile */
          .about-cell-a [class],
          .about-cell-b [class] {
            font-size: 48px !important;
          }

          /* Hide the photo on mobile */
          .about-cell-c {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ─── Photo Cell — extracted for hover state ─── */
function PhotoCell() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '300px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {/* Try real image first; fall back to gradient placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      >
        <Image
          src="https://demo2.wpopal.com/adeco/wp-content/uploads/2026/05/service_6.jpg"
          alt="Avinya construction project"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={(e) => {
            // Hide the image element; the gradient fallback below will show
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* Gradient placeholder — always rendered, hidden behind image when image loads */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--navy) 0%, #2A4A6B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: -1,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 14,
              color: 'rgba(255,255,255,0.40)',
            }}
          >
            Project Photography
          </span>
        </div>
      </div>
    </div>
  )
}
