import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { site } from '../data/site'
import news from '../data/news.json'
import llgs from '../data/llgs.json'
import schools from '../data/schools.json'

// Show the three most recent notices on the home page.
const latestNews = [...news]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

const stats = [
  { label: 'Local-Level Governments', value: llgs.length },
  { label: 'Registered schools', value: `${schools.length}+` },
  { label: 'Students enrolled', value: '3,000+' },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description={`${site.name} — official information portal with district notices, schools, LLGs and contact details.`}
        path="/"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              Official District Portal
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/news" className="btn-primary">View latest notices</Link>
              <Link to="/about" className="btn-outline">About the district</Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card text-center">
                <div className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* District overview */}
      <section className="container-page py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Welcome to our district</h2>
          <p className="mt-4 text-slate-600">
            The {site.name} coordinates elementary, primary, secondary and vocational education
            across three Local-Level Governments. We work with communities, church agencies and the
            provincial administration to deliver quality, inclusive learning for every child.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Community-driven"
            body="Education planning shaped by ward development committees and local stakeholders."
          />
          <FeatureCard
            title="Inclusive access"
            body="Support for government and church-agency schools in coastal and inland communities."
          />
          <FeatureCard
            title="Transparent"
            body="Public notices, selection results and grant announcements published for all to see."
          />
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
              <article key={item.id} className="card flex flex-col">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ title, body }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  )
}
