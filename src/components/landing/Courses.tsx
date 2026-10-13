import { BookOpen, Braces, Clock, Database, GitBranch, Globe, ShieldCheck, Terminal } from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { COURSES, type Course } from '../../data/content'

const ICONS: Record<Course['icon'], ComponentType<{ size?: number; className?: string }>> = {
  globe: Globe,
  braces: Braces,
  terminal: Terminal,
  git: GitBranch,
  database: Database,
  shield: ShieldCheck,
}

export function Courses() {
  return (
    <section id="cursos" className="scroll-mt-16 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Cursos para empezar hoy</h2>
            <p className="mt-4 max-w-xl text-muted">
              Lecciones cortas con ejercicios en cada paso. Ninguno exige experiencia previa, salvo donde se indica.
            </p>
          </div>
          <Link to="/registro" className="text-sm font-medium text-mark underline-offset-4 hover:underline">
            Crear cuenta para ver todo el catálogo
          </Link>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => {
            const Icon = ICONS[c.icon]
            return (
              <li
                key={c.title}
                className={`flex flex-col rounded-xl border border-line bg-panel p-6 ${
                  c.featured ? 'lg:col-span-2 lg:p-8' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-raise text-mark">
                    <Icon size={22} />
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">{c.level}</span>
                </div>
                <h3 className={`mt-5 font-bold ${c.featured ? 'text-3xl' : 'text-xl'}`}>{c.title}</h3>
                <p className={`mt-2 text-muted ${c.featured ? 'max-w-lg text-base' : 'text-sm'}`}>{c.summary}</p>
                <div className="mt-auto flex items-center gap-5 pt-6 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={15} /> {c.lessons} lecciones
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={15} /> {c.hours} h
                  </span>
                  <span className="ml-auto font-semibold text-ok">Gratis</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
