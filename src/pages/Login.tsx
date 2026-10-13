import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormError, Field, PasswordField, SubmitButton } from '../components/auth/fields'
import { AuthShell } from '../components/auth/AuthShell'
import { SocialButtons } from '../components/auth/SocialButtons'
import { useAuth } from '../context/AuthContext'
import { EMAIL_RE, authErrorMessage } from '../lib/errors'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/panel'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!EMAIL_RE.test(email.trim())) next.email = 'Escribe un correo válido.'
    if (!password) next.password = 'Escribe tu contraseña.'
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length) return

    setLoading(true)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setFormError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Ingresa a tu cuenta"
      subtitle="Retoma tu ruta donde la dejaste."
      footer={
        <p>
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="font-medium text-mark hover:underline">
            Crea una gratis
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        <SocialButtons />
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field
            label="Correo"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <PasswordField
            label="Contraseña"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <div className="text-right text-sm">
            <Link to="/recuperar" className="text-muted hover:text-text">
              Olvidé mi contraseña
            </Link>
          </div>
          <FormError>{formError}</FormError>
          <SubmitButton loading={loading}>Ingresar</SubmitButton>
        </form>
      </div>
    </AuthShell>
  )
}
