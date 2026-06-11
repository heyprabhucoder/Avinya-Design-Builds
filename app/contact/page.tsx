import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '100px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F8F7F3',
        color: '#1A1A1A',
      }}
    >
      <div style={{ maxWidth: 760, textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B58126',
            marginBottom: 18,
          }}
        >
          Contact Us
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 64px)',
            margin: 0,
            color: 'var(--navy)',
            lineHeight: 1.05,
          }}
        >
          Request consultation.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.8,
            color: '#4F4F4F',
          }}
        >
          Our contact page is being updated. In the meantime, email us directly to book a consultation and discuss your project.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 36,
          }}
        >
          <CTAButton href="mailto:info@avinyadesignbuild.com?subject=Request%20Consultation" label="Email request" variant="outline" />
          <Link
            href="/"
            style={{
              padding: '14px 28px',
              borderRadius: 999,
              background: 'transparent',
              border: '1.5px solid var(--navy)',
              color: 'var(--navy)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
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
