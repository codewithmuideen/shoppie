import { useEffect, useState } from 'react'

const KEY = 'maison.cookie.v1' // 'accepted' | 'declined'

const CookieBanner = () => {
  const [state, setState] = useState('pending')

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY)
      if (v === 'accepted' || v === 'declined') setState(v)
    } catch (_) {}
  }, [])

  const accept = () => { localStorage.setItem(KEY, 'accepted'); setState('accepted') }
  const decline = () => { localStorage.setItem(KEY, 'declined'); setState('declined') }

  if (state !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40
                 bg-plum-900 text-ivory-50 shadow-cardHover border border-plum-700
                 animate-slide-up"
      style={{ animationFillMode: 'both' }}
    >
      <div className="p-5 md:p-6">
        <p className="eyebrow text-gold-400">Cookies</p>
        <h3 className="mt-2 font-display text-xl leading-tight">We use cookies — the plain kind.</h3>
        <p className="mt-3 text-sm text-ivory-200/85 leading-relaxed">
          We store a little local data so the site remembers what you like (wishlist,
          filters, admin session). No third-party tracking, no ads.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={accept} className="btn-gold !py-2.5 flex-1 min-w-[140px]">
            Accept
          </button>
          <button
            onClick={decline}
            className="flex-1 min-w-[140px] inline-flex items-center justify-center border border-ivory-50/30 px-6 py-2.5 text-[11px] font-medium uppercase tracking-luxe text-ivory-50 hover:bg-ivory-50 hover:text-plum-900 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
