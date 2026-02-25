import { Navigate, Outlet, NavLink } from 'react-router-dom'
import { Package, ShoppingCart, LogOut } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLayout() {
  const { user, loading, signOut } = useAdmin()

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

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 border-r border-[#2a2d37] flex flex-col">
        <div className="p-6 border-b border-[#2a2d37]">
          <h1 className="text-[16px] font-bold text-white font-primary">Beyond Peptides</h1>
          <p className="text-[12px] text-[#6B7785] font-primary mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin" end className={linkClass}>
            <Package className="w-4 h-4" />
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            <ShoppingCart className="w-4 h-4" />
            Orders
          </NavLink>
        </nav>

        <div className="p-4 border-t border-[#2a2d37]">
          <div className="text-[12px] text-[#6B7785] font-primary mb-3 truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-[13px] text-[#9ca3af] hover:text-red-400 transition-colors font-primary"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
