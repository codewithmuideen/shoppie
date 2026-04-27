import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import ProductForm from '../components/admin/ProductForm.jsx'
import { IconPlus, IconEdit, IconTrash, IconLogout, IconSearch, IconClose } from '../components/Icons.jsx'
import { currency } from '../utils/format.js'

const AdminDashboard = () => {
  const { logout, isSupabaseConfigured } = useAdmin()
  const { products, addProduct, updateProduct, deleteProduct, resetToSeed,
          importSeed, needsSeedImport } = useProducts()
  const nav = useNavigate()

  const [mode, setMode] = useState('list') // 'list' | 'new' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const [q, setQ] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [confirmDel, setConfirmDel] = useState(null)

  const editing = products.find((p) => p.id === editingId)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return products.filter((p) => {
      if (catFilter !== 'all' && p.category !== catFilter) return false
      if (!term) return true
      return [p.name, p.brand, p.subcategory].filter(Boolean).some((t) => t.toLowerCase().includes(term))
    })
  }, [products, q, catFilter])

  const stats = useMemo(() => ({
    total: products.length,
    women: products.filter((p) => p.category === 'women').length,
    men: products.filter((p) => p.category === 'men').length,
    kids: products.filter((p) => p.category === 'kids').length,
    newIn: products.filter((p) => p.newIn).length
  }), [products])

  const handleSave = (data) => {
    if (mode === 'new') addProduct(data)
    else if (mode === 'edit' && editingId) updateProduct(editingId, data)
    setMode('list'); setEditingId(null)
  }

  const handleLogout = () => { logout(); nav('/') }

  return (
    <div className="container-luxe py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-1 font-display text-4xl text-plum-900">0528creatives inc.</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={resetToSeed}
                  className="text-[11px] uppercase tracking-luxe text-plum-600 hover:text-plum-900 transition-colors">
            Reset to seed
          </button>
          <button onClick={handleLogout} className="btn-outline !py-2.5">
            <IconLogout className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      {/* Backend status + seed import */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 border ${isSupabaseConfigured ? 'border-emerald-700/40 bg-emerald-50 text-emerald-800' : 'border-amber-600/40 bg-amber-50 text-amber-800'}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-600' : 'bg-amber-600'}`} />
          <span className="uppercase tracking-luxe">{isSupabaseConfigured ? 'Supabase live · realtime sync on' : 'Local mode · localStorage only'}</span>
        </span>
        {needsSeedImport && (
          <button
            onClick={() => importSeed()}
            className="inline-flex items-center gap-2 border border-plum-300 bg-ivory-50 px-3 py-1.5 text-plum-800 hover:border-plum-900 hover:bg-plum-900 hover:text-ivory-100 transition-colors uppercase tracking-luxe"
          >
            Import seed catalogue → Supabase
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {[
          { label: 'Total',  value: stats.total },
          { label: 'Women',  value: stats.women },
          { label: 'Men',    value: stats.men },
          { label: 'Kids',   value: stats.kids },
          { label: 'New In', value: stats.newIn }
        ].map((s) => (
          <div key={s.label} className="bg-ivory-50 border border-plum-100 p-5">
            <p className="eyebrow text-plum-500">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-plum-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Panel */}
      {mode === 'list' ? (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'women', 'men', 'kids'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`chip capitalize ${catFilter === c ? 'chip-active' : ''}`}
                >{c}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 border-b border-plum-200 px-2 py-1.5">
                <IconSearch className="w-4 h-4 text-plum-500" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search pieces…"
                  className="bg-transparent text-sm focus:outline-none w-40 md:w-60"
                />
              </label>
              <button onClick={() => { setMode('new'); setEditingId(null) }}
                      className="btn-primary !py-2.5">
                <IconPlus className="w-4 h-4" /> New piece
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-ivory-50 border border-plum-100 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-ivory-200/70 text-plum-700">
                <tr className="text-left [&>th]:py-3 [&>th]:px-4 text-[11px] uppercase tracking-luxe">
                  <th>Piece</th>
                  <th className="hidden md:table-cell">Category</th>
                  <th className="hidden lg:table-cell">Colours</th>
                  <th>Price</th>
                  <th className="text-right">—</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="py-10 text-center text-plum-500">No pieces match.</td></tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-plum-100 hover:bg-ivory-200/40 transition-colors [&>td]:py-3 [&>td]:px-4">
                    <td>
                      <div className="flex items-center gap-3">
                        {p.variants?.[0]?.images?.[0] && (
                          <img src={p.variants[0].images[0]} alt="" className="w-12 h-16 object-cover" />
                        )}
                        <div>
                          <p className="text-[10px] uppercase tracking-luxe text-plum-500">{p.brand}</p>
                          <p className="font-medium text-plum-900 leading-tight line-clamp-1">{p.name}</p>
                          {p.newIn && <span className="mt-1 inline-block text-[9px] uppercase tracking-luxe text-gold-700">New In</span>}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell capitalize text-plum-700">{p.category}</td>
                    <td className="hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        {p.variants?.slice(0, 5).map((v, i) => (
                          <span key={i} title={v.color}
                                className="inline-block w-4 h-4 rounded-full border border-plum-200"
                                style={{ background: v.hex }} />
                        ))}
                        {p.variants?.length > 5 && <span className="text-[10px] text-plum-500">+{p.variants.length - 5}</span>}
                      </div>
                    </td>
                    <td className="text-plum-900 font-medium">{currency(p.price)}</td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setMode('edit'); setEditingId(p.id) }}
                          className="p-2 text-plum-700 hover:text-plum-900 hover:bg-ivory-200 transition-colors"
                          aria-label="Edit"
                        >
                          <IconEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDel(p)}
                          className="p-2 text-plum-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <ProductForm
          initial={mode === 'edit' ? editing : null}
          onSave={handleSave}
          onCancel={() => { setMode('list'); setEditingId(null) }}
        />
      )}

      {/* Delete confirm */}
      {confirmDel && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-plum-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-ivory-50 p-8 max-w-md w-[92%] border border-plum-100 shadow-cardHover">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-red-700">Confirm removal</p>
                <h3 className="mt-2 font-display text-2xl text-plum-900">Remove “{confirmDel.name}”?</h3>
              </div>
              <button onClick={() => setConfirmDel(null)} className="text-plum-500 hover:text-plum-900">
                <IconClose className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-plum-700">This cannot be undone. The piece will be removed from the storefront.</p>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setConfirmDel(null)} className="btn-outline !py-2.5">Cancel</button>
              <button
                onClick={() => { deleteProduct(confirmDel.id); setConfirmDel(null) }}
                className="btn-primary !py-2.5 !bg-red-700 hover:!bg-red-800"
              >
                <IconTrash className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
