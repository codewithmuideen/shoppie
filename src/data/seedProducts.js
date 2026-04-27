// Seed catalogue. Used on first load when Supabase is not configured, then
// merged with admin-uploaded products in localStorage. When Supabase env vars
// are set, the data is pulled from / pushed to the cloud table instead.
//
// Image strategy:
//  - L(name) → /assets in /public (webp from pixabay/local stock)
//  - U(id)   → unsplash CDN (fallback for variety)

const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Local /public assets — paired files (front + alt view).
const LOCAL = [
  ['19147199_41833574_1000.webp', '19147199_41834567_1000.webp'],
  ['23528599_63500795_1000.webp', '23528599_63632817_1000.webp'],
  ['24319666_54330332_1000.webp', '24319666_54330334_1000.webp'],
  ['30082036_59622591_1000.webp', '30082036_59622594_1000.webp'],
  ['30214018_59482673_1000.webp', '30214018_59482686_1000.webp'],
  ['31285090_60587969_1000.webp', '31285090_60587963_300.webp'],
  ['31475999_62451406_1000.webp', '31475999_62451418_1000.webp'],
  ['32485470_62556855_1000.webp', '32485470_62556886_1000.webp'],
  ['32485523_62557557_1000.webp', '32485523_62627816_1000.webp'],
  ['32529425_62761078_1000.webp', '32529425_62761093_1000.webp'],
  ['33140723_64259327_1000.webp', '33140723_64259325_300.webp'],
  ['35136952_67462164_1000.webp', '35136952_67462167_1000.webp'],
  ['35658745_67113911_1000.webp', '35658745_67113912_1000.webp'],
  ['35801564_67447942_1000.webp', '35801564_67448091_1000.webp']
]
const L = (i) => (LOCAL[i] || []).map((f) => `/${f}`)

export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
// UK shoe sizes (adults). Used for both men's and women's footwear.
export const SHOE_SIZES_UK = [
  '5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5'
]
// Backwards-compatible alias so older imports still work.
export const SHOE_SIZES_EU = SHOE_SIZES_UK
export const KID_SIZES = ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y']

export const COLOR_PALETTE = [
  { name: 'Onyx',     hex: '#111111' },
  { name: 'Ivory',    hex: '#faf7f2' },
  { name: 'Plum',     hex: '#2a1437' },
  { name: 'Gold',     hex: '#c9a961' },
  { name: 'Cognac',   hex: '#8a4b2a' },
  { name: 'Sand',     hex: '#c9b59a' },
  { name: 'Forest',   hex: '#2f4a3a' },
  { name: 'Navy',     hex: '#1b2a4e' },
  { name: 'Crimson',  hex: '#8a1c2b' },
  { name: 'Blush',    hex: '#e8c9c6' },
  { name: 'Olive',    hex: '#4d5a2a' },
  { name: 'Slate',    hex: '#6b7280' },
  { name: 'Dove',     hex: '#d7d3cd' },
  { name: 'Charcoal', hex: '#2b2b2b' },
  { name: 'Camel',    hex: '#b58a58' }
]

// Variant helpers — Vlocal uses a paired index from LOCAL, V uses Unsplash IDs.
const Vlocal = (color, hex, idx) => ({ color, hex, images: L(idx) })
const V = (color, hex, ...ids) => ({ color, hex, images: ids.map((id) => U(id)) })

