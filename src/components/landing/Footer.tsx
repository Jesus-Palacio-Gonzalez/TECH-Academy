import { Link } from 'react-router-dom'
import { Logo } from '../Logo'

const COLUMNS = [
  {
    title: 'Aprende',
    links: [
      { label: 'Rutas de formación', href: '/#rutas' },
      { label: 'Cursos', href: '/#cursos' },
      { label: 'Precios', href: '/#precios' },
    ],
  },
  {
    title: 'Tu cuenta',
    links: [
      { label: 'Crear cuenta', to: '/registro' },
      { label: 'Ingresar', to: '/ingresar' },
      { label: 'Recuperar contraseña', to: '/recuperar' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Preguntas frecuentes', href: '/#preguntas' },
      { label: 'Contacto', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos de uso', href: '#' },
      { label: 'Política de privacidad', href: '#' },
      { label: 'Política de cookies', href: '#' },
    ],
  },
]

type FooterLink = { label: string; href?: string; to?: string }

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Cursos, recursos y rutas de formación en tecnología, reunidos en una sola plataforma.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-display font-bold">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {(col.links as FooterLink[]).map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to} className="text-sm text-muted transition-colors hover:text-text">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="text-sm text-muted transition-colors hover:text-text">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tech Academy. Todos los derechos reservados.</p>
          <p>Un producto de PalacioTech</p>
        </div>
      </div>
    </footer>
  )
}
