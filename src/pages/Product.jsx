import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { IconArrow, IconHeart, IconWhatsApp, IconCheck } from '../components/Icons.jsx'
import { currency, buildWhatsAppLink } from '../utils/format.js'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, getById } = useProducts()
  const product = getById(id)

  const [variantIdx, setVariantIdx] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [size, setSize] = useState(null)
  const [fav, setFav] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setVariantIdx(0); setImgIdx(0); setSize(null)
  }, [id])

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
  }, [products, product])

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="font-display text-4xl">Piece not found</h1>
        <p className="mt-4 text-plum-700">It may have been retired from the house.</p>
        <button onClick={() => navigate(-1)} className="btn-outline mt-8">Go back</button>
      </div>
    )
  }

  const variant = product.variants?.[variantIdx] || { images: [] }
  const images = variant.images || []

  const handleOrder = (e) => {
    if (!size && product.sizes?.length > 1) {
      e.preventDefault()
      setToast('Please choose a size first.')
      setTimeout(() => setToast(''), 2500)
      return
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="container-luxe pt-6 text-[11px] uppercase tracking-luxe text-plum-500">
        <Link to="/" className="hover:text-plum-900">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/${product.category}`} className="hover:text-plum-900 capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-plum-800">{product.name}</span>
      </div>

      <div className="container-luxe py-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 group">
            {images[imgIdx] && (
              <img
                key={`${variantIdx}-${imgIdx}`}
                src={images[imgIdx]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-silk group-hover:scale-105 animate-fade-in"
              />
            )}
            {product.newIn && (
              <span className="absolute top-5 left-5 bg-ivory-50 text-plum-900 text-[10px] uppercase tracking-luxe px-3 py-1.5">
                New In
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-[3/4] overflow-hidden border transition-all duration-300
                    ${i === imgIdx ? 'border-plum-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl text-plum-900 leading-tight">{product.name}</h1>
          <p className="mt-4 text-2xl text-plum-900">{currency(product.price)}</p>
          <p className="mt-1 text-xs text-plum-500">Tax & worldwide dispatch included</p>

          <div className="divider-luxe my-8" />

          {/* Colour */}
          {product.variants?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow">Colour — {variant.color}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={v.color + i}
                    onClick={() => { setVariantIdx(i); setImgIdx(0) }}
                    title={v.color}
                    className="group"
                  >
                    <span className={`block w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${i === variantIdx ? 'border-plum-900 ring-1 ring-offset-2 ring-offset-ivory-100 ring-gold-500' : 'border-plum-200 group-hover:border-plum-600 group-hover:scale-105'}`}
                      style={{ background: v.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes?.length > 1 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow">Size {size && <span className="normal-case text-plum-500 tracking-normal ml-1">— {size}</span>}</p>
                <button className="text-[10px] uppercase tracking-luxe text-plum-500 hover:text-plum-900">Size guide</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border py-3 text-xs tracking-wide transition-all duration-300
                      ${size === s ? 'border-plum-900 bg-plum-900 text-ivory-100' : 'border-plum-200 text-plum-800 hover:border-plum-900'}`}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <a
              href={buildWhatsAppLink(product, { color: variant.color, size })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrder}
              className="btn-whatsapp w-full !py-4"
            >
              <IconWhatsApp className="w-5 h-5" /> Order via WhatsApp
            </a>
            <div className="flex gap-3">
              <button
                onClick={() => setFav((x) => !x)}
                className={`btn-outline flex-1 !py-4 ${fav ? 'bg-plum-900 text-ivory-100 border-plum-900' : ''}`}
              >
                <IconHeart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                {fav ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {toast && (
            <div className="mt-4 bg-gold-100 border border-gold-500/40 text-plum-900 text-sm px-4 py-3 animate-fade-in">
              {toast}
            </div>
          )}

          {/* Description */}
          <div className="mt-10">
            <p className="eyebrow mb-3">About this piece</p>
            <p className="text-plum-800 leading-relaxed">{product.description}</p>
          </div>

          {/* Guarantees */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-plum-100 pt-6">
            {[
              { t: 'Chat & order on WhatsApp', s: 'Real person, real-time' },
              { t: 'Authenticity',       s: 'Guaranteed' },
              { t: 'Worldwide dispatch', s: 'On all orders' }
            ].map((g) => (
              <div key={g.t} className="flex items-start gap-2">
                <IconCheck className="w-4 h-4 text-gold-600 mt-1" />
                <div>
                  <p className="text-sm text-plum-900">{g.t}</p>
                  <p className="text-[11px] uppercase tracking-luxe text-plum-500">{g.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-luxe py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">The Edit</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">You may also admire</h2>
            </div>
            <Link to={`/${product.category}`} className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-plum-800 hover:text-gold-700 transition-colors group">
              View all <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default Product
