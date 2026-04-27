import { useParams, Link, Navigate } from 'react-router-dom'
import { IconWhatsApp, IconArrow } from '../components/Icons.jsx'
import { buildGeneralWhatsAppLink, whatsappDisplay } from '../utils/format.js'

// Every footer link routes to /info/:slug and picks content from this map.
// All copy kept plain and direct — no marketing jargon.
const INFO = {
  // Customer Service
  'contact-us': {
    title: 'Contact us',
    eyebrow: 'Customer Service',
    body: [
      'The fastest way to reach us is WhatsApp. A real person replies, usually within an hour (Mon–Sat · 9am–8pm GMT).',
      'You can ask about sizing, stock, colour options, delivery times, or anything else. No bots.'
    ],
    highlight: 'whatsapp'
  },
  'faqs': {
    title: 'FAQs',
    eyebrow: 'Customer Service',
    qa: [
      ['How do I place an order?', 'Everything goes through WhatsApp. Pick the piece, colour and size — then tap "Order on WhatsApp". The message is pre-filled; just send it.'],
      ['Do you ship worldwide?', 'Yes. Dispatch is included on every order.'],
      ['How long does delivery take?', 'Typically 3–7 working days, depending on destination.'],
      ['What currency are prices in?', 'Prices display in USD. We accept payment in local currency at checkout.'],
      ['Can I return an item?', 'Yes — unworn, within 14 days. Reach out on WhatsApp and we\'ll arrange pickup.'],
      ['Do you offer size guides?', 'Yes, each product has a size-guide link. Or ask us on WhatsApp for personalised sizing help.']
    ]
  },
  'orders-delivery': {
    title: 'Orders and delivery',
    eyebrow: 'Customer Service',
    body: [
      'Orders are confirmed on WhatsApp. Once payment is received, your piece is dispatched from the nearest 0528creatives Inc. within 24 hours.',
      'Tracking links are shared in the same WhatsApp thread — no separate email.',
      'Signature is required on delivery for orders above $500.'
    ]
  },
  'returns-refunds': {
    title: 'Returns and refunds',
    eyebrow: 'Customer Service',
    body: [
      'Returns accepted within 14 days of delivery, provided the item is unworn and has original tags attached.',
      'Message us on WhatsApp to start a return — we arrange courier pickup.',
      'Refunds are issued within 5 working days of receipt.'
    ]
  },
  'payment-pricing': {
    title: 'Payment and pricing',
    eyebrow: 'Customer Service',
    body: [
      'All prices shown in USD. Taxes and worldwide dispatch are included in the listed price.',
      'We accept bank transfer, credit card, and cryptocurrency. Payment details are shared over WhatsApp after you confirm your order.',
      'Prices are updated in line with exchange rates and may change without notice.'
    ]
  },
  'crypto-payments': {
    title: 'Cryptocurrency payments',
    eyebrow: 'Customer Service',
    body: [
      'We accept BTC, ETH, USDT and USDC on major networks.',
      'Crypto prices are locked for 15 minutes once you confirm an order. The wallet address is shared over WhatsApp — always verify it in the same thread.',
      'Once the transaction reaches 1 confirmation, your order is dispatched.'
    ]
  },
  'promotion-terms': {
    title: 'Promotion terms and conditions',
    eyebrow: 'Customer Service',
    body: [
      'Promotions and sale pricing apply only to items flagged as "Sale" on site at the time of order.',
      'Discount codes cannot be combined, and do not apply to third-party brand listings with price locks.',
      'We reserve the right to cancel orders we believe are placed in bad faith — including resale arbitrage.'
    ]
  },
  'customer-promise': {
    title: 'Our Customer Promise',
    eyebrow: 'Customer Service',
    body: [
      'Every piece is authenticated before dispatch.',
      'Every conversation is with a real person.',
      'Every return is honoured within 14 days, no questions asked.'
    ]
  },

  // About
  'about-us': {
    title: 'About us',
    eyebrow: 'The House',
    body: [
      '0528creatives inc. is an independent house curating menswear, womenswear and kidswear from a tight roster of 0528creatives Inc. we trust.',
      'We exist so you can buy fewer, better things — and talk to a real person when you do.',
      'Registered in London. Dispatch from London, Milan and Paris.'
    ]
  },
  'partner-boutiques': {
    title: 'Partner boutiques',
    eyebrow: 'The House',
    body: [
      'We partner with a small roster of independent boutiques: 0528creatives Inc. Nord (Oslo), Corso Veneto (Milan), Rue Sainte (Paris), Riva Moda (Lake Como), and our in-house label 0528creatives Inc..',
      'Every partner meets our standards for provenance, craft and ethical labour. We visit each one before onboarding.'
    ]
  },
  'careers': {
    title: 'Careers',
    eyebrow: 'The House',
    body: [
      'We\'re a small team. Roles open now: Buyer (Womenswear), Client Lead (WhatsApp), Content Producer.',
      'If none of those fit, write to us anyway — we reply to every serious application.'
    ]
  },
  'app': {
    title: '0528creatives app',
    eyebrow: 'The House',
    body: [
      'An iOS and Android app is in private beta.',
      'Features: saved wishlists, sizing memory, WhatsApp thread sync, and restock alerts.',
      'Ask us on WhatsApp for an invite.'
    ]
  },
  'modern-slavery': {
    title: 'Modern slavery statement',
    eyebrow: 'The House',
    body: [
      '0528creatives inc. has a zero-tolerance policy on modern slavery, forced labour and human trafficking.',
      'All partner boutiques sign a code of conduct confirming they audit their supply chain to the same standard.',
      'Our full statement is updated annually and is available on request.'
    ]
  },
  'advertising': {
    title: 'Advertising',
    eyebrow: 'The House',
    body: [
      'We do not run paid media. Word-of-mouth, our Instagram and our WhatsApp thread are how we grow.',
      'Collaborations and press enquiries: message us on WhatsApp.'
    ]
  },
  'sitemap': {
    title: 'Sitemap',
    eyebrow: 'The House',
    links: [
      { to: '/', label: 'Home' },
      { to: '/women', label: 'Women' },
      { to: '/men', label: 'Men' },
      { to: '/kids', label: 'Kids' },
      { to: '/new-in', label: 'New In' },
      { to: '/info/contact-us', label: 'Contact us' },
      { to: '/info/faqs', label: 'FAQs' },
      { to: '/info/orders-delivery', label: 'Orders and delivery' },
      { to: '/info/returns-refunds', label: 'Returns and refunds' },
      { to: '/info/payment-pricing', label: 'Payment and pricing' },
      { to: '/info/about-us', label: 'About us' },
      { to: '/info/careers', label: 'Careers' }
    ]
  },

  // Discounts & Membership
  'affiliate': {
    title: 'Affiliate program',
    eyebrow: 'Discounts and membership',
    body: [
      'Earn 8% on every order placed through your referral link. Payouts monthly.',
      'Apply on WhatsApp with a short note about where you\'ll share the link.'
    ]
  },
  'refer-a-friend': {
    title: 'Refer a friend',
    eyebrow: 'Discounts and membership',
    body: [
      'You and a friend each get $50 off your next order over $300.',
      'Ask us on WhatsApp for your personal referral code.'
    ]
  },
  'membership': {
    title: '0528 Membership',
    eyebrow: 'Discounts and membership',
    body: [
      'Invite-only membership. Members get first access to new season pieces, members-only prices, and priority WhatsApp response.',
      'Memberships are earned, not purchased — typically after your third order.'
    ]
  },
  'student-graduates': {
    title: 'Student and graduates',
    eyebrow: 'Discounts and membership',
    body: [
      'Verified students and recent graduates get 15% off all full-price items.',
      'Apply your verification on WhatsApp — we verify via Student Beans / Graduate Beans.'
    ]
  },
  'student-youth': {
    title: 'Student and youth discount',
    eyebrow: 'Discounts and membership',
    body: [
      'Under-25? Ask on WhatsApp — 10% off your first order, no verification needed. Just be cool about it.'
    ]
  },

  // Content
  'fashion-feed': {
    title: 'Fashion Feed',
    eyebrow: 'Content and services',
    body: [
      'A small monthly dispatch with the pieces we\'re wearing, the 0528creatives Inc. we\'re visiting, and the stories behind the collections.',
      'No discount spam — once a month, read in five minutes.',
      'Ask us on WhatsApp to be added.'
    ]
  },
  'follow-us': {
    title: 'Follow us',
    eyebrow: 'Content and services',
    body: [
      'Instagram: @0528creatives',
      'TikTok: @0528creatives',
      'Pinterest: @0528creatives',
      'We reply to DMs, but WhatsApp is still the fastest way.'
    ]
  }
}

