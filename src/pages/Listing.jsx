import { useMemo } from 'react'
import { useProducts } from '../context/ProductContext.jsx'
import { useFilters } from '../hooks/useFilters.js'
import ProductCard from '../components/ProductCard.jsx'
import { FilterDesktop, FilterTrigger } from '../components/FilterSidebar.jsx'

const COPY = {
  women: {
    eyebrow: 'Womenswear',
    title: 'Elegance, tailored.',
    sub: 'From slow-fashion ateliers and heritage houses — pieces for the considered wardrobe.'
  },
  men: {
    eyebrow: 'Menswear',
    title: 'Understated craft.',
    sub: 'Tailoring, knitwear and leather — refined silhouettes worth keeping.'
  },
  kids: {
    eyebrow: 'Kidswear',
    title: 'Petite, considered.',
    sub: 'Heirloom-grade pieces made to be passed on.'
  },
  'new-in': {
    eyebrow: 'Just Arrived',
    title: 'New in this week.',
    sub: 'The freshest additions to the house — across all categories.'
  }
}

const Listing = ({ kind }) => {
  const { products } = useProducts()

  const scoped = useMemo(() => {
    if (kind === 'new-in') return products.filter((p) => p.newIn)
    return products.filter((p) => p.category === kind)
  }, [kind, products])

  const f = useFilters(scoped)
  const copy = COPY[kind]

  return (
    <div className="animate-fade-in">
      <section className="container-luxe pt-10 md:pt-14 pb-8">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl text-plum-900 text-balance">{copy.title}</h1>
        <p className="mt-4 max-w-xl text-plum-700 leading-relaxed">{copy.sub}</p>
      </section>

      <div className="divider-luxe container-luxe" />

      <section className="container-luxe pt-5 pb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FilterTrigger f={f} />
          <p className="text-[11px] uppercase tracking-luxe text-plum-600">
            {f.filtered.length} {f.filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        <label className="inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-plum-700">
          Sort
          <select
            value={f.sortBy}
            onChange={(e) => f.setSortBy(e.target.value)}
            className="bg-transparent border-b border-plum-300 py-1.5 px-2 text-[11px] uppercase tracking-luxe text-plum-900 focus:outline-none focus:border-plum-900"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="priceAsc">Price — Low to High</option>
            <option value="priceDesc">Price — High to Low</option>
          </select>
        </label>
      </section>

      <section className="container-luxe pb-24">
        <div className="flex gap-10">
          <FilterDesktop f={f} />
          <div className="flex-1 min-w-0">
            {f.filtered.length === 0 ? (
              <div className="py-24 text-center">
                <h3 className="font-display text-3xl text-plum-900">Nothing matches — yet.</h3>
                <p className="mt-3 text-plum-600">Try loosening a filter or clearing all.</p>
                <button onClick={f.reset} className="btn-outline mt-6">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {f.filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Listing
