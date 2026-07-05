import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
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

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Home() {
  const [counts, setCounts] = useState({ llgs: 0, schools: 0, students: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)

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

    const statsElement = document.getElementById('stats-section')
    if (statsElement) {
      observer.observe(statsElement)
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
      <section id="stats-section" className="bg-brand-600 py-16" aria-label="District statistics">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl" role="status" aria-live="polite">
                {counts.llgs}
              </div>
              <div className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                Local-Level Governments
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl" role="status" aria-live="polite">
                {counts.schools}+
              </div>
              <div className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                Educational Institutions
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl" role="status" aria-live="polite">
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
      <section className="bg-gradient-to-br from-slate-50 to-brand-50 py-16" aria-labelledby="welcome-heading">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="welcome-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">Welcome to our district</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              The {site.name} coordinates elementary, primary, secondary and vocational education
              across three Local-Level Governments. We work with communities, church agencies and the
              provincial administration to deliver quality, inclusive learning for every child.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/about" className="btn-primary">
 Learn More
              </Link>
              <Link to="/schools" className="btn-outline">
                Browse Schools
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3" role="list">
            <FeatureCard
              icon={
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Community-driven"
              body="Education planning shaped by ward development committees and local stakeholders."
            />
            <FeatureCard
              icon={
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
                <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Transparent"
              body="Public notices, selection results and grant announcements published for all to see."
            />
          </div>
        </div>
      </section>

      {/* School locations map */}
      <section className="bg-white py-16" aria-labelledby="map-heading">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 id="map-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">School Locations</h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore our educational institutions across the district. Click on a marker to view school details.
            </p>
          </div>
          <div className="w-full rounded-xl border border-slate-200 shadow-lg overflow-hidden h-80 sm:h-[500px]">
            <MapContainer center={[-8.5, 147.35]} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {schools.map((school) => {
                const [lat, lng] = school.coordinates.split(',').map(coord => parseFloat(coord.trim()))
                return (
                  <Marker key={school.id} position={[lat, lng]}>
                    <Popup>
                      <div style={{ padding: '8px', minWidth: '200px' }}>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>{school.name}</h3>
                        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{school.level} • {school.location}</p>
                        <Link 
                          to={`/schools/${school.id}`} 
                          style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '12px' }}
                        >
                          View Details
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/schools" className="btn-primary">
              View All Schools
            </Link>
          </div>
        </div>
      </section>

      {/* Notices / announcements */}
      <section className="bg-slate-50" aria-labelledby="news-heading">
        <div className="container-page py-14">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="news-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">Notices &amp; announcements</h2>
            <Link to="/news" className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
              View all &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3" role="list">
            {latestNews.map((item) => (
              <article key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link to="/news" className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 font-semibold text-brand-700">
                      {item.category}
                    </span>
                    <time className="text-slate-500" dateTime={item.date}>
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                    <Link to="/news">{item.title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">{item.summary}</p>
                  <Link to="/news" className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/melanesian-designs/sample-bg.png')" }}
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 bg-brand-900/70"></div>
        <div className="container-page text-center relative z-10">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">Stay Informed</h2>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
            This website is the official medium for district notices — check back regularly so your school and ward never miss an announcement, or get in touch with our education office.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/schools" className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
              Browse Schools
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, body }) {
  return (
    <div className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  )
}
