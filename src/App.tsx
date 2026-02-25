import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import ProductPage from './pages/ProductPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/" element={<ShopPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about-us/" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/faq/" element={<FaqPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/:id/" element={<ProductPage />} />
      </Routes>
      <Footer />
      <Header />
    </>
  )
}

export default App
