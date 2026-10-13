import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../data/content'

export function Paths() {
  const [activeId, setActiveId] = useState<string>(PATHS[0].id)
  const path = PATHS.find((p) => p.id === activeId) ?? PATHS[0]

  return (
    <section id="rutas" className="scroll-mt-16 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Elige una ruta y sabrás qué estudiar cada semana
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Cada ruta ordena los cursos en el orden en que conviene aprenderlos, de lo básico a un proyecto terminado.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div role="tablist" aria-label="Rutas de formación" aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:flex-col">
            {PATHS.map((p) => {
              const active = p.id === activeId
              return (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="panel-ruta"
                  onClick={() => setActiveId(p.id)}
                  className={`shrink-0 rounded-lg border px-4 py-3 text-left transition-colors lg:w-full ${
                    active
                      ? 'border-mark bg-panel text-text'
                      : 'border-line text-muted hover:border-muted hover:text-text'
                  }`}
                >
                  <span className="font-display text-base font-bold">{p.name}</span>
                </button>
              )
            })}
          </div>

          <div id="panel-ruta" role="tabpanel" className="rounded-xl border border-line bg-panel p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{path.name}</h3>
            <p className="mt-2 max-w-lg text-muted">{path.pitch}</p>
            <p className="mt-1 text-sm text-muted">{path.duration}</p>

            <ol className="mt-8">
              {path.steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < path.steps.length - 1 && (
                    <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" aria-hidden="true" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-raise font-display text-sm font-bold text-mark">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-muted">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to={`/registro?ruta=${path.id}`}
              className="mt-8 inline-block rounded-lg bg-mark px-5 py-3 font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
            >
              Empezar esta ruta
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
