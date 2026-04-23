import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext.jsx'
import { IconArrow } from '../components/Icons.jsx'

const AdminLogin = () => {
  const { isAdmin, login } = useAdmin()
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  useEffect(() => { if (isAdmin) nav('/admin', { replace: true }) }, [isAdmin])

  if (isAdmin) return <Navigate to="/admin" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    const r = login(pwd)
    if (!r.ok) setErr(r.error)
    else nav('/admin')
  }

  return (
    <div className="min-h-[70vh] container-luxe py-16 grid place-items-center animate-fade-in">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-ivory-50 border border-plum-100 p-10 shadow-card">
        <p className="eyebrow">Private Access</p>
        <h1 className="mt-2 font-display text-3xl text-plum-900">Atelier console</h1>
        <p className="mt-3 text-sm text-plum-600">
          Enter the house passphrase to manage the collection.
        </p>

        <div className="mt-8">
          <label className="eyebrow text-plum-700" htmlFor="pwd">Passphrase</label>
          <input
            id="pwd"
            type="password"
            autoFocus
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setErr('') }}
            className="input-luxe mt-2"
            placeholder="••••••••"
          />
          {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
        </div>

        <button type="submit" className="btn-primary w-full mt-8 group">
          Enter console
          <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-[11px] text-plum-500">
          Demo passphrase: <span className="font-mono text-plum-800">maison2026</span>
        </p>
      </form>
    </div>
  )
}

export default AdminLogin
