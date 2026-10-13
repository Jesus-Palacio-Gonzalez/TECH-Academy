import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { FormError, PasswordField, SubmitButton } from '../components/auth/fields'
import { useAuth } from '../context/AuthContext'
import { authErrorMessage } from '../lib/errors'

export default function ResetPassword() {
  const { session, loading: authLoading, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (password.length < 8) next.password = 'Usa al menos 8 caracteres.'
    if (confirm !== password) next.confirm = 'Las contraseñas no coinciden.'
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length) return

    setLoading(true)
    try {
      await updatePassword(password)
      navigate('/panel', { replace: true })
    } catch (err) {
      setFormError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  if (!authLoading && !session) {
    return (
      <AuthShell title="El enlace ya no es válido">
        <p className="text-muted">Los enlaces de recuperación caducan. Pide uno nuevo para continuar.</p>
        <Link
          to="/recuperar"
          className="mt-6 inline-block rounded-lg bg-mark px-5 py-3 font-semibold text-mark-ink hover:bg-[#ffd566]"
        >
          Pedir un enlace nuevo
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Crea una contraseña nueva">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <PasswordField
          label="Contraseña nueva"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Mínimo 8 caracteres."
          error={errors.password}
        />
        <PasswordField
          label="Repite la contraseña"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />
        <FormError>{formError}</FormError>
        <SubmitButton loading={loading}>Guardar contraseña</SubmitButton>
      </form>
    </AuthShell>
  )
}
