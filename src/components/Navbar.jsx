import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IconSearch, IconMenu, IconClose, IconUser } from './Icons.jsx'
import { useUI } from '../context/UIContext.jsx'
import { useAdmin } from '../context/AdminContext.jsx'

const links = [
  { to: '/women',  label: 'Women' },
  { to: '/men',    label: 'Men' },
  { to: '/kids',   label: 'Kids' },
  { to: '/new-in', label: 'New In' }
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { openSearch, menuOpen, openMenu, closeMenu } = useUI()
  const { isAdmin } = useAdmin()
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
        <div className="container-luxe flex items-center justify-between py-4 md:py-5">
          {/* Left — menu (mobile) + search (desktop) */}
          <div className="flex items-center gap-5 flex-1">
            <button
              aria-label="Open menu"
              className="lg:hidden text-plum-900 hover:text-gold-600 transition-colors"
              onClick={openMenu}
            >
              <IconMenu className="w-6 h-6" />
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

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="0528creatives inc.">
            <img
              src="/logo.png"
              alt="0528creatives inc."
              className="h-9 md:h-11 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-lg md:text-xl font-medium text-plum-900 tracking-wide">
                0528creatives
              </span>
              <span className="text-[9px] uppercase tracking-luxe text-plum-500 mt-1">
                inc. · Curated luxury
              </span>
            </span>
          </Link>

          {/* Right — admin + mobile search */}
          <div className="flex items-center gap-5 flex-1 justify-end">
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
              <span className="hidden md:inline text-[11px] uppercase tracking-luxe link-underline">
                {isAdmin ? 'Dashboard' : 'Admin'}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:block border-t border-plum-100">
          <div className="container-luxe">
            <ul className="flex items-center justify-center gap-10 py-4">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative text-[11px] uppercase tracking-luxe py-1 transition-colors duration-300
                       ${isActive ? 'text-plum-900' : 'text-plum-600 hover:text-plum-900'}
                       after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:bg-gold-500
                       after:transition-all after:duration-500 after:ease-silk
                       ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-plum-900/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        />
        <aside className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-ivory-50 shadow-2xl transition-transform duration-500 ease-silk flex flex-col ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-plum-100">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-8 w-auto" />
              <span className="font-display text-lg text-plum-900">0528creatives</span>
            </div>
            <button onClick={closeMenu} aria-label="Close menu" className="text-plum-700 hover:text-plum-900">
              <IconClose className="w-6 h-6" />
            </button>
          </div>
          <ul className="p-5 space-y-1 flex-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `block py-4 px-3 font-display text-2xl border-b border-plum-100 transition-colors ${
                      isActive ? 'text-gold-600' : 'text-plum-900 hover:text-gold-600'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="p-5">
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
