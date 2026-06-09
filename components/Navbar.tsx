'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = ['Home', 'Services', 'Projects', 'About', 'Contact']

const EASE = [0.4, 0, 0.2, 1] as const

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ─── Scroll detection ─── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ─── Close menu on resize to desktop ─── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ─── Derived scroll styles ─── */
  const cardBg = isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.12)'
  const cardBorder = isScrolled ? '1px solid rgba(27,47,78,0.12)' : '1px solid rgba(255,255,255,0.20)'
  const linkColor = isScrolled ? 'var(--navy)' : '#fff'
  const hamburgerBorder = isScrolled ? '1px solid rgba(27,47,78,0.15)' : '1px solid rgba(255,255,255,0.20)'
  const iconColor = isScrolled ? 'var(--navy)' : '#fff'
  const panelDivider = isScrolled ? '1px solid rgba(27,47,78,0.10)' : '1px solid rgba(255,255,255,0.15)'
  const menuLinkColor = isScrolled ? 'var(--navy)' : '#fff'

  const transition = `background 0.4s cubic-bezier(0.4,0,0.2,1),
    border 0.4s cubic-bezier(0.4,0,0.2,1),
    color 0.4s cubic-bezier(0.4,0,0.2,1)`

  return (
    <nav
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'calc(100% - 80px)',
        maxWidth: 1320,
        /* On mobile: override via CSS class below */
      }}
      className="navbar-root"
    >
      <div
        style={{
          background: cardBg,
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          border: cardBorder,
          borderRadius: menuOpen ? '16px 16px 16px 16px' : '16px',
          transition,
          overflow: 'hidden',
        }}
      >
        {/* ── Top row ── */}
        <div
          style={{
            position: 'relative',
            height: 72,
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
            <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: '0.12em',
                color: linkColor,
                textTransform: 'uppercase',
                transition: 'color 0.4s cubic-bezier(0.4,0,0.2,1)',
                whiteSpace: 'nowrap',
              }}
            >
              AVINYA
            </span>
          </div>

          {/* RIGHT: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="navbar-cta"
              style={{
                background: 'var(--gold)',
                color: 'var(--navy)',
                borderRadius: 999,
                padding: '12px 24px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 0.2s ease, transform 0.2s ease',
                whiteSpace: 'nowrap',
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
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.10)',
                border: hamburgerBorder,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: `background 0.2s ease, border 0.4s cubic-bezier(0.4,0,0.2,1)`,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)')}
            >
              {menuOpen ? (
                <X size={20} color={iconColor} />
              ) : (
                <Menu size={20} color={iconColor} />
              )}
            </button>
          </div>
        </div>

        {/* ── Dropdown panel ── */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="menu-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  borderTop: panelDivider,
                  padding: '24px 32px 32px 32px',
                }}
              >
                <nav>
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.06,
                        ease: EASE,
                      }}
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        lineHeight: 1.1,
                        color: menuLinkColor,
                        textDecoration: 'none',
                        marginBottom: 8,
                        transition: 'opacity 0.15s ease, color 0.4s cubic-bezier(0.4,0,0.2,1)',
                      }}
                      className="menu-link"
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.55')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Responsive styles ── */}
      <style jsx>{`
        .navbar-root {
          top: 24px;
          width: calc(100% - 80px);
        }
        @media (max-width: 767px) {
          .navbar-root {
            top: 12px !important;
            width: calc(100% - 32px) !important;
          }
          .navbar-cta {
            display: none !important;
          }
        }
        .menu-link {
          font-size: 52px;
        }
        @media (max-width: 767px) {
          .menu-link {
            font-size: 40px !important;
          }
        }
      `}</style>
    </nav>
  )
}
