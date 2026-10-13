import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const FREE = [
  'Todos los cursos del catálogo',
  'Rutas de formación completas',
  'Ejercicios con corrección automática',
  'Progreso guardado en tu cuenta',
]

const PRO = [
  'Certificados al terminar una ruta',
  'Proyectos revisados por mentores',
  'Todo lo del plan Gratis',
]

export function Pricing() {
  return (
    <section id="precios" className="scroll-mt-16 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Hoy aprender no cuesta nada</h2>
        <p className="mt-4 max-w-xl text-muted">
          Empieza con el plan Gratis. Estamos preparando un plan Pro para quienes quieran certificados y mentoría.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-xl border border-mark bg-panel p-8">
            <h3 className="text-xl font-bold">Gratis</h3>
            <p className="mt-4 font-display text-5xl font-extrabold">$0</p>
            <p className="mt-1 text-sm text-muted">Sin tarjeta de crédito</p>
            <ul className="mt-6 space-y-3">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/registro"
              className="mt-8 rounded-lg bg-mark px-5 py-3 text-center font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
            >
              Crear cuenta gratis
            </Link>
          </div>

          <div className="flex flex-col rounded-xl border border-line bg-panel/60 p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Pro</h3>
              <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">Próximamente</span>
            </div>
            <p className="mt-4 font-display text-5xl font-extrabold text-muted">Por definir</p>
            <p className="mt-1 text-sm text-muted">Te avisaremos antes de lanzarlo</p>
            <ul className="mt-6 space-y-3">
              {PRO.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-muted">
                  <Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-8 cursor-not-allowed rounded-lg border border-line px-5 py-3 text-center font-medium text-muted"
            >
              Aún no disponible
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
