import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase, type ProductRow } from '../../lib/supabase'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    setLoading(true)
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    await supabase.from('products').delete().eq('id', id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-[20px] sm:text-[24px] font-bold text-white font-primary">Products</h1>
          <p className="text-[13px] text-[#6B7785] font-primary mt-0.5">{products.length} products</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[13px] sm:text-[14px] hover:bg-[#1291b3] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {/* ─── Mobile cards ─── */}
          <div className="flex flex-col gap-3 md:hidden">
            {products.map((p) => (
              <div key={p.id} className="rounded-xl border border-[#2a2d37] bg-[#1a1d27] p-4 flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover bg-[#0f1117] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-[14px] font-primary truncate">{p.name}</div>
                  <div className="text-[#9ca3af] text-[12px] font-primary mt-0.5">
                    ${p.price} · <span className="text-[#6B7785]">{p.category}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mt-1.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold font-primary ${
                      p.in_stock ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                    }`}>
                      {p.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {p.featured && <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/15 text-purple-400 font-primary">Featured</span>}
                    {p.is_new && <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-400 font-primary">New</span>}
                    {p.is_bestseller && <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 font-primary">Best</span>}
                    {p.tested && <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/15 text-cyan-400 font-primary">Tested</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="p-2 rounded-lg text-[#6B7785] hover:text-[#16A1C5] hover:bg-[#16A1C5]/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-2 rounded-lg text-[#6B7785] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Desktop table ─── */}
          <div className="hidden md:block rounded-xl border border-[#2a2d37] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1d27] border-b border-[#2a2d37]">
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Image</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Slug</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Price</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Stock</th>
                  <th className="text-left px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Flags</th>
                  <th className="text-right px-5 py-3 font-semibold text-[12px] text-[#6B7785] uppercase tracking-wider font-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-[#2a2d37] hover:bg-[#1a1d27] transition-colors">
                    <td className="px-5 py-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-[#1a1d27]" />
                    </td>
                    <td className="px-5 py-3 text-[14px] text-white font-primary font-medium">{p.name}</td>
                    <td className="px-5 py-3 text-[13px] text-[#6B7785] font-primary font-mono">{p.slug}</td>
                    <td className="px-5 py-3 text-[14px] text-white font-primary">${p.price}</td>
                    <td className="px-5 py-3 text-[13px] text-[#9ca3af] font-primary">{p.category}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold font-primary ${
                        p.in_stock ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {p.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.featured && <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/15 text-purple-400 font-primary">Featured</span>}
                        {p.is_new && <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-400 font-primary">New</span>}
                        {p.is_bestseller && <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 font-primary">Best</span>}
                        {p.tested && <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/15 text-cyan-400 font-primary">Tested</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          to={`/admin/products/${p.id}`}
                          className="p-2 rounded-lg text-[#6B7785] hover:text-[#16A1C5] hover:bg-[#16A1C5]/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 rounded-lg text-[#6B7785] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
