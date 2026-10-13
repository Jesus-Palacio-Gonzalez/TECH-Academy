import { COUNTRIES, GOALS, INTERESTS, LEVELS, type ProfileData } from '../../data/options'
import { ChoiceGroup, SelectField } from './fields'

export type ProfileErrors = Partial<Record<keyof ProfileData, string>>

export function validateProfile(d: ProfileData, requireName: boolean): ProfileErrors {
  const e: ProfileErrors = {}
  if (requireName && d.full_name.trim().length < 2) e.full_name = 'Escribe tu nombre.'
  if (!d.country) e.country = 'Elige tu país.'
  if (!d.level) e.level = 'Elige tu nivel.'
  if (!d.goal) e.goal = 'Elige tu meta.'
  if (!d.interest) e.interest = 'Elige un área de interés.'
  return e
}

export function ProfileFields({
  value,
  onChange,
  errors,
}: {
  value: ProfileData
  onChange: (next: ProfileData) => void
  errors: ProfileErrors
}) {
  const set = <K extends keyof ProfileData>(key: K, v: ProfileData[K]) => onChange({ ...value, [key]: v })

  return (
    <div className="space-y-6">
      <SelectField
        label="País"
        placeholder="Selecciona tu país"
        value={value.country}
        onChange={(v) => set('country', v)}
        options={COUNTRIES}
        error={errors.country}
      />
      <ChoiceGroup
        legend="¿Cuál es tu nivel?"
        value={value.level}
        onChange={(v) => set('level', v)}
        options={LEVELS}
        error={errors.level}
      />
      <ChoiceGroup
        legend="¿Qué área te interesa?"
        value={value.interest}
        onChange={(v) => set('interest', v)}
        options={INTERESTS}
        error={errors.interest}
      />
      <ChoiceGroup
        legend="¿Qué quieres lograr?"
        value={value.goal}
        onChange={(v) => set('goal', v)}
        options={GOALS}
        error={errors.goal}
      />
    </div>
  )
}
