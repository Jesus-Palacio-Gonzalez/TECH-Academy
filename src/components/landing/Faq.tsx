import { ChevronDown } from 'lucide-react'
import { FAQS } from '../../data/content'

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-16 border-t border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-4 max-w-sm text-muted">
            Lo que más nos preguntan antes de crear una cuenta.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-6 text-left font-display text-lg font-semibold">
                {f.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-muted transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
