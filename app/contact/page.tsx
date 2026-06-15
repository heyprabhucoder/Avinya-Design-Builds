import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import PageTitleBanner from '@/components/PageTitleBanner'
import CTAButton from '@/components/CTAButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us — Avinya Design & Build',
  description:
    'Get in touch with Avinya Design and Build for a consultation on your ' +
    'residential, commercial, or hospitality project in Chennai.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8F7F3', color: '#1A1A1A' }}>
      <Navbar />
      <PageTitleBanner
        eyebrow="Get In Touch"
        title="Contact Us"
        imageSrc="/images/valuepro1.jpeg"
        imageAlt="Avinya design and build team"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
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
          Contact Us
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
          Request consultation.
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
          Our contact page is being updated. In the meantime, email us directly
          to book a consultation and discuss your project.
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
          <CTAButton
            href="mailto:info@avinyadesignbuild.com?subject=Request%20Consultation"
            label="Email request"
            variant="gold"
          />
          <Link
            href="/"
            style={{
              padding:        '14px 28px',
              borderRadius:   999,
              background:     'transparent',
              border:         '1.5px solid var(--navy)',
              color:          'var(--navy)',
              fontFamily:     'var(--font-body)',
              fontWeight:     600,
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
