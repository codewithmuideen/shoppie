import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { IconClose, IconBag, IconWhatsApp, IconArrow, IconTrash } from './Icons.jsx'
import { currency, buildCartWhatsAppLink } from '../utils/format.js'

const CartDrawer = () => {
  const { items, count, subtotal, drawerOpen, closeDrawer, setQty, removeItem } = useCart()

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${drawerOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-plum-900/55 backdrop-blur-sm transition-opacity duration-500 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeDrawer}
      />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-ivory-50 shadow-2xl flex flex-col transition-transform duration-500 ease-silk ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-plum-100">
          <div className="flex items-center gap-2.5">
            <IconBag className="w-5 h-5 text-plum-800" />
            <span className="font-display text-xl text-plum-900">Your Bag</span>
            <span className="text-[11px] uppercase tracking-luxe text-plum-500">({count})</span>
          </div>
          <button onClick={closeDrawer} aria-label="Close cart" className="text-plum-700 hover:text-plum-900 transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <IconBag className="w-10 h-10 text-plum-300 mx-auto" />
              <p className="mt-4 font-display text-2xl text-plum-900">Your bag is empty</p>
              <p className="mt-2 text-sm text-plum-500">Add a piece to begin.</p>
              <Link to="/shop/new-in" onClick={closeDrawer} className="btn-primary mt-6">
                Shop New In
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-plum-100">
              {items.map((it) => (
                <li key={it.key} className="p-5 flex gap-4">
                  {it.image && (
                    <Link to={`/product/${it.id}`} onClick={closeDrawer} className="block w-20 h-24 bg-ivory-200 overflow-hidden shrink-0">
                      <img src={it.image} alt="" className="w-full h-full object-cover" />
                    </Link>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-luxe text-plum-500">{it.brand}</p>
                    <Link to={`/product/${it.id}`} onClick={closeDrawer}
                          className="block text-sm font-medium text-plum-900 leading-tight hover:text-gold-700 line-clamp-2">
                      {it.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-plum-600">
                      {[it.color, it.size].filter(Boolean).join(' · ')}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-plum-200">
                        <button onClick={() => setQty(it.key, it.qty - 1)} className="w-8 h-8 text-plum-700 hover:bg-plum-900 hover:text-ivory-50 transition-colors">−</button>
                        <span className="w-8 text-center text-sm">{it.qty}</span>
                        <button onClick={() => setQty(it.key, it.qty + 1)} className="w-8 h-8 text-plum-700 hover:bg-plum-900 hover:text-ivory-50 transition-colors">+</button>
                      </div>
                      <p className="text-sm font-medium text-plum-900">{currency(it.price * it.qty)}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.key)} aria-label="Remove item"
                          className="self-start text-plum-400 hover:text-red-600 transition-colors">
                    <IconTrash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with totals + WhatsApp pay */}
        {items.length > 0 && (
          <div className="border-t border-plum-100 p-5 space-y-3 bg-ivory-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-plum-700">Subtotal</span>
              <span className="font-display text-2xl text-plum-900">{currency(subtotal)}</span>
            </div>
            <p className="text-[11px] text-plum-500">Tax & worldwide dispatch included.</p>
            <a
              href={buildCartWhatsAppLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="btn-whatsapp w-full !py-4"
            >
              <IconWhatsApp className="w-5 h-5" /> Pay via WhatsApp
            </a>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="btn-outline w-full !py-3 group"
            >
              View full bag
              <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
