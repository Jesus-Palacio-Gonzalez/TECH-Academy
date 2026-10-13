import { TESTIMONIALS } from '../../data/content'

export function Testimonials() {
  const [main, ...rest] = TESTIMONIALS
  return (
    <section className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Lo que cuentan quienes ya empezaron</h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <figure className="flex flex-col justify-between rounded-xl border border-line bg-panel p-8 lg:p-10">
            <blockquote className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
              {main.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-semibold">{main.name}</span>
              <span className="text-muted"> · {main.context}</span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4">
            {rest.map((t) => (
              <figure key={t.name} className="rounded-xl border border-line bg-panel p-6">
                <blockquote className="leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted"> · {t.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
