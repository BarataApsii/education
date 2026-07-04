import { Link } from 'react-router-dom'
import { site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            {site.name}
          </h2>
          <p className="mt-3 max-w-xs text-sm text-slate-600">{site.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-slate-600 hover:text-brand-700" to="/about">About the District</Link></li>
            <li><Link className="text-slate-600 hover:text-brand-700" to="/llgs">LLGs</Link></li>
            <li><Link className="text-slate-600 hover:text-brand-700" to="/schools">Schools</Link></li>
            <li><Link className="text-slate-600 hover:text-brand-700" to="/news">News &amp; Notices</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Contact</h2>
          <address className="mt-3 space-y-2 text-sm not-italic text-slate-600">
            <p>{site.contact.address}</p>
            <p>
              <a className="hover:text-brand-700" href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>
                {site.contact.phone}
              </a>
            </p>
            <p>
              <a className="hover:text-brand-700" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-center gap-1 py-4 text-center text-xs text-slate-500">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p>
            Developed by:{' '}
            <a href="https://nextdev-png.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 hover:text-brand-800">
              Nextdev-PNG
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
