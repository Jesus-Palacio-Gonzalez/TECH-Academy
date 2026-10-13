import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { Field, FormError, SubmitButton } from '../components/auth/fields'
import { ProfileFields, validateProfile, type ProfileErrors } from '../components/auth/ProfileFields'
import { useAuth } from '../context/AuthContext'
import type { ProfileData } from '../data/options'
import { authErrorMessage } from '../lib/errors'

export default function Onboarding() {
  const { profile, user, saveProfile } = useAuth()
  const navigate = useNavigate()

  const [data, setData] = useState<ProfileData>({
    full_name:
      profile?.full_name ??
      (user?.user_metadata?.full_name as string | undefined) ??
      (user?.user_metadata?.name as string | undefined) ??
      '',
    country: profile?.country ?? '',
    level: profile?.level ?? '',
    goal: profile?.goal ?? '',
    interest: profile?.interest ?? '',
  })
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateProfile(data, true)
    setErrors(errs)
    setFormError('')
    if (Object.keys(errs).length) return
    setLoading(true)
    try {
      await saveProfile({ ...data, full_name: data.full_name.trim() })
      navigate('/panel', { replace: true })
    } catch (err) {
      setFormError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Un último paso" subtitle="Cuéntanos sobre ti para recomendarte tu primera ruta.">
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <Field
          label="Nombre"
          autoComplete="name"
          value={data.full_name}
          onChange={(e) => setData({ ...data, full_name: e.target.value })}
          error={errors.full_name}
        />
        <ProfileFields value={data} onChange={setData} errors={errors} />
        <FormError>{formError}</FormError>
        <SubmitButton loading={loading}>Guardar y continuar</SubmitButton>
      </form>
    </AuthShell>
  )
}
