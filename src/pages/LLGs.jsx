import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import llgs from '../data/llgs.json'

export default function LLGs() {
  return (
    <>
      <Seo
        title="Local-Level Governments"
        description="The three Local-Level Governments (LLGs) that make up the district and their education priorities."
        path="/llgs"
      />
      <PageHeader
        title="Local-Level Governments"
        subtitle="The district is made up of three LLGs, each coordinating education services for its wards."
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Green highland valley landscape"
      />

      <section className="container-page py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {llgs.map((llg) => (
            <article key={llg.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <img
                src={llg.image}
                alt={llg.name}
                loading="lazy"
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold text-slate-900">{llg.name}</h2>
              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                <div>
                  <dt className="inline font-semibold text-slate-700">HQ: </dt>
                  <dd className="inline">{llg.headquarters}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-slate-700">Wards: </dt>
                  <dd className="inline">{llg.wards}</dd>
                </div>
              </dl>
              <p className="mt-4 flex-1 text-sm text-slate-600">{llg.description}</p>
              <p className="mt-4 rounded-md bg-brand-50 p-3 text-sm text-brand-800">
                <span className="font-semibold">Education focus: </span>
                {llg.focus}
              </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section 
        className="py-14 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/melanesian-designs/sample-bg.png')" }}
        aria-labelledby="llgs-cta-heading"
      >
        <div className="absolute inset-0 bg-brand-900/70"></div>
        <div className="container-page text-center relative z-10">
          <h2 id="llgs-cta-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Find Schools in Your LLG
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            Browse the district school directory to see the elementary, primary, secondary and
            vocational schools serving each ward.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/schools"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Browse Schools
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
