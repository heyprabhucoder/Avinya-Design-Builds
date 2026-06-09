import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Placeholder section — confirms navbar scroll-state transition after hero */}
      <div
        style={{
          height: '100vh',
          background: 'var(--off-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 300,
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
          }}
        >
          More coming soon.
        </p>
      </div>
    </main>
  )
}
