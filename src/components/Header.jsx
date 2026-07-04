import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../data/site'

// Primary navigation items shared between desktop and mobile menus.
const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/llgs', label: 'LLGs' },
  { to: '/schools', label: 'Schools' },
  { to: '/news', label: 'News & Notices' },
  { to: '/contact', label: 'Contact' },
]

// Shared class logic for nav links so active route is visually highlighted.
function navLinkClass({ isActive }) {
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Brand / logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
            UB
          </span>
          <span className="text-base font-bold leading-tight text-slate-900">
            {site.shortName}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
