import { Link } from 'react-router-dom'
import { IconArrow } from './Icons.jsx'

const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`

// Two horizontal banner cards that intentionally overlap the hero's bottom
// edge (negative margin on the parent section). Each card has a thick inner
// outline frame, bold eyebrow + headline, and a subtle "shop" link row.
const banners = [
  {
    key: 'sneakers',
    tone: 'plum',   // plum-800 background, ivory text, gold accents
    eyebrow: 'The Sneaker Edit',
    title: 'Nappa, suede,\nquiet soles.',
    image: U('1600269452121-4f2416e55c28'),
    links: [
      { to: '/men',   label: 'Shop Men'   },
      { to: '/women', label: 'Shop Women' }
    ]
  },
  {
    key: 'leather',
    tone: 'ivory',  // ivory-50 background, plum text, gold accents
    eyebrow: 'Crafted Leather',
    title: 'Bags, built\nto outlast seasons.',
    image: U('1548036328-c9fa89d128fa'),
    links: [
      { to: '/women', label: 'Shop Bags'       },
      { to: '/new-in', label: 'See the Edit'  }
    ]
  }
]

const Banner = ({ b }) => {
  const isPlum = b.tone === 'plum'
  return (
    <div className={`group relative overflow-hidden
                     ${isPlum ? 'bg-plum-800 text-ivory-50' : 'bg-ivory-50 text-plum-900'}
                     shadow-cardHover`}>
      {/* Inner outline frame (Puma-style) */}
      <div className={`pointer-events-none absolute inset-3 md:inset-4 border
                       ${isPlum ? 'border-ivory-50/30' : 'border-plum-900/25'}`} />

      <div className="grid grid-cols-[1.2fr_1fr] min-h-[240px] md:min-h-[280px] lg:min-h-[320px]">
        {/* Text half */}
        <div className="relative z-10 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <p className={`text-[10px] md:text-[11px] uppercase tracking-luxe
                          ${isPlum ? 'text-gold-400' : 'text-gold-700'}`}>
              {b.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] whitespace-pre-line">
              {b.title}
            </h3>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {b.links.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                className={`group/link inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-luxe
                            ${isPlum ? 'text-ivory-50 hover:text-gold-400' : 'text-plum-900 hover:text-gold-700'}
                            transition-colors duration-500`}
              >
                <span className="link-underline">{l.label}</span>
                <IconArrow className="w-3.5 h-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Image half */}
        <div className="relative overflow-hidden">
          <img
            src={b.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-silk group-hover:scale-[1.08]"
          />
          {/* Soft gradient into text half */}
          <div className={`absolute inset-0 ${isPlum ? 'bg-gradient-to-l from-transparent via-plum-800/10 to-plum-800/40' : 'bg-gradient-to-l from-transparent via-ivory-50/5 to-ivory-50/35'}`} />
        </div>
      </div>
    </div>
  )
}

const FeatureBanners = () => (
  <section className="container-luxe relative z-30 -mt-16 md:-mt-24 lg:-mt-28 mb-8 md:mb-16">
    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
      {banners.map((b) => <Banner key={b.key} b={b} />)}
    </div>
  </section>
)

export default FeatureBanners
