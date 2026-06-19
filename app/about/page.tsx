import type { Metadata } from 'next'
import Navbar              from '@/components/Navbar'
import PageTitleBanner     from '@/components/PageTitleBanner'
import AboutMainSection    from '@/components/about/AboutMainSection'
import MarqueeStrip        from '@/components/MarqueeStrip'
import CoreValuesSection   from '@/components/about/CoreValuesSection'
import LeadershipSection     from '@/components/about/LeadershipSection'
import AboutContactSection   from '@/components/about/AboutContactSection'
import Footer                from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Avinya Design & Build',
  description:
    'Learn about Avinya Design and Build — bringing North American ' +
    'construction management standards to Chennai, Tamil Nadu.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', color: '#1A1A1A' }}>
      <Navbar />
      <PageTitleBanner
        title="About Avinya"
        imageSrc="/images/aboutus-section.jpeg"
        imageAlt="Avinya construction professionals at work in Chennai"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Avinya' },
        ]}
      />
      <AboutMainSection />
      <MarqueeStrip />
      <CoreValuesSection />
      <LeadershipSection />
      <AboutContactSection />
      <Footer />
    </main>
  )
}