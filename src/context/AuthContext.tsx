import type { Session, User } from '@supabase/supabase-js'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Profile, ProfileData } from '../data/options'
import { supabase } from '../lib/supabase'

interface AuthState {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, data: ProfileData) => Promise<{ needsConfirmation: boolean }>
  signIn: (email: string, password: string) => Promise<void>
  signInWithProvider: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  saveProfile: (data: ProfileData) => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sessionReady, setSessionReady] = useState(false)
  const [profileReady, setProfileReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setSessionReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setSessionReady(true)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user.id

  useEffect(() => {
    if (!sessionReady) return
    if (!userId) {
      setProfile(null)
      setProfileReady(true)
      return
    }
    let cancelled = false
    setProfileReady(false)
    supabase
      .from('profiles')
      .select('id, full_name, country, level, goal, interest, role')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return
        setProfile((data as Profile | null) ?? null)
        setProfileReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [sessionReady, userId])

  const signUp: AuthState['signUp'] = useCallback(async (email, password, data) => {
    const { data: res, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data,
        emailRedirectTo: `${window.location.origin}/panel`,
      },
    })
    if (error) throw error
    return { needsConfirmation: !res.session }
  }, [])

  const signIn: AuthState['signIn'] = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signInWithProvider: AuthState['signInWithProvider'] = useCallback(async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/panel` },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  const sendPasswordReset: AuthState['sendPasswordReset'] = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nueva-clave`,
    })
    if (error) throw error
  }, [])

  const updatePassword: AuthState['updatePassword'] = useCallback(async (password) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  }, [])

  const saveProfile: AuthState['saveProfile'] = useCallback(
    async (data) => {
      if (!userId) throw new Error('No hay sesión activa.')
      const { data: row, error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          country: data.country,
          level: data.level,
          goal: data.goal,
          interest: data.interest,
        })
        .eq('id', userId)
        .select('id, full_name, country, level, goal, interest, role')
        .single()
      if (error) throw error
      setProfile(row as Profile)
    },
    [userId],
  )

  const value = useMemo<AuthState>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading: !sessionReady || !profileReady,
      signUp,
      signIn,
      signInWithProvider,
      signOut,
      sendPasswordReset,
      updatePassword,
      saveProfile,
    }),
    [
      session,
      profile,
      sessionReady,
      profileReady,
      signUp,
      signIn,
      signInWithProvider,
      signOut,
      sendPasswordReset,
      updatePassword,
      saveProfile,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
