import { useState, useEffect } from 'react'
import type { Profile } from '../types/profile'
import { signIn, signOut, fetchProfile, getSession } from '../models/auth-model'
import { supabase } from '../models/supabase-client'

export function useAuthController() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getSession().then(async (session) => {
      if (session?.user) {
        const p = await fetchProfile(session.user.id)
        setProfile(p)
      }
      setIsLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const p = await fetchProfile(session.user.id)
        setProfile(p)
      } else {
        setProfile(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function login(email: string, password: string) {
    setError(null)
    setIsLoading(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    await signOut()
    setProfile(null)
  }

  return { profile, isLoading, error, login, logout }
}
