import { useState } from 'react'
import { Navigate, Outlet, NavLink, Link } from 'react-router-dom'
import { Package, ShoppingCart, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLayout() {
  const { user, loading, signOut } = useAdmin()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
        <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-primary transition-colors ${
      isActive
        ? 'bg-[#16A1C5]/15 text-[#16A1C5] font-semibold'
        : 'text-[#9ca3af] hover:text-white hover:bg-[#1a1d27]'
    }`

  const NavContent = () => (
    <>
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/admin" end className={linkClass} onClick={() => setDrawerOpen(false)}>
          <Package className="w-4 h-4 shrink-0" />
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass} onClick={() => setDrawerOpen(false)}>
          <ShoppingCart className="w-4 h-4 shrink-0" />
          Orders
        </NavLink>
      </nav>
      <div className="p-4 border-t border-[#2a2d37] space-y-2">
        <div className="text-[12px] text-[#6B7785] font-primary mb-1 truncate">{user.email}</div>
        <Link
          to="/"
          onClick={() => setDrawerOpen(false)}
          className="flex items-center gap-2 text-[13px] text-[#9ca3af] hover:text-[#16A1C5] transition-colors font-primary"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-[13px] text-[#9ca3af] hover:text-red-400 transition-colors font-primary"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#0f1117]">

      {/* ─── Mobile top bar ─── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[200] h-14 bg-[#0f1117] border-b border-[#2a2d37] flex items-center justify-between px-4">
        <div>
          <span className="text-[15px] font-bold text-white font-primary">Beyond Peptides</span>
          <span className="text-[11px] text-[#6B7785] font-primary ml-2">Admin</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#1a1d27] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* ─── Mobile drawer overlay ─── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ─── Mobile drawer ─── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[400] w-[240px] bg-[#0f1117] border-r border-[#2a2d37] flex flex-col transition-transform duration-300 md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-[#2a2d37] flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-bold text-white font-primary">Beyond Peptides</h1>
            <p className="text-[11px] text-[#6B7785] font-primary mt-0.5">Admin Panel</p>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#6B7785] hover:text-white hover:bg-[#1a1d27] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <NavContent />
      </aside>

      {/* ─── Desktop layout ─── */}
      <div className="hidden md:flex min-h-screen">
        <aside className="w-[240px] shrink-0 border-r border-[#2a2d37] flex flex-col">
          <div className="p-6 border-b border-[#2a2d37]">
            <h1 className="text-[16px] font-bold text-white font-primary">Beyond Peptides</h1>
            <p className="text-[12px] text-[#6B7785] font-primary mt-0.5">Admin Panel</p>
          </div>
          <NavContent />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ─── Mobile main content ─── */}
      <div className="md:hidden pt-14 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
