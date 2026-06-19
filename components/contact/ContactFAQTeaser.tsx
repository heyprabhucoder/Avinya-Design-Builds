'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as const

const FAQS = [
  {
    num: '01',
    question: 'What happens after I submit the form?',
    answer:
      'Sanjai or Anjana will personally review your enquiry and reach out within one business day to schedule an initial consultation call. There is no obligation — just a conversation about your project.',
  },
  {
    num: '02',
    question: 'Is the initial consultation free?',
    answer:
      'Yes. Our initial consultation is completely free. We use this time to understand your project, share our process and approach, and determine how Avinya can best support your goals.',
  },
  {
    num: '03',
    question: 'What information should I prepare?',
    answer:
      "It helps to have a rough idea of your project type, location, timeline, and budget range. But don't worry — even if you're at the early idea stage, we're happy to help you think it through from the beginning.",
  },
  {
    num: '04',
    question: 'Do you take projects outside Chennai?',
    answer:
      "Chennai and Tamil Nadu are our primary markets. We also consider select projects elsewhere in India where our expertise and team are the right fit. Reach out and we'll let you know.",
  },
]

export default function ContactFAQTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        width:      '100%',
        padding:    '100px 0 110px 0',
      }}
    >
      <div className="cfaq-outer">

        {/* ── Section header ── */}
        <div className="cfaq-header">

          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0, ease: EASE }}
          >
            {/* Eyebrow */}
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              marginBottom: 14,
            }}>
              <div style={{
                width:        10,
                height:       10,
                background:   'var(--gold, #F5A82A)',
                borderRadius: 2,
                flexShrink:   0,
              }} />
              <span style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    500,
                fontSize:      11,
                color:         'var(--mist, #8A8A8A)',
                textTransform: 'uppercase',
                letterSpacing: '0.20em',
              }}>
                BEFORE YOU REACH OUT
              </span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    800,
              fontSize:      'clamp(36px, 3.8vw, 52px)',
              color:         'var(--navy, #1B2F4E)',
              lineHeight:    1.0,
              letterSpacing: '-0.025em',
              margin:        0,
            }}>
              Common questions<br />
              about working with us.
            </h2>
          </motion.div>

          {/* Right side — "More questions?" link */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="cfaq-more-wrap"
          >
            <Link
              href="/#faq"
              className="cfaq-more-link"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            8,
                fontFamily:     'var(--font-body)',
                fontWeight:     500,
                fontSize:       14,
                color:          'var(--mist, #8A8A8A)',
                textDecoration: 'none',
                transition:     'color 0.2s ease',
              }}
            >
              More questions?
              <span className="cfaq-arrow">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ── 2×2 FAQ grid ── */}
        <div className="cfaq-grid">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
              style={{
                background: '#FFFFFF',
                padding:    '36px 32px',
              }}
            >
              {/* Question number */}
              <div style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    700,
                fontSize:      11,
                color:         'var(--gold, #F5A82A)',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                marginBottom:  14,
              }}>
                {faq.num}
              </div>

              {/* Question */}
              <h3 style={{
                fontFamily:   'var(--font-body)',
                fontWeight:   700,
                fontSize:     18,
                color:        'var(--navy, #1B2F4E)',
                lineHeight:   1.3,
                marginBottom: 16,
              }}>
                {faq.question}
              </h3>

              {/* Answer */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   15,
                color:      '#555555',
                lineHeight: 1.75,
                margin:     0,
              }}>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .cfaq-outer {
          max-width: 1320px;
          margin:    0 auto;
          padding:   0 64px;
        }

        /* Header row */
        .cfaq-header {
          display:         flex;
          justify-content: space-between;
          align-items:     flex-end;
          margin-bottom:   52px;
          gap:             40px;
        }

        /* "More questions?" link hover */
        .cfaq-more-link:hover {
          color: var(--navy) !important;
        }
        .cfaq-arrow {
          display:    inline-flex;
          transition: transform 0.2s ease, color 0.2s ease;
          color:      var(--mist, #8A8A8A);
        }
        .cfaq-more-link:hover .cfaq-arrow {
          transform: translateX(4px);
          color:     var(--gold, #F5A82A);
        }

        /* 2×2 grid — hairline dividers via background */
        .cfaq-grid {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          gap:                   2px;
          background:            #E8E4DC;
        }

        /* Tablet */
        @media (max-width: 1023px) and (min-width: 640px) {
          .cfaq-outer  { padding: 0 40px; }
          .cfaq-grid   { grid-template-columns: 1fr 1fr; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          section[data-cfaq] { padding: 72px 0 80px 0 !important; }
          .cfaq-outer  { padding: 0 24px; }
          .cfaq-header {
            flex-direction:  column;
            align-items:     flex-start;
          }
          .cfaq-more-wrap { align-self: flex-start; }
        }

        /* Small mobile — single column grid */
        @media (max-width: 639px) {
          .cfaq-grid { grid-template-columns: 1fr; gap: 1px; }
          .cfaq-grid > div { padding: 24px 20px; }
        }
      `}</style>
    </section>
  )
}
