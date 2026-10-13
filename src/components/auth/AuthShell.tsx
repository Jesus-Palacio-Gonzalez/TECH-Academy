import { TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { supabaseConfigured } from '../../lib/supabase'
import { Logo } from '../Logo'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_0.8fr]">
      <main className="flex flex-col px-5 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          {!supabaseConfigured && (
            <div
              role="alert"
              className="mb-6 flex gap-3 rounded-lg border border-mark/50 bg-mark/10 p-4 text-sm"
            >
              <TriangleAlert size={18} className="mt-0.5 shrink-0 text-mark" aria-hidden="true" />
              <p>
                Falta conectar Supabase. Copia <code className="font-mono">.env.example</code> a{' '}
                <code className="font-mono">.env</code> y completa las dos variables.
              </p>
            </div>
          )}
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-muted">{footer}</div>}
        </div>
      </main>

      <aside className="relative hidden flex-col justify-end overflow-hidden border-l border-line bg-panel p-12 lg:flex" aria-hidden="true">
        <pre className="font-mono text-sm leading-8 text-muted">
          <span className="text-mark">const</span> ruta = [{'\n'}
          {'  '}<span className="text-peri">"HTML y CSS"</span>,{'\n'}
          {'  '}<span className="text-peri">"JavaScript"</span>,{'\n'}
          {'  '}<span className="text-peri">"React"</span>,{'\n'}
          {'  '}<span className="text-peri">"Tu primer proyecto"</span>,{'\n'}
          ];{'\n'}
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-mark" />
        </pre>
        <p className="mt-10 max-w-sm font-display text-2xl font-semibold leading-snug text-text">
          Cada ruta empieza con una cuenta y termina con algo que construiste tú.
        </p>
      </aside>
    </div>
  )
}
