'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

/* ─── Frame path helper ─── */
const TOTAL_FRAMES = 240
const framePath = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

const EASE = [0.4, 0, 0.2, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)

  const [loadedCount, setLoadedCount] = useState(0)
  const [firstFrameReady, setFirstFrameReady] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  /* ─── Scroll progress for overlay animations ─── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  /* ─── Beat 1: headline + body fade out ─── */
  const beat1Opacity = useTransform(scrollYProgress, [0.18, 0.28], [1, 0])
  const beat1Y = useTransform(scrollYProgress, [0.18, 0.28], [0, -24])

  /* ─── Black overlay behind hero text; fades quickly on first scroll ─── */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  /* ─── Scroll arrow: vanishes at 8% ─── */
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  /* ─── Beat 3: stat capsule fades in ─── */
  const beat3Opacity = useTransform(scrollYProgress, [0.78, 0.87], [0, 1])
  const beat3Y = useTransform(scrollYProgress, [0.78, 0.87], [20, 0])

  /* ─── Draw function (cover-fit) ─── */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = framesRef.current[index]
    if (!ctx || !img || !canvas) return
    const { width, height } = canvas
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
    const x = (width - img.naturalWidth * scale) / 2
    const y = (height - img.naturalHeight * scale) / 2
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }

  /* ─── Preload frames ─── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = framePath(i)
      const idx = i
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (idx === 0) setFirstFrameReady(true)
        if (loaded === TOTAL_FRAMES) setAllLoaded(true)
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) setAllLoaded(true)
      }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  /* ─── Draw frame 0 as soon as it's ready ─── */
  useEffect(() => {
    if (firstFrameReady) drawFrame(0)
  }, [firstFrameReady]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Canvas resize ─── */
  useEffect(() => {
    if (!firstFrameReady) return
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [firstFrameReady]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── GSAP ScrollTrigger scrub ─── */
  useEffect(() => {
    if (!firstFrameReady) return

    /* prefers-reduced-motion: show frame 120 statically */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawFrame(120)
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * (TOTAL_FRAMES - 1))
          currentFrameRef.current = frame
          drawFrame(frame)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [firstFrameReady]) // eslint-disable-line react-hooks/exhaustive-deps

  const progress = (loadedCount / TOTAL_FRAMES) * 100

  return (
    <>
      {/* ════ Loading Screen ════ */}
      <AnimatePresence>
        {!firstFrameReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'var(--navy)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            {/* Wordmark */}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '0.16em',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              AVINYA
            </span>

            {/* Progress bar */}
            <div
              style={{
                width: 200,
                height: 2,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--gold)',
                  borderRadius: 999,
                  transition: 'width 0.1s ease',
                }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'rgba(255,255,255,0.40)',
                letterSpacing: '0.08em',
              }}
            >
              {Math.round(progress)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ Hero Section ════ */}
      <section
        ref={sectionRef}
        style={{ position: 'relative', height: '350vh', width: '100%' }}
      >
        {/* ── Canvas (sticky, full-viewport) ── */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'sticky',
            top: 0,
            width: '100vw',
            height: '100vh',
            display: 'block',
            zIndex: 1,
          }}
        />

        {/* ── Overlays (sticky, rides the canvas exactly) ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 10,
            pointerEvents: 'none',
            /* negative margin to stack on top of canvas */
            marginTop: '-100vh',
          }}
        >
          {/* ── Gradient scrim ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '65%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 40%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* ── Black overlay behind hero text ── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              opacity: overlayOpacity,
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* ════ BEAT 1 — Headline + Body (scroll 0%–25%) ════ */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 220,
              left: 0,
              right: 0,
              padding: '0 48px',
              zIndex: 5,
              opacity: beat1Opacity,
              y: beat1Y,
              marginBottom: 27,
            }}
          >
            {/* Line 1 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(64px, 10vw, 80px)',
                  lineHeight: 0.9,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                INTERNATIONAL STANDARDS,
              </h1>
            </motion.div>

            {/* Line 2 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(64px, 10vw, 80px)',
                  lineHeight: 0.9,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                DELIVERED LOCALLY.
              </h1>
            </motion.div>
          </motion.div>

          {/* ── Body text + CTAs ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 64,
              left: 48,
              zIndex: 5,
              maxWidth: 440,
              opacity: beat1Opacity,
              pointerEvents: 'auto',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 17,
                color: 'rgba(255,255,255,0.80)',
                lineHeight: 1.65,
              }}
            >
              Bringing North American construction management standards to residential,
              commercial, and hospitality developments across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              style={{
                marginTop: 24,
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  borderRadius: 999,
                  padding: '14px 28px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement
                  btn.style.filter = 'brightness(1.08)'
                  btn.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement
                  btn.style.filter = 'brightness(1)'
                  btn.style.transform = 'scale(1)'
                }}
              >
                Request Consultation
              </button>

              <button
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.50)',
                  borderRadius: 999,
                  padding: '14px 28px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.90)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.50)')
                }
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>

          {/* ── Scroll arrow ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 28,
              right: 48,
              zIndex: 5,
              opacity: arrowOpacity,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} color="white" style={{ opacity: 0.6 }} />
            </motion.div>
          </motion.div>

          {/* ════ BEAT 3 — Stat capsule (scroll 75%–100%) ════ */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 56,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              opacity: beat3Opacity,
              y: beat3Y,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 999,
                padding: '24px 52px',
                display: 'flex',
                gap: 48,
                alignItems: 'center',
              }}
            >
              <StatCol number="50+" label="Projects" />
              <Divider />
              <StatCol number="15+" label="Years Experience" />
              <Divider />
              <StatCol number="100%" label="On-Time Delivery" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

/* ─── Sub-components ─── */
function StatCol({ number, label }: { number: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 52,
          color: '#fff',
          lineHeight: 1,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 11,
          color: 'rgba(255,255,255,0.60)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 40,
        background: 'rgba(255,255,255,0.18)',
        alignSelf: 'center',
        flexShrink: 0,
      }}
    />
  )
}
