import { Link } from 'react-router-dom'
import { User, Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useMobileMenu } from '../context/MobileMenuContext'

type NavLabel = 'Home' | 'Our Products' | 'About' | 'FAQ'

const navItems: { label: NavLabel; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Our Products', to: '/shop/' },
  { label: 'About', to: '/about-us/' },
  { label: 'FAQ', to: '/faq/' },
]

function BurgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect y="0.272461" width="18" height="1.63636" fill="white" />
      <rect y="5.18164" width="18" height="1.63636" fill="white" />
      <rect y="10.0908" width="18" height="1.63636" fill="white" />
    </svg>
  )
}

interface HeroHeaderProps {
  activeNav?: NavLabel
}

export default function HeroHeader({ activeNav }: HeroHeaderProps) {
  const { openCart, totalItems } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const { openMenu } = useMobileMenu()

  return (
    <header className="relative flex items-center justify-between px-5 lg:px-[60px] h-[62px] shrink-0 border-b border-white/10">

      {/* MOBILE: burger */}
      <button
        onClick={openMenu}
        className="md:hidden w-[38px] h-[38px] flex items-center justify-center shrink-0 cursor-pointer bg-transparent border-none"
        aria-label="Open menu"
      >
        <BurgerIcon />
      </button>

      {/* MOBILE: logo centered */}
      <Link to="/" className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center">
        <img src="https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg" alt="Beyond Peptides" className="h-[26px]" />
      </Link>

      {/* DESKTOP: logo */}
      <Link to="/" className="hidden md:flex items-center shrink-0">
        <img src="https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg" alt="Beyond Peptides" className="h-[30px]" />
      </Link>

      {/* DESKTOP: nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`font-primary font-medium text-[14px] relative text-white transition-colors duration-300 hover:text-white/70
              after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-white
              after:transition-[width] after:duration-300 ${item.label === activeNav ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* DESKTOP: icons */}
      <div className="hidden md:flex items-center gap-2.5">
        <Link to="/my-account/" className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10">
          <User className="w-[18px] h-[18px] text-white" />
        </Link>
        <Link to="/wishlist/" className="relative w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10">
          <Heart className="w-[18px] h-[18px] text-white" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-[16px] h-[16px] rounded-full text-[10px] font-semibold flex items-center justify-center font-primary">{wishlistCount}</span>
          )}
        </Link>
        <button onClick={openCart} className="relative w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10">
          <ShoppingCart className="w-[18px] h-[18px] text-white" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-[16px] h-[16px] rounded-full text-[10px] font-semibold flex items-center justify-center font-primary">{totalItems}</span>
        </button>
      </div>

      {/* MOBILE: account + cart */}
      <div className="md:hidden flex items-center gap-2 shrink-0">
        <Link to="/my-account/" className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10">
          <User className="w-[18px] h-[18px] text-white" />
        </Link>
        <button onClick={openCart} className="relative w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10">
          <ShoppingCart className="w-[18px] h-[18px] text-white" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-[16px] h-[16px] rounded-full text-[10px] font-semibold flex items-center justify-center font-primary">{totalItems}</span>
        </button>
      </div>
    </header>
  )
}
