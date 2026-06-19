'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.4, 0, 0.2, 1] as const

const STATS = [
  { key: 's1' as const, target: 50,  suffix: '+', label: 'Projects completed' },
  { key: 's2' as const, target: 15,  suffix: '+', label: 'Years of experience' },
  { key: 's3' as const, target: 2,   suffix: '',  label: 'Countries of operation' },
  { key: 's4' as const, target: 100, suffix: '%', label: 'On-time delivery focus' },
]

type CountKey = 's1' | 's2' | 's3' | 's4'

export default function ContactTrustStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px 0px' })

  const [counts, setCounts] = useState<Record<CountKey, number>>({
    s1: 0, s2: 0, s3: 0, s4: 0,
  })

  /* ── Counter animation — triggers once on scroll into view ── */
  useEffect(() => {
    if (!isInView) return

    const targets: Record<CountKey, number> = { s1: 50, s2: 15, s3: 2, s4: 100 }
    const duration  = 1400
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed  = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)

      setCounts({
        s1: Math.floor(eased * targets.s1),
        s2: Math.floor(eased * targets.s2),
        s3: Math.floor(eased * targets.s3),
        s4: Math.floor(eased * targets.s4),
      })

      if (progress >= 1) clearInterval(interval)
    }, 16)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      style={{
        width:      '100%',
        background: 'var(--navy, #1B2F4E)',
        padding:    '64px 0',
      }}
    >
      <div className="cts-outer">

        {/* ── Left — manifesto statement ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0, ease: EASE }}
          className="cts-statement"
        >
          <div style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    500,
            fontSize:      11,
            color:         'var(--gold, #F5A82A)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom:  10,
          }}>
            WHY AVINYA
          </div>

          <p style={{
            fontFamily:  'var(--font-body)',
            fontWeight:  300,
            fontSize:    'clamp(22px, 2.2vw, 30px)',
            color:       'rgba(255,255,255,0.90)',
            lineHeight:  1.4,
            fontStyle:   'italic',
            margin:      0,
          }}>
            International standards.<br />
            Local execution.<br />
            Real accountability.
          </p>
        </motion.div>

        {/* ── Centre vertical divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          className="cts-vdivider"
          style={{
            width:      1,
            height:     80,
            background: 'rgba(255,255,255,0.12)',
            flexShrink: 0,
            alignSelf:  'center',
          }}
        />

        {/* ── Right — stat blocks ── */}
        <div className="cts-stats">
          {STATS.map((stat, i) => (
            <div key={stat.key} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                className="cts-stat-block"
              >
                <div style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    800,
                  fontSize:      'clamp(36px, 3.5vw, 52px)',
                  color:         'var(--gold, #F5A82A)',
                  lineHeight:    1.0,
                  letterSpacing: '-0.025em',
                  marginBottom:  6,
                }}>
                  {counts[stat.key]}{stat.suffix}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize:   13,
                  color:      'rgba(255,255,255,0.60)',
                  lineHeight: 1.4,
                  maxWidth:   120,
                  textAlign:  'center',
                }}>
                  {stat.label}
                </div>
              </motion.div>

              {/* Divider after each stat except the last */}
              {i < STATS.length - 1 && (
                <div className="cts-stat-divider" style={{
                  width:      1,
                  height:     48,
                  background: 'rgba(255,255,255,0.10)',
                  flexShrink: 0,
                  alignSelf:  'center',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cts-outer {
          max-width:       1320px;
          margin:          0 auto;
          padding:         0 64px;
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          gap:             40px;
        }

        .cts-statement {
          flex-shrink: 0;
          max-width:   340px;
        }

        .cts-stats {
          display:     flex;
          align-items: center;
          flex:        1;
          min-width:   0;
        }

        .cts-stat-block {
          flex:            1;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          text-align:      center;
          padding:         0 24px;
          min-width:       0;
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .cts-outer {
            padding:         0 24px;
            flex-direction:  column;
            align-items:     flex-start;
            gap:             40px;
          }
          .cts-statement {
            max-width: 100%;
          }
          .cts-vdivider,
          .cts-stat-divider {
            display: none !important;
          }
          .cts-stats {
            flex-wrap:  wrap;
            width:      100%;
          }
          .cts-stat-block {
            width:   50%;
            flex:    none;
            padding: 16px 12px;
            align-items: flex-start;
            text-align:  left;
          }
          .cts-stat-block > div:last-child {
            max-width: 100%;
            text-align: left;
          }
          /* Pad the outer section on mobile */
          section[data-cts] { padding: 52px 0 !important; }
        }

        /* ── Tablet ── */
        @media (max-width: 1023px) and (min-width: 768px) {
          .cts-outer { padding: 0 40px; gap: 24px; }
          .cts-stat-block { padding: 0 16px; }
        }
      `}</style>
    </section>
  )
}
