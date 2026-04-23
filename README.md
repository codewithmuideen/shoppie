# Maison Lumière

A premium, editorial-styled fashion storefront inspired by Farfetch — built with **React + Vite + Tailwind CSS**. No TypeScript, no Next.js.

## Features

- **Editorial storefront** — Home, Men, Women, Kids, New In, and product detail pages
- **Global search** with live suggestions (opens from any page, keyboard-friendly)
- **Filters** — price range slider, size grid, colour swatches, sort by featured / new / price
- **Colour & size variants** for apparel, shoes, and kids
- **WhatsApp-only ordering** — every product deep-links to WhatsApp with the item pre-filled (no cart, no checkout)
  - Number: **+44 7555 757615**
- **Admin GUI** — login at `/admin/login`, add/edit/delete products, upload images, pick colours with a colour picker, no code required
  - Products persist to `localStorage`
- **Premium hover interactions** — dual-image cross-fade, slide-up quick actions, animated underlines, marquee bar, parallax-style category cards

## Brand palette

Curated for luxury fashion — deep aubergine plum with champagne-gold accents on warm ivory.

- Plum `#2A1437` (primary)
- Gold `#C9A961` (accent)
- Ivory `#FAF7F2` (background)

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to `http://localhost:5173`).

## Admin

Navigate to `/admin/login` or click the **Admin** link in the navbar.

- **Demo passphrase**: `maison2026`
- Change it in `src/context/AdminContext.jsx` → `ADMIN_PASSWORD`
- Admin session is stored in `localStorage`

### What you can do as admin

- Add a new piece (name, brand, category, subcategory, description, price, sizes)
- Upload any number of images per colour — images are automatically resized to 1200px for localStorage safety
- Paste an image URL as an alternative to uploading
- Add/remove colour variants with a visual colour picker
- Toggle “New In” badge
- Edit or remove existing pieces
- Reset catalogue to the factory seed any time

## Tech stack

- React 18
- React Router v6
- Tailwind CSS 3
- Vite 5

## File tree

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── SearchOverlay.jsx
│   ├── FilterSidebar.jsx
│   ├── WhatsAppFAB.jsx
│   ├── Icons.jsx
│   └── admin/
│       ├── ProductForm.jsx
│       └── ProtectedRoute.jsx
├── context/
│   ├── ProductContext.jsx
│   ├── AdminContext.jsx
│   └── UIContext.jsx
├── data/
│   └── seedProducts.js
├── hooks/
│   └── useFilters.js
├── pages/
│   ├── Home.jsx
│   ├── Listing.jsx
│   ├── Product.jsx
│   ├── AdminLogin.jsx
│   └── AdminDashboard.jsx
└── utils/
    └── format.js
```
