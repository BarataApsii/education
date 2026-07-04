import { site } from '../data/site'

/**
 * Seo renders per-page document metadata.
 *
 * React 19 automatically hoists <title>, <meta> and <link> elements rendered
 * anywhere in the tree into the document <head>, so no external helmet library
 * is required.
 *
 * @param {object} props
 * @param {string} props.title       Page title (site name is appended automatically).
 * @param {string} props.description Meta description for search engines / social cards.
 * @param {string} [props.path]      Route path used to build the canonical URL (e.g. "/about").
 */
export default function Seo({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | ${site.name}` : site.name
  const canonical = `${site.url}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
