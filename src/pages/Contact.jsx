import { useState } from 'react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { site } from '../data/site'

const details = [
  { label: 'Address', value: site.contact.address },
  { label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s+/g, '')}` },
  { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: 'Office hours', value: site.contact.officeHours },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact the ${site.name} — address, phone, email and office hours.`}
        path="/contact"
      />
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with the District Education Office."
      />

      <section className="container-page py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Office details</h2>
            <dl className="mt-6 space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-slate-700">
                    {d.href ? (
                      <a className="text-brand-700 hover:text-brand-800" href={d.href}>
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-brand-50 p-8">
            <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
            <p className="mt-3 text-slate-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitted && (
              <div className="mt-4 rounded-md bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  Thank you! Your email client should open with your message ready to send.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
