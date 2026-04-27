import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconSearch, IconMenu, IconClose, IconUser, IconBag } from './Icons.jsx'
import { useUI } from '../context/UIContext.jsx'
import { useAdmin } from '../context/AdminContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { MEGA_NAV } from '../data/megaNav.js'
import MegaMenu from './MegaMenu.jsx'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { openSearch, menuOpen, openMenu, closeMenu } = useUI()
  const { isAdmin } = useAdmin()
  const { count, openDrawer } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { closeMenu() }, [location.pathname])

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-500 ease-silk ${
        scrolled ? 'bg-ivory-50/95 backdrop-blur-lg shadow-soft' : 'bg-ivory-100'
      }`}>
        <div className="container-luxe flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Left — menu (mobile) + search (desktop) */}
          <div className="flex items-center gap-5 flex-1">
            <button
              aria-label="Open menu"
              className="lg:hidden text-plum-900 hover:text-gold-600 transition-colors"
              onClick={openMenu}
            >
              <IconMenu className="w-7 h-7" />
            </button>
            <button
              aria-label="Open search"
              onClick={openSearch}
              className="hidden lg:flex items-center gap-2 text-plum-700 hover:text-plum-900 transition-colors group"
            >
              <IconSearch className="w-5 h-5" />
              <span className="text-[11px] uppercase tracking-luxe link-underline">Search</span>
            </button>
          </div>

          {/* Logo — bigger, centered */}
          <Link to="/" className="flex items-center group" aria-label="0528">
            <img
              src="/logo.jpeg"
              alt="0528"
              className="h-14 sm:h-16 md:h-20 w-auto transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Link>

          {/* Right — admin + search (mobile) + bag */}
          <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
            <button
              aria-label="Open search"
              onClick={openSearch}
              className="lg:hidden text-plum-900 hover:text-gold-600 transition-colors"
            >
              <IconSearch className="w-6 h-6" />
            </button>
            <Link
              to={isAdmin ? '/admin' : '/admin/login'}
              className="hidden sm:flex items-center gap-2 text-plum-700 hover:text-plum-900 transition-colors"
              aria-label="Admin"
            >
              <IconUser className="w-5 h-5" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-luxe link-underline">
                {isAdmin ? 'Dashboard' : 'Admin'}
              </span>
            </Link>
            <button
              onClick={openDrawer}
              aria-label={`Open bag (${count} items)`}
              className="relative text-plum-900 hover:text-gold-600 transition-colors"
            >
              <IconBag className="w-6 h-6 md:w-7 md:h-7" />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 grid place-items-center bg-plum-900 text-ivory-50 text-[10px] rounded-full font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <MegaMenu />
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-plum-900/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        />
        <aside className={`absolute left-0 top-0 h-full w-[88%] max-w-sm bg-ivory-50 shadow-2xl transition-transform duration-500 ease-silk flex flex-col ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-plum-100">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="" className="h-10 w-auto" />
              <span className="font-display text-lg text-plum-900">0528</span>
            </Link>
            <button onClick={closeMenu} aria-label="Close menu" className="text-plum-700 hover:text-plum-900">
              <IconClose className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto py-3">
            {MEGA_NAV.map((item) => (
              <li key={item.label} className="border-b border-plum-100">
                <NavLink
                  to={item.href}
                  className={`block py-4 px-5 font-display text-xl ${item.accent ? 'text-red-700' : 'text-plum-900'} hover:text-gold-600 transition-colors`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="p-5 border-t border-plum-100">
            <Link to={isAdmin ? '/admin' : '/admin/login'} className="btn-outline w-full">
              {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Navbar
