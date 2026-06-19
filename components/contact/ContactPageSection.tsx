'use client'

import { useRef, useState, useId } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Phone, Mail, MapPin,
  Send, Loader2, CheckCircle2, AlertCircle,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const

const CONTACT_ROWS = [
  {
    Icon: Phone,
    heading: 'Phone Number',
    value: (
      <a
        href="tel:+919159455001"
        className="cps-link"
      >
        +91 91594 55001
      </a>
    ),
  },
  {
    Icon: Mail,
    heading: 'Email Address',
    value: (
      <a
        href="mailto:info@avinyaindia.com"
        className="cps-link"
      >
        info@avinyaindia.com
      </a>
    ),
  },
  {
    Icon: MapPin,
    heading: 'Our Location',
    value: 'Chennai, Tamil Nadu, India',
  },
]

const PROJECT_TYPES = [
  { value: 'commercial',    label: 'Commercial Design & Build' },
  { value: 'residential',   label: 'Luxury Home or Villa' },
  { value: 'joint-venture', label: 'Joint Venture Development' },
  { value: 'hospitality',   label: 'Hotel or Restaurant' },
  { value: 'management',    label: 'Construction Management' },
  { value: 'other',         label: 'Other / Not Sure Yet' },
]

/* ─────────────────────────────────────────────
   FORM TYPES
───────────────────────────────────────────── */
interface FormState {
  firstName:   string
  lastName:    string
  phone:       string
  email:       string
  projectType: string
  message:     string
}
interface ValidationErrors {
  firstName?: string
  contact?:   string
  email?:     string
  message?:   string
}

/* ─────────────────────────────────────────────
   HELPER — shared input style builder
───────────────────────────────────────────── */
function inputStyle(hasError: boolean, hasValue: boolean): React.CSSProperties {
  return {
    width:          '100%',
    background:     '#FFFFFF',
    border:         `1.5px solid ${hasError ? '#EF4444' : hasValue ? '#C8C4BC' : '#E0DEDA'}`,
    borderRadius:   10,
    padding:        '14px 16px',
    fontFamily:     'var(--font-body)',
    fontWeight:     400,
    fontSize:       15,
    color:          'var(--navy)',
    outline:        'none',
    boxSizing:      'border-box' as const,
    transition:     'border-color 0.2s ease, box-shadow 0.2s ease',
    display:        'block',
  }
}

