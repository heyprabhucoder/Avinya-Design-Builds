'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

/* ─── Data ─── */
const PANELS = [
  {
    number: '01',
    heading: ['International', 'Standards'],
    body: "We bring North American construction management frameworks to every project — structured scheduling, quality control protocols, and documentation practices most Chennai builders simply don't offer.",
    image: '/images/service-1.jpg',
    placeholderHue: 210,
  },
  {
    number: '02',
    heading: ['Transparent', 'Pricing'],
    body: 'No surprise costs. No hidden charges. We provide detailed, itemised budgets before a single brick is laid, and we track every rupee against that budget throughout construction.',
    image: '/images/service-2.jpg',
    placeholderHue: 225,
  },
  {
    number: '03',
    heading: ['On-Time,', 'Every Time'],
    body: 'Across 50+ completed projects, we have maintained a 100% on-time delivery record. We build realistic schedules, identify risks early, and hold our teams accountable to deadlines.',
    image: '/images/service-3.jpg',
    placeholderHue: 200,
  },
  {
    number: '04',
    heading: ['Expert Local', 'Team'],
    body: "Our team combines international project leadership with deep local execution — people who know Chennai's regulations, materials, and labour market, and who take personal ownership of every outcome.",
    image: '/images/service-4.jpg',
    placeholderHue: 215,
  },
]

/* ─── Pentagon number badge ─── */
function NumberBadge({ number }: { number: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: -18,
        left: 0,
        width: 48,
        height: 48,
        background: 'var(--gold)',
        color: 'var(--navy)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
        zIndex: 3,
        letterSpacing: '0.02em',
      }}
    >
      {number}
    </div>
  )
}

/* ─── Eyebrow pill ─── */
function EyebrowPill({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'var(--gold)',
        color: 'var(--navy)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        padding: '7px 16px',
        borderRadius: 4,
      }}
    >
      {text}
    </span>
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function WhyChooseUs() {
  const [activeCard, setActiveCard] = useState(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ─── GSAP: active indicator bars ─── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    /*
     * With sticky stacking each panel occupies its natural-flow scroll
     * position (panel i starts at i × 100vh from section top).
     * 'top top' fires exactly when that panel becomes the top card.
     */
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return
      const st = ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => setActiveCard(i),
        onEnterBack: () => setActiveCard(i),
      })
      triggers.push(st)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section
      className="wcu-split"
      style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}
    >
      {/* ── LEFT: 4 stacking panels ── */}
      {/*
       * Each panel: position sticky + top:0 + ascending z-index.
       * As the user scrolls, panel 2 slides up from the bottom and stacks
       * over panel 1, then panel 3 over panel 2, etc.
       */}
      <div className="wcu-left" style={{ width: '50%' }}>
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el }}
            style={{
              width: '100%',
              height: '100vh',
              position: 'sticky',
              top: 0,
              zIndex: i + 1,
              overflow: 'hidden',
            }}
          >
            {/* Background photo */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <Image
                src={panel.image}
                alt={panel.heading.join(' ')}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              {/* Gradient placeholder behind image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(160deg,
                    hsl(${panel.placeholderHue}, 40%, 18%) 0%,
                    hsl(${panel.placeholderHue + 12}, 35%, 28%) 100%)`,
                  zIndex: -1,
                }}
              />
              {/* Darkening scrim for text legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.38)',
                }}
              />
            </div>

            {/* White floating card */}
            <div
              className="wcu-panel-card"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '10%',
                width: '60%',
                background: '#FFFFFF',
                padding: '40px 36px 52px 36px',
                zIndex: 2,
                boxShadow: '0 8px 48px rgba(0,0,0,0.22)',
              }}
            >
              <NumberBadge number={panel.number} />

              <div
                style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  color: '#111111',
                  lineHeight: 1.1,
                }}
              >
                {panel.heading[0]}
                <br />
                {panel.heading[1]}
              </div>

              <p
                style={{
                  margin: '20px 0 0 0',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  color: '#555555',
                  lineHeight: 1.7,
                  maxWidth: 340,
                }}
              >
                {panel.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── RIGHT: sticky dark panel (never moves) ── */}
      <div
        className="wcu-right"
        style={{
          width: '50%',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#111111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 56px',
        }}
      >
        {/* Decorative crane — bleeds from top-right corner */}
        <div
          className="wcu-crane"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 200,
            height: 300,
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/why-choose-crane.jpg"
            alt="Construction crane"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center left' }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, transparent 50%, #111111 100%), linear-gradient(to left, transparent 40%, #111111 100%)',
            }}
          />
        </div>

        {/* Eyebrow */}
        <div style={{ marginBottom: 32, position: 'relative', zIndex: 1 }}>
          <EyebrowPill text="WHY CHOOSE US" />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4.5vw, 72px)',
            color: '#FFFFFF',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            marginBottom: 28,
            maxWidth: 480,
            position: 'relative',
            zIndex: 1,
          }}
        >
          International
          <br />
          standards.
          <br />
          Every project.
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            maxWidth: 420,
            marginBottom: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          We work to fully understand our clients&apos; definitions of success —
          tailoring our approach to deliver the quality, timeline, and
          accountability every owner deserves.
        </p>

        {/* Big stat */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              fontSize: 'clamp(64px, 7vw, 100px)',
              color: 'var(--gold)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            50+
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 8,
            }}
          >
            Projects completed across Chennai and Tamil Nadu.
          </p>
        </div>

        {/* Active indicator bars */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 56,
            display: 'flex',
            gap: 8,
            zIndex: 2,
          }}
        >
          {PANELS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 3,
                borderRadius: 999,
                background: activeCard === i ? 'var(--gold)' : 'rgba(255,255,255,0.20)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Responsive CSS ─── */}
      <style>{`
        /* Tablet: stack vertically, panels un-sticky */
        @media (max-width: 1023px) {
          .wcu-split {
            flex-direction: column !important;
          }
          .wcu-left {
            width: 100% !important;
          }
          .wcu-left > div {
            position: relative !important;
            top: auto !important;
          }
          .wcu-right {
            width: 100% !important;
            position: relative !important;
            top: auto !important;
            height: auto !important;
            min-height: 420px !important;
            padding: 64px 48px 80px !important;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .wcu-right {
            padding: 48px 24px 72px !important;
            min-height: unset !important;
          }
          .wcu-crane {
            display: none !important;
          }
          .wcu-panel-card {
            left: 6% !important;
            width: 78% !important;
            padding: 28px 24px 36px !important;
          }
        }
      `}</style>
    </section>
  )
}
