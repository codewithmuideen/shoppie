import { useEffect, useState } from 'react'
import { IconPlus, IconTrash, IconUpload, IconClose, IconCheck } from '../Icons.jsx'
import { CLOTHING_SIZES, SHOE_SIZES_EU, KID_SIZES, COLOR_PALETTE } from '../../data/seedProducts.js'
import { supabase, isSupabaseConfigured, PRODUCT_BUCKET } from '../../lib/supabase.js'

const blank = () => ({
  name: '',
  brand: '',
  category: 'women',
  subcategory: '',
  description: '',
  price: 0,
  sizeType: 'clothing',
  sizes: [],
  variants: [{ color: 'Onyx', hex: '#111111', images: [] }],
  newIn: true
})

const sizePresets = {
  clothing: CLOTHING_SIZES,
  shoes: SHOE_SIZES_EU,
  kids: KID_SIZES
}

// Read a File and return a data URL. Resizes large images to keep localStorage
// from overflowing (max 1200px on the long edge, JPEG q=0.82).
const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 1200
        let { width, height } = img
        if (width > max || height > max) {
          const ratio = Math.min(max / width, max / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const ProductForm = ({ initial, onSave, onCancel }) => {
  const [p, setP] = useState(() => initial ? JSON.parse(JSON.stringify(initial)) : blank())
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (initial) setP(JSON.parse(JSON.stringify(initial)))
  }, [initial])

  const set = (patch) => setP((prev) => ({ ...prev, ...patch }))

  const toggleSize = (s) =>
    set({ sizes: p.sizes.includes(s) ? p.sizes.filter((x) => x !== s) : [...p.sizes, s] })

  const addVariant = () => {
    const next = COLOR_PALETTE.find((c) => !p.variants.some((v) => v.color === c.name)) || COLOR_PALETTE[0]
    set({ variants: [...p.variants, { color: next.name, hex: next.hex, images: [] }] })
  }
  const updateVariant = (i, patch) =>
    set({ variants: p.variants.map((v, idx) => idx === i ? { ...v, ...patch } : v) })
  const removeVariant = (i) =>
    set({ variants: p.variants.filter((_, idx) => idx !== i) })

  const onImageUpload = async (i, files) => {
    const list = Array.from(files).slice(0, 6)

    // Supabase Storage path → public URL
    if (isSupabaseConfigured) {
      const uploaded = []
      for (const file of list) {
        const ext = file.name.split('.').pop() || 'jpg'
        const path = `${p.id || 'new'}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const { error } = await supabase.storage
          .from(PRODUCT_BUCKET)
          .upload(path, file, { cacheControl: '31536000', upsert: false })
        if (error) { console.error(error); continue }
        const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path)
        uploaded.push(data.publicUrl)
      }
      updateVariant(i, { images: [...(p.variants[i].images || []), ...uploaded] })
      return
    }

    // Fallback: base64 in localStorage (single-device only)
    const urls = await Promise.all(list.map(fileToDataURL))
    updateVariant(i, { images: [...(p.variants[i].images || []), ...urls] })
  }
  const removeImage = (i, idx) => {
    const next = p.variants[i].images.filter((_, k) => k !== idx)
    updateVariant(i, { images: next })
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!p.name.trim() || !p.price) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 300))
    onSave(p)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const activePresetSizes = sizePresets[p.sizeType] || []

  return (
    <form onSubmit={submit} className="bg-ivory-50 border border-plum-100 shadow-card">
      {/* Header */}
      <div className="px-6 py-5 border-b border-plum-100 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">{initial ? 'Edit' : 'New'}</p>
          <h2 className="mt-1 font-display text-2xl text-plum-900">
            {p.name || (initial ? 'Untitled piece' : 'New piece')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-outline !py-2.5">
              <IconClose className="w-4 h-4" /> Close
            </button>
          )}
          <button type="submit" disabled={saving} className="btn-primary !py-2.5 disabled:opacity-60">
            {saved ? <><IconCheck className="w-4 h-4" /> Saved</> : saving ? 'Saving…' : initial ? 'Save changes' : 'Create piece'}
          </button>
        </div>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-8">
        {/* ===== Details ===== */}
        <div className="space-y-5">
          <div>
            <label className="eyebrow">Name</label>
            <input className="input-luxe mt-1" value={p.name}
                   onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Cashmere Crewneck" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="eyebrow">Brand / 0528creatives Inc.</label>
              <input className="input-luxe mt-1" value={p.brand}
                     onChange={(e) => set({ brand: e.target.value })} placeholder="0528creatives Inc." />
            </div>
            <div>
              <label className="eyebrow">Price (GBP £)</label>
              <input type="number" min="0" step="1" className="input-luxe mt-1" value={p.price}
                     onChange={(e) => set({ price: +e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="eyebrow">Category</label>
              <select className="input-luxe mt-1" value={p.category}
                      onChange={(e) => set({ category: e.target.value })}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div>
              <label className="eyebrow">Subcategory</label>
              <input className="input-luxe mt-1" value={p.subcategory}
                     onChange={(e) => set({ subcategory: e.target.value })} placeholder="dresses, shoes, outerwear…" />
            </div>
          </div>

          <div>
            <label className="eyebrow">Description</label>
            <textarea rows={4} className="input-luxe mt-1 resize-none" value={p.description}
                      onChange={(e) => set({ description: e.target.value })}
                      placeholder="A refined description of the piece — fabric, craft, fit…" />
          </div>

          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <span className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors duration-300 ${p.newIn ? 'bg-plum-900' : 'bg-plum-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-ivory-50 rounded-full transition-transform duration-300 ${p.newIn ? 'translate-x-5' : ''}`} />
            </span>
            <input type="checkbox" className="sr-only" checked={p.newIn}
                   onChange={(e) => set({ newIn: e.target.checked })} />
            <span className="text-sm text-plum-800">Mark as “New In”</span>
          </label>

          {/* Sizes */}
          <div className="border-t border-plum-100 pt-5">
            <div className="flex items-center justify-between">
              <label className="eyebrow">Sizes</label>
              <div className="flex gap-2">
                {[
                  { v: 'clothing', label: 'Apparel' },
                  { v: 'shoes',    label: 'Shoes' },
                  { v: 'kids',     label: 'Kids' }
                ].map((t) => (
                  <button type="button" key={t.v} onClick={() => set({ sizeType: t.v })}
                          className={`chip ${p.sizeType === t.v ? 'chip-active' : ''}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {activePresetSizes.map((s) => (
                <button key={s} type="button" onClick={() => toggleSize(s)}
                  className={`border py-2 text-xs tracking-wide transition-all duration-300
                    ${p.sizes.includes(s) ? 'border-plum-900 bg-plum-900 text-ivory-100' : 'border-plum-200 text-plum-800 hover:border-plum-900'}`}
                >{s}</button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-plum-500">
              Selected: {p.sizes.length ? p.sizes.join(', ') : 'none'}
            </p>
          </div>
        </div>

        {/* ===== Variants ===== */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Colours & imagery</p>
              <p className="text-xs text-plum-500 mt-1">One variant per colour. Drop in photos — they’ll be resized for you.</p>
            </div>
            <button type="button" onClick={addVariant} className="btn-outline !py-2 !px-4">
              <IconPlus className="w-4 h-4" /> Add colour
            </button>
          </div>

          <div className="space-y-4">
            {p.variants.map((v, i) => (
              <div key={i} className="border border-plum-100 p-4 bg-ivory-50">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={v.hex}
                    onChange={(e) => updateVariant(i, { hex: e.target.value })}
                    className="w-10 h-10 rounded-full border border-plum-200 cursor-pointer bg-transparent"
                    title="Pick colour"
                  />
                  <select
                    value={v.color}
                    onChange={(e) => {
                      const picked = COLOR_PALETTE.find((c) => c.name === e.target.value)
                      updateVariant(i, { color: e.target.value, hex: picked?.hex || v.hex })
                    }}
                    className="flex-1 border-b border-plum-200 bg-transparent py-2 text-sm text-plum-900 focus:border-plum-900 focus:outline-none"
                  >
                    {COLOR_PALETTE.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                    {!COLOR_PALETTE.find((c) => c.name === v.color) && <option value={v.color}>{v.color}</option>}
                  </select>
                  <input
                    type="text" value={v.color}
                    onChange={(e) => updateVariant(i, { color: e.target.value })}
                    className="w-28 border-b border-plum-200 bg-transparent py-2 text-sm text-plum-900 focus:border-plum-900 focus:outline-none"
                    placeholder="Custom name"
                  />
                  {p.variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(i)}
                            className="text-plum-400 hover:text-red-600 transition-colors"
                            aria-label="Remove variant">
                      <IconTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Images */}
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {v.images?.map((src, idx) => (
                    <div key={idx} className="relative group aspect-[3/4] overflow-hidden">
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeImage(i, idx)}
                              className="absolute top-1 right-1 w-7 h-7 rounded-full bg-plum-900/90 text-ivory-50 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Remove image">
                        <IconClose className="w-3.5 h-3.5" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-gold-500 text-plum-900 text-[9px] uppercase tracking-luxe px-1.5 py-0.5">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}

                  <label className="aspect-[3/4] border-2 border-dashed border-plum-200 hover:border-plum-900 transition-colors grid place-items-center cursor-pointer group">
                    <div className="flex flex-col items-center text-plum-500 group-hover:text-plum-900 transition-colors">
                      <IconUpload className="w-6 h-6" />
                      <span className="text-[10px] uppercase tracking-luxe mt-2">Upload</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) onImageUpload(i, e.target.files)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <p className="mt-3 text-[11px] text-plum-500">
                  Paste an image URL instead:
                </p>
                <div className="mt-1 flex gap-2">
                  <input
                    type="url"
                    placeholder="https://…"
                    className="input-luxe !py-2 text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        e.preventDefault()
                        const url = e.currentTarget.value.trim()
                        updateVariant(i, { images: [...(v.images || []), url] })
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
