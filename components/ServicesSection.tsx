import WhyChooseUs from './WhyChooseUs'
import OurServices from './OurServices'

/**
 * ServicesSection
 * Composes the two independent sub-sections:
 *   1. WhyChooseUs  — sticky split panel with stacking left cards
 *   2. OurServices  — horizontal card grid with stagger reveal
 */
export default function ServicesSection() {
  return (
    <>
      <WhyChooseUs />
      <OurServices />
    </>
  )
}
