'use client'

import { useRef, useState, useEffect, forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EASE = [0.4, 0, 0.2, 1] as const

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
interface ServiceStat { label: string; value: string }
interface Service {
  id:          string
  headerBg:    string
  isOutline:   boolean        // Panel 5 off-white with border
  textDark:    boolean        // true = dark text (gold bg), false = light text (navy bg)
  eyebrow:     string
  name:        string
  description: string
  href:        string
  image:       string
  imageAlt:    string
  stats:       ServiceStat[]
}

const SERVICES: Service[] = [
  {
    id:          'commercial',
    headerBg:    'var(--gold, #F5A82A)',
    isOutline:   false,
    textDark:    true,
    eyebrow:     'BUILT TO DELIVER',
    name:        'Commercial Design & Build',
    description: 'Turnkey commercial construction for developers, investors, and business owners — from feasibility through final occupancy.',
    href:        '/services/commercial',
    image:       'https://cdn.prod.website-files.com/699db67cb08f9b171cbda485/69c2a42819824695c58cccc3_Small_renovation_team_202603201300.avif',
    imageAlt:    'Commercial construction project by Avinya Chennai',
    stats: [
      { label: 'PROJECTS',   value: '50+' },
      { label: 'EXPERIENCE', value: '15+ YEARS' },
      { label: 'TYPE',       value: 'ALL SCALES' },
    ],
  },
  {
    id:          'residential',
    headerBg:    'var(--navy, #1B2F4E)',
    isOutline:   false,
    textDark:    false,
    eyebrow:     'BUILT TO LAST',
    name:        'Luxury Homes & Villas',
    description: 'Custom residences designed around your lifestyle, with international quality standards and transparent pricing throughout.',
    href:        '/services/residential',
    image:       'https://cdn.prod.website-files.com/699db67cb08f9b171cbda485/69c2a42819824695c58cccc3_Small_renovation_team_202603201300.avif',
    imageAlt:    'Luxury villa construction by Avinya Design and Build',
    stats: [
      { label: 'PROJECTS',   value: '30+' },
      { label: 'EXPERIENCE', value: '12+ YEARS' },
      { label: 'STYLE',      value: 'LUXURY' },
    ],
  },
  {
    id:          'joint-venture',
    headerBg:    'var(--gold, #F5A82A)',
    isOutline:   false,
    textDark:    true,
    eyebrow:     'BUILT TO GROW',
    name:        'Joint Venture Development',
    description: 'We partner with landowners to unlock property value through professionally managed development projects across Chennai and Tamil Nadu.',
    href:        '/services/joint-venture',
    image:       'https://cdn.prod.website-files.com/699db67cb08f9b171cbda485/69c2a42819824695c58cccc3_Small_renovation_team_202603201300.avif',
    imageAlt:    'Joint venture development project Chennai Tamil Nadu',
    stats: [
      { label: 'PROJECTS',   value: '10+' },
      { label: 'EXPERIENCE', value: '15+ YEARS' },
      { label: 'REACH',      value: 'PAN INDIA' },
    ],
  },
  {
    id:          'hospitality',
    headerBg:    'var(--navy, #1B2F4E)',
    isOutline:   false,
    textDark:    false,
    eyebrow:     'BUILT TO PERFORM',
    name:        'Hotels & Restaurants',
    description: 'Hospitality spaces built by specialists who understand operations, guest experience, and what drives long-term profitability.',
    href:        '/services/hospitality',
    image:       'https://cdn.prod.website-files.com/699db67cb08f9b171cbda485/69c2a42819824695c58cccc3_Small_renovation_team_202603201300.avif',
    imageAlt:    'Hotel construction and restaurant build Chennai',
    stats: [
      { label: 'PROJECTS',   value: '15+' },
      { label: 'EXPERIENCE', value: '10+ YEARS' },
      { label: 'MARKETS',    value: 'ALL TYPES' },
    ],
  },
  {
    id:          'management',
    headerBg:    'var(--off-white, #F6F4F0)',
    isOutline:   true,
    textDark:    true,
    eyebrow:     'BUILT TO PROTECT',
    name:        'Construction Management',
    description: 'Independent project oversight, structured quality control, and cost management — for owners who need a trusted expert protecting their investment.',
    href:        '/services/management',
    image:       'https://cdn.prod.website-files.com/699db67cb08f9b171cbda485/69c2a42819824695c58cccc3_Small_renovation_team_202603201300.avif',
    imageAlt:    'Construction management services Avinya Chennai',
    stats: [
      { label: 'PROJECTS',   value: '50+' },
      { label: 'EXPERIENCE', value: '15+ YEARS' },
      { label: 'SCOPE',      value: 'END TO END' },
    ],
  },
]

/* ─────────────────────────────────────────────
   SERVICE PANEL (forwardRef for GSAP + inner ref for reveal)
───────────────────────────────────────────── */
const ServicePanel = forwardRef<HTMLDivElement, {
  service:  Service
  isActive: boolean
}>(function ServicePanel({ service }, outerRef) {
  const innerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  /* useInView on the whole panel — triggers when panel top hits 80% of viewport */
  const isInView   = useInView(innerRef, { once: true, amount: 0.12 })
  const photoInView = useInView(photoRef, { once: true, margin: '-80px 0px' })

  /* Merge outer (GSAP ScrollTrigger) ref + inner (Framer Motion) ref */
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    if (typeof outerRef === 'function') outerRef(el)
    else if (outerRef) (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }, [outerRef])

  const dark    = service.textDark
  const textCol = dark ? 'var(--navy, #1B2F4E)' : '#FFFFFF'
  const subCol  = dark ? 'rgba(27,47,78,0.75)'  : 'rgba(255,255,255,0.70)'
  const eyebrowBorder = dark ? 'var(--navy, #1B2F4E)' : 'rgba(255,255,255,0.50)'

  const btnBg   = dark ? 'var(--navy, #1B2F4E)' : 'var(--gold, #F5A82A)'
  const btnText = dark ? '#FFFFFF'               : 'var(--navy, #1B2F4E)'
  const iconBg  = dark ? 'var(--gold, #F5A82A)'  : 'var(--navy, #1B2F4E)'
  const iconCol = dark ? 'var(--navy)'            : 'var(--gold)'

  const ease = [0.4, 0, 0.2, 1] as [number, number, number, number]

  return (
    <div
      ref={innerRef}
      className="sps-panel"
      style={{
        minHeight:     '100vh',
        display:       'flex',
        flexDirection: 'column',
        background:    'var(--off-white, #F6F4F0)',
        borderBottom:  '2px solid rgba(27,47,78,0.08)',
      }}
    >
      {/* ── A. Coloured header card — clip-path wipe reveal ── */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
        transition={{ duration: 0.75, ease: ease }}
        style={{
          background: service.headerBg,
          padding:    '36px 40px',
          position:   'relative',
          border:     service.isOutline ? '2px solid var(--navy, #1B2F4E)' : 'none',
          overflow:   'hidden',
        }}
      >
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.25, ease }}
          style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          6,
            padding:      '6px 14px',
            border:       `1.5px solid ${eyebrowBorder}`,
            borderRadius: 4,
            fontFamily:   'var(--font-body)',
            fontWeight:   600,
            fontSize:     11,
            textTransform:'uppercase' as const,
            letterSpacing:'0.14em',
            color:        textCol,
            marginBottom: 20,
          }}
        >
          {service.eyebrow}
        </motion.div>

        {/* Service name */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32, ease }}
          style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    800,
            fontSize:      'clamp(28px, 3vw, 42px)',
            lineHeight:    1.05,
            letterSpacing: '-0.02em',
            color:         textCol,
            margin:        0,
          }}
        >
          {service.name}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.40, ease }}
          style={{
            fontFamily:   'var(--font-body)',
            fontWeight:   400,
            fontSize:     15,
            lineHeight:   1.65,
            color:        subCol,
            marginTop:    14,
            marginBottom: 0,
            maxWidth:     520,
          }}
        >
          {service.description}
        </motion.p>

        {/* Service detail button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.50, ease }}
          style={{ display: 'inline-block', marginTop: 24 }}
        >
          <Link
            href={service.href}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            10,
              background:     btnBg,
              color:          btnText,
              fontFamily:     'var(--font-body)',
              fontWeight:     600,
              fontSize:       11,
              textTransform:  'uppercase' as const,
              letterSpacing:  '0.12em',
              padding:        '12px 18px',
              borderRadius:   6,
              textDecoration: 'none',
              transition:     'opacity 0.2s ease',
            }}
          >
            SERVICE DETAIL
            <div style={{
              width:          28,
              height:         28,
              background:     iconBg,
              borderRadius:   4,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
            }}>
              <ArrowUpRight size={12} color={iconCol} />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── C. Stats row — staggered fade-up ── */}
      <div style={{
        background: 'var(--off-white, #F6F4F0)',
        padding:    '28px 40px',
        display:    'flex',
        alignItems: 'flex-start',
        gap:        0,
      }}>
        {service.stats.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.60 + i * 0.10, ease }}
              className="sps-stat-block"
            >
              <div style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    500,
                fontSize:      10,
                color:         'var(--mist, #8A8A8A)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.16em',
                marginBottom:  4,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    800,
                fontSize:      'clamp(20px, 2vw, 28px)',
                color:         'var(--navy, #1B2F4E)',
                lineHeight:    1.0,
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
            </motion.div>
            {i < service.stats.length - 1 && (
              <div style={{
                width:      1,
                height:     40,
                background: 'rgba(27,47,78,0.12)',
                alignSelf:  'center',
                flexShrink: 0,
                margin:     '0 24px 0 0',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* ── D. Service photo — opacity + scale reveal ── */}
      <div
        ref={photoRef}
        style={{
          flex:      1,
          minHeight: 320,
          position:  'relative',
          overflow:  'hidden',
        }}
      >
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={photoInView ? { scale: 1.0, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="58vw"
          />
        </motion.div>
      </div>
    </div>
  )
})

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ServicesProvideSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([])
  const leftColRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const totalPanels = SERVICES.length

  /* ── GSAP ScrollTrigger — pin left col + active index tracker ── */
  useEffect(() => {
    // Only run on desktop (>= 768px)
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      /* Pin the left column for the full duration the section is on screen */
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      'top top',
        end:        'bottom bottom',
        pin:        leftColRef.current,
        pinSpacing: false,
      })

      /* Active panel tracker — fires on each panel mid-point */
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return
        ScrollTrigger.create({
          trigger:     panel,
          start:       'top center',
          end:         'bottom center',
          onEnter:     () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const progressWidth = `${((activeIndex + 1) / totalPanels) * 100}%`

  return (
    <section
      ref={sectionRef}
      style={{
        width:           '100%',
        backgroundColor: 'var(--off-white, #F6F4F0)',
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent 0px,
          transparent 12px,
          rgba(27,47,78,0.07) 12px,
          rgba(27,47,78,0.07) 13px
        )`,
      }}
    >
      <div className="sps-layout">

        {/* ══════════════════════════════════════
            LEFT COLUMN — GSAP pinned
        ══════════════════════════════════════ */}
        <div className="sps-left" ref={leftColRef}>

          {/* TOP: Statement text */}
          <div>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    800,
              fontSize:      'clamp(22px, 2.4vw, 36px)',
              color:         'var(--navy, #1B2F4E)',
              lineHeight:    1.12,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase' as const,
              margin:        0,
            }}>
              WE PROVIDE<br />
              COMPLETE<br />
              DESIGN &amp; BUILD<br />
              SOLUTIONS FOR<br />
              RESIDENTIAL,<br />
              COMMERCIAL,<br />
              AND HOSPITALITY<br />
              PROJECTS.
            </p>
          </div>

          {/* MIDDLE: Scroll progress indicator */}
          <div>
            {/* Counter label row */}
            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              marginBottom:   10,
            }}>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    500,
                fontSize:      11,
                color:         'var(--mist, #8A8A8A)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.14em',
                transition:    'all 0.3s ease',
              }}>
                {SERVICES[activeIndex].name.toUpperCase()}
              </span>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    500,
                fontSize:      11,
                color:         'var(--mist, #8A8A8A)',
                letterSpacing: '0.08em',
              }}>
                {String(activeIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(totalPanels).padStart(2, '0')}
              </span>
            </div>

            {/* Progress track */}
            <div style={{
              width:        '100%',
              height:       2,
              background:   'rgba(27,47,78,0.12)',
              borderRadius: 999,
              position:     'relative',
              overflow:     'hidden',
            }}>
              <motion.div
                animate={{ width: progressWidth }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  position:     'absolute',
                  left:         0,
                  top:          0,
                  height:       '100%',
                  background:   'var(--gold, #F5A82A)',
                  borderRadius: 999,
                }}
              />
            </div>
          </div>

          {/* BOTTOM: CTA */}
          <div>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    400,
              fontSize:      12,
              color:         'var(--mist, #8A8A8A)',
              lineHeight:    1.6,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.06em',
              marginBottom:  16,
            }}>
              TELL US ABOUT YOUR PROJECT AND GET A CLEAR NEXT STEP AND ESTIMATE.
            </p>

            <Link
              href="/contact"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            12,
                background:     'var(--gold, #F5A82A)',
                color:          'var(--navy, #1B2F4E)',
                fontFamily:     'var(--font-body)',
                fontWeight:     700,
                fontSize:       13,
                textTransform:  'uppercase' as const,
                letterSpacing:  '0.10em',
                padding:        '16px 24px',
                borderRadius:   6,
                border:         'none',
                textDecoration: 'none',
                transition:     'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#E09420'
                el.style.transform  = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--gold, #F5A82A)'
                el.style.transform  = 'scale(1)'
              }}
            >
              GET A QUOTE
              <div style={{
                width:          32,
                height:         32,
                background:     'var(--navy, #1B2F4E)',
                borderRadius:   4,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}>
                <ArrowUpRight size={14} color="var(--gold)" />
              </div>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT COLUMN — Scrolling panels
        ══════════════════════════════════════ */}
        <div className="sps-right">
          {SERVICES.map((service, i) => (
            <ServicePanel
              key={service.id}
              service={service}
              isActive={activeIndex === i}
              ref={el => { panelRefs.current[i] = el }}
            />
          ))}
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Two-column layout ── */
        .sps-layout {
          display:     flex;
          align-items: flex-start;
          width:       100%;
        }

        /* ── Left column (GSAP pins this) ── */
        .sps-left {
          width:                42%;
          flex-shrink:          0;
          height:               100vh;
          display:              flex;
          flex-direction:       column;
          justify-content:      space-between;
          padding:              80px 64px 64px 64px;
          background-color:     var(--off-white, #F6F4F0);
          background-image:     repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 12px,
            rgba(27,47,78,0.07) 12px,
            rgba(27,47,78,0.07) 13px
          );
          /* GSAP will set position:fixed while pinned */
        }

        /* ── Right scrolling column ── */
        .sps-right {
          width:          58%;
          flex:           1;
          display:        flex;
          flex-direction: column;
          gap:            32px;
        }

        /* ── Stat block ── */
        .sps-stat-block {
          flex:          1;
          display:       flex;
          flex-direction:column;
          gap:           4px;
          padding-right: 24px;
        }

        /* ── Panel ── */
        .sps-panel {
          min-height:           100vh;
          display:              flex;
          flex-direction:       column;
          background-color:     var(--off-white, #F6F4F0);
          background-image:     repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 12px,
            rgba(27,47,78,0.07) 12px,
            rgba(27,47,78,0.07) 13px
          );
        }

        /* ── Tablet (768px – 1023px) ── */
        @media (max-width: 1023px) and (min-width: 768px) {
          .sps-left {
            width:   38%;
            padding: 48px 32px 40px 32px;
          }
          .sps-right { width: 62%; }
        }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .sps-layout {
            flex-direction: column;
          }
          .sps-left {
            position:  static;
            height:    auto;
            width:     100%;
            padding:   48px 24px 40px 24px;
          }
          .sps-right {
            width: 100%;
          }
          /* Hide progress indicator on mobile */
          .sps-left > div:nth-child(2) {
            display: none;
          }
          .sps-panel {
            min-height: auto;
          }
          .sps-panel > div:last-child {
            min-height: 240px !important;
            flex: none !important;
          }
          /* Wrap stats on mobile */
          .sps-panel > div:nth-child(2) {
            flex-wrap: wrap;
          }
          .sps-stat-block {
            width:        50%;
            padding:      12px 0;
          }
        }
      `}</style>
    </section>
  )
}
