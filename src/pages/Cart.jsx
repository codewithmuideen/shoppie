import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { IconArrow, IconBag, IconWhatsApp, IconTrash } from '../components/Icons.jsx'
import { currency, buildCartWhatsAppLink } from '../utils/format.js'

const Cart = () => {
  const { items, count, subtotal, setQty, removeItem, clear } = useCart()
  const nav = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 md:py-32 text-center animate-fade-in">
        <IconBag className="w-12 h-12 text-plum-300 mx-auto" />
        <p className="eyebrow mt-6">Your Bag</p>
        <h1 className="mt-2 font-display text-5xl text-plum-900">It's empty.</h1>
        <p className="mt-4 text-plum-600">Once you add a piece, it'll show here.</p>
        <button onClick={() => nav('/shop/new-in')} className="btn-primary mt-8 group">
          Shop New In <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    )
  }

  return (
    <div className="container-luxe py-12 md:py-16 animate-fade-in">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <p className="eyebrow">Your Bag</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-plum-900">
            {count} {count === 1 ? 'piece' : 'pieces'}
          </h1>
        </div>
        <button onClick={clear} className="text-[11px] uppercase tracking-luxe text-plum-600 hover:text-red-600 transition-colors">
          Clear bag
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
        {/* Items */}
        <ul className="divide-y divide-plum-100 border-t border-b border-plum-100">
          {items.map((it) => (
            <li key={it.key} className="py-6 flex gap-5">
              {it.image && (
                <Link to={`/product/${it.id}`} className="block w-28 md:w-36 aspect-[3/4] bg-ivory-200 overflow-hidden shrink-0">
                  <img src={it.image} alt="" className="w-full h-full object-cover" />
                </Link>
              )}
              <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-[10px] uppercase tracking-luxe text-plum-500">{it.brand}</p>
                <Link to={`/product/${it.id}`} className="block text-base font-medium text-plum-900 leading-tight hover:text-gold-700">
                  {it.name}
                </Link>
                <p className="mt-1 text-sm text-plum-600">
                  {[it.color, it.size].filter(Boolean).join(' · ')}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="inline-flex items-center border border-plum-200">
                    <button onClick={() => setQty(it.key, it.qty - 1)} className="w-9 h-9 text-plum-700 hover:bg-plum-900 hover:text-ivory-50 transition-colors">−</button>
                    <span className="w-10 text-center text-sm">{it.qty}</span>
                    <button onClick={() => setQty(it.key, it.qty + 1)} className="w-9 h-9 text-plum-700 hover:bg-plum-900 hover:text-ivory-50 transition-colors">+</button>
                  </div>
                  <p className="font-medium text-plum-900">{currency(it.price * it.qty)}</p>
                  <button onClick={() => removeItem(it.key)}
                          className="text-plum-500 hover:text-red-600 transition-colors inline-flex items-center gap-1.5 text-xs uppercase tracking-luxe">
                    <IconTrash className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="bg-ivory-50 border border-plum-100 p-6 md:p-8 shadow-card">
            <p className="eyebrow">Order Summary</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-plum-700">
                <dt>Subtotal</dt><dd>{currency(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-plum-700">
                <dt>Worldwide dispatch</dt><dd>Included</dd>
              </div>
              <div className="flex justify-between text-plum-700">
                <dt>Taxes</dt><dd>Included</dd>
              </div>
            </dl>
            <div className="mt-5 pt-5 border-t border-plum-100 flex items-center justify-between">
              <span className="font-display text-xl text-plum-900">Total</span>
              <span className="font-display text-2xl text-plum-900">{currency(subtotal)}</span>
            </div>

            <a
              href={buildCartWhatsAppLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full mt-6 !py-4"
            >
              <IconWhatsApp className="w-5 h-5" /> Pay via WhatsApp
            </a>
            <p className="mt-3 text-[11px] text-plum-500 leading-relaxed">
              We confirm payment, sizing and dispatch in the same WhatsApp thread.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart
