import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function AboutPage() {
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
          About Us
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
          About page coming soon.
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
          We’re putting the finishing touches on our story, team, and process.
          Visit again soon or get in touch directly for project consultation.
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
          <Link
            href="/"
            style={{
              padding: '14px 28px',
              borderRadius: 999,
              background: 'var(--navy)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
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
