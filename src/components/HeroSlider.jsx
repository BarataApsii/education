import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import llgs from '../data/llgs.json'
import schools from '../data/schools.json'

const stats = [
  { label: 'Local-Level Governments', value: llgs.length },
  { label: 'Education institutions', value: '60+' },
  { label: 'Students enrolled', value: '3,000+' },
]

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
    alt: 'Books on a desk in a classroom',
    heading: site.name,
    subtext: site.tagline,
    showStats: true,
    cta: { label: 'View latest notices', to: '/news' },
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80',
    alt: 'Students walking together on campus',
    heading: 'Empowering Communities Through Education',
    subtext:
      'Working with Local-Level Governments, church agencies, and communities to deliver inclusive learning.',
    showStats: false,
    cta: { label: 'About the district', to: '/about' },
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Students in a modern classroom environment',
    heading: 'Building a Brighter Future',
    subtext:
      'Transparent planning, school grants, and selection results published for all to see.',
    showStats: false,
    cta: { label: 'Browse schools', to: '/schools' },
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[600px]">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={[
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              idx === current ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            aria-hidden={idx !== current}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="h-full w-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container-page w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                Official District Portal
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {slide.heading}
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
                {slide.subtext}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={slide.cta.to} className="btn-primary">
                  {slide.cta.label}
                </Link>
                <Link to="/contact" className="rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                  Contact us
                </Link>
              </div>

              {/* Stats (only on first slide) */}
              {slide.showStats && (
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg bg-white/10 px-3 py-3 text-center backdrop-blur-sm"
                    >
                      <div className="text-xl font-extrabold text-white sm:text-2xl">
                        {s.value}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-300 sm:text-xs">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrent(idx)}
              className={[
                'h-2.5 rounded-full transition-all',
                idx === current ? 'w-7 bg-white' : 'w-2.5 bg-white/50',
              ].join(' ')}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
