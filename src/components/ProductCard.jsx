import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconHeart, IconWhatsApp, IconArrow } from './Icons.jsx'
import { currency, buildWhatsAppLink } from '../utils/format.js'

const ProductCard = ({ product, index = 0 }) => {
  const [variantIdx, setVariantIdx] = useState(0)
  const [fav, setFav] = useState(false)

  const variant = product.variants?.[variantIdx] || { images: [] }
  const primary = variant.images?.[0]
  const secondary = variant.images?.[1] || variant.images?.[0]

  return (
    <article
      className="group relative animate-slide-up"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms`, animationFillMode: 'both' }}
    >
      {/* Image — entire image area links to detail */}
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="block relative overflow-hidden bg-ivory-200 aspect-[3/4]"
      >
        {primary && (
          <img
            src={primary}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-silk
                       group-hover:scale-[1.06] group-hover:opacity-0"
          />
        )}
        {secondary && (
          <img
            src={secondary}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 scale-[1.02] transition-all duration-[1200ms] ease-silk
                       group-hover:opacity-100 group-hover:scale-100"
          />
        )}

        {/* Gradient wash on hover (desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.newIn && (
            <span className="bg-ivory-50 text-plum-900 text-[9px] uppercase tracking-luxe px-2.5 py-1 shadow-sm">
              New In
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-gold-500 text-plum-900 text-[9px] uppercase tracking-luxe px-2.5 py-1 shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist — prevent parent-link navigation */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFav((f) => !f) }}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full transition-all duration-500
                      ${fav ? 'bg-plum-900 text-gold-400' : 'bg-ivory-50/90 text-plum-800 hover:bg-plum-900 hover:text-gold-400'} shadow-sm`}
        >
          <IconHeart className={`w-4 h-4 transition-transform duration-300 ${fav ? 'scale-110 fill-current' : ''}`} />
        </button>
      </Link>

      {/* Actions — mobile: always visible pinned under image. desktop: slide-up on hover. */}
      <div className="relative">
        {/* Desktop slide-up overlay (absolute over bottom of image) */}
        <div className="hidden lg:block absolute left-3 right-3 -top-14 translate-y-4 opacity-0 transition-all duration-500 ease-silk
                        group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <div className="flex gap-2">
            <a
              href={buildWhatsAppLink(product, { color: variant.color })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 btn-whatsapp !py-3 !text-[10px]"
            >
              <IconWhatsApp className="w-4 h-4" /> Order
            </a>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 btn-primary !py-3 !text-[10px] group/btn"
            >
              View <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile: only WhatsApp (the image already links to the product page) */}
        <a
          href={buildWhatsAppLink(product, { color: variant.color })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex lg:hidden btn-whatsapp !py-2.5 !text-[10px] mt-3 w-full"
        >
          <IconWhatsApp className="w-4 h-4" /> Order on WhatsApp
        </a>
      </div>

      {/* Meta */}
      <Link to={`/product/${product.id}`} className="block pt-3 pb-2">
        <p className="eyebrow text-plum-500">{product.brand}</p>
        <h3 className="mt-1 text-[15px] font-medium text-plum-900 tracking-wide leading-snug line-clamp-1 group-hover:text-gold-700 transition-colors duration-500">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm text-plum-800 font-medium">{currency(product.price)}</p>

          {product.variants?.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.variants.slice(0, 4).map((v, i) => (
                <button
                  key={v.color + i}
                  type="button"
                  aria-label={`Colour: ${v.color}`}
                  title={v.color}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVariantIdx(i) }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-300
                    ${i === variantIdx ? 'ring-1 ring-offset-2 ring-offset-ivory-100 ring-plum-900 border-ivory-100' : 'border-plum-200 hover:scale-110'}`}
                  style={{ background: v.hex }}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-[10px] text-plum-500 ml-0.5">+{product.variants.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
