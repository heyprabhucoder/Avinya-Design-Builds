'use client'

import { useEffect } from 'react'

export default function LenisProvider() {
  useEffect(() => {
    let lenis: any
    let rafId: number

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return null
}
