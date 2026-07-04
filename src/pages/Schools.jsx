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
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 shadow-sm md:block">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4">School</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">LLG</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Enrolment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Link to={`/schools/${s.id}`} className="group flex items-center gap-4">
                      <img
                        src={s.image}
                        alt={s.name}
                        loading="lazy"
                        className="h-12 w-16 flex-none rounded-lg object-cover shadow-sm"
                      />
                      <span className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors">{s.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{s.level}</td>
                  <td className="px-6 py-4 text-slate-600">{s.llg}</td>
                  <td className="px-6 py-4 text-slate-600">{s.location}</td>
                  <td className="px-6 py-4 text-slate-600">{s.type}</td>
                  <td className="px-6 py-4 text-right text-slate-600">{s.enrolment.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {filtered.map((s) => (
            <Link key={s.id} to={`/schools/${s.id}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{s.name}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {s.level} · {s.type}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">LLG</span>
                    <span className="text-slate-600 font-medium">{s.llg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="text-slate-600 font-medium">{s.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enrolment</span>
                    <span className="text-slate-600 font-medium">{s.enrolment.toLocaleString()}</span>
                  </div>
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
