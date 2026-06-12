'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import TextReveal from './TextReveal'

/* ─── Constants ─── */
const EASE = [0.4, 0, 0.2, 1] as const

/* ─── Data ─── */
const SERVICE_CARDS = [
  {
    strip: 'COMMERCIAL',
    image: '/images/services1.jpeg',
    title: 'Commercial Design & Build',
    description: 'Turnkey commercial construction from feasibility through occupancy.',
    gradientFrom: '#1B2F4E',
    gradientTo: '#2A4A6B',
  },
  {
    strip: 'RESIDENTIAL',
    image: '/images/services2.jpeg',
    title: 'Luxury Homes & Villas',
    description: 'Custom residences with international quality and transparent pricing.',
    gradientFrom: '#243B55',
    gradientTo: '#141E30',
  },
  {
    strip: 'JOINT VENTURE',
    image: '/images/services3.jpeg',
    title: 'Joint Venture Development',
    description: 'Unlocking land value through professionally managed developments.',
    gradientFrom: '#1C3A5E',
    gradientTo: '#0F2A47',
  },
  {
    strip: 'HOSPITALITY',
    image: '/images/services4.jpeg',
    title: 'Hotels & Restaurants',
    description: 'Hospitality spaces built for operations, guests, and profitability.',
    gradientFrom: '#2C3E50',
    gradientTo: '#1a2537',
  },
  {
    strip: 'MANAGEMENT',
    image: '/images/services5.jpeg',
    title: 'Construction Management',
    description: 'Independent project oversight and cost management for owners.',
    gradientFrom: '#1B2F4E',
    gradientTo: '#0d1f33',
  },
]

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
      <TextReveal text={text} type="words" />
    </span>
  )
}

/* ─── Split CTA button ─── */
function SplitCTA({ label, href }: { label: string; href?: string }) {
  const [hovered, setHovered] = useState(false)
  const content = (
    <>
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
        {label}
      </div>
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
    </>
  )

  return href ? (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        border: '1.5px solid var(--navy)',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {content}
    </Link>
  ) : (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        border: '1.5px solid var(--navy)',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {content}
    </div>
  )
}

/* ─── Individual service card ─── */
function ServiceCard({
  card,
  index,
  isInView,
}: {
  card: (typeof SERVICE_CARDS)[0]
  index: number
  isInView: boolean
}) {
  const [imgHovered, setImgHovered] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <motion.div
      className="os-card"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: EASE }}
      style={{
        flexShrink: 0,
        scrollSnapAlign: 'start',
        width: 'calc(20%)',
        minWidth: 260,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Gold top strip */}
      <div
        style={{
          height: 56,
          background: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--navy)',
          flexShrink: 0,
        }}
      >
        {card.strip}
      </div>

      {/* Card image */}
      <div
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        style={{ height: 200, overflow: 'hidden', position: 'relative', flexShrink: 0 }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: imgHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* Gradient placeholder */}
          {/* <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
              zIndex: -1,
            }}
          /> */}
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '24px 24px 28px 24px',
          flex: 1,
          border: '1px solid #EBEBEB',
          borderTop: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 20,
            color: 'var(--navy)',
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          {card.title}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 14,
            color: '#666666',
            lineHeight: 1.65,
            marginBottom: 20,
            flex: 1,
          }}
        >
          {card.description}
        </div>

        {/* Learn More CTA */}
        <div
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: ctaHovered ? 12 : 8,
            cursor: 'pointer',
            transition: 'gap 0.2s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--gold)',
            }}
          >
            Learn More
          </span>
          <ArrowRight size={14} color="var(--gold)" />
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function OurServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRowRef = useRef<HTMLDivElement>(null)
  const autoSlideRef = useRef<number | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  useEffect(() => {
    const row = cardsRowRef.current
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    function clearAutoSlide() {
      if (autoSlideRef.current !== null) {
        window.clearInterval(autoSlideRef.current)
        autoSlideRef.current = null
      }
    }

    function startAutoSlide() {
      if (!row || !mediaQuery.matches) return
      const totalCards = row.children.length
      let currentIndex = 0
      clearAutoSlide()
      autoSlideRef.current = window.setInterval(() => {
        const firstCard = row.firstElementChild as HTMLElement | null
        if (!firstCard) return
        currentIndex = (currentIndex + 1) % totalCards
        row.scrollTo({ left: currentIndex * firstCard.offsetWidth, behavior: 'smooth' })
      }, 3600)
    }

    startAutoSlide()
    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        startAutoSlide()
      } else {
        clearAutoSlide()
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      clearAutoSlide()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="os-section"
      style={{
        background: '#FFFFFF',
        padding: '100px 0 80px 0',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        className="os-header"
        style={{ maxWidth: 1320, margin: '0 auto', padding: '0 64px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 28 }}
        >
          <EyebrowPill text="OUR SERVICES" />
        </motion.div>

        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            color: 'var(--navy)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '0 0 64px 0',
          }}
        >
          <TextReveal text="We deliver the best" type="chars" delay={0.1} stagger={0.02} />
          <br />
          <TextReveal text="construction solutions." type="chars" delay={0.25} stagger={0.02} />
        </h2>
      </div>

      {/* Horizontal scrolling card row */}
      <div
        ref={cardsRowRef}
        className="os-cards-row"
        style={{
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          padding: '0 64px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {SERVICE_CARDS.map((card, i) => (
          <ServiceCard key={i} card={card} index={i} isInView={isInView} />
        ))}
      </div>

      {/* View All CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
        <SplitCTA label="View All Services" href="/services" />
      </div>

      {/* \u2500\u2500\u2500 Responsive CSS \u2500\u2500\u2500 */}
      <style>{`
        /* Hide scrollbar \u2014 Chrome/Safari */
        .os-cards-row::-webkit-scrollbar { display: none; }
        /* Hide scrollbar \u2014 Firefox */
        .os-cards-row {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @media (max-width: 1023px) {
          .os-header    { padding: 0 48px !important; }
          .os-cards-row { padding: 0 0 0 48px !important; }
        }

        @media (max-width: 767px) {
          .os-section   { padding: 64px 0 56px !important; }
          .os-header    { padding: 0 20px !important; }
          .os-cards-row { padding: 0 0 0 20px !important; }
          /* Cards fill the viewport width minus the left padding so there is no right gap */
          .os-card      { min-width: calc(100vw - 20px) !important; width: calc(100vw - 20px) !important; }
        }
      `}</style>
    </section>
  )
}
