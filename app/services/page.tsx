import type { Metadata } from 'next'
import Navbar                  from '@/components/Navbar'
import PageTitleBanner         from '@/components/PageTitleBanner'
import MarqueeStrip            from '@/components/MarqueeStrip'
import ServicesProvideSection  from '@/components/services/ServicesProvideSection'
import ServicesFAQSection      from '@/components/services/ServicesFAQSection'
import ServicesCTASection      from '@/components/services/ServicesCTASection'
import Footer                  from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Services — Avinya Design & Build',
  description:
    'Residential, commercial, hospitality, and joint venture construction services ' +
    'delivered with North American standards in Chennai, Tamil Nadu.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', color: '#1A1A1A' }}>
      <Navbar />

      <PageTitleBanner
        title="Our Services"
        imageSrc="/images/services1.jpeg"
        imageAlt="Avinya Design and Build services — Chennai"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      <MarqueeStrip
        rounded="none"
        speed={26}
      />

      <ServicesProvideSection />

      <ServicesFAQSection />

      <ServicesCTASection />

      <Footer />
    </main>
  )
}
