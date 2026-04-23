import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUI } from '../context/UIContext.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { IconClose, IconSearch, IconArrow } from './Icons.jsx'
import { currency } from '../utils/format.js'

const SearchOverlay = () => {
  const { searchOpen, closeSearch } = useUI()
  const { products } = useProducts()
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (searchOpen) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 40)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return products
      .filter((p) =>
        [p.name, p.brand, p.subcategory, p.category, p.description]
          .filter(Boolean)
          .some((t) => t.toLowerCase().includes(term))
      )
      .slice(0, 8)
  }, [q, products])

  const suggestions = ['Silk gown', 'Cashmere', 'Derby', 'Wool coat', 'Tote', 'Kids']

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${searchOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-plum-900/50 backdrop-blur-md transition-opacity duration-500 ${searchOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeSearch}
      />
      <div className={`absolute inset-x-0 top-0 bg-ivory-50 shadow-2xl transition-transform duration-500 ease-silk ${searchOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container-luxe py-8">
          <div className="flex items-center gap-4 border-b border-plum-200 pb-3">
            <IconSearch className="w-6 h-6 text-plum-600" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search brands, pieces, categories…"
              className="flex-1 bg-transparent text-xl md:text-2xl font-display text-plum-900 placeholder:text-plum-400 focus:outline-none"
            />
            <button onClick={closeSearch} aria-label="Close search"
              className="text-plum-700 hover:text-plum-900 transition-colors">
              <IconClose className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow mb-3">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="chip">{s}</button>
                ))}
              </div>

              <p className="eyebrow mt-8 mb-3">Shop</p>
              <ul className="space-y-2 text-sm">
                {['women', 'men', 'kids', 'new-in'].map((c) => (
                  <li key={c}>
                    <Link to={`/${c}`} onClick={closeSearch}
                      className="inline-flex items-center gap-2 text-plum-700 hover:text-plum-900 group">
                      <span className="capitalize link-underline">{c.replace('-', ' ')}</span>
                      <IconArrow className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-h-[300px]">
              {q.trim() === '' && (
                <p className="text-sm text-plum-500 italic">Start typing to reveal the collection…</p>
              )}
              {q.trim() !== '' && results.length === 0 && (
                <p className="text-sm text-plum-500">No pieces match “{q}”. Try another term.</p>
              )}
              {results.length > 0 && (
                <>
                  <p className="eyebrow mb-3">Pieces</p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.id}`}
                          onClick={closeSearch}
                          className="flex gap-4 p-2 -m-2 hover:bg-ivory-200/60 transition-colors rounded group"
                        >
                          <img src={p.variants?.[0]?.images?.[0]} alt="" className="w-16 h-20 object-cover" />
                          <div className="flex flex-col justify-center">
                            <p className="text-[10px] uppercase tracking-luxe text-plum-500">{p.brand}</p>
                            <p className="text-sm font-medium text-plum-900 leading-tight group-hover:text-gold-700 transition-colors">{p.name}</p>
                            <p className="text-sm mt-1">{currency(p.price)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-luxe text-plum-500">Press ESC to close</p>
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
