'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import TextReveal from './TextReveal'

/* ─── Constants ─── */
const EASE = [0.4, 0, 0.2, 1] as const

/* ═══════════════════════════════════════
   TEXT BLOCK
   Self-contained with its own scroll trigger.
   Title begins muted (opacity 0.35) and lights up on entry.
═══════════════════════════════════════ */
function TextBlock({
  title,
  body,
  className,
}: {
  title: string
  body: string
  className: string
}) {
  return (
    <div className={className}>
      {/* Title */}
      <div
        style={{
          fontFamily:   'var(--font-body)',
          fontWeight:   600,
          fontSize:     24,
          color:        'var(--navy)',
          lineHeight:   1.2,
          marginBottom: 14,
        }}
      >
        <TextReveal text={title} type="words" delay={0.0} />
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize:   16,
          color:      '#3A3A3A',
          lineHeight: 1.75,
          maxWidth:   320,
          margin:     0,
        }}
      >
        <TextReveal text={body} type="words" delay={0.1} stagger={0.02} />
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════
   PARALLAX PHOTO
   Reveal: opacity 0→1, scale 1.04→1.0
   Parallax: inner image drifts at 0.85× scroll speed
═══════════════════════════════════════ */
function ParallaxPhoto({
  src,
  alt,
  className,
  objectPosition = 'center',
  delay = 0,
}: {
  src: string
  alt: string
  className: string
  objectPosition?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px 0px' })

  /* Scroll-linked y offset — tracks this element through the viewport */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <div ref={containerRef} className={className}>
      {/* Reveal wrapper (fade + scale) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1.0 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Parallax image inner — slightly oversized so drift never reveals edge */}
        <motion.div
          style={{
            position: 'absolute',
            inset:    '-10% 0',
            y,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover', objectPosition }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* Gradient placeholder shown until real image loads */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(160deg, hsl(210,40%,18%) 0%, hsl(222,35%,28%) 100%)',
              zIndex:     -1,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function ValuePropositionSection() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="vp-section"
      style={{ background: '#FFFFFF', padding: '120px 0' }}
    >
      {/* ── Content wrapper ── */}
      <div className="vp-wrapper">

        {/* ════ SECTION HEADER ════ */}
        <div style={{ marginBottom: 72 }}>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    500,
              fontSize:      11,
              color:         'var(--mist)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom:  16,
            }}
          >
            <TextReveal text="WHAT DRIVES US" type="words" delay={0.0} />
          </div>

          {/* Headline — gold bar + Cormorant heading */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            {/* Gold 3px vertical accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isHeaderInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                width:      3,
                height:     56,
                background: 'var(--gold)',
                flexShrink: 0,
                marginTop:  8, /* aligns with cap-height of heading */
                transformOrigin: 'top',
              }}
            />
            <h2
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    600,
                fontSize:      'clamp(36px, 4.5vw, 68px)',
                color:         'var(--navy)',
                lineHeight:    1.0,
                letterSpacing: '-0.01em',
                margin:        0,
              }}
            >
              <TextReveal text="The principles behind" type="chars" delay={0.1} stagger={0.02} />
              <br />
              <TextReveal text="every project we build." type="chars" delay={0.25} stagger={0.02} />
            </h2>
          </div>
        </div>

        {/* ════ 12-COLUMN GRID ════ */}
        <div className="vp-grid">

          {/* TEXT 1 — top-left */}
          <TextBlock
            className="vp-text-1"
            title="International Standards"
            body="We bring direct project management experience from the United States and Canada to every project in India. Those standards are applied without compromise — from the first plan to the final handover."
          />

          {/* TEXT 2 — top-centre */}
          <TextBlock
            className="vp-text-2"
            title="Disciplined Communication"
            body="Structured reporting, milestone tracking, and proactive updates throughout every phase. You always know where your project stands — and why."
          />

          {/* PHOTO RIGHT — spans rows 1–2, bleeds to right boundary */}
          <ParallaxPhoto
            className="vp-photo-r"
            src="https://cdn.pixabay.com/photo/2016/02/02/17/47/new-york-1175727_1280.jpg"
            alt="Premium Avinya construction space"
            objectPosition="center top"
            delay={0.1}
          />

          {/* PHOTO LEFT — spans rows 2–3, bleeds to left boundary */}
          <ParallaxPhoto
            className="vp-photo-l"
            src="https://cdn.pixabay.com/photo/2016/02/02/17/47/new-york-1175727_1280.jpg"
            alt="Avinya construction craft"
            objectPosition="center"
            delay={0.3}
          />

          {/* TEXT 3 — middle-centre */}
          <TextBlock
            className="vp-text-3"
            title="One Point of Accountability"
            body="We centralise design, procurement, and delivery within a single structured process. One team, one contract, and full responsibility for every outcome."
          />

          {/* TEXT 4 — bottom-centre */}
          <TextBlock
            className="vp-text-4"
            title="Protecting Your Investment"
            body="Through long-term supplier relationships and disciplined procurement, we safeguard your timeline and limit risk before it becomes a problem — at every phase of the build."
          />

          {/* TEXT 5 — bottom-right */}
          <TextBlock
            className="vp-text-5"
            title="Built for Chennai"
            body="We combine global expertise with deep local execution. Our team understands the regulatory landscape, supplier networks, and site realities that define building well in Chennai and Tamil Nadu."
          />
        </div>
      </div>

      {/* ════ CSS — grid placements + responsive ════ */}
      <style>{`
        /* Section */
        .vp-section { overflow: hidden; }

        /* ── Wrapper ── */
        .vp-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 64px;
        }

        /* ── Grid container ── */
        .vp-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto auto auto;
          column-gap: 40px;
          row-gap: 64px;
          align-items: start;
        }

        /* ── Desktop placements ── */
        .vp-text-1 {
          grid-column: 1 / 5;
          grid-row: 1 / 2;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 64px;
        }
        .vp-text-2 {
          grid-column: 5 / 9;
          grid-row: 1 / 2;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 64px;
        }
        .vp-photo-r {
          grid-column: 9 / 13;
          grid-row: 1 / 3;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          min-height: 480px;
          margin-right: -64px;
        }
        .vp-photo-l {
          grid-column: 1 / 5;
          grid-row: 2 / 4;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          min-height: 480px;
          margin-left: -64px;
        }
        .vp-text-3 {
          grid-column: 5 / 9;
          grid-row: 2 / 3;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 64px;
        }
        .vp-text-4 { grid-column: 5 / 9; grid-row: 3 / 4; }
        .vp-text-5 { grid-column: 9 / 13; grid-row: 3 / 4; }

        /* ─────────────────────────────────────────
           TABLET  768px – 1279px
           2-column grid
        ───────────────────────────────────────── */
        @media (max-width: 1279px) {
          .vp-wrapper { padding: 0 48px; }
          .vp-grid {
            grid-template-columns: 1fr 1fr;
            column-gap: 28px;
            row-gap: 48px;
          }
          .vp-text-1 { grid-column: 1/2; grid-row: 1; border-bottom: none; padding-bottom: 0; }
          .vp-text-2 { grid-column: 2/3; grid-row: 1; border-bottom: none; padding-bottom: 0; }
          .vp-photo-l { grid-column: 1/2; grid-row: 2; margin-left: 0; min-height: 320px; width: 100%; }
          .vp-text-3  { grid-column: 2/3; grid-row: 2; border-bottom: none; padding-bottom: 0; }
          .vp-text-4  { grid-column: 1/2; grid-row: 3; }
          .vp-photo-r { grid-column: 2/3; grid-row: 3; margin-right: 0; min-height: 320px; width: 100%; }
          .vp-text-5  { grid-column: 1/3; grid-row: 4; }
        }

        /* ─────────────────────────────────────────
           MOBILE  < 768px — single column
        ───────────────────────────────────────── */
        @media (max-width: 767px) {
          .vp-wrapper { padding: 0 20px; }
          .vp-grid { grid-template-columns: 1fr; row-gap: 36px; }

          .vp-text-1 { grid-column: 1/2; grid-row: auto; border-bottom: none; padding-bottom: 0; order: 1; }
          .vp-text-2 { grid-column: 1/2; grid-row: auto; border-bottom: none; padding-bottom: 0; order: 2; }
          .vp-text-3 { grid-column: 1/2; grid-row: auto; border-bottom: none; padding-bottom: 0; order: 3; }
          .vp-text-4 { grid-column: 1/2; grid-row: auto; order: 4; }
          .vp-text-5 { grid-column: 1/2; grid-row: auto; order: 5; }
          .vp-photo-l {
            grid-column: 1/2; grid-row: auto;
            margin-left: 0; min-height: 240px; border-radius: 12px; order: 6; width: 100%;
          }
          .vp-photo-r {
            grid-column: 1/2; grid-row: auto;
            margin-right: 0; min-height: 240px; border-radius: 12px; order: 7; width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
