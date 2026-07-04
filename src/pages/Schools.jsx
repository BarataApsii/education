import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import schools from '../data/schools.json'

// Unique school levels for the filter control.
const levels = ['All', ...Array.from(new Set(schools.map((s) => s.level)))]

export default function Schools() {
  const [level, setLevel] = useState('All')

  const filtered = useMemo(
    () => (level === 'All' ? schools : schools.filter((s) => s.level === level)),
    [level],
  )

  return (
    <>
      <Seo
        title="Schools"
        description="Directory of elementary, primary, secondary and vocational schools across the district."
        path="/schools"
      />
      <PageHeader
        title="Schools"
        subtitle="A directory of schools across the district. Data shown here is placeholder content."
      />

      <section className="container-page py-14">
        {/* Level filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition',
                level === l
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              ].join(' ')}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 md:block">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">School</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">LLG</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 text-right font-semibold">Enrolment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 cursor-pointer">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link to={`/schools/${s.id}`} className="flex items-center gap-3">
                      <img
                        src={s.image}
                        alt={s.name}
                        loading="lazy"
                        className="h-10 w-14 flex-none rounded object-cover"
                      />
                      <span>{s.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{s.level}</td>
                  <td className="px-4 py-3 text-slate-600">{s.llg}</td>
                  <td className="px-4 py-3 text-slate-600">{s.location}</td>
                  <td className="px-4 py-3 text-slate-600">{s.type}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{s.enrolment.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {filtered.map((s) => (
            <Link key={s.id} to={`/schools/${s.id}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-36 w-full object-cover"
              />
              <div className="p-6">
              <h2 className="text-base font-semibold text-slate-900">{s.name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {s.level} &middot; {s.type}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div><dt className="text-slate-400">LLG</dt><dd>{s.llg}</dd></div>
                <div><dt className="text-slate-400">Location</dt><dd>{s.location}</dd></div>
                <div><dt className="text-slate-400">Enrolment</dt><dd>{s.enrolment.toLocaleString()}</dd></div>
              </dl>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
