import { useMemo, useState } from 'react'

// Collects filter state for a listing page and returns a filtered product list.
export const useFilters = (products) => {
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sizes, setSizes] = useState([])   // selected size labels
  const [colors, setColors] = useState([]) // selected colour names
  const [sortBy, setSortBy] = useState('featured') // featured | new | priceAsc | priceDesc

  const toggle = (setter) => (val) =>
    setter((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]))

  const reset = () => {
    setQuery('')
    setPriceRange([0, 5000])
    setSizes([])
    setColors([])
    setSortBy('featured')
  }

  const filtered = useMemo(() => {
    let list = products.slice()
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((p) =>
        [p.name, p.brand, p.subcategory, p.category, p.description]
          .filter(Boolean)
          .some((t) => t.toLowerCase().includes(q))
      )
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sizes.length) {
      list = list.filter((p) => p.sizes?.some((s) => sizes.includes(s)))
    }
    if (colors.length) {
      list = list.filter((p) => p.variants?.some((v) => colors.includes(v.color)))
    }
    switch (sortBy) {
      case 'priceAsc':  list.sort((a, b) => a.price - b.price); break
      case 'priceDesc': list.sort((a, b) => b.price - a.price); break
      case 'new':       list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')); break
      default: /* featured — preserve order */ break
    }
    return list
  }, [products, query, priceRange, sizes, colors, sortBy])

  const availableSizes = useMemo(() => {
    const s = new Set()
    products.forEach((p) => p.sizes?.forEach((x) => s.add(x)))
    return Array.from(s)
  }, [products])

  const availableColors = useMemo(() => {
    const map = new Map()
    products.forEach((p) =>
      p.variants?.forEach((v) => {
        if (!map.has(v.color)) map.set(v.color, v.hex)
      })
    )
    return Array.from(map, ([name, hex]) => ({ name, hex }))
  }, [products])

  const activeCount =
    (query ? 1 : 0) +
    sizes.length +
    colors.length +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0)

  return {
    filtered,
    query, setQuery,
    priceRange, setPriceRange,
    sizes, toggleSize: toggle(setSizes), setSizes,
    colors, toggleColor: toggle(setColors), setColors,
    sortBy, setSortBy,
    reset,
    availableSizes,
    availableColors,
    activeCount
  }
}
