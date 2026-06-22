'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import TextReveal from '@/components/TextReveal'

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const

/* ─────────────────────────────────────────────
   FAQ DATA — services-specific
───────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What types of projects does Avinya handle?',
    answer:
      'We take on residential villas and apartments, commercial office and retail spaces, hospitality fit-outs (hotels, restaurants, cafés), and joint venture development projects. Every engagement is handled end-to-end — from concept design through construction handover.',
  },
  {
    question: 'Do you manage the entire project or just construction?',
    answer:
      'We offer complete turnkey design-build delivery. That means we handle architecture, interior design, structural engineering coordination, approvals, procurement, and construction — under a single contract with one point of accountability throughout.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on the project type and scale. A luxury villa typically runs 12–18 months from design sign-off to handover. Commercial fit-outs can be completed in 4–8 months. We provide a detailed, milestone-based project schedule at the proposal stage so you always know exactly where things stand.',
  },
  {
    question: 'How are your fees structured?',
    answer:
      'Our fees are structured transparently based on project scope — either as a percentage of construction value or a fixed-fee arrangement, agreed upfront. We present a full cost breakdown at the proposal stage with no hidden charges. Payment is milestone-linked so you only pay for work completed.',
  },
  {
    question: 'Can you help with government approvals and permits?',
    answer:
      'Yes. We coordinate directly with structural consultants, town planning authorities, and local bodies for all approvals — CMDA/DTCP plan sanctions, building permits, fire NOCs, and occupancy certificates. This is managed as part of our standard service so you never have to chase paperwork.',
  },
  {
    question: 'What makes Avinya different from other build contractors?',
    answer:
      "Our founding team has delivered projects across India, the Middle East, and North America. We bring international construction management standards — rigorous planning, transparent reporting, and quality benchmarks — to every project in Chennai. You get global expertise applied locally.",
  },
  {
    question: 'Do you work on joint venture land development projects?',
    answer:
      'Yes — JV development is one of our core offerings. We partner with landowners to develop residential or mixed-use projects, handling everything from feasibility and design through construction and sales support. We evaluate each site individually and present a clear JV structure before any commitment.',
  },
]

/* ─────────────────────────────────────────────
   RULE DIVIDER
───────────────────────────────────────────── */
function Rule({ isInView, delay = 0 }: { isInView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        height:          1,
        background:      'rgba(255,255,255,0.10)',
        width:           '100%',
        transformOrigin: 'left',
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   CROSS / PLUS ICON
───────────────────────────────────────────── */
function CrossIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform:  isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <line
        x1="0" y1="6" x2="12" y2="6"
        stroke={isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.60)'}
        strokeWidth="1.5"
        style={{ transition: 'stroke 0.25s ease' }}
      />
      <line
        x1="6" y1="0" x2="6" y2="12"
        stroke={isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.60)'}
        strokeWidth="1.5"
        style={{ transition: 'stroke 0.25s ease' }}
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
function AccordionItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  question: string
  answer:   string
  index:    number
  isOpen:   boolean
  onToggle: () => void
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease: EASE }}
    >
      {/* Question row */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="sfaq-item-row"
        style={{
          width:          '100%',
          cursor:         'pointer',
          padding:        '26px 0',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            24,
          userSelect:     'none',
        }}
      >
        {/* Number + question */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    500,
            fontSize:      11,
            color:         'var(--gold, #F5A82A)',
            letterSpacing: '0.14em',
            opacity:       0.7,
            flexShrink:    0,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="sfaq-item-question"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize:   17,
              color:      isOpen || hovered ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.78)',
              lineHeight: 1.4,
              flex:       1,
              transition: 'color 0.25s ease',
            }}
          >
            {question}
          </span>
        </div>

        {/* Circle toggle */}
        <div
          className="sfaq-circle"
          style={{
            width:          36,
            height:         36,
            flexShrink:     0,
            borderRadius:   '50%',
            border:         isOpen
              ? '1px solid var(--gold)'
              : hovered
                ? '1px solid rgba(245,168,42,0.55)'
                : '1px solid rgba(255,255,255,0.25)',
            background:     isOpen
              ? 'rgba(245,168,42,0.10)'
              : hovered
                ? 'rgba(245,168,42,0.06)'
                : 'transparent',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            transition:     'border-color 0.25s ease, background 0.25s ease',
          }}
        >
          <CrossIcon isOpen={isOpen} />
        </div>
      </div>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    400,
              fontSize:      15,
              color:         'rgba(255,255,255,0.52)',
              lineHeight:    1.78,
              maxWidth:      560,
              paddingBottom: 28,
              paddingRight:  60,
              paddingLeft:   32,
              margin:        0,
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ServicesFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sectionRef   = useRef<HTMLElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const labelRef     = useRef<HTMLDivElement>(null)

  const isInView      = useInView(accordionRef, { once: true, margin: '-60px 0px' })
  const isLabelInView = useInView(labelRef,     { once: true, margin: '-60px 0px' })

  /* Label parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const labelY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  const handleToggle = (i: number) =>
    setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section
      ref={sectionRef}
      className="sfaq-section"
      style={{
        background: '#111111',
        width:      '100%',
        position:   'relative',
        overflow:   'hidden',
        padding:    '120px 0 100px 0',
      }}
    >
      {/* Atmospheric radial glow */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        0,
          background:    'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,168,42,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Top eyebrow rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isLabelInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          height:          1,
          background:      'rgba(255,255,255,0.06)',
          width:           '100%',
          transformOrigin: 'left',
          position:        'absolute',
          top:             0,
        }}
      />

      {/* Content wrapper */}
      <div
        className="sfaq-wrapper"
        style={{
          maxWidth:   1320,
          margin:     '0 auto',
          padding:    '0 64px',
          position:   'relative',
          zIndex:     1,
          display:    'flex',
          alignItems: 'flex-start',
          gap:        '6%',
        }}
      >
        {/* ════════ LEFT — monumental FAQ label ════════ */}
        <div
          ref={labelRef}
          className="sfaq-left"
          style={{
            width:    '35%',
            flexShrink: 0,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           10,
              marginBottom:  28,
            }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--gold, #F5A82A)' }} />
            <span style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    600,
              fontSize:      11,
              color:         'var(--gold, #F5A82A)',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.18em',
            }}>
              FAQ
            </span>
          </motion.div>

          {/* Monumental "?" label */}
          <div style={{ position: 'sticky', top: '24vh' }}>
            <motion.span
              style={{
                y:             labelY,
                fontFamily:    'var(--font-body)',
                fontWeight:    800,
                fontSize:      'clamp(120px, 14vw, 200px)',
                lineHeight:    0.85,
                letterSpacing: '-0.04em',
                color:         'rgba(255,255,255,0.06)',
                textTransform: 'uppercase' as const,
                userSelect:    'none',
                pointerEvents: 'none',
                display:       'block',
              }}
            >
              ?
            </motion.span>

            {/* Subtitle below */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              style={{
                fontFamily:  'var(--font-body)',
                fontWeight:  400,
                fontSize:    15,
                color:       'rgba(255,255,255,0.38)',
                lineHeight:  1.7,
                maxWidth:    240,
                marginTop:   32,
                marginBottom: 0,
              }}
            >
              Common questions about how we work, what we build, and what to expect.
            </motion.p>
          </div>
        </div>

        {/* ════════ RIGHT — Accordion ════════ */}
        <div
          ref={accordionRef}
          className="sfaq-right"
          style={{ flex: 1 }}
        >
          {/* Top rule */}
          <Rule isInView={isInView} delay={0} />

          {FAQS.map((faq, i) => (
            <div key={i}>
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                isInView={isInView}
              />
              <Rule isInView={isInView} delay={0.04 + i * 0.06} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        /* ── Tablet ── */
        @media (max-width: 1023px) {
          .sfaq-wrapper {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 0 48px !important;
          }
          .sfaq-left {
            width: 100% !important;
            margin-bottom: 48px !important;
          }
          .sfaq-right {
            width: 100% !important;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .sfaq-section {
            padding: 80px 0 72px 0 !important;
          }
          .sfaq-wrapper {
            padding: 0 20px !important;
          }
          .sfaq-left {
            margin-bottom: 40px !important;
          }
          .sfaq-item-row {
            padding: 20px 0 !important;
          }
          .sfaq-item-question {
            font-size: 15px !important;
          }
          .sfaq-circle {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