const Info = () => {
  const { slug } = useParams()
  const data = INFO[slug]

  if (!data) return <Navigate to="/info/contact-us" replace />

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-plum-900 text-ivory-50 border-b border-plum-700">
        <div className="container-luxe py-16 md:py-20">
          <p className="eyebrow text-gold-400">{data.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[1.05] text-ivory-50">{data.title}</h1>
        </div>
      </section>

      {/* Body */}
      <section className="container-luxe py-12 md:py-16 grid lg:grid-cols-[2fr_1fr] gap-12">
        <div className="max-w-2xl">
          {data.body && (
            <div className="space-y-5 text-plum-800 text-[17px] leading-relaxed">
              {data.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {data.qa && (
            <div className="divide-y divide-plum-100 border-t border-b border-plum-100">
              {data.qa.map(([q, a], i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-display text-lg md:text-xl text-plum-900 pr-4">{q}</span>
                    <span className="text-2xl text-plum-500 transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-plum-700 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          )}

          {data.links && (
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {data.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="flex items-center gap-2 text-plum-800 hover:text-gold-700 transition-colors group">
                    <IconArrow className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="link-underline">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <Link to="/" className="btn-outline group">
              Back to home
              <IconArrow className="w-4 h-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Sidebar — WhatsApp help card */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="bg-ivory-50 border border-plum-100 p-6 md:p-8 shadow-card">
            <p className="eyebrow text-gold-600">Faster on WhatsApp</p>
            <h3 className="mt-2 font-display text-2xl text-plum-900">Ask us anything.</h3>
            <p className="mt-3 text-sm text-plum-700 leading-relaxed">
              A real person replies — usually within the hour, Mon–Sat, 9am to 8pm GMT.
            </p>
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full mt-6"
            >
              <IconWhatsApp className="w-5 h-5" /> {whatsappDisplay}
            </a>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Info
