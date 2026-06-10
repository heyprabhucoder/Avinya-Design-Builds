import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Avinya Design & Build Pvt Ltd — International Standards, Delivered Locally',
  description:
    'Bringing North American construction management standards to residential, commercial, and hospitality developments across India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
