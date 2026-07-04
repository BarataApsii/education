import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout wraps every page with the shared Header and Footer and renders the
 * active route via <Outlet />. It also resets scroll position on navigation.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Scroll to top whenever the route changes (avoids landing mid-page).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <TopBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          aria-label="Back to top"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}
