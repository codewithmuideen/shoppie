import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import HeroSlider from '../components/HeroSlider.jsx'
import FeatureBanners from '../components/FeatureBanners.jsx'
import { IconArrow, IconWhatsApp } from '../components/Icons.jsx'
import { buildGeneralWhatsAppLink } from '../utils/format.js'

const U = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const Home = () => {
  const { products } = useProducts()
  const newIn       = products.filter((p) => p.newIn).slice(0, 12)
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 12)
  const featured    = products.filter((p) => p.featured).slice(0, 8)

  return (
    <div className="animate-fade-in">
      {/* ============ HERO SLIDER ============ */}
      <HeroSlider />

      {/* ============ FEATURE BANNERS (overlap hero bottom) ============ */}
      <FeatureBanners />

      {/* ============ MARQUEE ============ */}
      <section className="bg-plum-800 text-ivory-100 py-5 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 items-center">
              {['Worldwide Dispatch Included',  'Order on WhatsApp',  'Hand-Selected Ateliers',  'Authenticity Guaranteed',  '14-Day Returns'].map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-12">
                  <span className="text-[11px] uppercase tracking-luxe">{t}</span>
                  <span className="w-1 h-1 rounded-full bg-gold-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORY TRIPTYCH ============ */}
      <section className="container-luxe py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow">The House</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-plum-900">Shop by atelier</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { to: '/women', label: 'Women', img: U('1490481651871-ab68de25d43d', 1000),
              copy: 'Elegance, tailored' },
            { to: '/men',   label: 'Men',   img: U('1617137968427-85924c800a22', 1000),
              copy: 'Understated craft' },
            { to: '/kids',  label: 'Kids',  img: U('1503944583220-79d8926ad5e2', 1000),
              copy: 'Petite, considered' }
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative block overflow-hidden aspect-[4/5]"
            >
              <img
                src={c.img}
                alt={c.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-silk group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/10 to-transparent transition-opacity duration-500 group-hover:from-plum-900/85" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center text-ivory-50">
                <p className="eyebrow text-gold-400 opacity-0 -translate-y-2 transition-all duration-500 ease-silk group-hover:opacity-100 group-hover:translate-y-0">
                  {c.copy}
                </p>
                <h3 className="mt-2 font-display text-5xl md:text-6xl text-ivory-50 transition-transform duration-500 ease-silk group-hover:-translate-y-1">
                  {c.label}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe link-underline text-gold-400">
                  Discover <IconArrow className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ NEW IN ============ */}
      <section className="container-luxe py-10 md:py-16">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="eyebrow">Just Arrived</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">New in this week</h2>
          </div>
          <Link to="/new-in" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-plum-800 hover:text-gold-700 transition-colors group">
            View all
            <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {newIn.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link to="/new-in" className="btn-outline">View All New In</Link>
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section className="bg-ivory-50 border-y border-plum-100 py-16 md:py-20">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="eyebrow text-gold-700">This Week’s Edit</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Best sellers</h2>
              <p className="mt-2 text-plum-600 text-sm max-w-md">The pieces flying out of the house this week — across women, men and kids.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ============ EDITORIAL ============ */}
      <section className="container-luxe py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Editorial</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight text-balance">
              Slower fashion,<br/>
              <span className="italic text-gold-600">better made.</span>
            </h2>
            <p className="mt-6 text-plum-800 leading-relaxed max-w-md">
              Every piece in the house is vetted — for provenance, for craft, for the
              life it will have beyond the season. No sprawling inventories, no
              one-wear wardrobes. Just pieces worth keeping.
            </p>
            <Link to="/women" className="mt-8 btn-primary group">
              Explore the edit
              <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden group">
              <img src={U('1539533018447-63fcce2678e3', 800)} alt=""
                   className="h-full w-full object-cover transition-transform duration-[1500ms] ease-silk group-hover:scale-110" />
            </div>
            <div className="aspect-[3/4] overflow-hidden group mt-10">
              <img src={U('1591047139829-d91aecb6caea', 800)} alt=""
                   className="h-full w-full object-cover transition-transform duration-[1500ms] ease-silk group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="container-luxe pb-16 md:pb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="eyebrow">House Signatures</p>
          <h2 className="mt-2 font-display text-4xl">Featured pieces</h2>
          <p className="mt-3 text-plum-600 text-sm">Enduring silhouettes we’re known for.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ============ WHATSAPP BANNER ============ */}
      <section className="container-luxe pb-16">
        <div className="relative overflow-hidden bg-plum-900 text-ivory-50">
          <div className="absolute inset-0 opacity-30">
            <img src={U('1445205170230-053b83016050', 1600)} alt=""
                 className="h-full w-full object-cover" />
          </div>
          <div className="relative p-10 md:p-16 text-center max-w-2xl mx-auto">
            <p className="eyebrow text-gold-400">Real person, real time</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ivory-50">
              Order directly<br/>
              <span className="italic text-gold-400">on WhatsApp.</span>
            </h2>
            <p className="mt-5 text-ivory-200/90 max-w-lg mx-auto leading-relaxed">
              Chat through sizing, stock and colour options in the same thread. We reply
              within the hour, Mon–Sat, 9am to 8pm GMT.
            </p>
            <a href={buildGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer"
               className="btn-whatsapp mt-8 inline-flex">
              <IconWhatsApp className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
