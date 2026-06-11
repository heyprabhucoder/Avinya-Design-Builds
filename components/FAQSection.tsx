'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import TextReveal from './TextReveal'

/* ─── Constants ─── */
const EASE     = [0.4, 0, 0.2, 1] as const
const EASE_EXP = [0.16, 1, 0.3, 1] as const

/* ─── FAQ data ─── */
const FAQS = [
  {
    question: 'Do you provide both design and construction services?',
    answer:
      'Yes — we offer complete turnkey design-build solutions from initial concept through final occupancy. One team, one contract, full accountability at every stage.',
  },
  {
    question: 'Do you work with landowners on joint venture projects?',
    answer:
      'Yes. We actively partner with landowners for development opportunities across Chennai and Tamil Nadu. We manage everything from land evaluation and feasibility analysis through construction completion and sales support.',
  },
  {
    question: 'Can you assist with approvals and permits?',
    answer:
      'Yes. We coordinate directly with consultants and local authorities throughout the entire approval process — covering municipal, structural, and occupancy requirements.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      "Chennai and Tamil Nadu are our primary markets. We also take select projects elsewhere in India where our expertise, standards, and team are the right fit for the scope.",
  },
]

/* ─── Rule divider ─── */
function Rule({ isInView, delay = 0 }: { isInView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        height:          1,
        background:      'rgba(255,255,255,0.12)',
        width:           '100%',
        transformOrigin: 'left',
      }}
    />
  )
}

/* ─── Cross / Plus SVG icon ─── */
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
      {/* Horizontal bar */}
      <line
        x1="0" y1="6" x2="12" y2="6"
        stroke={isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.70)'}
        strokeWidth="1.5"
        style={{ transition: 'stroke 0.25s ease' }}
      />
      {/* Vertical bar */}
      <line
        x1="6" y1="0" x2="6" y2="12"
        stroke={isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.70)'}
        strokeWidth="1.5"
        style={{ transition: 'stroke 0.25s ease' }}
      />
    </svg>
  )
}

/* ─── Single accordion item ─── */
function AccordionItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: EASE }}
    >
      {/* Question row */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="faq-item-row"
        style={{
          width:          '100%',
          cursor:         'pointer',
          padding:        '28px 0',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            24,
          userSelect:     'none',
        }}
      >
        {/* Question text */}
        <span
          className="faq-item-question"
          style={{
            fontFamily:  'var(--font-body)',
            fontWeight:  400,
            fontSize:    17,
            color:       isOpen || hovered ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.80)',
            lineHeight:  1.4,
            flex:        1,
            transition:  'color 0.25s ease',
          }}
        >
          {question}
        </span>

        {/* Circle toggle button */}
        <div
          className="faq-circle"
          style={{
            width:          36,
            height:         36,
            flexShrink:     0,
            borderRadius:   '50%',
            border:         isOpen
              ? '1px solid var(--gold)'
              : hovered
                ? '1px solid rgba(245,168,42,0.60)'
                : '1px solid rgba(255,255,255,0.30)',
            background:     isOpen
              ? 'rgba(245,168,42,0.12)'
              : hovered
                ? 'rgba(245,168,42,0.08)'
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

      {/* Answer panel — AnimatePresence for height animation */}
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
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontWeight:   400,
                fontSize:     15,
                color:        'rgba(255,255,255,0.55)',
                lineHeight:   1.75,
                maxWidth:     560,
                paddingBottom: 28,
                paddingRight:  60,
                margin:       0,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sectionRef  = useRef<HTMLElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const faqLabelRef  = useRef<HTMLDivElement>(null)

  /* Accordion reveal */
  const isInView = useInView(accordionRef, { once: true, margin: '-60px 0px' })

  /* FAQ label reveal */
  const isFaqLabelInView = useInView(faqLabelRef, { once: true, margin: '-60px 0px' })

  /* FAQ label vertical parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const labelY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      ref={sectionRef}
      className="faq-section"
      style={{
        background: '#0E1117',
        width:      '100%',
        position:   'relative',
        overflow:   'hidden',
        padding:    '120px 0',
      }}
    >
      {/* ── Atmospheric radial glow ── */}
      <div
        aria-hidden
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        0,
          background:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,100,140,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Content wrapper ── */}
      <div
        className="faq-wrapper"
        style={{
          maxWidth:   1320,
          margin:     '0 auto',
          padding:    '0 64px',
          position:   'relative',
          zIndex:     1,
          display:    'flex',
          alignItems: 'flex-start',
          gap:        '7%',
        }}
      >
        {/* ════════ LEFT — Monumental "FAQ" label ════════ */}
        <div
          ref={faqLabelRef}
          className="faq-left"
          style={{
            width:           '38%',
            flexShrink:      0,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'flex-start',
            /* Sticky so it stays visible while accordion scrolls */
            position:        'sticky',
            top:             '30vh',
          }}
        >
          <motion.span
            className="faq-label"
            style={{
              y:             labelY,
              fontFamily:    'var(--font-body)',
              fontWeight:    300,
              fontSize:      'clamp(140px, 16vw, 220px)',
              lineHeight:    0.85,
              letterSpacing: '-0.03em',
              color:         'rgba(255,255,255,0.82)',
              textTransform: 'uppercase' as const,
              userSelect:    'none',
              pointerEvents: 'none',
              display:       'block',
            }}
          >
            <TextReveal text="FAQ" type="chars" delay={0.1} stagger={0.05} />
          </motion.span>
        </div>

        {/* ════════ RIGHT — Accordion ════════ */}
        <div
          ref={accordionRef}
          className="faq-right"
          style={{ flex: 1 }}
        >
          {/* Top rule */}
          <Rule isInView={isInView} delay={0} />

          {/* Accordion items with rules between them */}
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
              {/* Rule after every item (including last) */}
              <Rule isInView={isInView} delay={0.05 + i * 0.08} />
            </div>
          ))}
        </div>
      </div>

      {/* \u2500\u2500\u2500 Responsive CSS \u2500\u2500\u2500 */}
      <style>{`
        /* \u2500\u2500 Tablet: stack vertically \u2500\u2500 */
        @media (max-width: 1023px) {
          .faq-wrapper {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 0 48px !important;
          }
          .faq-left {
            width: 100% !important;
            position: static !important;
            margin-bottom: 48px !important;
          }
          .faq-label {
            font-size: clamp(100px, 18vw, 160px) !important;
          }
          .faq-right {
            width: 100% !important;
          }
        }

        /* \u2500\u2500 Mobile \u2500\u2500 */
        @media (max-width: 767px) {
          .faq-section {
            padding: 80px 0 !important;
          }
          .faq-wrapper {
            padding: 0 20px !important;
          }
          .faq-left {
            margin-bottom: 36px !important;
          }
          .faq-label {
            font-size: clamp(80px, 22vw, 120px) !important;
          }
          .faq-item-row {
            padding: 20px 0 !important;
          }
          .faq-item-question {
            font-size: 15px !important;
          }
          .faq-circle {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
