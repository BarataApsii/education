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

          {/* Static informational note — no backend form since the site is informational only. */}
          <div className="rounded-xl bg-brand-50 p-8">
            <h2 className="text-xl font-bold text-slate-900">Visit or write to us</h2>
            <p className="mt-3 text-slate-600">
              For enrolment queries, teacher appointments or general enquiries, please visit the
              office during working hours or contact us by phone or email. Written correspondence
              can be addressed to the postal address listed here.
            </p>
            <a href={`mailto:${site.contact.email}`} className="btn-primary mt-6">
              Email the office
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
