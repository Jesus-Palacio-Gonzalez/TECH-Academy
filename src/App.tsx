import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicOnly, RequireAuth } from './components/RouteGuards'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicOnly />}>
        <Route path="/ingresar" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<ForgotPassword />} />
      </Route>

      <Route path="/nueva-clave" element={<ResetPassword />} />

      <Route element={<RequireAuth />}>
        <Route path="/bienvenida" element={<Onboarding />} />
        <Route path="/panel" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
