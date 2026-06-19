import type { Metadata } from 'next'
import Navbar              from '@/components/Navbar'
import PageTitleBanner     from '@/components/PageTitleBanner'
import ContactPageSection  from '@/components/contact/ContactPageSection'
import Footer              from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Avinya Design & Build — Chennai',
  description:
    'Get in touch with Avinya Design and Build. Schedule a consultation ' +
    'for your residential, commercial, or hospitality project in Chennai.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', color: '#1A1A1A' }}>
      <Navbar />
      <PageTitleBanner
        title="Contact Us"
        imageSrc="/images/valuepro1.jpeg"
        imageAlt="Avinya Design and Build — Contact Chennai"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />
      <ContactPageSection />
      <Footer />
    </main>
  )
}
