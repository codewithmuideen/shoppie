import { Link } from 'react-router-dom'
import { IconInstagram, IconWhatsApp, IconArrow } from './Icons.jsx'
import { whatsappDisplay, buildGeneralWhatsAppLink } from '../utils/format.js'

const sections = [
  {
    title: 'Customer Service',
    links: [
      { to: '/info/contact-us',      label: 'Contact us' },
      { to: '/info/faqs',            label: 'FAQs' },
      { to: '/info/orders-delivery', label: 'Orders and delivery' },
      { to: '/info/returns-refunds', label: 'Returns and refunds' },
      { to: '/info/payment-pricing', label: 'Payment and pricing' },
      { to: '/info/crypto-payments', label: 'Cryptocurrency payments' },
      { to: '/info/promotion-terms', label: 'Promotion terms and conditions' },
      { to: '/info/customer-promise', label: 'Customer Promise' }
    ]
  },
  {
    title: 'About 0528creatives',
    links: [
      { to: '/info/about-us',            label: 'About us' },
      { to: '/info/partner-boutiques',   label: 'Partner boutiques' },
      { to: '/info/careers',             label: 'Careers' },
      { to: '/info/app',                 label: '0528creatives app' },
      { to: '/info/modern-slavery',      label: 'Modern slavery statement' },
      { to: '/info/advertising',         label: 'Advertising' },
      { to: '/info/sitemap',             label: 'Sitemap' }
    ]
  },
  {
    title: 'Discounts and membership',
    links: [
      { to: '/info/affiliate',          label: 'Affiliate program' },
      { to: '/info/refer-a-friend',     label: 'Refer a friend' },
      { to: '/info/membership',         label: 'Membership' },
      { to: '/info/student-graduates',  label: 'Student Beans and Graduates' },
      { to: '/info/student-youth',      label: 'Student and Youth discount' }
    ]
  },
  {
    title: 'Content and services',
    links: [
      { to: '/info/fashion-feed', label: 'Fashion Feed: the latest style stories' },
      { to: '/info/follow-us',    label: 'Follow us' }
    ]
  }
]

const Footer = () => (
  <footer className="bg-plum-900 text-ivory-200 mt-24">
    {/* Brand + WhatsApp row */}
    <div className="container-luxe py-14 grid gap-10 lg:grid-cols-[1.2fr_2fr] border-b border-plum-700/60">
      <div className="flex flex-col items-start">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="" className="h-10 w-auto" />
          <span className="font-display text-2xl text-ivory-50">0528creatives inc.</span>
        </Link>
        <p className="mt-5 text-sm leading-relaxed text-ivory-200/80 max-w-md">
          A curated house of menswear, womenswear and kidswear - sourced from
          independent labels and heritage houses. Every piece hand-selected and
          dispatched worldwide.
        </p>
        <a
          href={buildGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 text-gold-400 hover:text-gold-300 transition-colors group"
        >
          <IconWhatsApp className="w-5 h-5" />
          <span className="text-sm tracking-wide link-underline">Order on WhatsApp · {whatsappDisplay}</span>
        </a>
      </div>

      {/* Newsletter / help panel */}
      <div className="bg-plum-800/60 border border-plum-700/60 p-6 md:p-8">
        <p className="eyebrow text-gold-400">Need help?</p>
        <h3 className="mt-2 font-display text-3xl text-ivory-50 leading-tight">
          Questions, sizing, stock - <span className="italic text-gold-400">just message us.</span>
        </h3>
        <p className="mt-3 text-sm text-ivory-200/80 max-w-lg">
          A real person replies, usually within the hour (Mon–Sat, 9am–8pm GMT).
          No bots, no form queue.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={buildGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <IconWhatsApp className="w-4 h-4" /> WhatsApp us
          </a>
          <Link to="/info/contact-us" className="inline-flex items-center gap-2 border border-ivory-50/30 text-ivory-50 px-6 py-3 text-[11px] uppercase tracking-luxe hover:bg-ivory-50 hover:text-plum-900 transition-colors">
            Contact us
          </Link>
        </div>
      </div>
    </div>

    {/* Menu grid */}
    <div className="container-luxe py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {sections.map((sec) => (
        <div key={sec.title}>
          <p className="eyebrow text-gold-400">{sec.title}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sec.links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-1.5 text-ivory-200/85 hover:text-ivory-50 transition-colors group"
                >
                  <span className="link-underline">{l.label}</span>
                  <IconArrow className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Social + shop-by */}
    <div className="border-t border-plum-700/60">
      <div className="container-luxe py-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-ivory-200 hover:text-gold-400 transition-colors">
            <IconInstagram className="w-5 h-5" />
            <span className="text-[11px] uppercase tracking-luxe">Instagram</span>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
             className="text-[11px] uppercase tracking-luxe text-ivory-200 hover:text-gold-400 transition-colors">TikTok</a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
             className="text-[11px] uppercase tracking-luxe text-ivory-200 hover:text-gold-400 transition-colors">Pinterest</a>
        </div>
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-luxe">
          <Link to="/women"  className="text-ivory-200 hover:text-gold-400 transition-colors">Women</Link>
          <Link to="/men"    className="text-ivory-200 hover:text-gold-400 transition-colors">Men</Link>
          <Link to="/kids"   className="text-ivory-200 hover:text-gold-400 transition-colors">Kids</Link>
          <Link to="/new-in" className="text-ivory-200 hover:text-gold-400 transition-colors">New In</Link>
        </div>
      </div>
    </div>

    {/* Small print */}
    <div className="border-t border-plum-700/60">
      <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory-200/60 tracking-wide">
        <p>© {new Date().getFullYear()} 0528creatives inc. All rights reserved.</p>
        <p className="uppercase tracking-luxe text-[10px]">Powered by 0528Creatives Inc.</p>
      </div>
    </div>
  </footer>
)

export default Footer
