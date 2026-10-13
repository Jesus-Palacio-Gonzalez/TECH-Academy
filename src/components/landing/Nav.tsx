import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Logo } from '../Logo'

const LINKS = [
  { href: '#rutas', label: 'Rutas' },
  { href: '#cursos', label: 'Cursos' },
  { href: '#precios', label: 'Precios' },
  { href: '#preguntas', label: 'Preguntas' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { session } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <Link
              to="/panel"
              className="rounded-lg bg-mark px-4 py-2 text-sm font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
            >
              Ir a mi panel
            </Link>
          ) : (
            <>
              <Link to="/ingresar" className="px-3 py-2 text-sm text-muted transition-colors hover:text-text">
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="rounded-lg bg-mark px-4 py-2 text-sm font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="menu-movil" className="border-t border-line bg-ink px-5 pb-6 pt-4 md:hidden">
          <nav aria-label="Principal móvil" className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex gap-3">
            {session ? (
              <Link to="/panel" className="flex-1 rounded-lg bg-mark px-4 py-3 text-center font-semibold text-mark-ink">
                Ir a mi panel
              </Link>
            ) : (
              <>
                <Link to="/ingresar" className="flex-1 rounded-lg border border-line px-4 py-3 text-center">
                  Ingresar
                </Link>
                <Link to="/registro" className="flex-1 rounded-lg bg-mark px-4 py-3 text-center font-semibold text-mark-ink">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
