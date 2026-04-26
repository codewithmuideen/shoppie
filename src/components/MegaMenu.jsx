import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MEGA_NAV } from '../data/megaNav.js'

const MegaMenu = () => {
  const [openIdx, setOpenIdx] = useState(null)
  const nav = useNavigate()
  const close = () => setOpenIdx(null)

  return (
    <nav
      className="hidden lg:block border-t border-plum-100 relative"
      onMouseLeave={close}
    >
      <div className="container-luxe">
        <ul className="flex items-center justify-center gap-7 py-3">
          {MEGA_NAV.map((item, i) => (
            <li key={item.label}
                onMouseEnter={() => setOpenIdx(i)}>
              <button
                onClick={() => nav(item.href)}
                className={`relative text-[11px] uppercase tracking-luxe py-2 transition-colors duration-300
                  ${item.accent ? 'text-red-700 hover:text-red-800' : 'text-plum-700 hover:text-plum-900'}
                  after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:bg-gold-500
                  after:transition-all after:duration-500 after:ease-silk
                  ${openIdx === i ? 'after:w-full text-plum-900' : 'after:w-0'}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel */}
      <div
        className={`absolute left-0 right-0 top-full z-40 transition-all duration-400 ease-silk overflow-hidden
                    ${openIdx !== null ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}
      >
        <div className="bg-ivory-50 border-t border-plum-100 shadow-card">
          {MEGA_NAV.map((item, i) => (
            <div
              key={item.label}
              className={`container-luxe py-10 transition-opacity duration-300 ${openIdx === i ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6">
                {item.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow text-plum-800">{col.title}</p>
                    <ul className="mt-4 space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label + l.to}>
                          <Link
                            to={l.to}
                            onClick={close}
                            className="text-[13px] text-plum-700 hover:text-gold-700 transition-colors"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default MegaMenu
