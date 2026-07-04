import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import schools from '../data/schools.json'

export default function SchoolDetail() {
  const { id } = useParams()
  const school = schools.find((s) => s.id === id)

  if (!school) {
    return (
      <>
        <Seo title="School Not Found" description="The requested school was not found." path="/schools" />
        <PageHeader title="School Not Found" subtitle="We couldn't find the school you're looking for." />
        <section className="container-page py-14">
          <p className="text-slate-600">The school you requested could not be found.</p>
          <Link to="/schools" className="btn-primary mt-6 inline-block">
            Back to Schools
          </Link>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo
        title={school.name}
        description={`${school.name} - ${school.level} school in ${school.location}, ${school.llg}. Contact: ${school.phone}`}
        path={`/schools/${school.id}`}
      />
      <PageHeader title={school.name} subtitle={`${school.level} School • ${school.llg}`} />

      {/* Hero Banner */}
      <section className="relative h-64 sm:h-80 lg:h-96">
        <img
          src={school.image}
          alt={school.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* School Information */}
            <div className="card">
              <h2 className="text-xl font-bold text-slate-900">About the School</h2>
              <dl className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">School Level</dt>
                    <dd className="mt-1 text-slate-700">{school.level}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Type</dt>
                    <dd className="mt-1 text-slate-700">{school.type}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Established</dt>
                    <dd className="mt-1 text-slate-700">{school.established}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Enrolment</dt>
                    <dd className="mt-1 text-slate-700">{school.enrolment} students</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Registration No.</dt>
                    <dd className="mt-1 text-slate-700">{school.registrationNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">LLG</dt>
                    <dd className="mt-1 text-slate-700">{school.llg}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Campus Images */}
            {school.campusImages && school.campusImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Campus Gallery</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {school.campusImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${school.name} campus ${index + 1}`}
                      className="rounded-lg object-cover h-48 w-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Information Desk</dt>
                  <dd className="mt-1">
                    <a className="text-brand-700 hover:text-brand-800" href={`tel:${school.informationDesk.phone}`}>
                      {school.informationDesk.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</dt>
                  <dd className="mt-1">
                    <a className="text-brand-700 hover:text-brand-800" href={`mailto:${school.informationDesk.email}`}>
                      {school.informationDesk.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Actions */}
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
              <div className="mt-4 space-y-3">
                <a href={`tel:${school.informationDesk.phone}`} className="btn-outline w-full text-center block">
                  Call Information Desk
                </a>
                <a href={`mailto:${school.informationDesk.email}`} className="btn-outline w-full text-center block">
                  Send Email
                </a>
                <Link to="/contact" className="btn-outline w-full text-center block">
                  Contact District Office
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Principal Section - Full Width */}
        {school.principal && (
          <div className="card mt-8">
            <h2 className="text-xl font-bold text-slate-900">Principal</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">{school.principal.name}</h3>
                <p className="text-slate-600 leading-relaxed">{school.principal.bio}</p>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Qualifications</dt>
                    <dd className="mt-1 text-slate-700">{school.principal.qualifications}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Principal Since</dt>
                    <dd className="mt-1 text-slate-700">{school.principal.since}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-center">
                <img
                  src={school.principal.image}
                  alt={school.principal.name}
                  className="h-64 w-64 rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Location Section with Map - Full Width */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-slate-900">Location</h2>
          <div className="mt-4">
            <p className="text-slate-600 mb-4">
              <span className="font-semibold">Address:</span> {school.location}, {school.llg}
            </p>
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <iframe
                src={`https://www.google.com/maps?q=${school.coordinates}&output=embed`}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${school.name} location`}
              />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Coordinates: {school.coordinates}
            </p>
            <a
              href={`https://www.google.com/maps?q=${school.coordinates}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-block"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