// In-house labels use the 0528 prefix. Third-party labels stay varied.
export const seedProducts = [
  // ============ MEN — Outerwear ============
  { id: 'm-001', name: 'Tailored Wool Overcoat', brand: '0528creatives Inc.', category: 'men', subcategory: 'outerwear',
    description: 'Sculpted single-breasted overcoat in Italian virgin wool. Half-canvassed, horn buttons.',
    price: 1280, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Onyx','#111111', 0), Vlocal('Cognac','#8a4b2a', 1)],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-10' },

  { id: 'm-002', name: 'Belted Trench Coat', brand: '0528creatives Inc. Nord', category: 'men', subcategory: 'outerwear',
    description: 'Waxed cotton trench with storm shield and tonal belt.',
    price: 980, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Camel','#b58a58', 2), Vlocal('Onyx','#111111', 3)],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-19' },

  { id: 'm-003', name: 'Suede Field Jacket', brand: 'Corso Veneto', category: 'men', subcategory: 'outerwear',
    description: 'Hand-finished suede with four pockets and shearling collar.',
    price: 1450, sizeType: 'clothing', sizes: ['M','L','XL'],
    variants: [Vlocal('Cognac','#8a4b2a', 4)],
    newIn: false, bestSeller: true, createdAt: '2026-02-28' },

  // ============ MEN — Shirts ============
  { id: 'm-004', name: 'Silk-Blend Camp Shirt', brand: '0528creatives Inc. Nord', category: 'men', subcategory: 'shirts',
    description: 'Silk-cotton with camp collar and mother-of-pearl buttons.',
    price: 420, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Ivory','#faf7f2', 5), Vlocal('Navy','#1b2a4e', 6)],
    newIn: true, featured: true, createdAt: '2026-04-12' },

  { id: 'm-005', name: 'Crisp Poplin Shirt', brand: '0528creatives Inc.', category: 'men', subcategory: 'shirts',
    description: 'Long-staple cotton poplin, spread collar, double cuff.',
    price: 260, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Ivory','#faf7f2', 7), Vlocal('Plum','#2a1437', 8)],
    newIn: false, bestSeller: true, createdAt: '2026-03-30' },

  { id: 'm-006', name: 'Linen Overshirt', brand: 'Riva Moda', category: 'men', subcategory: 'shirts',
    description: 'Slubbed Italian linen in a relaxed overshirt cut.',
    price: 340, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Sand','#c9b59a', 9), Vlocal('Forest','#2f4a3a', 10)],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-21' },

  // ============ MEN — Knitwear ============
  { id: 'm-007', name: 'Cashmere Crewneck', brand: '0528creatives Inc.', category: 'men', subcategory: 'knitwear',
    description: 'Ultra-fine Mongolian cashmere in a refined crew silhouette.',
    price: 520, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [Vlocal('Plum','#2a1437', 11), Vlocal('Sand','#c9b59a', 12), Vlocal('Forest','#2f4a3a', 13)],
    newIn: false, bestSeller: true, createdAt: '2026-03-15' },

  { id: 'm-008', name: 'Ribbed Merino Polo', brand: '0528creatives Inc. Nord', category: 'men', subcategory: 'knitwear',
    description: 'Fine-gauge merino, half-zip collar.',
    price: 290, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [V('Ivory','#faf7f2','1516826957135-700dedea698c','1539109136881-3be0616acf4b'),
               V('Navy','#1b2a4e','1620799140408-edc6dcb6d633','1617137968427-85924c800a22')],
    newIn: false, featured: true, bestSeller: true, createdAt: '2026-02-05' },

  // ============ MEN — Trousers & Denim ============
  { id: 'm-009', name: 'Pleated Wool Trouser', brand: '0528creatives Inc. Nord', category: 'men', subcategory: 'trousers',
    description: 'High-rise pleated trouser in Japanese wool twill.',
    price: 390, sizeType: 'clothing', sizes: ['S','M','L','XL','XXL'],
    variants: [V('Onyx','#111111','1594633312681-425c7b97ccd1','1473966968600-fa801b869a1a'),
               V('Sand','#c9b59a','1624378439575-d8705ad7ae80','1542272604-787c3835535d')],
    newIn: true, createdAt: '2026-04-18' },

  { id: 'm-010', name: 'Selvedge Raw Denim', brand: 'Corso Veneto', category: 'men', subcategory: 'jeans',
    description: 'Japanese selvedge denim, unwashed, tapered leg.',
    price: 360, sizeType: 'clothing', sizes: ['S','M','L','XL','XXL'],
    variants: [V('Navy','#1b2a4e','1542272604-787c3835535d','1541099649105-f69ad21f3246'),
               V('Charcoal','#2b2b2b','1604176354204-9268737828e4','1475178626620-a4d074967452')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-20' },

  { id: 'm-011', name: 'Stone Washed Jean', brand: 'Riva Moda', category: 'men', subcategory: 'jeans',
    description: 'Mid-weight cotton denim, stone washed, slim-straight leg.',
    price: 280, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [V('Slate','#6b7280','1475178626620-a4d074967452','1604176354204-9268737828e4')],
    newIn: false, bestSeller: true, createdAt: '2026-01-12' },

  // ============ MEN — Shoes ============
  { id: 'm-012', name: 'Leather Derby Shoe', brand: 'Corso Veneto', category: 'men', subcategory: 'shoes',
    description: 'Goodyear-welted derby in full-grain calfskin. Leather sole. Handmade in Italy.',
    price: 690, sizeType: 'shoes', sizes: SHOE_SIZES_EU,
    variants: [V('Cognac','#8a4b2a','1614252235316-8c857d38b5f4','1449505278894-297fdb3edbc1'),
               V('Onyx','#111111','1520639888713-7851133b1ed0','1533867617858-e7b97e060509')],
    newIn: false, featured: true, createdAt: '2026-03-28' },

  { id: 'm-013', name: 'Court Leather Sneaker', brand: '0528creatives Inc.', category: 'men', subcategory: 'sneakers',
    description: 'Minimal court sneaker in Italian nappa with a tonal rubber sole.',
    price: 480, sizeType: 'shoes', sizes: SHOE_SIZES_EU,
    variants: [V('Ivory','#faf7f2','1542291026-7eec264c27ff','1600185365926-3a2ce3cdb9eb'),
               V('Onyx','#111111','1600269452121-4f2416e55c28','1549298916-b41d501d3772')],
    newIn: true, bestSeller: true, createdAt: '2026-04-22' },

  { id: 'm-014', name: 'Runner Low Sneaker', brand: '0528creatives Inc. Nord', category: 'men', subcategory: 'sneakers',
    description: 'Technical runner with suede overlays and cushioned midsole.',
    price: 520, sizeType: 'shoes', sizes: SHOE_SIZES_EU,
    variants: [V('Sand','#c9b59a','1595950653106-6c9ebd614d3a','1542291026-7eec264c27ff'),
               V('Slate','#6b7280','1600185365926-3a2ce3cdb9eb','1600269452121-4f2416e55c28')],
    newIn: true, featured: true, createdAt: '2026-04-17' },

  // ============ MEN — Bags & Accessories ============
  { id: 'm-015', name: 'Leather Weekender', brand: '0528creatives Inc.', category: 'men', subcategory: 'bags',
    description: 'Vegetable-tanned leather weekender with brass hardware.',
    price: 1180, sizeType: 'clothing', sizes: ['One Size'],
    variants: [V('Cognac','#8a4b2a','1590874103328-eac38a683ce7','1548036328-c9fa89d128fa'),
               V('Onyx','#111111','1566150905458-1bf1fc113f0d','1584917865442-de89df76afd3')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-15' },

  { id: 'm-016', name: 'Cotton Boxer Briefs — Trio', brand: 'Riva Moda', category: 'men', subcategory: 'undies',
    description: 'Pima cotton boxer briefs. Set of three.',
    price: 95, sizeType: 'clothing', sizes: ['S','M','L','XL'],
    variants: [V('Dove','#d7d3cd','1618354691373-d851c5c3a990','1516826957135-700dedea698c'),
               V('Onyx','#111111','1617137968427-85924c800a22','1620799140408-edc6dcb6d633')],
    newIn: false, bestSeller: true, createdAt: '2026-02-20' },

  // ============ WOMEN — Dresses ============
  { id: 'w-001', name: 'Draped Silk Gown', brand: '0528creatives Inc.', category: 'women', subcategory: 'dresses',
    description: 'Floor-grazing silk with bias cut and cowl neckline.',
    price: 1480, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Plum','#2a1437','1539533018447-63fcce2678e3','1502716119720-b23a93e5fe1b'),
               V('Crimson','#8a1c2b','1551232864-3f0890e580d9','1566479179817-c8e2d3a7b0e9')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-19' },

  { id: 'w-002', name: 'Pleated Midi Skirt', brand: 'Rue Sainte', category: 'women', subcategory: 'skirts',
    description: 'Sunray-pleated satin midi with hand-finished waistband.',
    price: 580, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Gold','#c9a961','1583496661160-fb5886a0aaaa','1539533018447-63fcce2678e3'),
               V('Onyx','#111111','1509631179647-0177331693ae','1495121605193-b116b5b9c5fe')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-20' },

  { id: 'w-003', name: 'Silk Camisole', brand: 'Rue Sainte', category: 'women', subcategory: 'tops',
    description: 'Featherweight silk camisole with lace trim.',
    price: 240, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Blush','#e8c9c6','1520975916090-3105956dac38','1581338834647-b0fb40704e21'),
               V('Onyx','#111111','1566206091558-7f218b696731','1532453288672-3a27e9be9efd')],
    newIn: false, createdAt: '2026-03-02' },

  // ============ WOMEN — Outerwear ============
  { id: 'w-004', name: 'Structured Blazer', brand: 'Rue Sainte', category: 'women', subcategory: 'outerwear',
    description: 'Double-breasted blazer in featherweight wool with peak lapels.',
    price: 780, sizeType: 'clothing', sizes: ['XS','S','M','L','XL'],
    variants: [V('Ivory','#faf7f2','1591369822096-ffd140ec948f','1551489186-cf8726f514f8'),
               V('Onyx','#111111','1548624313-0396c75e4b1a','1594223274512-ad4803739b7c')],
    newIn: true, featured: true, createdAt: '2026-04-14' },

  { id: 'w-005', name: 'Belted Wool Coat', brand: '0528creatives Inc.', category: 'women', subcategory: 'outerwear',
    description: 'Longline wool coat with tortoise-shell buttons.',
    price: 1180, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Camel','#b58a58','1539533018447-63fcce2678e3','1591369822096-ffd140ec948f'),
               V('Onyx','#111111','1548624313-0396c75e4b1a','1551489186-cf8726f514f8')],
    newIn: false, bestSeller: true, createdAt: '2026-02-10' },

  // ============ WOMEN — Knitwear ============
  { id: 'w-006', name: 'Cashmere Wrap Cardigan', brand: '0528creatives Inc.', category: 'women', subcategory: 'knitwear',
    description: 'Oversized wrap cardigan in brushed cashmere.',
    price: 640, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Sand','#c9b59a','1576995853123-5a10305d93c0','1525507119028-ed4c629a60a3'),
               V('Blush','#e8c9c6','1520975916090-3105956dac38','1581338834647-b0fb40704e21')],
    newIn: false, createdAt: '2026-03-05' },

  { id: 'w-007', name: 'Fine-Gauge Rollneck', brand: '0528creatives Inc. Nord', category: 'women', subcategory: 'knitwear',
    description: 'Second-skin merino rollneck.',
    price: 310, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Ivory','#faf7f2','1516826957135-700dedea698c','1539109136881-3be0616acf4b'),
               V('Plum','#2a1437','1620799140408-edc6dcb6d633','1617137968427-85924c800a22')],
    newIn: true, bestSeller: true, createdAt: '2026-04-18' },

  // ============ WOMEN — Trousers & Denim ============
  { id: 'w-008', name: 'High-Waist Wide Trouser', brand: 'Rue Sainte', category: 'women', subcategory: 'trousers',
    description: 'Fluid wide-leg trouser with side tabs and invisible zip.',
    price: 420, sizeType: 'clothing', sizes: ['XS','S','M','L','XL'],
    variants: [V('Onyx','#111111','1509631179647-0177331693ae','1495121605193-b116b5b9c5fe'),
               V('Olive','#4d5a2a','1532453288672-3a27e9be9efd','1566206091558-7f218b696731')],
    newIn: true, featured: true, createdAt: '2026-04-16' },

  { id: 'w-009', name: 'High-Rise Slim Jean', brand: 'Corso Veneto', category: 'women', subcategory: 'jeans',
    description: 'Rigid Italian denim with a cropped, clean hem.',
    price: 340, sizeType: 'clothing', sizes: ['XS','S','M','L','XL'],
    variants: [V('Navy','#1b2a4e','1541099649105-f69ad21f3246','1542272604-787c3835535d'),
               V('Ivory','#faf7f2','1475178626620-a4d074967452','1604176354204-9268737828e4')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-21' },

  { id: 'w-010', name: 'Organic Cotton Shirt', brand: '0528creatives Inc. Nord', category: 'women', subcategory: 'shirts',
    description: 'Relaxed organic cotton shirt with a concealed placket.',
    price: 290, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Ivory','#faf7f2','1598971457999-ca4ef48a9a88','1602810318383-e386cc2a3ccf')],
    newIn: false, createdAt: '2026-03-10' },

  // ============ WOMEN — Shoes ============
  { id: 'w-011', name: 'Leather Heeled Mule', brand: 'Corso Veneto', category: 'women', subcategory: 'shoes',
    description: 'Sculpted 80mm heeled mule in nappa leather.',
    price: 560, sizeType: 'shoes', sizes: SHOE_SIZES_UK,
    variants: [V('Gold','#c9a961','1543163521-1bf539c55dd2','1515347619252-60a4bf4fff4f'),
               V('Onyx','#111111','1596947395852-c5f50d45f2b2','1560769629-975ec94e6a86'),
               V('Blush','#e8c9c6','1582588678413-dbf45f4823e9','1513094735237-8f2714d57c13')],
    newIn: false, featured: true, createdAt: '2026-03-20' },

  { id: 'w-012', name: 'Platform Leather Sneaker', brand: '0528creatives Inc.', category: 'women', subcategory: 'sneakers',
    description: 'Ivory nappa platform sneaker with a tonal sole.',
    price: 510, sizeType: 'shoes', sizes: SHOE_SIZES_UK,
    variants: [V('Ivory','#faf7f2','1600185365926-3a2ce3cdb9eb','1542291026-7eec264c27ff'),
               V('Blush','#e8c9c6','1595950653106-6c9ebd614d3a','1549298916-b41d501d3772')],
    newIn: true, bestSeller: true, createdAt: '2026-04-22' },

  { id: 'w-013', name: 'Heeled Ankle Boot', brand: 'Corso Veneto', category: 'women', subcategory: 'shoes',
    description: 'Pointed-toe ankle boot with a 60mm stack heel.',
    price: 690, sizeType: 'shoes', sizes: SHOE_SIZES_UK,
    variants: [V('Onyx','#111111','1533867617858-e7b97e060509','1520639888713-7851133b1ed0'),
               V('Cognac','#8a4b2a','1614252235316-8c857d38b5f4','1449505278894-297fdb3edbc1')],
    newIn: false, featured: true, bestSeller: true, createdAt: '2026-01-28' },

  // ============ WOMEN — Bags ============
  { id: 'w-014', name: 'Monogram Leather Tote', brand: '0528creatives Inc.', category: 'women', subcategory: 'bags',
    description: 'Hand-finished calfskin tote with signature gilt hardware.',
    price: 1180, sizeType: 'clothing', sizes: ['One Size'],
    variants: [V('Cognac','#8a4b2a','1584917865442-de89df76afd3','1548036328-c9fa89d128fa'),
               V('Onyx','#111111','1566150905458-1bf1fc113f0d','1590874103328-eac38a683ce7')],
    newIn: true, featured: true, createdAt: '2026-04-20' },

  { id: 'w-015', name: 'Quilted Shoulder Bag', brand: 'Rue Sainte', category: 'women', subcategory: 'bags',
    description: 'Lambskin quilted shoulder bag with chain strap.',
    price: 890, sizeType: 'clothing', sizes: ['One Size'],
    variants: [V('Plum','#2a1437','1590874103328-eac38a683ce7','1566150905458-1bf1fc113f0d'),
               V('Gold','#c9a961','1548036328-c9fa89d128fa','1584917865442-de89df76afd3')],
    newIn: true, bestSeller: true, createdAt: '2026-04-11' },

  // ============ WOMEN — Intimates ============
  { id: 'w-016', name: 'Silk Lace Lingerie Set', brand: 'Riva Moda', category: 'women', subcategory: 'undies',
    description: 'Silk satin and hand-embroidered lace.',
    price: 320, sizeType: 'clothing', sizes: ['XS','S','M','L'],
    variants: [V('Ivory','#faf7f2','1566479179817-c8e2d3a7b0e9','1520975916090-3105956dac38'),
               V('Onyx','#111111','1573865526739-10c1d3bc8196','1581338834647-b0fb40704e21')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-17' },

  // ============ KIDS ============
  { id: 'k-001', name: 'Cotton Smocked Dress', brand: '0528 Petite', category: 'kids', subcategory: 'dresses',
    description: 'Hand-smocked cotton poplin dress with puff sleeves.',
    price: 180, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Blush','#e8c9c6','1503944583220-79d8926ad5e2','1518831959646-742c3a14ebf7'),
               V('Ivory','#faf7f2','1519689373023-dd07c7988603','1514090458221-65bb69cf1e6d')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-21' },

  { id: 'k-002', name: 'Wool Pea Coat', brand: '0528 Petite', category: 'kids', subcategory: 'outerwear',
    description: 'Miniature double-breasted pea coat in brushed wool.',
    price: 280, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Navy','#1b2a4e','1519238263530-99bdd11df2ea','1503454537195-1dcabb73ffb9'),
               V('Plum','#2a1437','1553395572-0ef353a212bc','1519689680058-324335c77eba')],
    newIn: true, featured: true, createdAt: '2026-04-22' },

  { id: 'k-003', name: 'Quilted Padded Jacket', brand: '0528creatives Inc. Nord Kids', category: 'kids', subcategory: 'outerwear',
    description: 'Feather-light quilted jacket with a detachable hood.',
    price: 240, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Forest','#2f4a3a','1519689680058-324335c77eba','1503454537195-1dcabb73ffb9'),
               V('Blush','#e8c9c6','1503944583220-79d8926ad5e2','1514090458221-65bb69cf1e6d')],
    newIn: true, bestSeller: true, createdAt: '2026-04-14' },

  { id: 'k-004', name: 'Leather Mary Jane', brand: 'Corso Piccolo', category: 'kids', subcategory: 'shoes',
    description: 'Classic Mary Jane in soft nappa with buckle strap.',
    price: 210, sizeType: 'kids', sizes: SHOE_SIZES_UK,
    variants: [V('Onyx','#111111','1528701800489-20be9c1ed83a','1528701800489-20be9c1ed83a'),
               V('Blush','#e8c9c6','1543854589-fdd815f176e0','1603487742131-4160ec999306')],
    newIn: false, bestSeller: true, createdAt: '2026-03-18' },

  { id: 'k-005', name: 'Mini Leather Sneaker', brand: 'Corso Piccolo', category: 'kids', subcategory: 'sneakers',
    description: 'Scaled-down court sneaker with velcro closure.',
    price: 190, sizeType: 'kids', sizes: SHOE_SIZES_UK,
    variants: [V('Ivory','#faf7f2','1542291026-7eec264c27ff','1600185365926-3a2ce3cdb9eb'),
               V('Blush','#e8c9c6','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-22' },

  { id: 'k-006', name: 'Knit Cashmere Jumper', brand: '0528 Petite', category: 'kids', subcategory: 'knitwear',
    description: 'Featherweight cashmere jumper with ribbed trims.',
    price: 160, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Sand','#c9b59a','1514090458221-65bb69cf1e6d','1503454537195-1dcabb73ffb9'),
               V('Forest','#2f4a3a','1519689680058-324335c77eba','1503944583220-79d8926ad5e2')],
    newIn: true, featured: true, createdAt: '2026-04-22' },

  { id: 'k-007', name: 'Cotton Polo Shirt', brand: '0528creatives Inc. Nord Kids', category: 'kids', subcategory: 'shirts',
    description: 'Piqué cotton polo with mother-of-pearl buttons.',
    price: 95, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Ivory','#faf7f2','1519689373023-dd07c7988603','1518831959646-742c3a14ebf7'),
               V('Navy','#1b2a4e','1519238263530-99bdd11df2ea','1553395572-0ef353a212bc')],
    newIn: false, bestSeller: true, createdAt: '2026-02-15' },

  { id: 'k-008', name: 'Stone Washed Kids Jean', brand: 'Corso Piccolo', category: 'kids', subcategory: 'jeans',
    description: 'Soft stretch denim with elasticated back waistband.',
    price: 110, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Navy','#1b2a4e','1541099649105-f69ad21f3246','1542272604-787c3835535d'),
               V('Slate','#6b7280','1475178626620-a4d074967452','1604176354204-9268737828e4')],
    newIn: true, bestSeller: true, createdAt: '2026-04-10' },

  { id: 'k-009', name: 'Corduroy Trouser', brand: '0528 Petite', category: 'kids', subcategory: 'trousers',
    description: 'Fine-wale corduroy with an adjustable waist.',
    price: 120, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Camel','#b58a58','1503944583220-79d8926ad5e2','1514090458221-65bb69cf1e6d'),
               V('Forest','#2f4a3a','1503454537195-1dcabb73ffb9','1519689680058-324335c77eba')],
    newIn: false, createdAt: '2026-01-22' },

  { id: 'k-010', name: 'Striped Breton Tee', brand: 'Riva Piccola', category: 'kids', subcategory: 'tops',
    description: 'Heavyweight cotton Breton stripe tee.',
    price: 75, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Ivory','#faf7f2','1519689373023-dd07c7988603','1514090458221-65bb69cf1e6d'),
               V('Navy','#1b2a4e','1553395572-0ef353a212bc','1519238263530-99bdd11df2ea')],
    newIn: true, bestSeller: true, createdAt: '2026-04-19' },

  { id: 'k-011', name: 'Mini Leather Tote', brand: '0528 Petite', category: 'kids', subcategory: 'bags',
    description: 'Miniature calfskin tote — a first accessory.',
    price: 140, sizeType: 'clothing', sizes: ['One Size'],
    variants: [V('Cognac','#8a4b2a','1584917865442-de89df76afd3','1548036328-c9fa89d128fa'),
               V('Blush','#e8c9c6','1566150905458-1bf1fc113f0d','1590874103328-eac38a683ce7')],
    newIn: true, createdAt: '2026-04-18' },

  { id: 'k-012', name: 'Hooded Cotton Sweatshirt', brand: '0528creatives Inc. Nord Kids', category: 'kids', subcategory: 'knitwear',
    description: 'Heavyweight cotton hoodie with tonal drawstrings.',
    price: 130, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Plum','#2a1437','1519689680058-324335c77eba','1553395572-0ef353a212bc'),
               V('Dove','#d7d3cd','1503454537195-1dcabb73ffb9','1519238263530-99bdd11df2ea')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-16' },

  { id: 'k-013', name: 'Leather Sandal', brand: 'Corso Piccolo', category: 'kids', subcategory: 'shoes',
    description: 'Hand-stitched leather sandal with cushioned footbed.',
    price: 130, sizeType: 'kids', sizes: SHOE_SIZES_UK,
    variants: [V('Cognac','#8a4b2a','1614252235316-8c857d38b5f4','1449505278894-297fdb3edbc1')],
    newIn: false, createdAt: '2026-02-22' },

  { id: 'k-014', name: 'Linen Party Shirt', brand: '0528 Petite', category: 'kids', subcategory: 'shirts',
    description: 'Washed linen shirt for special occasions.',
    price: 110, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Ivory','#faf7f2','1519689373023-dd07c7988603','1518831959646-742c3a14ebf7')],
    newIn: true, featured: true, bestSeller: true, createdAt: '2026-04-12' },

  { id: 'k-015', name: 'Cotton Underwear Set', brand: 'Riva Piccola', category: 'kids', subcategory: 'undies',
    description: 'Pima cotton underwear set of five, assorted.',
    price: 60, sizeType: 'kids', sizes: KID_SIZES,
    variants: [V('Dove','#d7d3cd','1514090458221-65bb69cf1e6d','1518831959646-742c3a14ebf7')],
    newIn: false, createdAt: '2026-01-08' }
]
