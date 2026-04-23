import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const SESSION_KEY = 'maison.admin.session.v1'
// Demo admin password. For a real deployment move this to env / server.
const ADMIN_PASSWORD = 'maison2026'

const AdminCtx = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === 'true'
  })

  useEffect(() => {
    if (isAdmin) localStorage.setItem(SESSION_KEY, 'true')
    else localStorage.removeItem(SESSION_KEY)
  }, [isAdmin])

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      return { ok: true }
    }
    return { ok: false, error: 'Incorrect password.' }
  }

  const logout = () => setIsAdmin(false)

  const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin])
  return <AdminCtx.Provider value={value}>{children}</AdminCtx.Provider>
}

export const useAdmin = () => {
  const ctx = useContext(AdminCtx)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
