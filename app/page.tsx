import type { Metadata } from 'next'
import Navbar                 from '@/components/Navbar'
import Hero                    from '@/components/Hero'
import AboutSection            from '@/components/AboutSection'
import ServicesSection         from '@/components/ServicesSection'
import ValuePropositionSection from '@/components/ValuePropositionSection'
import FAQSection              from '@/components/FAQSection'
import ContactSection          from '@/components/ContactSection'
import Footer                  from '@/components/Footer'

/* ── Page-level metadata (overrides layout default for homepage only) ── */
export const metadata: Metadata = {
  title: 'Construction Company in Chennai | Avinya Design and Build Pvt Ltd',
  description:
    'Avinya Design and Build — Chennai\'s trusted construction company. Experts in luxury homes, villa construction, commercial build-outs, hotels, restaurants, apartment buildings, and joint venture development. International standards. Transparent pricing. On-time delivery.',
  alternates: {
    canonical: 'https://www.avinyadesignbuild.com',
  },
  openGraph: {
    title: 'Construction Company in Chennai | Avinya Design and Build Pvt Ltd',
    description:
      'Chennai\'s trusted construction company. Luxury homes, villas, commercial spaces, hotels, restaurants & joint venture developments — delivered with international standards.',
    url: 'https://www.avinyadesignbuild.com',
    type: 'website',
  },
}

/* ── JSON-LD Structured Data ── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': 'https://www.avinyadesignbuild.com/#business',
  name: 'Avinya Design and Build Pvt Ltd',
  alternateName: 'Avinya Design & Build',
  description:
    'Leading construction and design-build company in Chennai, Tamil Nadu. Specialising in luxury homes, villa construction, commercial construction, hotel & restaurant fit-outs, apartment buildings, joint venture development, and construction management.',
  url: 'https://www.avinyadesignbuild.com',
  logo: 'https://www.avinyadesignbuild.com/images/logo.png',
  image: 'https://www.avinyadesignbuild.com/images/og-image.jpg',
  telephone: '+91-91594-55001',
  email: 'info@avinyadesignbuild.com',
  foundingDate: '2022',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '54/2 15th Avenue, Indira Colony, Ashok Nagar',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600083',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0296,
    longitude: 80.2155,
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 13.0296, longitude: 80.2155 },
    geoRadius: '60000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Luxury Home Construction Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Villa Construction Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Construction Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hotel Construction Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restaurant Construction Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Joint Venture Development Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Management Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Apartment Builder Chennai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design Build Company Chennai' } },
    ],
  },
  sameAs: [
    'https://www.instagram.com/avinyadesignbuild',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-91594-55001',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  },
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, Cheque',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.avinyadesignbuild.com/#organization',
  name: 'Avinya Design and Build Pvt Ltd',
  url: 'https://www.avinyadesignbuild.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.avinyadesignbuild.com/images/logo.png',
    width: 200,
    height: 60,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-91594-55001',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.instagram.com/avinyadesignbuild',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.avinyadesignbuild.com/#website',
  url: 'https://www.avinyadesignbuild.com',
  name: 'Avinya Design and Build Pvt Ltd',
  description: 'Construction company in Chennai — luxury homes, villas, commercial, hospitality & joint venture development.',
  publisher: { '@id': 'https://www.avinyadesignbuild.com/#organization' },
  inLanguage: 'en-IN',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.avinyadesignbuild.com' },
  ],
}

export default function Home() {
  return (
    <>
      {/* Structured Data — injected in <head> via Next.js script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main>
        <Navbar />
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ValuePropositionSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
