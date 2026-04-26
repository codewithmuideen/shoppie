import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE = 'maison.cart.v1'
const CartCtx = createContext(null)

// One bag line key per (productId + size + color)
const lineKey = (id, size, color) => `${id}::${size || '-'}::${color || '-'}`

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(items)) } catch (_) {}
  }, [items])

  const addItem = (product, opts = {}) => {
    const { size, color, hex, image, qty = 1 } = opts
    const key = lineKey(product.id, size, color)
    setItems((prev) => {
      const existing = prev.find((it) => it.key === key)
      if (existing) {
        return prev.map((it) => it.key === key ? { ...it, qty: it.qty + qty } : it)
      }
      return [...prev, {
        key,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        size: size || null,
        color: color || null,
        hex: hex || null,
        image: image || product.variants?.[0]?.images?.[0] || null,
        qty
      }]
    })
    setDrawerOpen(true)
  }

  const setQty = (key, qty) => {
    if (qty <= 0) return removeItem(key)
    setItems((prev) => prev.map((it) => it.key === key ? { ...it, qty } : it))
  }
  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key))
  const clear = () => setItems([])

  const count = items.reduce((s, it) => s + it.qty, 0)
  const subtotal = items.reduce((s, it) => s + (it.price * it.qty), 0)

  const value = useMemo(() => ({
    items, count, subtotal,
    addItem, setQty, removeItem, clear,
    drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false)
  }), [items, drawerOpen])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
