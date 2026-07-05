import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { site } from '../data/site'

const values = [
  { title: 'Equity', body: 'Every child in the district has a right to safe, quality education regardless of location.' },
  { title: 'Partnership', body: 'We work alongside communities, church agencies and the provincial government.' },
  { title: 'Integrity', body: 'Transparent management of enrolments, staffing and school funding.' },
  { title: 'Excellence', body: 'Continuous improvement in teaching, learning outcomes and school infrastructure.' },
]

const responsibilities = [
  {
    title: 'Teacher Management',
    body: 'Coordinating teacher appointments, postings, leave and professional development across all schools in the district.',
  },
  {
    title: 'School Administration',
    body: 'Overseeing enrolment records, school registrations, subsidies and compliance with national education standards.',
  },
  {
    title: 'Infrastructure Planning',
    body: 'Planning and monitoring classroom construction, staff housing and learning facilities in partnership with stakeholders.',
  },
  {
    title: 'Community Engagement',
    body: 'Working with parents, church agencies, ward councillors and LLG administrations to keep every child in school.',
  },
  {
    title: 'Information Dissemination',
    body: 'This website serves as the official medium for disseminating notices and announcements, ensuring every school in every ward across the district is informed.',
  },
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
        subtitle="Who we are, what we stand for, and how we serve every learner in Usino Bundi."
        image="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Teacher guiding students in a classroom"
      />

      <section className="container-page py-14">
        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              To provide accessible, inclusive and quality education services across the district by
              supporting teachers, strengthening schools and partnering with communities so that
              every learner can reach their full potential.
            </p>
          </div>
          <div className="card">
            <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              A district where every child completes a safe, relevant and empowering education that
              prepares them to contribute to their community, church and nation.
            </p>
          </div>
        </div>

        {/* Core values */}
       

        {/* About the office */}
        <div className="mt-16 grid items-center gap-8 overflow-hidden rounded-xl bg-brand-50 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80"
            alt="Students celebrating graduation"
            loading="lazy"
            className="h-full min-h-[220px] w-full object-cover"
          />
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900">About the Office</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              The {site.name} is responsible for administering elementary, primary, secondary and
              vocational education across three Local-Level Governments. The office manages teacher
              appointments, school subsidies, enrolment records and infrastructure planning in
              coordination with the Provincial Division of Education. This website is the official
              medium for disseminating notices, so that all schools in all wards are kept informed.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">What We Do</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Our key areas of responsibility in delivering education services across the district.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {responsibilities.map((item) => (
              <div key={item.title} className="card">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-brand-600">
        <div className="container-page py-14 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Discover Our Schools</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            From elementary classrooms to vocational centres, explore the schools serving
            communities across Usino Bundi District.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/schools"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              View All Schools
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
