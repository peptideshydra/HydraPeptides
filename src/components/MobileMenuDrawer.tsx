import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useMobileMenu } from '../context/MobileMenuContext'
import { useProducts } from '../hooks/useProducts'

type MenuPanel = 'main' | 'products' | 'peptides'
const PANEL_IDX: Record<MenuPanel, number> = { main: 0, products: 1, peptides: 2 }

const DRAWER_BG = 'linear-gradient(160deg, #0a9edd 0%, #006ea8 30%, #004f82 60%, #004974 100%)'
const PANEL_HEADER_BG = 'rgba(0,45,75,0.98)'

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 13.5L13.5 4.5M4.5 4.5L13.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MobileMenuDrawer() {
  const { isOpen, closeMenu } = useMobileMenu()
  const { products } = useProducts()
  const location = useLocation()

  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [panel, setPanel] = useState<MenuPanel>('main')

  // Animate in/out (same pattern as CartDrawer)
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)))
    } else {
      setAnimating(false)
      const t = setTimeout(() => { setVisible(false); setPanel('main') }, 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Auto-close on route change
  useEffect(() => {
    closeMenu()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null

  const panelIdx = PANEL_IDX[panel]
  const itemClass = 'flex items-center justify-between font-primary text-[15px] font-medium text-white px-5 py-4 border-b border-white/[0.08] hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer w-full text-left bg-transparent border-x-0 border-t-0'
  const backBtnClass = 'flex items-center justify-center w-8 h-8 rounded-full border border-white/25 hover:bg-white/10 transition-colors cursor-pointer bg-transparent shrink-0'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-400 md:hidden"
        style={{ background: 'rgba(0,0,0,0.55)', opacity: animating ? 1 : 0 }}
        onClick={closeMenu}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 z-[9999] flex flex-col md:hidden transition-transform duration-400"
        style={{
          width: 'min(340px, 100vw)',
          background: DRAWER_BG,
          transform: animating ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: '4px 0 32px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[62px] shrink-0 border-b border-white/10">
          <Link to="/" onClick={closeMenu}>
            <img src="/beli-logo.png" alt="Hydra Peptides" className="h-[70px]" />
          </Link>
          <button
            onClick={closeMenu}
            className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors cursor-pointer bg-transparent"
            aria-label="Close menu"
          >
            <XIcon />
          </button>
        </div>

        {/* Sliding panels */}
        <div className="flex-1 overflow-hidden relative">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ width: '300%', transform: `translateX(calc(-100% / 3 * ${panelIdx}))` }}
          >
            {/* Panel 1: Main */}
            <div className="overflow-y-auto" style={{ width: 'calc(100% / 3)' }}>
              <Link to="/" onClick={closeMenu} className={itemClass}><span>Home</span></Link>
              <Link to="/shop/" onClick={closeMenu} className={itemClass}>
                <span>Our Products</span>
              </Link>
              <Link to="/calculator/" onClick={closeMenu} className={itemClass}><span>Calculator</span></Link>
              <Link to="/about-us/" onClick={closeMenu} className={itemClass}><span>About</span></Link>
              <Link to="/faq/" onClick={closeMenu} className={itemClass}><span>FAQ</span></Link>
            </div>

            {/* Panel 2: Products */}
            <div className="overflow-y-auto" style={{ width: 'calc(100% / 3)' }}>
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 sticky top-0 z-10" style={{ background: PANEL_HEADER_BG }}>
                <button onClick={() => setPanel('main')} className={backBtnClass} aria-label="Back">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="font-primary font-semibold text-[15px] text-white">Our Products</span>
              </div>
              <button className={`${itemClass} gap-4`} onClick={() => setPanel('peptides')}>
                <img src="https://beyond-peptides.com/wp-content/uploads/2024/10/product1-1.png" alt="All Peptides" className="w-11 h-11 object-contain rounded-lg shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-primary font-semibold text-[15px] text-white leading-tight">All Peptides</p>
                  <p className="font-primary text-[12px] text-white/45 mt-0.5">Browse our complete catalog</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
              </button>
            </div>

            {/* Panel 3: All Peptides */}
            <div className="overflow-y-auto" style={{ width: 'calc(100% / 3)' }}>
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 sticky top-0 z-10" style={{ background: PANEL_HEADER_BG }}>
                <button onClick={() => setPanel('products')} className={backBtnClass} aria-label="Back">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="font-primary font-semibold text-[15px] text-white">All Peptides</span>
              </div>
              {products.map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}/`}
                  onClick={closeMenu}
                  className="block font-primary text-[14px] text-white/80 px-5 py-3.5 border-b border-white/[0.07] hover:bg-white/10 hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ))}
              <Link to="/shop/" onClick={closeMenu} className="flex items-center gap-1.5 font-primary font-semibold text-[13px] px-5 py-4 text-[#46D9FF] hover:bg-white/10 transition-colors">
                View All Peptides <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
