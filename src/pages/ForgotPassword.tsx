import { MailCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { Field, FormError, SubmitButton } from '../components/auth/fields'
import { useAuth } from '../context/AuthContext'
import { EMAIL_RE, authErrorMessage } from '../lib/errors'

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!EMAIL_RE.test(email.trim())) {
      setError('Escribe un correo válido.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await sendPasswordReset(email.trim())
      setSent(true)
    } catch (err) {
      setFormError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Recupera tu contraseña"
      subtitle="Te enviamos un enlace para crear una nueva."
      footer={
        <Link to="/ingresar" className="font-medium text-mark hover:underline">
          Volver a ingresar
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-line bg-panel p-6">
          <MailCheck className="text-ok" size={28} aria-hidden="true" />
          <p className="mt-4 leading-relaxed">
            Si <strong>{email.trim()}</strong> tiene una cuenta, recibirás un correo con el enlace en unos minutos.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field
            label="Correo"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <FormError>{formError}</FormError>
          <SubmitButton loading={loading}>Enviar enlace</SubmitButton>
        </form>
      )}
    </AuthShell>
  )
}
