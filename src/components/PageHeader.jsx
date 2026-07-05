/**
 * PageHeader renders a consistent banner band at the top of interior pages.
 *
 * @param {object} props
 * @param {string} props.title    Main page heading.
 * @param {string} [props.subtitle] Optional supporting line.
 * @param {string} [props.image]  Optional banner background image URL.
 * @param {string} [props.imageAlt] Optional alt text for the banner image.
 */
export default function PageHeader({ title, subtitle, image, imageAlt = '' }) {
  if (image) {
    return (
      <section className="relative overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/65 to-slate-900/30" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-slate-200">{subtitle}</p>}
        </div>
      </section>
    )
  }

  return (
    <section className="border-b border-slate-200 bg-brand-50/60">
      <div className="container-page py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-slate-600">{subtitle}</p>}
      </div>
    </section>
  )
}
