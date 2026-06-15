/* MarqueeStrip — reusable scrolling service strip
   Styles live in app/globals.css (.marquee-track, .marquee-item, etc.)
   No Framer Motion — pure CSS keyframe for best performance */

const DEFAULT_ITEMS = [
  'Commercial Design & Build',
  'Luxury Homes & Villas',
  'Joint Venture Development',
  'Hotels & Restaurants',
  'Construction Management',
]

type Rounded = 'top' | 'bottom' | 'all' | 'none'

interface MarqueeStripProps {
  items?:     string[]
  speed?:     number    // seconds for one full loop (lower = faster)
  bgColor?:   string
  textColor?: string
  rounded?:   Rounded
}

const RADIUS: Record<Rounded, string> = {
  top:    '12px 12px 0 0',
  bottom: '0 0 12px 12px',
  all:    '12px',
  none:   '0',
}

export default function MarqueeStrip({
  items     = DEFAULT_ITEMS,
  speed     = 28,
  bgColor   = 'var(--gold, #F5A82A)',
  textColor = 'var(--navy, #1B2F4E)',
  rounded   = 'top',
}: MarqueeStripProps) {
  /* Double the list so the -50% translateX loops seamlessly */
  const doubled = [...items, ...items]

  return (
    <div
      className="marquee-wrapper"
      aria-hidden="true"
      style={{
        width:        '100vw',
        marginLeft:   'calc(-50vw + 50%)',
        height:       52,
        background:   bgColor,
        borderRadius: RADIUS[rounded],
        overflow:     'hidden',
        display:      'flex',
        alignItems:   'center',
        position:     'relative',
      }}
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          color:             textColor,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-sep">✳</span>
            <span className="marquee-text">{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
