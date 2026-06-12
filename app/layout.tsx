import type { Metadata } from 'next'
import './globals.css'
import LenisProvider    from '@/components/LenisProvider'
import WhatsAppButton   from '@/components/WhatsAppButton'
import { Analytics }    from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.avinyadesignbuild.com'),

  /* ── Primary ── */
  title: {
    default: 'Construction Company in Chennai | Avinya Design and Build Pvt Ltd',
    template: '%s | Avinya Design and Build',
  },
  description:
    'Avinya Design and Build is a leading construction company in Chennai offering luxury home construction, villa building, commercial construction, hotel & restaurant fit-outs, joint venture development, and professional construction management — all delivered to international standards.',
  keywords: [
    'construction company Chennai',
    'design build company Chennai',
    'luxury home builder Chennai',
    'villa construction Chennai',
    'commercial construction Chennai',
    'hotel construction Chennai',
    'restaurant construction Chennai',
    'joint venture development Chennai',
    'construction management Chennai',
    'apartment builder Chennai',
    'Avinya Design and Build',
    'best construction company Chennai',
    'residential construction Chennai',
    'hospitality construction Chennai',
    'turnkey construction Chennai',
  ],
  authors: [{ name: 'Avinya Design and Build Pvt Ltd', url: 'https://www.avinyadesignbuild.com' }],
  creator: 'Avinya Design and Build Pvt Ltd',
  publisher: 'Avinya Design and Build Pvt Ltd',

  /* ── Canonical ── */
  alternates: {
    canonical: 'https://www.avinyadesignbuild.com',
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.avinyadesignbuild.com',
    siteName: 'Avinya Design and Build Pvt Ltd',
    title: 'Construction Company in Chennai | Avinya Design and Build Pvt Ltd',
    description:
      'Premium design-build firm in Chennai. Luxury homes, villas, commercial spaces, hotels, restaurants & joint venture developments — delivered with international standards.',
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Company in Chennai | Avinya Design and Build Pvt Ltd',
    description:
      'Premium design-build firm in Chennai. Luxury homes, villas, commercial spaces, hotels, restaurants & joint venture developments.',
    creator: '@avinyadesignbuild',
  },

  /* ── App / PWA ── */
  applicationName: 'Avinya Design and Build',
  category: 'Construction & Real Estate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <body>
        <LenisProvider />
        {children}
        <Analytics />
        <SpeedInsights />
        <WhatsAppButton />
      </body>
    </html>
  )
}
