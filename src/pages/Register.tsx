import { MailCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { Field, FormError, PasswordField, SubmitButton } from '../components/auth/fields'
import { ProfileFields, validateProfile, type ProfileErrors } from '../components/auth/ProfileFields'
import { SocialButtons } from '../components/auth/SocialButtons'
import { useAuth } from '../context/AuthContext'
import { INTERESTS, type Interest, type ProfileData } from '../data/options'
import { EMAIL_RE, authErrorMessage } from '../lib/errors'

type AccountErrors = { full_name?: string; email?: string; password?: string; terms?: string }

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const routeParam = params.get('ruta')
  const presetInterest = INTERESTS.find((i) => i.value === routeParam)?.value ?? ''

  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    country: '',
    level: '',
    goal: '',
    interest: presetInterest as Interest | '',
  })
  const [accountErrors, setAccountErrors] = useState<AccountErrors>({})
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  function nextStep(e: FormEvent) {
    e.preventDefault()
    const errs: AccountErrors = {}
    if (profile.full_name.trim().length < 2) errs.full_name = 'Escribe tu nombre.'
    if (!EMAIL_RE.test(email.trim())) errs.email = 'Escribe un correo válido.'
    if (password.length < 8) errs.password = 'Usa al menos 8 caracteres.'
    if (!accepted) errs.terms = 'Acepta los términos para continuar.'
    setAccountErrors(errs)
    if (Object.keys(errs).length === 0) setStep(2)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateProfile(profile, true)
    setProfileErrors(errs)
    setFormError('')
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      const { needsConfirmation } = await signUp(email.trim(), password, {
        ...profile,
        full_name: profile.full_name.trim(),
      })
      if (needsConfirmation) setPendingEmail(email.trim())
      else navigate('/panel', { replace: true })
    } catch (err) {
      setFormError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  if (pendingEmail) {
    return (
      <AuthShell title="Revisa tu correo">
        <div className="rounded-xl border border-line bg-panel p-6">
          <MailCheck className="text-ok" size={28} aria-hidden="true" />
          <p className="mt-4 leading-relaxed">
            Enviamos un enlace de confirmación a <strong>{pendingEmail}</strong>. Ábrelo para activar tu cuenta y
            empezar tu ruta.
          </p>
          <p className="mt-3 text-sm text-muted">Si no lo ves, revisa la carpeta de spam.</p>
        </div>
        <Link to="/ingresar" className="mt-6 inline-block text-sm font-medium text-mark hover:underline">
          Ir a ingresar
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title={step === 1 ? 'Crea tu cuenta gratis' : 'Cuéntanos sobre ti'}
      subtitle={
        step === 1
          ? 'Tarda menos de un minuto. No pedimos tarjeta.'
          : 'Con esto te recomendamos la ruta que mejor te encaja.'
      }
      footer={
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to="/ingresar" className="font-medium text-mark hover:underline">
            Ingresa
          </Link>
        </p>
      }
    >
      <p className="mb-6 text-sm text-muted" aria-live="polite">
        Paso {step} de 2
      </p>

      {step === 1 ? (
        <div className="space-y-6">
          <SocialButtons />
          <form onSubmit={nextStep} noValidate className="space-y-5">
            <Field
              label="Nombre"
              autoComplete="name"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              error={accountErrors.full_name}
            />
            <Field
              label="Correo"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={accountErrors.email}
            />
            <PasswordField
              label="Contraseña"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Mínimo 8 caracteres."
              error={accountErrors.password}
            />
            <div>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#ffc83d]"
                />
                <span className="text-muted">Acepto los términos de uso y la política de privacidad.</span>
              </label>
              {accountErrors.terms && <p className="mt-2 text-sm text-danger">{accountErrors.terms}</p>}
            </div>
            <SubmitButton loading={false}>Continuar</SubmitButton>
          </form>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <ProfileFields value={profile} onChange={setProfile} errors={profileErrors} />
          <FormError>{formError}</FormError>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg border border-line px-5 py-3.5 font-medium transition-colors hover:border-muted"
            >
              Atrás
            </button>
            <div className="flex-1">
              <SubmitButton loading={loading}>Crear mi cuenta</SubmitButton>
            </div>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
