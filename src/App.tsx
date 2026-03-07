import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import MobileMenuDrawer from './components/MobileMenuDrawer'
import CookieConsent from './components/CookieConsent'
import ChatWidget from './components/ChatWidget'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import ProductPage from './pages/ProductPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderReceivedPage from './pages/OrderReceivedPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminProductEditPage from './pages/admin/AdminProductEditPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { MobileMenuProvider } from './context/MobileMenuContext'
import { CurrencyProvider } from './context/CurrencyContext'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Wraps all public pages with TopBar + Footer + Header + CartDrawer
function PublicLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
      <Header />
      <CartDrawer />
    </>
  )
}

function GlobalWidgets() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/my-account')
  if (isAdmin) return null
  return (
    <>
      <CookieConsent />
      <ChatWidget />
    </>
  )
}

function App() {
  return (
    <CurrencyProvider>
    <CartProvider>
      <WishlistProvider>
        <MobileMenuProvider>
        <ScrollToTop />
        <MobileMenuDrawer />
        <GlobalWidgets />
        <Routes>
          {/* ── Admin ── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/my-account" element={<AdminLoginPage />} />
          <Route path="/my-account/" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProductsPage />} />
            <Route path="products/:id" element={<AdminProductEditPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
          </Route>

          {/* ── Public (TopBar + Footer) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/" element={<ShopPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/faq/" element={<FaqPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product/:id/" element={<ProductPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/wishlist/" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/" element={<CheckoutPage />} />
            <Route path="/checkout/order-received" element={<OrderReceivedPage />} />
            <Route path="/checkout/order-received/" element={<OrderReceivedPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </MobileMenuProvider>
      </WishlistProvider>
    </CartProvider>
    </CurrencyProvider>
  )
}

export default App
