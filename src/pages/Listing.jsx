import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import { useFilters } from '../hooks/useFilters.js'
import ProductCard from '../components/ProductCard.jsx'
import { FilterDesktop, FilterTrigger } from '../components/FilterSidebar.jsx'

// Slugs that map to special filter modes
const CATEGORY_SLUGS = new Set(['men', 'women', 'kids'])
const SUBCATEGORIES = new Set([
  'outerwear','shirts','knitwear','trousers','jeans','shoes','sneakers',
  'bags','dresses','tops','skirts','shorts','accessories','jewelry','undies',
  'lifestyle','pre-owned'
])

const COPY_BY_SLUG = {
  'new-in':       { eyebrow: 'Just Arrived',  title: 'New in this week.',     sub: 'The freshest additions to the house.' },
  'sale':         { eyebrow: 'Sale',          title: 'The Sale Edit.',         sub: 'Hand-selected pieces, generously reduced.' },
  'best-sellers': { eyebrow: 'This Week',     title: 'Best sellers.',          sub: 'The pieces flying out the door.' },
  'brands':       { eyebrow: 'Brands',        title: 'Shop by brand.',         sub: 'Independent labels and heritage houses.' },
  'clothing':     { eyebrow: 'Clothing',      title: 'All clothing.',          sub: 'Tailoring, knitwear, dresses and beyond.' },
  'shoes':        { eyebrow: 'Shoes',         title: 'All shoes.',             sub: 'Italian leather, hand-finished soles.' },
  'sneakers':     { eyebrow: 'Sneakers',      title: 'The sneaker edit.',      sub: 'Court, runner and platform — quietly cut.' },
  'bags':         { eyebrow: 'Bags',          title: 'All bags.',              sub: 'Calfskin, lambskin, and the pieces worth carrying.' },
  'jeans':        { eyebrow: 'Denim',         title: 'Denim, refined.',        sub: 'Selvedge weaves and slow-fashion cuts.' },
  'accessories':  { eyebrow: 'Accessories',   title: 'Accessories.',           sub: 'The finishing pieces.' },
  'jewelry':      { eyebrow: 'Jewelry',       title: 'Jewelry.',               sub: 'Fashion and fine.' },
  'lifestyle':    { eyebrow: 'Lifestyle',     title: 'Lifestyle.',             sub: 'Home, sports, travel.' },
  'pre-owned':    { eyebrow: 'Pre-owned',     title: 'Pre-owned.',             sub: 'Authenticated by hand.' },
  'outerwear':    { eyebrow: 'Outerwear',     title: 'Outerwear.',             sub: 'Coats, jackets and quilted essentials.' },
  'knitwear':     { eyebrow: 'Knitwear',      title: 'Knitwear.',              sub: 'Cashmere, merino and brushed wool.' },
  'shirts':       { eyebrow: 'Shirts',        title: 'Shirts.',                sub: 'Poplin, silk-blend and linen.' },
  'trousers':     { eyebrow: 'Trousers',      title: 'Trousers.',              sub: 'Pleated, wide and pressed.' },
  'dresses':      { eyebrow: 'Dresses',       title: 'Dresses.',               sub: 'Day, evening and beyond.' },
  'tops':         { eyebrow: 'Tops',          title: 'Tops.',                  sub: 'Camisoles, tees, blouses.' },
  'skirts':       { eyebrow: 'Skirts',        title: 'Skirts.',                sub: 'Pleated and tailored.' },
  'shorts':       { eyebrow: 'Shorts',        title: 'Shorts.',                sub: 'Tailored and casual.' },
  'undies':       { eyebrow: 'Intimates',     title: 'Intimates.',             sub: 'Silk, lace and pima cotton.' }
}

const COPY_BY_CAT = {
  women: { eyebrow: 'Womenswear', title: 'Elegance, tailored.',  sub: 'From slow-fashion 0528creatives Inc. and heritage houses.' },
  men:   { eyebrow: 'Menswear',   title: 'Understated craft.',   sub: 'Tailoring, knitwear and leather worth keeping.' },
  kids:  { eyebrow: 'Kidswear',   title: 'Petite, considered.',  sub: 'Heirloom-grade pieces made to be passed on.' }
}

const Listing = ({ kind }) => {
  // Two ways to mount: <Listing kind="men" /> (legacy direct route) or via :slug
  const { slug: paramSlug } = useParams()
  const slug = kind || paramSlug || 'new-in'
  const { products } = useProducts()

  const scoped = useMemo(() => {
    // Brand listing — /shop/brand/:brand isn't routed here yet, but accept the prefix
    if (slug.startsWith('brand-')) {
      const b = decodeURIComponent(slug.replace('brand-', '')).toLowerCase()
      return products.filter((p) => p.brand?.toLowerCase().includes(b))
    }
    if (slug === 'new-in')       return products.filter((p) => p.newIn)
    if (slug === 'best-sellers') return products.filter((p) => p.bestSeller)
    if (slug === 'sale')         return products.filter((p) => p.sale || p.newIn) // demo: treat newIn as sale until a flag exists
    if (slug === 'brands')       return products
    if (CATEGORY_SLUGS.has(slug))   return products.filter((p) => p.category === slug)
    if (SUBCATEGORIES.has(slug))    return products.filter((p) => p.subcategory === slug)
    return products
  }, [slug, products])

  const f = useFilters(scoped)
  const copy = COPY_BY_SLUG[slug] || COPY_BY_CAT[slug] || { eyebrow: 'Shop', title: 'All pieces.', sub: '' }

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
