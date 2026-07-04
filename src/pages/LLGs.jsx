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
      />

      <section className="container-page py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {llgs.map((llg) => (
            <article key={llg.id} className="card flex flex-col">
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
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
