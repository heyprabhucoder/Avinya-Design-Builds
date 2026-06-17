'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Eye, ShieldCheck, Award, Handshake } from 'lucide-react'

const EASE     = [0.4, 0, 0.2, 1] as const
const EASE_EXP = [0.16, 1, 0.3, 1] as const

const CARDS = [
  { num: '01', heading: 'Transparency',  Icon: Eye,        highlight: false, body: 'We believe every client deserves to know exactly where their project stands — costs, timelines, and decisions. No surprises. No hidden agendas.' },
  { num: '02', heading: 'Accountability',Icon: ShieldCheck, highlight: false, body: 'One team, one contract, full responsibility. We own every outcome from the first consultation to the final handover — no exceptions.' },
  { num: '03', heading: 'Quality',        Icon: Award,       highlight: true,  body: 'Quality is not a deliverable — it is the standard we hold ourselves to on every project. International construction standards applied without compromise.' },
  { num: '04', heading: 'Integrity',      Icon: Handshake,   highlight: false, body: 'We work with discipline, honesty, and respect for every partner, supplier, and client. Our reputation is built one relationship at a time.' },
]

function ValueCard({ num, heading, body, Icon, highlight, index, isInView }: {
  num: string; heading: string; body: string; Icon: React.ElementType; highlight: boolean; index: number; isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: highlight ? '60px 32px 36px' : '36px 32px',
        minHeight: 380, position: 'relative',
        border: highlight ? 'none' : '1px solid rgba(255,255,255,0.08)',
        background: highlight ? (hovered ? '#E09420' : 'var(--gold)') : (hovered ? 'rgba(255,255,255,0.05)' : 'transparent'),
        marginTop: highlight ? -24 : 0,
        transition: 'background 0.25s ease, transform 0.25s ease',
        transform: highlight && hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 32, background: highlight ? 'rgba(27,47,78,0.20)' : 'rgba(255,255,255,0.12)', borderRadius: 6, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: highlight ? 'var(--navy)' : '#FFFFFF', marginBottom: 28, letterSpacing: '0.05em' }}>
          {num}
        </div>
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'clamp(22px, 2vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20, color: highlight ? 'var(--navy)' : '#FFFFFF', textShadow: !highlight && hovered ? '0 0 20px rgba(255,255,255,0.15)' : 'none', transition: 'text-shadow 0.25s ease' }}>
          {heading}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 15, lineHeight: 1.70, color: highlight ? 'rgba(27,47,78,0.80)' : 'rgba(255,255,255,0.65)', margin: 0 }}>
          {body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.35, ease: EASE }}
        style={{ marginTop: 48, transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s ease' }}
      >
        <Icon size={56} strokeWidth={1.5} color={highlight ? 'var(--navy)' : 'var(--gold)'} />
      </motion.div>
    </motion.div>
  )
}

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const zone1Ref   = useRef<HTMLDivElement>(null)
  const zone2Ref   = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-40px 0px' })
  const isZone2    = useInView(zone2Ref,   { once: true, margin: '-80px 0px' })

  /* ── Parallax: track zone1 scroll position ── */
  const { scrollYProgress } = useScroll({
    target:  zone1Ref,
    offset:  ['start end', 'end start'],  // from when section enters to when it leaves
  })
  /* Image moves -15% → +15% (30% total travel) relative to scroll — slower than page */
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section
      ref={sectionRef}
      style={{ width: '100%', background: 'var(--navy)', position: 'relative' }}
    >

      {/* ══════════════════════════════════
          ZONE 1 — photo + overlay + text
          Uses flex column: headline top, display text bottom
      ══════════════════════════════════ */}
      <div
        ref={zone1Ref}
        className="cv-zone1"
        style={{
          position:       'relative',
          width:          '100%',
          minHeight:      640,          /* fixed min so it never squashes */
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          overflow:       'hidden',
        }}
      >
        {/* Background photo — wrapped in motion.div for parallax */}
        <motion.div
          style={{
            position: 'absolute',
            inset:    0,
            y:        parallaxY,       /* ← parallax: moves slower than scroll */
            scale:    1.2,             /* slightly zoomed so edges never show during travel */
          }}
        >
          <Image
            src="https://cdn.pixabay.com/photo/2018/06/07/04/48/shanghai-3459422_1280.jpg"
            alt="Avinya international construction standards Chennai"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            priority={false}
          />
        </motion.div>

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(27,47,78,0.55) 0%, rgba(27,47,78,0.70) 55%, rgba(27,47,78,0.95) 85%, rgba(27,47,78,1) 100%)', pointerEvents: 'none', zIndex: 1 }} />

        {/* ── TOP: eyebrow + headline ── */}
        <motion.div
          className="cv-top"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          style={{ position: 'relative', zIndex: 2, padding: '120px 64px 0' }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', padding: '7px 16px', borderRadius: 4, marginBottom: 24 }}>
            WHY CHOOSE US
          </div>

          {/* Headline — intentionally smaller so it fits left side cleanly */}
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 52px)', color: '#FFFFFF', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
            Our mission is to turn your<br />
            vision into reality, one<br />
            project at a time.
          </h2>
        </motion.div>

              {/* ══════════════════════════════════
          GOLD DIVIDER — between Zone 1 and Zone 2
      ══════════════════════════════════ */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        style={{ height: 2, background: 'var(--gold)', width: '100%', transformOrigin: 'left' }}
      />

        {/* ── BOTTOM: "Core values" display ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_EXP }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none', userSelect: 'none', padding: '0 32px 40px' }}
        >
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'clamp(56px, 9vw, 128px)', color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
            Core values
          </span>
        </motion.div>
      </div>


      {/* ══════════════════════════════════
          ZONE 2 — cards
      ══════════════════════════════════ */}
      <div ref={zone2Ref} style={{ background: 'var(--navy)' }}>
        <div className="cv-grid">
          {CARDS.map((card, i) => (
            <ValueCard key={card.num} {...card} index={i} isInView={isZone2} />
          ))}
        </div>
      </div>

      <style>{`
        .cv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin: 0 auto;
          padding: 0 64px;
        }

        @media (max-width: 1279px) {
          .cv-grid { grid-template-columns: repeat(2, 1fr); padding: 0 40px; }
        }

        @media (max-width: 767px) {
          .cv-zone1 { min-height: 520px !important; }
          .cv-top   { padding: 100px 24px 0 !important; }
          .cv-grid  { grid-template-columns: 1fr !important; padding: 0 !important; }
          .cv-grid > div { margin-top: 0 !important; padding: 28px 24px !important; min-height: 280px !important; }
        }
      `}</style>
    </section>
  )
}