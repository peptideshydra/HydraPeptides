import { useEffect, useState } from 'react'
import { Eye, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase, type OrderWithItems } from '../../lib/supabase'
import { getCountryName } from '../../data/countries'

const STATUSES = ['pending', 'processing', 'shipped', 'completed', 'cancelled']

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-amber-500/15 text-amber-400',
    processing: 'bg-blue-500/15 text-blue-400',
    shipped: 'bg-purple-500/15 text-purple-400',
    completed: 'bg-green-500/15 text-green-400',
    cancelled: 'bg-red-500/15 text-red-400',
  }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold font-primary capitalize ${colors[status] ?? 'bg-gray-500/15 text-gray-400'}`}>
      {status}
    </span>
  )
}

function OrderDetails({ order }: { order: OrderWithItems }) {
  const name = `${order.billing_first_name ?? ''} ${order.billing_last_name ?? ''}`.trim()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Items */}
      <div>
        <h4 className="text-[12px] text-[#6B7785] uppercase tracking-wider mb-3 font-primary font-semibold">Items</h4>
        {order.order_items.map((item) => (
          <div key={item.id} className="mb-2 text-[13px] font-primary">
            <span className="text-white">{item.product_name}</span>
            {item.dosage && <span className="text-[#6B7785]"> - {item.dosage}</span>}
            {item.vial && <span className="text-[#6B7785]">, {item.vial}</span>}
            <span className="text-[#9ca3af]"> × {item.quantity}</span>
            <span className="text-white ml-2 font-semibold">${Number(item.total).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-[#2a2d37] space-y-1 text-[13px] font-primary">
          <div className="flex justify-between"><span className="text-[#6B7785]">Subtotal</span><span className="text-white">${Number(order.subtotal).toFixed(2)}</span></div>
          {order.coupon_code && <div className="flex justify-between"><span className="text-[#6B7785]">Coupon ({order.coupon_code})</span><span className="text-[#16A1C5]">-${Number(order.coupon_discount).toFixed(2)}</span></div>}
          <div className="flex justify-between"><span className="text-[#6B7785]">Shipping</span><span className="text-white">${Number(order.shipping_cost).toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold"><span className="text-white">Total</span><span className="text-[#16A1C5]">${Number(order.total).toFixed(2)}</span></div>
        </div>
      </div>

      {/* Billing */}
      <div>
        <h4 className="text-[12px] text-[#6B7785] uppercase tracking-wider mb-3 font-primary font-semibold">Billing Address</h4>
        <div className="text-[13px] text-[#9ca3af] font-primary leading-relaxed">
          <div className="text-white font-medium">{name}</div>
          {order.billing_company && <div>{order.billing_company}</div>}
          <div>{order.billing_address_1}</div>
          {order.billing_address_2 && <div>{order.billing_address_2}</div>}
          <div>{order.billing_postcode} {order.billing_city}</div>
          {order.billing_country && <div>{getCountryName(order.billing_country)}</div>}
          {order.billing_phone && <div className="mt-2">{order.billing_phone}</div>}
          {order.billing_email && <div>{order.billing_email}</div>}
        </div>
      </div>

      {/* Shipping */}
      <div>
        <h4 className="text-[12px] text-[#6B7785] uppercase tracking-wider mb-3 font-primary font-semibold">Shipping Address</h4>
        <div className="text-[13px] text-[#9ca3af] font-primary leading-relaxed">
          <div className="text-white font-medium">{order.shipping_first_name} {order.shipping_last_name}</div>
          {order.shipping_company && <div>{order.shipping_company}</div>}
          <div>{order.shipping_address_1}</div>
          {order.shipping_address_2 && <div>{order.shipping_address_2}</div>}
          <div>{order.shipping_postcode} {order.shipping_city}</div>
          {order.shipping_country && <div>{getCountryName(order.shipping_country)}</div>}
        </div>
        {order.order_notes && (
          <div className="mt-4">
            <h4 className="text-[12px] text-[#6B7785] uppercase tracking-wider mb-1 font-primary font-semibold">Notes</h4>
            <p className="text-[13px] text-[#9ca3af] font-primary">{order.order_notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function MobileOrderCard({ order, onStatusChange }: { order: OrderWithItems; onStatusChange: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false)
  const name = `${order.billing_first_name ?? ''} ${order.billing_last_name ?? ''}`.trim()

  return (
    <div className="rounded-xl border border-[#2a2d37] bg-[#1a1d27] overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[#16A1C5] font-mono text-[14px] font-primary font-semibold">#{order.order_number}</span>
            <div className="text-white text-[14px] font-primary mt-0.5">{name}</div>
            <div className="text-[#6B7785] text-[12px] font-primary">{order.billing_email}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-white font-semibold text-[15px] font-primary">${Number(order.total).toFixed(2)}</div>
            <div className="text-[#6B7785] text-[11px] font-primary mt-0.5">{new Date(order.created_at).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={order.status} />
            <span className="text-[11px] text-[#6B7785] font-primary">{order.payment_method}</span>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-lg text-[#6B7785] hover:text-[#16A1C5] hover:bg-[#16A1C5]/10 transition-colors"
          >
            {open ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-3">
          <label className="block text-[11px] text-[#6B7785] mb-1 font-primary uppercase tracking-wider">Update Status</label>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="w-full h-9 px-3 rounded-lg bg-[#0f1117] border border-[#2a2d37] text-[13px] text-white font-primary outline-none focus:border-[#16A1C5]"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#2a2d37] px-4 py-5 bg-[#0f1117]">
          <OrderDetails order={order} />
        </div>
      )}
    </div>
  )
}

function DesktopOrderRow({ order, onStatusChange }: { order: OrderWithItems; onStatusChange: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false)
  const name = `${order.billing_first_name ?? ''} ${order.billing_last_name ?? ''}`.trim()

  return (
    <>
      <tr className="border-b border-[#2a2d37] hover:bg-[#1a1d27] transition-colors">
        <td className="px-5 py-3 text-[14px] text-[#16A1C5] font-mono font-primary">#{order.order_number}</td>
        <td className="px-5 py-3 text-[13px] text-[#9ca3af] font-primary">{new Date(order.created_at).toLocaleDateString()}</td>
        <td className="px-5 py-3 text-[14px] text-white font-primary">{name}</td>
        <td className="px-5 py-3 text-[13px] text-[#9ca3af] font-primary">{order.billing_email}</td>
        <td className="px-5 py-3 text-[14px] text-white font-primary font-semibold">${Number(order.total).toFixed(2)}</td>
        <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
        <td className="px-5 py-3 text-[13px] text-[#9ca3af] font-primary">{order.payment_method}</td>
        <td className="px-5 py-3">
          <div className="flex items-center gap-2 justify-end">
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              className="h-8 px-2 rounded bg-[#0f1117] border border-[#2a2d37] text-[12px] text-white font-primary outline-none focus:border-[#16A1C5]"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg text-[#6B7785] hover:text-[#16A1C5] hover:bg-[#16A1C5]/10 transition-colors" title="Details">
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-[#2a2d37]">
          <td colSpan={8} className="px-5 py-5 bg-[#0f1117]">
            <OrderDetails order={order} />
          </td>
        </tr>
      )}
    </>
  )
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)

  async function loadOrders() {
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
    setOrders((data as OrderWithItems[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { loadOrders() }, [])

  async function handleStatusChange(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[20px] sm:text-[24px] font-bold text-white font-primary">Orders</h1>
        <p className="text-[13px] text-[#6B7785] font-primary mt-1">{orders.length} orders</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-[#6B7785] text-[14px] font-primary py-10 text-center">No orders yet.</p>
      ) : (
        <>
          {/* ─── Mobile cards ─── */}
          <div className="flex flex-col gap-3 md:hidden">
            {orders.map((o) => (
              <MobileOrderCard key={o.id} order={o} onStatusChange={handleStatusChange} />
            ))}
          </div>

          {/* ─── Desktop table ─── */}
          <div className="hidden md:block rounded-xl border border-[#2a2d37] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1d27] border-b border-[#2a2d37]">
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Order</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Date</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Customer</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Email</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Total</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Status</th>
                  <th className="text-left px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Payment</th>
                  <th className="text-right px-5 py-3 text-[12px] text-[#6B7785] uppercase tracking-wider font-semibold font-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <DesktopOrderRow key={o.id} order={o} onStatusChange={handleStatusChange} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
