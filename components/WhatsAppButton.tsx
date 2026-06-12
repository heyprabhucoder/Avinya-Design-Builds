'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ─── Spring eases ─── */
const SPRING  = [0.34, 1.56, 0.64, 1] as const  // bouncy — expand & hover
const CLEAN   = [0.4,  0,    0.2,  1] as const  // smooth — collapse

/* ─── WhatsApp SVG icon ─── */
function WhatsAppSVGIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 28 28"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="14" cy="14" r="14" fill="white" />
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M14 4C8.477 4 4 8.477 4 14c0 1.787.472 3.463 1.295 4.91L4 24l5.26-1.273A9.953 9.953 0 0014 24c5.523 0 10-4.477 10-10S19.523 4 14 4zm-2.447 5.4c-.22-.497-.452-.507-.661-.516L10.24 8.88c-.22 0-.571.083-.87.413-.298.33-1.14 1.114-1.14 2.716s1.167 3.147 1.33 3.364c.162.219 2.245 3.594 5.533 4.894 2.736 1.08 3.29.865 3.884.811.594-.054 1.916-.784 2.185-1.54.269-.757.269-1.406.188-1.54-.08-.134-.298-.216-.621-.378s-1.916-.946-2.214-1.053c-.299-.108-.516-.162-.732.162-.216.323-.838 1.053-.838 1.053s-.19.216-.54.054c-.352-.162-1.486-.548-2.83-1.748-1.046-.932-1.752-2.083-1.96-2.436-.207-.352-.022-.543.155-.719.16-.158.352-.412.528-.618.175-.207.232-.352.352-.594z"
        fill="#25D366"
      />
    </svg>
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded]   = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  /* Pending timers — cleared on unmount / hover override */
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loopTimer     = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAll = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
    if (loopTimer.current)     clearTimeout(loopTimer.current)
  }

  /* ── Respect prefers-reduced-motion ── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* ── Auto-loop ── */
  const scheduleExpand = (afterMs: number) => {
    loopTimer.current = setTimeout(() => {
      setIsExpanded(true)
      collapseTimer.current = setTimeout(() => {
        setIsExpanded(false)
      }, 1600)
    }, afterMs)
  }

  useEffect(() => {
    if (reducedMotion) return
    scheduleExpand(1500)               // initial expand 1.5s after mount
    return clearAll
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    if (isExpanded) return             // only arm when collapsed
    scheduleExpand(5000)               // re-expand 5s after each collapse
    return clearAll
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, reducedMotion])

  /* ── Hover handlers ── */
  const handleMouseEnter = () => {
    clearAll()
    setIsExpanded(true)
  }
  const handleMouseLeave = () => {
    clearAll()
    loopTimer.current = setTimeout(() => setIsExpanded(false), 800)
  }

  return (
    /* ── Entrance slide-up wrapper ── */
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: SPRING }}
      className="wa-wrapper"
    >
      {/* ── Pulse ring (circle state only) ── */}
      <AnimatePresence>
        {!isExpanded && !reducedMotion && (
          <motion.div
            key="pulse"
            style={{
              position:      'absolute',
              inset:         -4,
              borderRadius:  '50%',
              border:        '2px solid rgba(37,211,102,0.5)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.0 }}
          />
        )}
      </AnimatePresence>

      {/* ── The pill button ── */}
      <motion.a
        href="https://wa.me/919159455001?text=Hello%2C%20I%27m%20interested%20in%20your%20construction%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Avinya on WhatsApp"
        title="Chat on WhatsApp — +91 91594 55001"
        className="wa-btn"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: isExpanded ? 220 : 56 }}
        whileHover={{ scale: 1.04 }}
        transition={{
          width: {
            duration: isExpanded ? 0.55 : 0.45,
            ease:     isExpanded ? SPRING : CLEAN,
          },
          scale: { duration: 0.2 },
        }}
      >
        <WhatsAppSVGIcon size={28} />

        <AnimatePresence>
          {isExpanded && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x:  0 }}
              exit={{    opacity: 0, x: -8 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    600,
                fontSize:      14,
                color:         '#FFFFFF',
                whiteSpace:    'nowrap',
                overflow:      'hidden',
                letterSpacing: '0.01em',
              }}
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>

      {/* ─── Scoped CSS ─── */}
      <style>{`
        .wa-wrapper {
          position:   fixed;
          bottom:     32px;
          right:      32px;
          z-index:    999;
          /* relative so pulse ring positions against this */
          display:    flex;
          align-items: center;
          justify-content: flex-end;
        }

        .wa-btn {
          height:        56px;
          border-radius: 999px;
          background:    #25D366;
          border:        2.5px solid #000;
          overflow:      hidden;
          display:       flex;
          align-items:   center;
          gap:           10px;
          padding:       0 14px 0 12px;
          cursor:        pointer;
          text-decoration: none;
          box-shadow:    0 4px 20px rgba(0,0,0,0.18), 0 2px 8px rgba(37,211,102,0.3);
          /* position handled by parent wrapper */
        }

        /* Mobile overrides */
        @media (max-width: 767px) {
          .wa-wrapper {
            bottom: 24px;
            right:  20px;
          }
          .wa-btn {
            height: 52px;
          }
        }
      `}</style>
    </motion.div>
  )
}
