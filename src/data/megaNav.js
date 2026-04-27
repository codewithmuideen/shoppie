// Mega-menu structure. Each top-level item shows a panel with up to 4 columns.
// All links route to /shop/:slug — the Listing page resolves the slug.
export const MEGA_NAV = [
  {
    label: 'New In',
    href: '/shop/new-in',
    columns: [
      { title: "What's New", links: [
        { label: 'New in today',     to: '/shop/new-in' },
        { label: 'New clothing',     to: '/shop/clothing?new=1' },
        { label: 'New shoes',        to: '/shop/shoes?new=1' },
        { label: 'New bags',         to: '/shop/bags?new=1' },
        { label: 'New accessories',  to: '/shop/accessories?new=1' }
      ]},
      { title: 'Trending Now', links: [
        { label: 'Utility details',     to: '/shop/clothing' },
        { label: 'The getaway wardrobe',to: '/shop/clothing' },
        { label: 'Relaxed tailoring',   to: '/shop/outerwear' },
        { label: 'New-season shoes',    to: '/shop/shoes' },
        { label: 'Emerging brands',     to: '/shop/brands' },
        { label: 'The pastel palette',  to: '/shop/clothing' },
        { label: 'Trending prints',     to: '/shop/clothing' },
        { label: 'How to style denim',  to: '/shop/jeans' },
        { label: 'New-season leather',  to: '/shop/bags' }
      ]},
      { title: 'Discover', links: [
        { label: 'The vacation edit',     to: '/shop/clothing' },
        { label: 'Most-wanted pieces',    to: '/shop/best-sellers' },
        { label: 'Wardrobe staples',     to: '/shop/clothing' },
        { label: 'Partywear',            to: '/shop/dresses' },
        { label: 'Iconic bags',          to: '/shop/bags' },
        { label: 'The wedding guest',    to: '/shop/dresses' },
        { label: 'Bridal',               to: '/shop/dresses' },
        { label: 'Gifts',                to: '/shop/accessories' }
      ]}
    ]
  },
  {
    label: 'Brands',
    href: '/shop/brands',
    columns: [
      { title: 'Iconic Brands', links: [
        { label: '0528creatives Inc.',     to: '/shop/brand/0528creatives-inc'   },
        { label: '0528 Petite',      to: '/shop/brand/0528-petite'    },
        { label: '0528creatives Inc. Nord',     to: '/shop/brand/0528creatives-inc-nord'   },
        { label: 'Corso Veneto',     to: '/shop/brand/corso-veneto'   },
        { label: 'Rue Sainte',       to: '/shop/brand/rue-sainte'     },
        { label: 'Riva Moda',        to: '/shop/brand/riva-moda'      }
      ]},
      { title: 'Contemporary Brands', links: [
        { label: '0528creatives Inc. Nord Kids',to: '/shop/brand/0528creatives-inc-nord-kids' },
        { label: 'Corso Piccolo',    to: '/shop/brand/corso-piccolo'  },
        { label: 'Riva Piccola',     to: '/shop/brand/riva-piccola'   }
      ]}
    ]
  },
  {
    label: 'Clothing',
    href: '/shop/clothing',
    columns: [
      { title: 'Clothing', links: [
        { label: 'All clothing',     to: '/shop/clothing'  },
        { label: 'Dresses',          to: '/shop/dresses'   },
        { label: 'Tops',             to: '/shop/tops'      },
        { label: 'Outerwear',        to: '/shop/outerwear' },
        { label: 'Skirts',           to: '/shop/skirts'    },
        { label: 'Trousers',         to: '/shop/trousers'  },
        { label: 'Denim',            to: '/shop/jeans'     },
        { label: 'Shorts',           to: '/shop/shorts'    },
        { label: 'Knitwear',         to: '/shop/knitwear'  }
      ]},
      { title: 'Discover', links: [
        { label: 'Just landed',         to: '/shop/new-in'    },
        { label: 'Wardrobe staples',    to: '/shop/clothing'  },
        { label: 'The vacation edit',   to: '/shop/clothing'  },
        { label: 'Matching sets',       to: '/shop/clothing'  },
        { label: 'Bridal',              to: '/shop/dresses'   },
        { label: 'Wedding guest',       to: '/shop/dresses'   },
        { label: 'Partywear',           to: '/shop/dresses'   }
      ]}
    ]
  },
  {
    label: 'Shoes',
    href: '/shop/shoes',
    columns: [
      { title: 'Shoes', links: [
        { label: 'All shoes',          to: '/shop/shoes'    },
        { label: 'Sneakers',           to: '/shop/sneakers' },
        { label: 'Boots',              to: '/shop/shoes'    },
        { label: 'Pumps',              to: '/shop/shoes'    },
        { label: 'Loafers',            to: '/shop/shoes'    },
        { label: 'Ballet flats',       to: '/shop/shoes'    },
        { label: 'Mules',              to: '/shop/shoes'    },
        { label: 'Derby & Oxford shoes',to: '/shop/shoes'   }
      ]},
      { title: 'Discover', links: [
        { label: 'Just landed',     to: '/shop/new-in'    },
        { label: 'New-season shoes',to: '/shop/shoes'     }
      ]}
    ]
  },
  {
    label: 'Bags',
    href: '/shop/bags',
    columns: [
      { title: 'Bags', links: [
        { label: 'All bags',         to: '/shop/bags' },
        { label: 'Tote bags',        to: '/shop/bags' },
        { label: 'Shoulder bags',    to: '/shop/bags' },
        { label: 'Cross-body bags',  to: '/shop/bags' },
        { label: 'Mini bags',        to: '/shop/bags' },
        { label: 'Clutches',         to: '/shop/bags' },
        { label: 'Bucket bags',      to: '/shop/bags' },
        { label: 'Backpacks',        to: '/shop/bags' }
      ]},
      { title: 'Discover', links: [
        { label: 'Just landed',         to: '/shop/new-in' },
        { label: 'Bags with personality',to: '/shop/bags'  },
        { label: 'Iconic bags',         to: '/shop/bags'  }
      ]}
    ]
  },
  {
    label: 'Accessories',
    href: '/shop/accessories',
    columns: [
      { title: 'Accessories', links: [
        { label: 'All accessories', to: '/shop/accessories' },
        { label: 'Sunglasses',      to: '/shop/accessories' },
        { label: 'Belts',           to: '/shop/accessories' },
        { label: 'Hats & caps',     to: '/shop/accessories' },
        { label: 'Wallets',         to: '/shop/accessories' },
        { label: 'Scarves',         to: '/shop/accessories' },
        { label: 'Hair accessories',to: '/shop/accessories' }
      ]},
      { title: 'Discover', links: [
        { label: 'Just landed',           to: '/shop/new-in'      },
        { label: 'Gifts',                 to: '/shop/accessories' },
        { label: 'Most-wanted accessories',to: '/shop/accessories' }
      ]}
    ]
  },
  {
    label: 'Jewelry',
    href: '/shop/jewelry',
    columns: [
      { title: 'Fashion Jewelry', links: [
        { label: 'All fashion jewelry', to: '/shop/jewelry' },
        { label: 'Bracelets',           to: '/shop/jewelry' },
        { label: 'Earrings',            to: '/shop/jewelry' },
        { label: 'Necklaces',           to: '/shop/jewelry' },
        { label: 'Rings',               to: '/shop/jewelry' },
        { label: 'Watches',             to: '/shop/jewelry' }
      ]},
      { title: 'Fine Jewelry', links: [
        { label: 'All fine jewelry',    to: '/shop/jewelry' },
        { label: 'Fine bracelets',      to: '/shop/jewelry' },
        { label: 'Fine earrings',       to: '/shop/jewelry' },
        { label: 'Fine necklaces',      to: '/shop/jewelry' },
        { label: 'Fine rings',          to: '/shop/jewelry' },
        { label: 'Fine watches',        to: '/shop/jewelry' }
      ]}
    ]
  },
  {
    label: 'Lifestyle',
    href: '/shop/lifestyle',
    columns: [
      { title: 'Homeware', links: [
        { label: 'All homeware',     to: '/shop/lifestyle' },
        { label: 'Dining & kitchen', to: '/shop/lifestyle' },
        { label: 'Home decor',       to: '/shop/lifestyle' },
        { label: 'Furniture',        to: '/shop/lifestyle' },
        { label: 'Candles',          to: '/shop/lifestyle' }
      ]},
      { title: 'Sports', links: [
        { label: 'All activewear',   to: '/shop/lifestyle' },
        { label: 'Skiwear',          to: '/shop/lifestyle' },
        { label: 'Tops',             to: '/shop/tops' },
        { label: 'Trousers',         to: '/shop/trousers' },
        { label: 'Surf & Swimwear',  to: '/shop/lifestyle' }
      ]},
      { title: 'Travel', links: [
        { label: 'Luggage & holdalls', to: '/shop/bags' },
        { label: 'Travel accessories', to: '/shop/accessories' },
        { label: 'The vacation edit',  to: '/shop/clothing' }
      ]}
    ]
  },
  {
    label: 'Pre-owned',
    href: '/shop/pre-owned',
    columns: [
      { title: 'Pre-owned', links: [
        { label: 'All pre-owned',    to: '/shop/pre-owned' },
        { label: 'Bags',             to: '/shop/bags'      },
        { label: 'Coats',            to: '/shop/outerwear' },
        { label: 'Dresses',          to: '/shop/dresses'   },
        { label: 'Fine watches',     to: '/shop/jewelry'   },
        { label: 'Jewelry',          to: '/shop/jewelry'   }
      ]}
    ]
  },
  {
    label: 'Sale',
    href: '/shop/sale',
    accent: true,
    columns: [
      { title: 'SALE', links: [
        { label: 'All sale',         to: '/shop/sale' },
        { label: 'Clothing',         to: '/shop/clothing' },
        { label: 'Jackets',          to: '/shop/outerwear' },
        { label: 'Dresses',          to: '/shop/dresses' },
        { label: 'Tops',             to: '/shop/tops' },
        { label: 'Shoes',            to: '/shop/shoes' },
        { label: 'Trainers',         to: '/shop/sneakers' },
        { label: 'Bags',             to: '/shop/bags' },
        { label: 'Accessories',      to: '/shop/accessories' }
      ]}
    ]
  }
]
