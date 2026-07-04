/**
 * PageHeader renders a consistent title band at the top of interior pages.
 *
 * @param {object} props
 * @param {string} props.title    Main page heading.
 * @param {string} [props.subtitle] Optional supporting line.
 */
export default function PageHeader({ title, subtitle }) {
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
