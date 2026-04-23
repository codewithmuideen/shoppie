import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'
import WhatsAppFAB from './components/WhatsAppFAB.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import InstallPrompt from './components/InstallPrompt.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import Product from './pages/Product.jsx'
import Info from './pages/Info.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const ScrollRestore = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const App = () => {
  const { pathname } = useLocation()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      <ScrollRestore />
      <Navbar />
      <SearchOverlay />

      <main className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women"  element={<Listing kind="women" />} />
          <Route path="/men"    element={<Listing kind="men" />} />
          <Route path="/kids"   element={<Listing kind="kids" />} />
          <Route path="/new-in" element={<Listing kind="new-in" />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/info/:slug" element={<Info />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="*" element={
            <div className="container-luxe py-32 text-center">
              <p className="eyebrow">404</p>
              <h1 className="mt-2 font-display text-5xl">Not found</h1>
            </div>
          } />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFAB />}
      <CookieBanner />
      <InstallPrompt />
    </>
  )
}

export default App
