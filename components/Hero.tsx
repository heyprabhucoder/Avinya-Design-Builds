'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import TextReveal from './TextReveal'

/* ─── Frame path helper ─── */
const TOTAL_FRAMES = 151
const framePath = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

const EASE = [0.4, 0, 0.2, 1] as const

/* ─── Breakpoint hook ─── */
function useBreakpoint() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const set = () => setWidth(window.innerWidth)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  return {
    isMobile:  width > 0 && width < 640,
    isTablet:  width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  }
}

export default function Hero() {
  const sectionRef      = useRef<HTMLDivElement>(null)
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const framesRef       = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)

  const [loadedCount,     setLoadedCount]     = useState(0)
  const [firstFrameReady, setFirstFrameReady] = useState(false)
  const [allLoaded,       setAllLoaded]       = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [btnHovered,      setBtnHovered]      = useState(false)

  const { isMobile, isTablet } = useBreakpoint()

  /* ─── Scroll progress ─── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const beat1Opacity  = useTransform(scrollYProgress, [0.18, 0.28], [1, 0])
  const beat1Y        = useTransform(scrollYProgress, [0.18, 0.28], [0, -24])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.12],  [1, 0])
  const arrowOpacity  = useTransform(scrollYProgress, [0, 0.08],   [1, 0])
  const beat3Opacity  = useTransform(scrollYProgress, [0.78, 0.87], [0, 1])
  const beat3Y        = useTransform(scrollYProgress, [0.78, 0.87], [20, 0])

  /* ─── Draw (cover-fit) ─── */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    const img    = framesRef.current[index]
    if (!ctx || !img || !canvas) return
    const { width, height } = canvas
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
    const x = (width  - img.naturalWidth  * scale) / 2
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
      img.src   = framePath(i)
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

  useEffect(() => {
    if (firstFrameReady) drawFrame(0)
  }, [firstFrameReady]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Canvas resize ─── */
  useEffect(() => {
    if (!firstFrameReady) return
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width  = window.innerWidth
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawFrame(120)
      return
    }
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end:   'bottom bottom',
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

  /* ─── Responsive values ─── */
  // Horizontal padding for text content
  const hPad        = isMobile ? '20px' : isTablet ? '32px' : '48px'
  // Bottom anchor for headline block
  const headlineBottom = isMobile ? 180 : isTablet ? 200 : 220
  // Bottom anchor for body+CTA block
  const bodyBottom  = isMobile ? 16 : isTablet ? 40 : 64
  // Left edge for body+CTA
  const bodyLeft    = isMobile ? 20 : isTablet ? 32 : 48
  // Max-width of body paragraph
  const bodyMaxW    = isMobile ? '100%' : 440
  // Body font size
  const bodyFontSz  = isMobile ? 14 : 17
  // Button padding
  const btnPad      = isMobile ? '11px 20px' : '14px 28px'
  // Button font size
  const btnFontSz   = isMobile ? 13 : 15
  // Scroll arrow position
  const arrowRight  = isMobile ? 20 : isTablet ? 32 : 48

  return (
    <>
      {/* ════ Loading Screen ════ */}
      <AnimatePresence>
        {!firstFrameReady && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position:       'fixed',
              inset:          0,
              zIndex:         9999,
              background:     'var(--navy)',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            28,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(245,168,42,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
              {Array.from("AVINYA").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: isMobile ? 24 : 32,
                    letterSpacing: '0.18em',
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              style={{
                width:        220,
                height:       1,
                background:   'rgba(255,255,255,0.12)',
                position:     'relative',
                overflow:     'hidden',
                zIndex:       1,
              }}
            >
              <div
                style={{
                  height:       '100%',
                  width:        `${progress}%`,
                  background:   'var(--gold)',
                  transition:   'width 0.15s ease-out',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      11,
                  color:         'rgba(255,255,255,0.45)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Preparing Experience
              </span>
              <span
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      13,
                  fontWeight:    500,
                  color:         'var(--gold)',
                  letterSpacing: '0.08em',
                }}
              >
                {Math.round(progress)}%
              </span>
            </motion.div>
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
            top:      0,
            width:    '100vw',
            height:   '100vh',
            display:  'block',
            zIndex:   1,
          }}
        />

        {/* ── Overlays (sticky, rides the canvas exactly) ── */}
        <div
          style={{
            position:      'sticky',
            top:           0,
            height:        '100vh',
            width:         '100%',
            zIndex:        10,
            pointerEvents: 'none',
            marginTop:     '-100vh',
          }}
        >
          {/* ── Gradient scrim — taller on mobile so text stays readable ── */}
          <div
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     isMobile ? '80%' : '65%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)',
              zIndex:         2,
              pointerEvents:  'none',
            }}
          />

          {/* ── Black overlay ── */}
          <motion.div
            style={{
              position:      'absolute',
              inset:         0,
              background:    'rgba(0,0,0,0.55)',
              opacity:       overlayOpacity,
              zIndex:        3,
              pointerEvents: 'none',
            }}
          />

          {/* ════ BEAT 1 — Headline ════ */}
          <motion.div
            style={{
              position:     'absolute',
              bottom:       headlineBottom,
              left:         0,
              right:        0,
              padding:      `0 ${hPad}`,
              zIndex:       5,
              opacity:      beat1Opacity,
              y:            beat1Y,
              marginBottom: 27,
            }}
          >
            {/* Line 1 */}
            <h1
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    300,
                /* clamp: 32px on tiny screens → 10vw → 80px cap */
                fontSize:      'clamp(32px, 8.5vw, 80px)',
                lineHeight:    0.95,
                color:         '#fff',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                /* allow wrapping on mobile instead of overflow */
                whiteSpace:    isMobile ? 'normal' : 'nowrap',
                margin:        0,
              }}
            >
              <TextReveal text="INTERNATIONAL STANDARDS," type="chars" delay={0.3} duration={1.0} stagger={0.02} />
            </h1>

            {/* Line 2 */}
            <h1
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    300,
                fontSize:      'clamp(32px, 8.5vw, 80px)',
                lineHeight:    0.95,
                color:         '#fff',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                whiteSpace:    isMobile ? 'normal' : 'nowrap',
                margin:        0,
              }}
            >
              <TextReveal text="DELIVERED LOCALLY." type="chars" delay={0.5} duration={1.0} stagger={0.02} />
            </h1>
          </motion.div>

          {/* ── Body text + CTAs ── */}
          <motion.div
            style={{
              position:      'absolute',
              bottom:        bodyBottom,
              left:          bodyLeft,
              right:         isMobile ? bodyLeft : 'auto',   // full-width on mobile
              zIndex:        5,
              maxWidth:      bodyMaxW,
              opacity:       beat1Opacity,
              pointerEvents: 'auto',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   bodyFontSz,
                color:      'rgba(255,255,255,0.80)',
                lineHeight: 1.65,
                margin:     0,
              }}
            >
              <TextReveal
                text="Bringing North American construction management standards to residential, commercial, and hospitality developments across India."
                type="words"
                delay={0.7}
                duration={0.8}
                stagger={0.03}
              />
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              style={{
                marginTop: 20,
                display:   'flex',
                gap:       12,
                flexWrap:  'wrap',
              }}
            >
              <Link
                href="/contact"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  position:      'relative',
                  display:       'inline-flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  background:    'var(--gold)',
                  color:         'var(--navy)',
                  borderRadius:  999,
                  padding:       btnPad,
                  fontFamily:    'var(--font-body)',
                  fontWeight:    600,
                  fontSize:      btnFontSz,
                  border:        'none',
                  cursor:        'pointer',
                  textDecoration:'none',
                  whiteSpace:    'nowrap',
                  overflow:      'hidden',
                  transition:    'transform 0.2s ease',
                  transform:     btnHovered ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    color: btnHovered ? '#FFFFFF' : 'var(--navy)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Request Consultation
                </span>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: btnHovered ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--navy)',
                    transformOrigin: 'bottom',
                    zIndex: 1,
                  }}
                />
              </Link>

              <Link
                href="/services"
                style={{
                  display:       'inline-flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  background:   'transparent',
                  color:        '#fff',
                  border:       '1.5px solid rgba(255,255,255,0.50)',
                  borderRadius: 999,
                  padding:      btnPad,
                  fontFamily:   'var(--font-body)',
                  fontWeight:   500,
                  fontSize:     btnFontSz,
                  cursor:       'pointer',
                  transition:   'border-color 0.2s ease',
                  textDecoration:'none',
                  whiteSpace:   'nowrap',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.90)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.50)')
                }
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Scroll arrow ── */}
          <motion.div
            style={{
              position:      'absolute',
              bottom:        28,
              right:         arrowRight,
              zIndex:        5,
              opacity:       arrowOpacity,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={isMobile ? 16 : 20} color="white" style={{ opacity: 0.6 }} />
            </motion.div>
          </motion.div>

          {/* ════ BEAT 3 — Stat capsule ════ */}
          <motion.div
            style={{
              position:      'absolute',
              bottom:        isMobile ? 16 : isTablet ? 36 : 56,
              /* anchor to both edges so the pill never overflows */
              left:          isMobile ? 16 : isTablet ? 32 : '50%',
              right:         isMobile ? 16 : isTablet ? 32 : 'auto',
              transform:     isMobile || isTablet ? 'none' : 'translateX(-50%)',
              zIndex:        5,
              opacity:       beat3Opacity,
              y:             beat3Y,
              pointerEvents: 'none',
              /* cap desktop width so it never stretches too wide */
              maxWidth:      isMobile || isTablet ? 'none' : 640,
            }}
          >
            <div
              style={{
                backdropFilter:       'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                background:    'rgba(255,255,255,0.10)',
                border:        '1px solid rgba(255,255,255,0.18)',
                borderRadius:  999,
                padding:       isMobile ? '14px 20px' : isTablet ? '18px 32px' : '24px 52px',
                /* CSS grid: 3 stat cols + 2 dividers, dividers are fixed 1px */
                display:              'grid',
                gridTemplateColumns:  '1fr 1px 1fr 1px 1fr',
                alignItems:           'center',
                gap:                  isMobile ? 12 : isTablet ? 20 : 32,
                width:                '100%',
              }}
            >
              <StatCol number="50+"  label="Projects" />
              <Divider />
              <StatCol number="15+"  label={isMobile ? 'Yrs Exp.' : 'Years Experience'} />
              <Divider />
              <StatCol number="100%" label={isMobile ? 'On-Time' : 'On-Time Delivery'} />
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
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            3,
        minWidth:       0,   /* allow grid cell to shrink */
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          /* fluid: 28px on smallest screens → grows with viewport → 52px max */
          fontSize:   'clamp(28px, 4.5vw, 52px)',
          color:      '#fff',
          lineHeight: 1,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    400,
          fontSize:      'clamp(8px, 1.1vw, 11px)',
          color:         'rgba(255,255,255,0.60)',
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          textAlign:     'center',
          whiteSpace:    'nowrap',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          maxWidth:      '100%',
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
        width:      '1px',
        height:     'clamp(24px, 3vw, 40px)' as string,
        background: 'rgba(255,255,255,0.18)',
        alignSelf:  'center',
        flexShrink: 0,
        justifySelf: 'center',
      }}
    />
  )
}
