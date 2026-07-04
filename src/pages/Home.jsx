import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Seo from '../components/Seo'
import HeroSlider from '../components/HeroSlider'
import { site } from '../data/site'
import news from '../data/news.json'
import llgs from '../data/llgs.json'
import schools from '../data/schools.json'

// Show the three most recent notices on the home page.
const latestNews = [...news]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function Home() {
  const [counts, setCounts] = useState({ llgs: 0, schools: 0, students: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          // Animate LLGs count
          const llgTarget = llgs.length
          let llgCurrent = 0
          const llgInterval = setInterval(() => {
            llgCurrent += 1
            if (llgCurrent >= llgTarget) {
              clearInterval(llgInterval)
              setCounts(prev => ({ ...prev, llgs: llgTarget }))
            } else {
              setCounts(prev => ({ ...prev, llgs: llgCurrent }))
            }
          }, 100)

          // Animate schools count
          const schoolTarget = 60
          let schoolCurrent = 0
          const schoolInterval = setInterval(() => {
            schoolCurrent += 1
            if (schoolCurrent >= schoolTarget) {
              clearInterval(schoolInterval)
              setCounts(prev => ({ ...prev, schools: schoolTarget }))
            } else {
              setCounts(prev => ({ ...prev, schools: schoolCurrent }))
            }
          }, 50)

          // Animate students count
          const studentTarget = 3000
          let studentCurrent = 0
          const studentInterval = setInterval(() => {
            studentCurrent += 50
            if (studentCurrent >= studentTarget) {
              clearInterval(studentInterval)
              setCounts(prev => ({ ...prev, students: studentTarget }))
            } else {
              setCounts(prev => ({ ...prev, students: studentCurrent }))
            }
          }, 30)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <>
      <Seo
        title="Home"
        description={`${site.name} — official information portal with district notices, schools, LLGs and contact details.`}
        path="/"
      />

      {/* Hero slider */}
      <HeroSlider />

      {/* Stats section */}
      <section ref={statsRef} className="bg-brand-600 py-16">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl">
                {counts.llgs}
              </div>
              <div className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                Local-Level Governments
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl">
                {counts.schools}+
              </div>
              <div className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                Education Institutions
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl">
                {counts.students.toLocaleString()}+
              </div>
              <div className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                Students Enrolled
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* District overview */}
      <section className="bg-gradient-to-br from-slate-50 to-brand-50 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Welcome to our district</h2>
            <p className="mt-4 text-lg text-slate-600">
              The {site.name} coordinates elementary, primary, secondary and vocational education
              across three Local-Level Governments. We work with communities, church agencies and the
              provincial administration to deliver quality, inclusive learning for every child.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/about" className="btn-primary">
                Learn More
              </Link>
              <Link to="/schools" className="btn-outline">
                Browse Schools
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Community-driven"
              body="Education planning shaped by ward development committees and local stakeholders."
            />
            <FeatureCard
              icon={
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              }
              title="Inclusive access"
              body="Support for government and church-agency schools in coastal and inland communities."
            />
            <FeatureCard
              icon={
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Transparent"
              body="Public notices, selection results and grant announcements published for all to see."
            />
          </div>
        </div>
      </section>

      {/* Notices / announcements */}
      <section className="bg-slate-50">
        <div className="container-page py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Notices &amp; announcements</h2>
            <Link to="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              View all &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestNews.map((item) => (
              <article key={item.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded bg-brand-100 px-2 py-0.5 font-semibold text-brand-700">
                      {item.category}
                    </span>
                    <time className="text-slate-500" dateTime={item.date}>
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, body }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  )
}
