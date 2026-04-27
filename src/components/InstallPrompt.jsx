import { useEffect, useState } from 'react'
import { IconClose } from './Icons.jsx'

const DISMISS_KEY = 'maison.pwa.install.dismissed.v1'

// Listens for `beforeinstallprompt` and renders a subtle bottom-sheet CTA.
// Dismissal is remembered in localStorage so we don't pester on every visit.
const InstallPrompt = () => {
  const [deferred, setDeferred] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === '1') return
    // Already running as an installed app? Don't prompt.
    if (window.matchMedia?.('(display-mode: standalone)').matches) return

    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
      // Small delay so it doesn't fight with the cookie banner for attention.
      setTimeout(() => setVisible(true), 2200)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    const choice = await deferred.userChoice.catch(() => ({ outcome: 'dismissed' }))
    if (choice?.outcome === 'accepted') localStorage.setItem(DISMISS_KEY, '1')
    setDeferred(null)
    setVisible(false)
  }

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  if (!visible || !deferred) return null

  return (
    <div
      role="dialog"
      aria-label="Install 0528creatives app"
      className="fixed bottom-20 left-4 right-4 md:right-auto md:left-6 md:bottom-24 md:max-w-sm z-40
                 bg-ivory-50 border border-plum-200 shadow-cardHover animate-slide-up"
      style={{ animationFillMode: 'both' }}
    >
      <button
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="absolute top-2 right-2 text-plum-500 hover:text-plum-900 transition-colors"
      >
        <IconClose className="w-4 h-4" />
      </button>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="" className="w-10 h-10 rounded-md" />
          <div>
            <p className="eyebrow">Install the app</p>
            <h3 className="font-display text-lg leading-tight text-plum-900">0528 on your home screen</h3>
          </div>
        </div>
        <p className="mt-3 text-sm text-plum-700 leading-relaxed">
          One-tap access, works offline, and feels like a native app — no store required.
        </p>
        <div className="mt-4 flex gap-2">
          <button onClick={install} className="btn-primary flex-1 !py-2.5">Install</button>
          <button onClick={dismiss} className="btn-outline !py-2.5">Not now</button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
