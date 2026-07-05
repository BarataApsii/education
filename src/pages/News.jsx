import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import news from '../data/news.json'

// Newest notices first.
const sorted = [...news].sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function News() {
  return (
    <>
      <Seo
        title="News & Notices"
        description="Latest news, announcements and official notices from the District Education Office."
        path="/news"
      />
      <PageHeader
        title="News & Notices"
        subtitle="Official announcements, events and notices from the District Education Office."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Stack of newspapers with headlines"
      />

      <section className="container-page py-14">
        <ul className="space-y-6">
          {sorted.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:flex">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-48 w-full object-cover sm:h-auto sm:w-56 sm:flex-none"
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded bg-brand-100 px-2 py-0.5 font-semibold text-brand-700">
                    {item.category}
                  </span>
                  <time className="text-slate-500" dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-slate-600">{item.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section 
        className="py-14 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/melanesian-designs/sample-bg.png')" }}
        aria-labelledby="news-cta-heading"
      >
        <div className="absolute inset-0 bg-brand-900/70"></div>
        <div className="container-page text-center relative z-10">
          <h2 id="news-cta-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Never Miss a Notice
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            This page is the official medium for district announcements — check back regularly so
            every school in every ward stays informed. Have a notice to publish? Contact the office.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Contact the Office
            </Link>
            <Link
              to="/schools"
              className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Schools
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
