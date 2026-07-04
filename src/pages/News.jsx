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
    </>
  )
}
