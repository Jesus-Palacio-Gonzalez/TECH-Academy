import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { PATHS } from '../data/content'
import { GOALS, INTERESTS, LEVELS } from '../data/options'

export default function Dashboard() {
  const { profile, user, signOut } = useAuth()
  const navigate = useNavigate()

  const firstName = (profile?.full_name ?? user?.email ?? '').split(' ')[0]
  const recommended = PATHS.find((p) => p.id === profile?.interest) ?? PATHS[0]
  const label = (list: readonly { value: string; label: string }[], v?: string | null) =>
    list.find((o) => o.value === v)?.label ?? '—'

  async function logout() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-4">
            {profile?.role === 'admin' && (
              <span className="rounded-full border border-mark px-3 py-1 text-xs text-mark">Administrador</span>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-muted"
            >
              <LogOut size={16} aria-hidden="true" /> Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h1 className="text-3xl font-bold sm:text-5xl">Hola, {firstName}</h1>
        <p className="mt-3 text-muted">Esta es tu base para empezar.</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-xl border border-line bg-panel p-8" aria-labelledby="ruta-recomendada">
            <h2 id="ruta-recomendada" className="text-sm font-medium text-muted">
              Tu ruta recomendada
            </h2>
            <p className="mt-2 font-display text-3xl font-bold">{recommended.name}</p>
            <p className="mt-2 max-w-md text-muted">{recommended.pitch}</p>
            <ol className="mt-6 space-y-2 text-sm">
              {recommended.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="font-display font-bold text-mark">{i + 1}</span>
                  {s.title}
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-lg border border-line bg-raise/50 px-4 py-3 text-sm text-muted">
              Los cursos se están cargando. Pronto podrás empezar desde aquí.
            </p>
          </section>

          <section className="rounded-xl border border-line bg-panel p-8" aria-labelledby="tu-perfil">
            <h2 id="tu-perfil" className="text-sm font-medium text-muted">
              Tu perfil
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Correo</dt>
                <dd className="break-all">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-muted">País</dt>
                <dd>{profile?.country ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted">Nivel</dt>
                <dd>{label(LEVELS, profile?.level)}</dd>
              </div>
              <div>
                <dt className="text-muted">Área de interés</dt>
                <dd>{label(INTERESTS, profile?.interest)}</dd>
              </div>
              <div>
                <dt className="text-muted">Meta</dt>
                <dd>{label(GOALS, profile?.goal)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
    </div>
  )
}
