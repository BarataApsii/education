import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import schools from '../data/schools.json'

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Marker that opens its popup automatically on mount
function MarkerWithOpenPopup({ position, children }) {
  const markerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup()
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Marker position={position} ref={markerRef}>
      {children}
    </Marker>
  )
}

export default function SchoolDetail() {
  const { id } = useParams()
  const school = schools.find((s) => s.id === id)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter out current school and get other schools
  const otherSchools = schools.filter((s) => s.id !== id)

  // Cards per slide based on screen size
  const cardsPerSlide = 3
  const totalSlides = Math.ceil(otherSchools.length / cardsPerSlide)

  // Carousel navigation - move one slide at a time, no wrap-around
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Auto-advance carousel - always slide forward, reset to start at end
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

        {/* Location Section - Grid Layout */}
        <h2 className="text-xl font-bold text-slate-900 mt-8">Location</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {/* Left Side - Location Details */}
          <div className="card space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-brand-100 rounded-lg">
                <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">School Name</h3>
                <p className="mt-1 text-lg font-semibold text-slate-900">{school.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-brand-100 rounded-lg">
                <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Location</h3>
                <p className="mt-1 text-slate-900">{school.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-brand-100 rounded-lg">
                <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Contact</h3>
                <p className="mt-1 text-slate-900">{school.informationDesk.phone}</p>
                <p className="text-slate-600 text-sm">{school.informationDesk.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-brand-100 rounded-lg">
                <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">LLG</h3>
                <p className="mt-1 text-slate-900">{school.llg}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="lg:col-span-2 card p-0 overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96 w-full">
              <MapContainer
                center={[parseFloat(school.coordinates.split(',')[0]), parseFloat(school.coordinates.split(',')[1])]}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerWithOpenPopup position={[parseFloat(school.coordinates.split(',')[0]), parseFloat(school.coordinates.split(',')[1])]}>
                  <Popup>
                    <div style={{ padding: '4px', minWidth: '200px' }}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 'bold', color: '#1e293b' }}>{school.name}</h3>
                      <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#64748b' }}>{school.location}</p>
                      <p style={{ margin: '0', fontSize: '13px', color: '#64748b' }}>{school.llg}</p>
                    </div>
                  </Popup>
                </MarkerWithOpenPopup>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Explore More Schools Carousel */}
        {otherSchools.length > 0 && (
          <section className="bg-gradient-to-br from-slate-50 to-brand-50 py-16">
            <div className="container-page">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Explore More Schools</h2>
                  <p className="mt-2 text-slate-600">Discover other educational institutions in our district</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Previous school"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Next school"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {otherSchools
                          .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                          .map((otherSchool) => (
                            <Link key={otherSchool.id} to={`/schools/${otherSchool.id}`} className="block">
                              <div className="card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                  <img
                                    src={otherSchool.image}
                                    alt={otherSchool.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                  <div className="absolute bottom-4 left-4 right-4">
                                    <span className="inline-block px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full mb-2">
                                      {otherSchool.level}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-6">
                                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                                    {otherSchool.name}
                                  </h3>
                                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {otherSchool.location}
                                  </div>
                                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                    <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {otherSchool.llg}
                                  </div>
                                  <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-slate-500">{otherSchool.enrolment} students</span>
                                    <span className="text-sm font-medium text-brand-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                      View Details
                                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* View All Schools Button */}
                <div className="flex justify-center mt-8">
                  <Link
                    to="/schools"
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                  >
                    View All Schools
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  )
}
