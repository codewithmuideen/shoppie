import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow, IconWhatsApp } from './Icons.jsx'
import { buildGeneralWhatsAppLink } from '../utils/format.js'

const U = (id, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const slides = [
  {
    key: 'spring',
    eyebrow: 'Womenswear',
    title: ['A wardrobe,', 'quietly considered.'],
    accent: 'quietly considered.',
    sub: 'Independent ateliers and heritage labels — pieces worth keeping.',
    cta: { to: '/women', label: 'Shop Women' },
    image: U('1490481651871-ab68de25d43d'),
    align: 'left',
    overlay: 'from-plum-900/75 via-plum-900/30 to-transparent'
  },
  {
    key: 'men',
    eyebrow: 'Menswear',
    title: ['Tailored for him,', 'made to last.'],
    accent: 'made to last.',
    sub: 'Italian wool, selvedge denim, Goodyear-welted leather.',
    cta: { to: '/men', label: 'Shop Men' },
    image: U('1617137968427-85924c800a22'),
    align: 'right',
    overlay: 'from-transparent via-plum-900/20 to-plum-900/80'
  },
  {
    key: 'new',
    eyebrow: 'Just Arrived',
    title: ['New in', 'this week.'],
    accent: 'this week.',
    sub: 'Fresh additions across tailoring, knitwear, shoes and bags.',
    cta: { to: '/new-in', label: 'Shop New In' },
    image: U('1539533018447-63fcce2678e3'),
    align: 'left',
    overlay: 'from-plum-900/70 via-plum-900/25 to-transparent'
  },
  {
    key: 'sneakers',
    eyebrow: 'The Sneaker Capsule',
    title: ['Nappa leather,', 'quiet soles.'],
    accent: 'quiet soles.',
    sub: 'Italian-made court sneakers, suede runners and platforms.',
    cta: { to: '/men', label: 'Shop Sneakers' },
    image: U('1600185365926-3a2ce3cdb9eb'),
    align: 'right',
    overlay: 'from-transparent via-plum-900/30 to-plum-900/85'
  },
  {
    key: 'kids',
    eyebrow: 'Kidswear',
    title: ['Petite pieces,', 'made to pass on.'],
    accent: 'made to pass on.',
    sub: 'Hand-smocked cotton, brushed cashmere, soft leather.',
    cta: { to: '/kids', label: 'Shop Kids' },
    image: U('1503944583220-79d8926ad5e2'),
    align: 'left',
    overlay: 'from-plum-900/75 via-plum-900/30 to-transparent'
  },
  {
    key: 'bags',
    eyebrow: 'Heritage Bags',
    title: ['Leather, built', 'to outlast seasons.'],
    accent: 'to outlast seasons.',
    sub: 'Hand-finished totes, quilted shoulders and weekenders.',
    cta: { to: '/women', label: 'Shop Bags' },
    image: U('1584917865442-de89df76afd3'),
    align: 'right',
    overlay: 'from-transparent via-plum-900/20 to-plum-900/80'
  }
]

const DURATION = 7000

const HeroSlider = () => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const tickRef = useRef(null)

  useEffect(() => {
    if (paused) return
    tickRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % slides.length)
    }, DURATION)
    return () => clearTimeout(tickRef.current)
  }, [active, paused])

  const go = (i) => setActive((i + slides.length) % slides.length)
  const next = () => go(active + 1)
  const prev = () => go(active - 1)

  return (
    <section
      className="relative h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden bg-plum-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {slides.map((s, i) => {
        const isActive = i === active
        return (
          <div
            key={s.key}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-silk ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={!isActive}
          >
            {/* Image with Ken Burns */}
            <img
              src={s.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[12000ms] ease-out
                          ${isActive ? 'scale-110' : 'scale-100'}`}
              style={{ transformOrigin: s.align === 'left' ? '70% 50%' : '30% 50%' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 to-transparent" />

            {/* Copy */}
            <div className="relative container-luxe h-full flex items-end md:items-center pb-20 md:pb-0">
              <div className={`max-w-2xl text-ivory-50 ${s.align === 'right' ? 'md:ml-auto md:text-right' : ''}`}>
                <p className={`eyebrow text-gold-400 transition-all duration-700 ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[300ms]' : 'opacity-0 translate-y-4'}`}>
                  {s.eyebrow}
                </p>
                <h1 className={`mt-4 font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance
                               transition-all duration-[900ms] ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[450ms]' : 'opacity-0 translate-y-6'}`}>
                  {s.title[0]}<br/>
                  <span className="italic text-gold-400">{s.title[1]}</span>
                </h1>
                <p className={`mt-6 text-base md:text-lg text-ivory-200/90 max-w-lg leading-relaxed
                               ${s.align === 'right' ? 'md:ml-auto' : ''}
                               transition-all duration-700 ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-4'}`}>
                  {s.sub}
                </p>
                <div className={`mt-8 flex flex-wrap gap-3 ${s.align === 'right' ? 'md:justify-end' : ''}
                               transition-all duration-700 ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[850ms]' : 'opacity-0 translate-y-4'}`}>
                  <Link to={s.cta.to} className="btn-gold group">
                    {s.cta.label}
                    <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                  <a href={buildGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <IconWhatsApp className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:grid absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 place-items-center bg-ivory-50/15 hover:bg-ivory-50 hover:text-plum-900 text-ivory-50 backdrop-blur-sm border border-ivory-50/30 transition-all duration-500"
      >
        <IconArrow className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:grid absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 place-items-center bg-ivory-50/15 hover:bg-ivory-50 hover:text-plum-900 text-ivory-50 backdrop-blur-sm border border-ivory-50/30 transition-all duration-500"
      >
        <IconArrow className="w-4 h-4" />
      </button>

      {/* Indicator rail */}
      <div className="absolute left-0 right-0 bottom-6 md:bottom-8 z-20">
        <div className="container-luxe flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.key}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group flex items-center"
              >
                <span className={`block h-px bg-ivory-50/40 transition-all duration-500 ease-silk relative overflow-hidden
                                  ${i === active ? 'w-14 md:w-20' : 'w-6 md:w-10 group-hover:bg-ivory-50/80'}`}>
                  {i === active && !paused && (
                    <span
                      key={active}
                      className="absolute inset-y-0 left-0 bg-gold-400"
                      style={{ animation: `hero-progress ${DURATION}ms linear forwards` }}
                    />
                  )}
                  {i === active && paused && (
                    <span className="absolute inset-0 bg-gold-400" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-luxe text-ivory-50/70">
            {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Inline keyframes for progress bar so we don't touch tailwind config again */}
      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default HeroSlider
