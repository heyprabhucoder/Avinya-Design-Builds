'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { PhoneCall, ArrowUpRight } from 'lucide-react'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const SPRING    = [0.34, 1.56, 0.64, 1] as const
const EXPO      = [0.16, 1,    0.3,  1] as const
const EASE      = [0.4,  0,    0.2,  1] as const

const LETS_TALK_ITEMS = Array.from({ length: 9 }, () => "LET'S TALK")
const DOUBLED         = [...LETS_TALK_ITEMS, ...LETS_TALK_ITEMS]

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ServicesCTASection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const prefersLess = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#1A1A1A',
        width:      '100%',
        overflow:   'hidden',
        position:   'relative',
      }}
    >
      {/* ══════════════════════════════════════════
          ZONE 1 — Centred contact CTA
      ══════════════════════════════════════════ */}
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
        padding:        '100px 24px 60px 24px',
        position:       'relative',
        zIndex:         2,
      }}>

        {/* ── Animated phone icon ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: SPRING }}
          style={{ marginBottom: 32 }}
        >
          <div style={{
            position:       'relative',
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          80,
            height:         80,
          }}>
            {/* Outer pulse ring */}
            {!prefersLess && (
              <motion.div
                animate={isInView ? { scale: [1, 2.2], opacity: [0.3, 0] } : {}}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position:     'absolute',
                  width:        80,
                  height:       80,
                  borderRadius: '50%',
                  border:       '1.5px solid rgba(255,255,255,0.08)',
                }}
              />
            )}
            {/* Inner pulse ring */}
            {!prefersLess && (
              <motion.div
                animate={isInView ? { scale: [1, 1.6], opacity: [0.5, 0] } : {}}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position:     'absolute',
                  width:        80,
                  height:       80,
                  borderRadius: '50%',
                  border:       '1.5px solid rgba(255,255,255,0.15)',
                }}
              />
            )}
            {/* Phone icon — ringing CSS animation */}
            <span
              className={prefersLess ? undefined : 'phone-icon-wrapper'}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <PhoneCall
                size={48}
                strokeWidth={1.5}
                color="rgba(255,255,255,0.80)"
              />
            </span>
          </div>
        </motion.div>

        {/* ── Body text ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    400,
            fontSize:      17,
            color:         'rgba(255,255,255,0.55)',
            letterSpacing: '0.01em',
            marginBottom:  8,
          }}
        >
          Ready to start your project? Reach out to our team.
        </motion.p>

        {/* ── Gold dot accent ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, ease: SPRING }}
        >
          <motion.div
            animate={!prefersLess ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="scta-gold-dot"
          />
        </motion.div>

        {/* ── Large phone number ── */}
        <motion.a
          href="tel:+919159455001"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EXPO }}
          className="scta-phone-number"
        >
          +91&nbsp;&nbsp;91594&nbsp;&nbsp;55001
        </motion.a>

        {/* ── Secondary CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          className="scta-buttons"
        >
          {/* Button 1 — Schedule consultation */}
          <Link href="/contact" className="scta-btn-primary">
            Schedule a Consultation
            <ArrowUpRight size={15} color="var(--navy, #1B2F4E)" />
          </Link>

          {/* Button 2 — WhatsApp */}
          <a
            href="https://wa.me/919159455001?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="scta-btn-whatsapp"
          >
            <WhatsAppIcon size={18} />
            or chat on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          ZONE 2 — "LET'S TALK" ghost marquee
      ══════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width:    '100%',
        overflow: 'hidden',
        zIndex:   1,
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        >
          <div className="lets-talk-track">
            {DOUBLED.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span className="scta-lets-talk-text">{item}</span>
                <span className="scta-lets-talk-sep">✳</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* Gold dot */
        .scta-gold-dot {
          width:        14px;
          height:       14px;
          border-radius: 50%;
          background:   var(--gold, #F5A82A);
          margin:       10px auto 10px calc(50% - 40px);
          box-shadow:   0 0 12px rgba(245,168,42,0.60);
        }

        /* Phone number */
        .scta-phone-number {
          font-family:    var(--font-body);
          font-weight:    800;
          font-size:      clamp(64px, 10vw, 140px);
          color:          #FFFFFF;
          line-height:    1.0;
          letter-spacing: -0.04em;
          text-decoration: none;
          display:        block;
          cursor:         pointer;
          transition:     color 0.25s ease, text-shadow 0.25s ease;
        }
        .scta-phone-number:hover {
          color:       var(--gold, #F5A82A);
          text-shadow: 0 0 40px rgba(245,168,42,0.25);
        }

        /* Buttons row */
        .scta-buttons {
          display:         flex;
          align-items:     center;
          gap:             16px;
          justify-content: center;
          margin-top:      40px;
        }

        /* Primary button */
        .scta-btn-primary {
          background:     var(--gold, #F5A82A);
          color:          var(--navy, #1B2F4E);
          font-family:    var(--font-body);
          font-weight:    700;
          font-size:      14px;
          padding:        16px 28px;
          border-radius:  8px;
          border:         none;
          cursor:         pointer;
          display:        inline-flex;
          align-items:    center;
          gap:            10px;
          text-decoration:none;
          transition:     background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .scta-btn-primary:hover {
          background:  #E09420;
          transform:   translateY(-2px) scale(1.02);
          box-shadow:  0 6px 24px rgba(245,168,42,0.30);
        }

        /* WhatsApp button */
        .scta-btn-whatsapp {
          display:        inline-flex;
          align-items:    center;
          gap:            8px;
          background:     transparent;
          color:          rgba(255,255,255,0.65);
          font-family:    var(--font-body);
          font-weight:    400;
          font-size:      14px;
          padding:        16px 4px;
          border:         none;
          cursor:         pointer;
          text-decoration:none;
          transition:     color 0.2s ease;
        }
        .scta-btn-whatsapp:hover {
          color: rgba(255,255,255,0.90);
        }

        /* "LET'S TALK" ghost text */
        .scta-lets-talk-text {
          font-family:    var(--font-body);
          font-weight:    900;
          font-size:      clamp(80px, 10vw, 130px);
          color:          rgba(255,255,255,0.07);
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height:    1;
          padding:        0 40px;
        }
        .scta-lets-talk-sep {
          font-size: clamp(20px, 2.5vw, 36px);
          color:     rgba(245,168,42,0.25);
          padding:   0 20px;
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .scta-gold-dot {
            width:  10px;
            height: 10px;
            margin: 10px auto;
          }
          .scta-phone-number {
            font-size: clamp(44px, 12vw, 72px) !important;
          }
          .scta-lets-talk-text {
            font-size: clamp(64px, 14vw, 96px) !important;
          }
          .scta-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .scta-btn-primary {
            width:           100%;
            justify-content: center;
          }
        }

        /* ── Tablet ── */
        @media (max-width: 1023px) and (min-width: 768px) {
          .scta-phone-number {
            font-size: clamp(56px, 9vw, 100px) !important;
          }
        }
      `}</style>
    </section>
  )
}
