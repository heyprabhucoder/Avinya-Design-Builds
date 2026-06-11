'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Loader2, CheckCircle2 } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

interface FormData {
  name: string
  phone: string
  email: string
  projectType: string
  message: string
}

interface FieldErrors {
  name?: boolean
  phone?: boolean
  email?: boolean
  projectType?: boolean
  message?: boolean
}

const PROJECT_TYPES = [
  'Commercial Design & Build',
  'Luxury Home or Villa',
  'Joint Venture Development',
  'Hotel or Restaurant',
  'Construction Management',
  'Other',
]

/* ─── Underline input field ─── */
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 11,
          color: error ? '#EF4444' : 'var(--mist)',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.14em',
          marginBottom: 10,
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/* ─── Submit button sub-component ─── */
function SubmitButton({ status }: { status: Status }) {
  const [hovered, setHovered] = useState(false)
  const sending = status === 'sending'
  return (
    <button
      type="submit"
      disabled={sending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        border: '1.5px solid var(--navy)',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: sending ? 'not-allowed' : 'pointer',
        transform: hovered && !sending ? 'scale(1.01)' : 'scale(1)',
        transformOrigin: 'center left',
        transition: 'transform 0.2s ease',
        background: 'none',
        padding: 0,
      }}
    >
      {/* Left — text */}
      <div style={{
        flex: 1,
        padding: '18px 32px',
        background: hovered && !sending ? '#0D1E33' : 'var(--navy)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'left' as const,
        transition: 'background 0.2s ease',
      }}>
        {sending ? 'Sending...' : 'Send Message'}
      </div>
      {/* Right — icon */}
      <div style={{
        width: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered && !sending ? '#E09420' : 'var(--gold)',
        transition: 'background 0.2s ease',
      }}>
        {sending
          ? <Loader2 size={18} color="var(--navy)" style={{ animation: 'spin 1s linear infinite' }} />
          : <ArrowUpRight size={18} color="var(--navy)" />}
      </div>
    </button>
  )
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', projectType: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [selectOpen, setSelectOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  /* ─── Input border colour logic ─── */
  function borderColor(field: keyof FormData) {
    if (errors[field]) return '#EF4444'
    if (focusedField === field) return 'var(--gold)'
    if (form[field]) return 'var(--navy)'
    return '#D4D0C8'
  }

  /* ─── Validation ─── */
  function validate(): boolean {
    const newErrors: FieldErrors = {}
    if (!form.name.trim()) newErrors.name = true
    if (!form.phone.trim()) newErrors.phone = true
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) newErrors.email = true
    if (!form.projectType) newErrors.projectType = true
    if (!form.message.trim()) newErrors.message = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ─── Submit ─── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1800))
    setStatus('sent')
  }

  /* ─── Contact detail row ─── */
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      className="cs-section"
      style={{ background: '#FFFFFF', width: '100%', padding: '120px 0 140px 0', position: 'relative' }}
    >
      {/* Gold transition rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          width: '100%',
          height: 2,
          background: 'var(--gold)',
          transformOrigin: 'left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Content wrapper */}
      <div className="cs-grid">

        {/* ════ LEFT COLUMN ════ */}
        <div className="cs-left">

          {/* Eyebrow row: gold bar + label */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}>
            {/* Gold 3px vertical bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              style={{
                width: 3,
                height: 48,
                background: 'var(--gold)',
                flexShrink: 0,
                transformOrigin: 'top',
              }}
            />
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 11,
                  color: 'var(--mist)',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.18em',
                  margin: 0,
                  paddingTop: 4,
                }}
              >
                GET IN TOUCH
              </motion.p>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 4vw, 64px)',
                  color: 'var(--navy)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  margin: '16px 0 0 0',
                }}
              >
                Let&apos;s build<br />
                something<br />
                <span
                  style={{
                    fontWeight: 300,
                    display: 'inline-block',
                    borderBottom: '2px solid var(--gold)',
                    paddingBottom: 4,
                  }}
                >
                  exceptional.
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 17,
              color: '#1A1A1A',
              lineHeight: 1.75,
              maxWidth: 380,
              margin: '0 0 48px 0',
            }}
          >
            Schedule a consultation with our team. We&apos;ll walk you through our
            process, timeline, and approach — at no obligation.
          </motion.p>

          {/* Contact detail rows */}
          {[
            { label: 'PHONE', value: '+91 91594 55001', href: 'tel:+919159455001' },
            { label: 'EMAIL', value: 'info@avinyadesignbuild.com', href: 'mailto:info@avinyadesignbuild.com' },
            { label: 'LOCATION', value: '54/2 15th Avenue, Indira Colonies, Ashok Nagar\nChennai, Tamil Nadu 600083\nIndia', href: null },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.07, ease: EASE }}
            >
              <div style={{ height: 1, background: '#E4E0D8', width: '100%' }} />
              <div style={{ padding: '18px 0', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11,
                  color: 'var(--mist)', textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em', width: 96, flexShrink: 0, paddingTop: 2,
                }}>{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    onMouseEnter={() => setHoveredContact(item.label)}
                    onMouseLeave={() => setHoveredContact(null)}
                    style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 15,
                      color: hoveredContact === item.label ? 'var(--gold)' : '#1A1A1A',
                      textDecoration: 'none', lineHeight: 1.5,
                      transition: 'color 0.2s ease',
                    }}
                  >{item.value}</a>
                ) : (
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 15, color: '#1A1A1A', lineHeight: 1.5, whiteSpace: 'pre-line' as const }}>
                    {item.value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
          <div style={{ height: 1, background: '#E4E0D8', width: '100%' }} />

          {/* Availability signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32 }}
          >
            <div className="cs-pulse-dot" />
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13,
              color: 'var(--mist)',
            }}>Currently accepting new projects</span>
          </motion.div>
        </div>

        {/* ════ RIGHT COLUMN — FORM ════ */}
        <div className="cs-right">
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: 80 }}
            >
              <CheckCircle2 size={48} color="var(--gold)" style={{ marginBottom: 24 }} />
              <h3 style={{
                fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: 40, color: 'var(--navy)', lineHeight: 1.1, margin: 0,
              }}>Message received.</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 16,
                color: '#1A1A1A', lineHeight: 1.7, marginTop: 16, maxWidth: 420,
              }}>
                We&apos;ll review your project details and reach out within one business day.
                Thank you for considering Avinya.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="cs-form">
              {/* Row 1 — Name + Phone (2 cols) */}
              <motion.div
                className="cs-row-2"
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              >
                <Field label="YOUR NAME" error={errors.name}>
                  <input
                    type="text" value={form.name} placeholder="Priya Mehta"
                    className="cs-input"
                    style={{ borderBottomColor: borderColor('name') }}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: false })) }}
                  />
                </Field>
                <Field label="PHONE NUMBER" error={errors.phone}>
                  <input
                    type="tel" value={form.phone} placeholder="+91 98765 43210"
                    className="cs-input"
                    style={{ borderBottomColor: borderColor('phone') }}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: false })) }}
                  />
                </Field>
              </motion.div>

              {/* Row 2 — Email */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
              >
                <Field label="EMAIL ADDRESS" error={errors.email}>
                  <input
                    type="email" value={form.email} placeholder="priya@example.com"
                    className="cs-input"
                    style={{ borderBottomColor: borderColor('email') }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: false })) }}
                  />
                </Field>
              </motion.div>

              {/* Row 3 — Project Type */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              >
                <Field label="PROJECT TYPE" error={errors.projectType}>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.projectType}
                      className="cs-select"
                      style={{ borderBottomColor: borderColor('projectType') }}
                      onFocus={() => { setFocusedField('projectType'); setSelectOpen(true) }}
                      onBlur={() => { setFocusedField(null); setSelectOpen(false) }}
                      onChange={e => { setForm(f => ({ ...f, projectType: e.target.value })); setErrors(er => ({ ...er, projectType: false })) }}
                    >
                      <option value="" disabled>Select project type...</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown
                      size={16}
                      color="var(--mist)"
                      style={{
                        position: 'absolute', right: 0, bottom: 16,
                        transform: selectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </Field>
              </motion.div>

              {/* Row 4 — Message */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
              >
                <Field label="TELL US ABOUT YOUR PROJECT" error={errors.message}>
                  <textarea
                    rows={4} value={form.message}
                    placeholder="Brief description of your project, location, timeline, and any specific requirements..."
                    className="cs-textarea"
                    style={{ borderBottomColor: borderColor('message') }}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: false })) }}
                  />
                </Field>
              </motion.div>

              {/* Row 5 — Submit */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
              >
                <SubmitButton status={status} />
                {status === 'error' && (
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13,
                    color: '#EF4444', marginTop: 12,
                  }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12,
                  color: 'var(--mist)', lineHeight: 1.6, marginTop: 16,
                }}>
                  We respect your privacy. Your information is never shared with third parties
                  and we only contact you regarding your project.
                </p>
              </motion.div>
            </form>
          )}
        </div>
      </div>

      {/* ─── CSS ─── */}
      <style>{`
        /* Wrapper grid */
        .cs-grid {
          max-width: 1320px;
          margin: 0 auto;
          padding: 80px 64px 0;
          display: grid;
          grid-template-columns: 45fr 55fr;
          column-gap: 80px;
          align-items: start;
        }

        /* Left col sticky */
        .cs-left { position: sticky; top: 120px; }

        /* Right col offset */
        .cs-right { margin-top: 80px; }

        /* Form gap */
        .cs-form {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* 2-col row */
        .cs-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        /* Underline inputs */
        .cs-input, .cs-select, .cs-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #D4D0C8;
          border-radius: 0;
          padding: 12px 0 14px 0;
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 16px;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.25s ease;
          display: block;
          appearance: none;
          -webkit-appearance: none;
        }
        .cs-input::placeholder,
        .cs-textarea::placeholder {
          color: rgba(26,26,26,0.30);
        }
        .cs-select option { color: #1A1A1A; background: #FFFFFF; }
        .cs-textarea { resize: none; }

        /* Pulse dot */
        .cs-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22C55E;
          position: relative;
          flex-shrink: 0;
        }
        .cs-pulse-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.3);
          animation: cs-pulse 2s ease-out infinite;
        }
        @keyframes cs-pulse {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* Tablet */
        @media (max-width: 1023px) {
          .cs-grid {
            grid-template-columns: 1fr !important;
            column-gap: 0 !important;
            padding: 80px 48px 0 !important;
          }
          .cs-left  { position: static !important; margin-bottom: 64px; }
          .cs-right { margin-top: 0 !important; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .cs-section { padding: 80px 0 100px !important; }
          .cs-grid    { padding: 64px 20px 0 !important; }
          .cs-row-2   { grid-template-columns: 1fr !important; gap: 28px !important; }
          .cs-form    { gap: 28px !important; }
        }
      `}</style>
    </section>
  )
}
