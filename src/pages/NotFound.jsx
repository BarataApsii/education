import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." />
      <section className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 max-w-md text-slate-600">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </section>
    </>
  )
}
