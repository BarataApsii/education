import { Link } from 'react-router-dom'
import { site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
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

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Affiliations</h2>
          <div className="mt-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/Flag_of_Madang.svg.webp" 
                alt="Madang Province Flag" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-sm text-slate-600">Madang Province</span>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src="/images/images.jpg" 
                alt="PNG Education Department" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-sm text-slate-600">PNG Education</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-500 bg-brand-600">
        <div className="container-page py-4 text-center text-xs text-brand-100">
          &copy; {year} {site.name}. All rights reserved.
          <span className="mx-2">|</span>
          Developed by: <a className="hover:text-white transition" href="https://nextdev-png.com/" target="_blank" rel="noopener noreferrer">NextDev-PNG</a>
        </div>
      </div>
    </footer>
  )
}
