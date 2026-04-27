import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow, IconWhatsApp } from './Icons.jsx'
import { buildGeneralWhatsAppLink } from '../utils/format.js'

const U = (id, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`

// Six cinematic, moody slides. Product-first imagery. Centered composition.
const slides = [
  {
    key: 'sneakers',
    mark: 'The Sneaker Edit',
    title: ['The Onyx', 'Pack.'],
    accent: 'Pack.',
    sub: 'Italian-made court sneakers, suede runners, nappa platforms — reworked in the house onyx palette.',
    cta: { to: '/men', label: 'Discover' },
    image: U('1608667508764-33cf0726b13a'),
    focal: 'center 40%'
  },
  {
    key: 'leather',
    mark: 'Crafted Leather',
    title: ['Bags, built', 'to outlast seasons.'],
    accent: 'to outlast seasons.',
    sub: 'Vegetable-tanned calfskin, brass hardware, hand-finished edges — from Milan and Florence.',
    cta: { to: '/women', label: 'Shop Bags' },
    image: U('1590874103328-eac38a683ce7'),
    focal: '60% 50%'
  },
  {
    key: 'women',
    mark: 'Womenswear',
    title: ['Eveningwear,', 'quietly cut.'],
    accent: 'quietly cut.',
    sub: 'Draped silk, structured tailoring and the pieces that carry a room without shouting.',
    cta: { to: '/women', label: 'Shop Women' },
    image: U('1539533018447-63fcce2678e3'),
    focal: '50% 30%'
  },
  {
    key: 'men',
    mark: 'Menswear',
    title: ['Tailored', 'for him.'],
    accent: 'for him.',
    sub: 'Italian wool, selvedge denim, Goodyear-welted leather. The foundations of a quieter wardrobe.',
    cta: { to: '/men', label: 'Shop Men' },
    image: U('1617137968427-85924c800a22'),
    focal: '50% 40%'
  },
  {
    key: 'new',
    mark: 'Just Arrived',
    title: ['New in', 'this week.'],
    accent: 'this week.',
    sub: 'Fresh from the 0528creatives Inc. — tailoring, knitwear, shoes and bags.',
    cta: { to: '/new-in', label: 'Shop New In' },
    image: U('1515562141207-7a88fb7ce338'),
    focal: '50% 50%'
  },
  {
    key: 'kids',
    mark: 'Petite Pieces',
    title: ['Small details,', 'long lives.'],
    accent: 'long lives.',
    sub: 'Heirloom cotton, brushed cashmere, soft leather — made to pass on.',
    cta: { to: '/kids', label: 'Shop Kids' },
    image: U('1503944583220-79d8926ad5e2'),
    focal: '50% 35%'
  }
]

const DURATION = 7500

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
      className="relative h-[95vh] min-h-[640px] max-h-[920px] overflow-hidden bg-[#0a0610] select-none"
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
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-silk ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            aria-hidden={!isActive}
          >
            {/* Image — Ken Burns, subtle parallax */}
            <img
              src={s.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[12000ms] ease-out
                          ${isActive ? 'scale-[1.12]' : 'scale-100'}`}
              style={{ objectPosition: s.focal }}
            />
            {/* Overlays: darkening + radial vignette + subtle grain */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0610]/80 via-[#0a0610]/45 to-[#0a0610]/85" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 0%, transparent 45%, rgba(10,6,16,0.65) 100%)'
              }}
            />
          </div>
        )
      })}

      {/* Content — one centered stack, crossfades with active slide */}
      <div className="relative z-20 h-full flex items-center justify-center px-5">
        <div className="max-w-3xl text-center text-ivory-50">
          {slides.map((s, i) => {
            const isActive = i === active
            return (
              <div
                key={s.key}
                className={`transition-all duration-1000 ease-silk
                           ${isActive ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}
                aria-hidden={!isActive}
              >
                {/* Brand mark: logo + accent rule, echoing the Puma reference */}
                <div className={`flex flex-col items-center gap-4 transition-all duration-700 ease-silk
                                ${isActive ? 'opacity-100 translate-y-0 delay-[250ms]' : 'opacity-0 -translate-y-2'}`}>
                  <img src="/logo.png" alt="" className="h-8 md:h-10 w-auto opacity-95" />
                  <span className="block h-px w-10 bg-gold-500" />
                  <span className="text-[11px] md:text-xs uppercase tracking-luxe text-ivory-50/85">
                    {s.mark}
                  </span>
                </div>

                {/* Headline */}
                <h1 className={`mt-8 font-display font-medium text-[44px] leading-[1.02] md:text-7xl lg:text-[84px] text-balance
                               transition-all duration-[1100ms] ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[450ms]' : 'opacity-0 translate-y-8'}`}>
                  {s.title[0]}<br/>
                  <span className="italic text-gold-400">{s.title[1]}</span>
                </h1>

                <p className={`mt-5 md:mt-7 max-w-xl mx-auto text-[15px] md:text-base text-ivory-100/80 leading-relaxed
                               transition-all duration-700 ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-4'}`}>
                  {s.sub}
                </p>

                {/* Outlined CTA row, centered */}
                <div className={`mt-9 md:mt-10 flex flex-wrap items-center justify-center gap-3
                               transition-all duration-700 ease-silk
                               ${isActive ? 'opacity-100 translate-y-0 delay-[850ms]' : 'opacity-0 translate-y-4'}`}>
                  <Link
                    to={s.cta.to}
                    className="group inline-flex items-center gap-3 border border-ivory-50/80 px-8 py-3.5 text-[11px] uppercase tracking-luxe text-ivory-50 hover:bg-ivory-50 hover:text-plum-900 transition-all duration-500"
                  >
                    {s.cta.label}
                    <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={buildGeneralWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-ivory-50/85 hover:text-gold-400 transition-colors px-3 py-2"
                  >
                    <IconWhatsApp className="w-4 h-4" /> or WhatsApp
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Arrows — minimal, edge-aligned */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:grid absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 place-items-center text-ivory-50/70 hover:text-ivory-50 border border-ivory-50/20 hover:border-ivory-50/70 transition-all duration-500"
      >
        <IconArrow className="w-4 h-4 rotate-180" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:grid absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 place-items-center text-ivory-50/70 hover:text-ivory-50 border border-ivory-50/20 hover:border-ivory-50/70 transition-all duration-500"
      >
        <IconArrow className="w-4 h-4" />
      </button>

      {/* Dot pagination — thin ring, fills to gold when active */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-10 z-30 flex justify-center">
        <div className="flex items-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.key}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group p-1.5"
            >
              <span
                className={`block rounded-full transition-all duration-500 ease-silk
                            ${i === active
                              ? 'w-2.5 h-2.5 bg-gold-400 ring-1 ring-offset-2 ring-offset-transparent ring-gold-400/60'
                              : 'w-2 h-2 bg-ivory-50/30 group-hover:bg-ivory-50/70'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
