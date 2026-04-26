import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedProducts } from '../data/seedProducts.js'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const STORAGE_KEY = 'maison.products.v1'
const ProductCtx = createContext(null)

// snake_case (DB) ↔ camelCase (UI)
const fromRow = (r) => ({
  id: r.id,
  name: r.name,
  brand: r.brand,
  category: r.category,
  subcategory: r.subcategory,
  description: r.description,
  price: Number(r.price) || 0,
  sizeType: r.size_type || 'clothing',
  sizes: Array.isArray(r.sizes) ? r.sizes : [],
  variants: Array.isArray(r.variants) ? r.variants : [],
  newIn: !!r.new_in,
  featured: !!r.featured,
  bestSeller: !!r.best_seller,
  createdAt: r.created_at
})
const toRow = (p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  category: p.category,
  subcategory: p.subcategory,
  description: p.description,
  price: p.price,
  size_type: p.sizeType,
  sizes: p.sizes || [],
  variants: p.variants || [],
  new_in: !!p.newIn,
  featured: !!p.featured,
  best_seller: !!p.bestSeller
})

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    if (isSupabaseConfigured) return [] // hydrate from network
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) return parsed
      }
    } catch (_) {}
    return seedProducts
  })
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [needsSeedImport, setNeedsSeedImport] = useState(false)

  // localStorage mirror (only when Supabase is OFF)
  useEffect(() => {
    if (isSupabaseConfigured) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)) }
    catch (e) { console.warn('localStorage full', e) }
  }, [products])

  // Initial fetch + realtime subscription
  useEffect(() => {
    if (!isSupabaseConfigured) return

    let channel = null
    let cancelled = false

    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (cancelled) return
      if (error) { console.error('Supabase load error', error); setLoading(false); return }
      const rows = (data || []).map(fromRow)
      setProducts(rows)
      setNeedsSeedImport(rows.length === 0)
      setLoading(false)
    }

    load()

    channel = supabase
      .channel('products-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          setProducts((prev) => {
            if (payload.eventType === 'INSERT') {
              if (prev.find((p) => p.id === payload.new.id)) return prev
              return [fromRow(payload.new), ...prev]
            }
            if (payload.eventType === 'UPDATE') {
              return prev.map((p) => p.id === payload.new.id ? fromRow(payload.new) : p)
            }
            if (payload.eventType === 'DELETE') {
              return prev.filter((p) => p.id !== payload.old.id)
            }
            return prev
          })
        })
      .subscribe()

    return () => { cancelled = true; if (channel) supabase.removeChannel(channel) }
  }, [])

  const addProduct = async (p) => {
    const id = p.id || `p-${Date.now().toString(36)}`
    const next = { ...p, id, createdAt: new Date().toISOString() }
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('products').insert(toRow(next))
      if (error) { console.error(error); throw error }
      // realtime will sync — but apply optimistically too
      setProducts((prev) => prev.find((x) => x.id === id) ? prev : [next, ...prev])
    } else {
      setProducts((prev) => [next, ...prev])
    }
    return id
  }

  const updateProduct = async (id, patch) => {
    if (isSupabaseConfigured) {
      const merged = { ...products.find((p) => p.id === id), ...patch }
      const { error } = await supabase.from('products').update(toRow(merged)).eq('id', id)
      if (error) { console.error(error); throw error }
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const deleteProduct = async (id) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) { console.error(error); throw error }
    }
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const importSeed = async () => {
    if (!isSupabaseConfigured) return
    const rows = seedProducts.map(toRow)
    const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' })
    if (error) { console.error(error); throw error }
    setNeedsSeedImport(false)
  }

  const resetToSeed = () => {
    if (isSupabaseConfigured) return importSeed()
    setProducts(seedProducts)
  }

  const getById = (id) => products.find((p) => p.id === id)

  const value = useMemo(
    () => ({
      products, loading,
      addProduct, updateProduct, deleteProduct,
      resetToSeed, importSeed,
      needsSeedImport, isSupabaseConfigured,
      getById
    }),
    [products, loading, needsSeedImport]
  )

  return <ProductCtx.Provider value={value}>{children}</ProductCtx.Provider>
}

export const useProducts = () => {
  const ctx = useContext(ProductCtx)
  if (!ctx) throw new Error('useProducts must be used inside ProductProvider')
  return ctx
}
