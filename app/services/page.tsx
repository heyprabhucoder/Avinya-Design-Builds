import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import PageTitleBanner from '@/components/PageTitleBanner'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services — Avinya Design & Build',
  description:
    'Residential, commercial, hospitality, and joint venture construction services ' +
    'delivered with North American standards in Chennai, Tamil Nadu.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8F7F3', color: '#1A1A1A' }}>
      <Navbar />
      <PageTitleBanner
        title="Our Services"
        imageSrc="/images/services1.jpeg"
        imageAlt="Avinya construction and design services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      {/* ── Placeholder body ── */}
      <div
        style={{
          maxWidth:  760,
          margin:    '64px auto',
          padding:   '0 clamp(16px, 4vw, 48px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    700,
            fontSize:      14,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#B58126',
            marginBottom:  18,
          }}
        >
          Services
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize:   'clamp(28px, 4vw, 52px)',
            margin:     0,
            color:      'var(--navy)',
            lineHeight: 1.05,
          }}
        >
          Full-service page coming soon.
        </h2>
        <p
          style={{
            marginTop:  24,
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize:   18,
            lineHeight: 1.8,
            color:      '#4F4F4F',
          }}
        >
          We&apos;re building a dedicated services experience for residential, commercial,
          hospitality, and joint venture projects. Visit our homepage or request a consultation while we finish it.
        </p>
        <div
          style={{
            display:        'flex',
            justifyContent: 'center',
            flexWrap:       'wrap',
            gap:            12,
            marginTop:      36,
          }}
        >
          <Link
            href="/"
            style={{
              padding:        '14px 28px',
              borderRadius:   999,
              background:     'var(--navy)',
              color:          '#FFFFFF',
              fontFamily:     'var(--font-body)',
              fontWeight:     600,
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
          <CTAButton href="/contact" label="Request consultation" variant="outline" />
        </div>
      </div>
    </main>
  )
}