function ErrorMsg({ text }: { text: string }) {
  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        4,
      marginTop:  6,
      fontFamily: 'var(--font-body)',
      fontWeight: 400,
      fontSize:   12,
      color:      '#EF4444',
    }}>
      <AlertCircle size={12} color="#EF4444" />
      {text}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ContactPageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const uid        = useId()

  /* Form state */
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', phone: '', email: '',
    projectType: '', message: '',
  })
  const [errors,  setErrors]  = useState<ValidationErrors>({})
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof ValidationErrors]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    }

  /* ── Validation ── */
  function validate(): ValidationErrors {
    const errs: ValidationErrors = {}
    if (!form.firstName.trim()) {
      errs.firstName = 'First name is required.'
    }
    if (!form.phone.trim() && !form.email.trim()) {
      errs.contact = 'Please provide a phone number or email address.'
    } else if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('sending')
    try {
      /* Replace with actual API endpoint when ready */
      await new Promise(res => setTimeout(res, 1400))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  /* ── Focus ring style ── */
  const focusBoxShadow = '0 0 0 3px rgba(245,168,42,0.12)'
  const errorBoxShadow = '0 0 0 3px rgba(239,68,68,0.10)'

  function onFocus(field: string) {
    return () => setFocusedField(field)
  }
  function onBlur() {
    setFocusedField(null)
  }
  function fieldStyle(field: string, hasError: boolean, hasValue: boolean): React.CSSProperties {
    const focused = focusedField === field
    return {
      ...inputStyle(hasError, hasValue),
      borderColor: focused ? 'var(--gold)' : hasError ? '#EF4444' : hasValue ? '#C8C4BC' : '#E0DEDA',
      boxShadow:   focused ? focusBoxShadow : hasError ? errorBoxShadow : 'none',
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        width:      '100%',
        padding:    '100px 0 120px 0',
      }}
    >
      <div className="cps-outer">
        <div className="cps-grid">

          {/* ══════════════════════════════════════
              LEFT COLUMN — Contact details
          ══════════════════════════════════════ */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0, ease: EASE }}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         8,
                marginBottom: 20,
              }}
            >
              <div style={{
                width:        10,
                height:       10,
                background:   'var(--gold, #F5A82A)',
                borderRadius: 2,
                flexShrink:   0,
              }} />
              <span style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    600,
                fontSize:      12,
                color:         'var(--navy, #1B2F4E)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}>
                CONTACT US
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    800,
                fontSize:      'clamp(36px, 4vw, 56px)',
                color:         'var(--navy, #1B2F4E)',
                lineHeight:    1.05,
                letterSpacing: '-0.025em',
                marginBottom:  20,
              }}
            >
              Let&apos;s connect &amp;<br />
              build your project.
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              style={{
                fontFamily:   'var(--font-body)',
                fontWeight:   400,
                fontSize:     16,
                color:        '#555555',
                lineHeight:   1.75,
                maxWidth:     400,
                marginBottom: 44,
              }}
            >
              We&apos;d love to hear about your project. Reach out, share your ideas, and let&apos;s start shaping your vision into something real and lasting.
            </motion.p>

            {/* Contact rows */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
              style={{
                height:          1,
                background:      '#E8E4DC',
                transformOrigin: 'left',
              }}
            />

            {CONTACT_ROWS.map((row, i) => {
              const Icon = row.Icon
              return (
                <div key={row.heading}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: EASE }}
                    style={{
                      padding:    '24px 0',
                      display:    'flex',
                      alignItems: 'center',
                      gap:        20,
                    }}
                  >
                    {/* Gold icon box */}
                    <div style={{
                      width:          48,
                      height:         48,
                      flexShrink:     0,
                      background:     'var(--gold, #F5A82A)',
                      borderRadius:   10,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      boxShadow:      '0 4px 12px rgba(245,168,42,0.25)',
                    }}>
                      <Icon size={20} color="var(--navy, #1B2F4E)" />
                    </div>

                    {/* Text block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{
                        fontFamily:  'var(--font-body)',
                        fontWeight:  700,
                        fontSize:    15,
                        color:       'var(--navy, #1B2F4E)',
                        lineHeight:  1.2,
                      }}>
                        {row.heading}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize:   14,
                        color:      '#666666',
                        lineHeight: 1.4,
                      }}>
                        {row.value}
                      </span>
                    </div>
                  </motion.div>
                  <div style={{ height: 1, background: '#E8E4DC' }} />
                </div>
              )
            })}
          </div>

          {/* ══════════════════════════════════════
              RIGHT COLUMN — Grey form card
          ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="cps-card"
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* ── SUCCESS STATE ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    alignItems:    'flex-start',
                    padding:       '24px 0',
                  }}
                >
                  <div style={{
                    width:          56,
                    height:         56,
                    background:     'rgba(245,168,42,0.12)',
                    borderRadius:   '50%',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    marginBottom:   20,
                  }}>
                    <CheckCircle2 size={28} color="var(--gold, #F5A82A)" />
                  </div>
                  <h3 style={{
                    fontFamily:   'var(--font-body)',
                    fontWeight:   800,
                    fontSize:     28,
                    color:        'var(--navy)',
                    marginBottom: 12,
                  }}>
                    Message received.
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize:   15,
                    color:      '#555555',
                    lineHeight: 1.7,
                  }}>
                    Thank you for reaching out to Avinya. Sanjai and Anjana will review your enquiry and get back to you within one business day.
                  </p>
                </motion.div>
              ) : (
                /* ── FORM STATE ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {/* Card header */}
                  <motion.h3
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontWeight:    800,
                      fontSize:      'clamp(26px, 2.5vw, 36px)',
                      color:         'var(--navy)',
                      lineHeight:    1.1,
                      letterSpacing: '-0.02em',
                      marginBottom:  0,
                    }}
                  >
                    Get in touch with us
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.42, ease: EASE }}
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontWeight:   400,
                      fontSize:     14,
                      color:        '#777777',
                      lineHeight:   1.6,
                      marginTop:    10,
                      marginBottom: 28,
                    }}
                  >
                    Have a project in mind? Fill in your details and we&apos;ll get back to you within one business day.
                  </motion.p>

                  <form onSubmit={handleSubmit} noValidate>

                    {/* Row 1 — First + Last Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.48, ease: EASE }}
                      className="cps-row2"
                      style={{ marginBottom: 16 }}
                    >
                      <div>
                        <input
                          id={`${uid}-firstName`}
                          type="text"
                          placeholder="First Name"
                          value={form.firstName}
                          onChange={set('firstName')}
                          onFocus={onFocus('firstName')}
                          onBlur={onBlur}
                          style={fieldStyle('firstName', !!errors.firstName, !!form.firstName)}
                          aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && <ErrorMsg text={errors.firstName} />}
                      </div>
                      <div>
                        <input
                          id={`${uid}-lastName`}
                          type="text"
                          placeholder="Last Name"
                          value={form.lastName}
                          onChange={set('lastName')}
                          onFocus={onFocus('lastName')}
                          onBlur={onBlur}
                          style={fieldStyle('lastName', false, !!form.lastName)}
                        />
                      </div>
                    </motion.div>

                    {/* Row 2 — Phone + Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.54, ease: EASE }}
                      className="cps-row2"
                      style={{ marginBottom: errors.contact || errors.email ? 4 : 16 }}
                    >
                      <div>
                        <input
                          id={`${uid}-phone`}
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={set('phone')}
                          onFocus={onFocus('phone')}
                          onBlur={onBlur}
                          style={fieldStyle('phone', !!errors.contact, !!form.phone)}
                        />
                      </div>
                      <div>
                        <input
                          id={`${uid}-email`}
                          type="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={set('email')}
                          onFocus={onFocus('email')}
                          onBlur={onBlur}
                          style={fieldStyle('email', !!errors.email || !!errors.contact, !!form.email)}
                          aria-invalid={!!errors.email}
                        />
                      </div>
                    </motion.div>
                    {(errors.contact || errors.email) && (
                      <div style={{ marginBottom: 12 }}>
                        <ErrorMsg text={(errors.contact || errors.email)!} />
                      </div>
                    )}

                    {/* Row 3 — Project Type */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.60, ease: EASE }}
                      style={{ marginBottom: 16, position: 'relative' }}
                    >
                      <select
                        id={`${uid}-projectType`}
                        value={form.projectType}
                        onChange={set('projectType')}
                        onFocus={onFocus('projectType')}
                        onBlur={onBlur}
                        style={{
                          ...fieldStyle('projectType', false, !!form.projectType),
                          appearance:      'none',
                          WebkitAppearance:'none',
                          cursor:          'pointer',
                          color:           form.projectType ? 'var(--navy)' : '#AAAAAA',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23AAAAAA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat:   'no-repeat',
                          backgroundPosition: 'right 16px center',
                          paddingRight:       44,
                        }}
                      >
                        <option value="" disabled>Project Type</option>
                        {PROJECT_TYPES.map(pt => (
                          <option key={pt.value} value={pt.value}>{pt.label}</option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Row 4 — Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.66, ease: EASE }}
                      style={{ marginBottom: 24 }}
                    >
                      <textarea
                        id={`${uid}-message`}
                        rows={5}
                        placeholder="Tell us about your project — location, type, timeline, and any specific requirements..."
                        value={form.message}
                        onChange={set('message')}
                        onFocus={onFocus('message')}
                        onBlur={onBlur}
                        style={{
                          ...fieldStyle('message', !!errors.message, !!form.message),
                          resize:        'none',
                          minHeight:     130,
                          verticalAlign: 'top',
                        }}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <ErrorMsg text={errors.message} />}
                    </motion.div>

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.74, ease: EASE }}
                      className="cps-submit-wrap"
                    >
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="cps-submit-btn"
                        style={{
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            10,
                          background:     'var(--gold, #F5A82A)',
                          color:          'var(--navy, #1B2F4E)',
                          fontFamily:     'var(--font-body)',
                          fontWeight:     700,
                          fontSize:       15,
                          padding:        '16px 32px',
                          borderRadius:   10,
                          border:         'none',
                          cursor:         status === 'sending' ? 'not-allowed' : 'pointer',
                          opacity:        status === 'sending' ? 0.8 : 1,
                          transition:     'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                      >
                        {status === 'sending' ? (
                          <>
                            Sending...
                            <Loader2 size={16} color="var(--navy)" className="cps-spin" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} color="var(--navy)" />
                          </>
                        )}
                      </button>

                      {status === 'error' && (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                          fontSize:   13,
                          color:      '#EF4444',
                          marginTop:  12,
                        }}>
                          Something went wrong. Please try again or email us directly at{' '}
                          <a href="mailto:info@avinyaindia.com" style={{ color: '#EF4444' }}>
                            info@avinyaindia.com
                          </a>
                        </p>
                      )}
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Link hover ── */
        .cps-link {
          color: #666666;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cps-link:hover { color: var(--gold, #F5A82A); }

        /* ── Layout ── */
        .cps-outer {
          max-width: 1320px;
          margin:    0 auto;
          padding:   0 64px;
        }
        .cps-grid {
          display:               grid;
          grid-template-columns: 42fr 55fr;
          column-gap:            64px;
          align-items:           start;
        }

        /* ── Grey card ── */
        .cps-card {
          background:    #F4F4F4;
          border-radius: 20px;
          padding:       44px 40px;
          width:         100%;
        }

        /* ── Two-col form rows ── */
        .cps-row2 {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          gap:                   16px;
        }

        /* ── Submit button hover ── */
        .cps-submit-btn:hover:not(:disabled) {
          background:  #E09420 !important;
          transform:   translateY(-2px) !important;
          box-shadow:  0 6px 20px rgba(245,168,42,0.30) !important;
        }

        /* ── Spinner animation ── */
        @keyframes cps-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .cps-spin { animation: cps-spin 0.9s linear infinite; }

        /* ── Tablet ── */
        @media (max-width: 1023px) and (min-width: 768px) {
          .cps-outer { padding: 0 40px; }
          .cps-grid  {
            grid-template-columns: 1fr 1fr;
            column-gap: 40px;
          }
          .cps-card { padding: 32px 28px; }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .cps-outer {
            padding: 0 24px;
          }
          .cps-grid {
            grid-template-columns: 1fr;
            column-gap: 0;
            row-gap: 56px;
          }
          .cps-card {
            padding:       28px 20px;
            border-radius: 14px;
          }
          /* Each 2-col row becomes single column on mobile */
          .cps-row2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          /* Prevent iOS auto-zoom on inputs */
          .cps-card input,
          .cps-card select,
          .cps-card textarea {
            font-size: 16px !important;
          }
          /* Full-width submit on mobile */
          .cps-submit-wrap { width: 100%; }
          .cps-submit-btn  { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
