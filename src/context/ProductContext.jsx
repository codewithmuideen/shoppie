import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedProducts } from '../data/seedProducts.js'

const STORAGE_KEY = 'maison.products.v1'

const ProductCtx = createContext(null)

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) return parsed
      }
    } catch (_) {}
    return seedProducts
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
      console.warn('Could not persist products — storage may be full.', e)
    }
  }, [products])

  const addProduct = (p) => {
    const id = p.id || `p-${Date.now().toString(36)}`
    setProducts((prev) => [{ ...p, id, createdAt: new Date().toISOString() }, ...prev])
    return id
  }

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const resetToSeed = () => setProducts(seedProducts)

  const getById = (id) => products.find((p) => p.id === id)

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct, resetToSeed, getById }),
    [products]
  )

  return <ProductCtx.Provider value={value}>{children}</ProductCtx.Provider>
}

export const useProducts = () => {
  const ctx = useContext(ProductCtx)
  if (!ctx) throw new Error('useProducts must be used inside ProductProvider')
  return ctx
}
