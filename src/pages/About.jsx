import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { site } from '../data/site'

const values = [
  { title: 'Equity', body: 'Every child in the district has a right to safe, quality education regardless of location.' },
  { title: 'Partnership', body: 'We work alongside communities, church agencies and the provincial government.' },
  { title: 'Integrity', body: 'Transparent management of enrolments, staffing and school funding.' },
  { title: 'Excellence', body: 'Continuous improvement in teaching, learning outcomes and school infrastructure.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About the District"
        description={`Learn about the mission, vision and values of the ${site.name}.`}
        path="/about"
      />
      <PageHeader
        title="About the District"
        subtitle="Who we are and what we stand for."
      />

      <section className="container-page py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-3 text-slate-600">
              To provide accessible, inclusive and quality education services across the district by
              supporting teachers, strengthening schools and partnering with communities so that
              every learner can reach their full potential.
            </p>
          </div>
          <div className="card">
            <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
            <p className="mt-3 text-slate-600">
              A district where every child completes a safe, relevant and empowering education that
              prepares them to contribute to their community, church and nation.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Our Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card">
                <h3 className="text-lg font-semibold text-brand-700">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-xl bg-brand-50 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80"
            alt="Students celebrating graduation"
            loading="lazy"
            className="h-full min-h-[220px] w-full object-cover"
          />
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900">About the office</h2>
            <p className="mt-3 text-slate-600">
              The {site.name} is responsible for administering elementary, primary, secondary and
              vocational education across three Local-Level Governments. The office manages teacher
              appointments, school subsidies, enrolment records and infrastructure planning in
              coordination with the Provincial Division of Education.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
