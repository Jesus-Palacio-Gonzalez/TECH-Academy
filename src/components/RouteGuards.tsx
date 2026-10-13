import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isProfileComplete } from '../data/options'

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-muted" role="status">
      Cargando…
    </div>
  )
}

/** Solo usuarios con sesión. Si el perfil está incompleto (p. ej. entró con Google), pasa por la bienvenida. */
export function RequireAuth() {
  const { session, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading />
  if (!session) return <Navigate to="/ingresar" replace state={{ from: location.pathname }} />
  if (!isProfileComplete(profile) && location.pathname !== '/bienvenida') {
    return <Navigate to="/bienvenida" replace />
  }
  return <Outlet />
}

/** Páginas de acceso: si ya hay sesión, va al panel. */
export function PublicOnly() {
  const { session, loading } = useAuth()
  if (loading) return <Loading />
  if (session) return <Navigate to="/panel" replace />
  return <Outlet />
}
