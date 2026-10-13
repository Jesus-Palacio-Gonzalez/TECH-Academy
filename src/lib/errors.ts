export function authErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  const m = raw.toLowerCase()
  if (m.includes('invalid login credentials')) return 'El correo o la contraseña no coinciden.'
  if (m.includes('email not confirmed')) return 'Confirma tu correo antes de ingresar. Revisa tu bandeja de entrada.'
  if (m.includes('user already registered') || m.includes('already been registered'))
    return 'Ese correo ya tiene una cuenta. Ingresa o recupera tu contraseña.'
  if (m.includes('password should be at least')) return 'La contraseña debe tener al menos 8 caracteres.'
  if (m.includes('rate limit') || m.includes('too many'))
    return 'Hiciste muchos intentos seguidos. Espera unos minutos y vuelve a probar.'
  if (m.includes('failed to fetch') || m.includes('network'))
    return 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
  if (m.includes('same password')) return 'La nueva contraseña debe ser distinta a la anterior.'
  return 'Algo salió mal. Inténtalo de nuevo en un momento.'
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
