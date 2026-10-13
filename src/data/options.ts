export const LEVELS = [
  { value: 'principiante', label: 'Principiante', hint: 'Voy a empezar desde cero' },
  { value: 'intermedio', label: 'Intermedio', hint: 'Ya escribí algo de código' },
  { value: 'avanzado', label: 'Avanzado', hint: 'Quiero profundizar' },
] as const

export const GOALS = [
  { value: 'primer-empleo', label: 'Conseguir mi primer empleo' },
  { value: 'cambio-carrera', label: 'Cambiar de carrera' },
  { value: 'freelance', label: 'Trabajar como freelance' },
  { value: 'proyecto-propio', label: 'Crear mi propio proyecto' },
  { value: 'curiosidad', label: 'Aprender por curiosidad' },
] as const

export const INTERESTS = [
  { value: 'web', label: 'Desarrollo web' },
  { value: 'datos-ia', label: 'Datos e IA' },
  { value: 'movil', label: 'Desarrollo móvil' },
  { value: 'ciberseguridad', label: 'Ciberseguridad' },
  { value: 'explorar', label: 'Aún no lo sé' },
] as const

export const COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'España',
  'Estados Unidos',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Puerto Rico',
  'República Dominicana',
  'Uruguay',
  'Venezuela',
  'Otro país',
] as const

export type Level = (typeof LEVELS)[number]['value']
export type Goal = (typeof GOALS)[number]['value']
export type Interest = (typeof INTERESTS)[number]['value']

export interface ProfileData {
  full_name: string
  country: string
  level: Level | ''
  goal: Goal | ''
  interest: Interest | ''
}

export interface Profile {
  id: string
  full_name: string | null
  country: string | null
  level: Level | null
  goal: Goal | null
  interest: Interest | null
  role: 'student' | 'admin'
}

export function isProfileComplete(p: Profile | null): boolean {
  return Boolean(p && p.full_name && p.country && p.level && p.goal && p.interest)
}
