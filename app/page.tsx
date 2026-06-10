import Navbar                 from '@/components/Navbar'
import Hero                    from '@/components/Hero'
import AboutSection            from '@/components/AboutSection'
import ServicesSection         from '@/components/ServicesSection'
import ValuePropositionSection from '@/components/ValuePropositionSection'
import Footer                  from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ValuePropositionSection />
      <Footer />
    </main>
  )
}
