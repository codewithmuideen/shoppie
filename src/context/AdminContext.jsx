import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const SESSION_KEY = 'maison.admin.session.v1'
// Legacy fallback when Supabase isn't configured yet. Override in .env via
// VITE_ADMIN_PASSWORD.
const LEGACY_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || 'maison2026'

const AdminCtx = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [bootChecked, setBootChecked] = useState(false)

  // Hydrate session
  useEffect(() => {
    let mounted = true

    const init = async () => {
      if (isSupabaseConfigured) {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setIsAdmin(!!data?.session)
      } else {
        setIsAdmin(localStorage.getItem(SESSION_KEY) === 'true')
      }
      setBootChecked(true)
    }
    init()

    let sub
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange((_evt, session) => {
        setIsAdmin(!!session)
      })
      sub = data?.subscription
    }
    return () => { mounted = false; sub?.unsubscribe?.() }
  }, [])

  // Legacy session mirror
  useEffect(() => {
    if (isSupabaseConfigured) return
    if (isAdmin) localStorage.setItem(SESSION_KEY, 'true')
    else localStorage.removeItem(SESSION_KEY)
  }, [isAdmin])

  const login = async (emailOrPwd, maybePwd) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailOrPwd,
        password: maybePwd
      })
      if (error) return { ok: false, error: error.message }
      return { ok: true }
    }
    // legacy single-field password
    if (emailOrPwd === LEGACY_PASSWORD) { setIsAdmin(true); return { ok: true } }
    return { ok: false, error: 'Incorrect password.' }
  }

  const logout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    setIsAdmin(false)
  }

  const value = useMemo(
    () => ({ isAdmin, bootChecked, login, logout, isSupabaseConfigured }),
    [isAdmin, bootChecked]
  )
  return <AdminCtx.Provider value={value}>{children}</AdminCtx.Provider>
}

export const useAdmin = () => {
  const ctx = useContext(AdminCtx)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
