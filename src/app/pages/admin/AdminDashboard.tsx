import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Package, ShoppingBag, Euro, Clock, Plus } from 'lucide-react'
import { apiFetch } from '../../lib/api'
import { formatPrice } from '../../lib/price'

interface Stats {
  productCount: number
  orderCount: number
  revenue: number
  pendingCount: number
}

interface Order {
  id: number
  name: string
  email: string
  total: number
  status: string
  createdAt: string
}

const statusLabel: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'In behandeling', color: '#D4AF77' },
  PAID:      { label: 'Betaald',        color: '#4ade80' },
  SHIPPED:   { label: 'Verzonden',      color: '#60a5fa' },
  DELIVERED: { label: 'Geleverd',       color: '#a3e635' },
  CANCELLED: { label: 'Geannuleerd',    color: '#f87171' },
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          apiFetch('/products/all'),
          apiFetch('/orders'),
        ])
        const products = await productsRes.json()
        const orders: Order[] = await ordersRes.json()

        const revenue = orders
          .filter((o) => o.status === 'PAID' || o.status === 'DELIVERED')
          .reduce((sum, o) => sum + o.total, 0)

        setStats({
          productCount: products.length,
          orderCount: orders.length,
          revenue,
          pendingCount: orders.filter((o) => o.status === 'PENDING').length,
        })
        setRecentOrders(orders.slice(0, 5))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
            Dashboard
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '4px' }}>
            Overzicht van uw webshop
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #D4AF77, #C9A66B)', color: '#111111', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          <Plus size={14} />
          Nieuw product
        </Link>
      </div>

      {/* Stats */}
      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Laden...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Package, label: 'Producten', value: String(stats?.productCount ?? 0), accent: false },
              { icon: ShoppingBag, label: 'Bestellingen', value: String(stats?.orderCount ?? 0), accent: false },
              { icon: Euro, label: 'Omzet (betaald)', value: formatPrice(stats?.revenue ?? 0), accent: true },
              { icon: Clock, label: 'In behandeling', value: String(stats?.pendingCount ?? 0), accent: false },
            ].map(({ icon: Icon, label, value, accent }) => (
              <div
                key={label}
                className="p-6"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(212,175,119,0.12)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={16} style={{ color: accent ? '#D4AF77' : 'rgba(255,255,255,0.4)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {label}
                  </span>
                </div>
                <p style={{ color: accent ? '#D4AF77' : '#ffffff', fontSize: '1.6rem', fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div style={{ backgroundColor: '#111111', border: '1px solid rgba(212,175,119,0.12)' }}>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(212,175,119,0.08)' }}>
              <h2 style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>Recente bestellingen</h2>
              <Link to="/admin/orders" style={{ color: '#D4AF77', fontSize: '0.75rem' }}>Alle bekijken →</Link>
            </div>
            {recentOrders.length === 0 ? (
              <div className="px-6 py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                Nog geen bestellingen
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(212,175,119,0.08)' }}>
                      {['#', 'Klant', 'Totaal', 'Status', 'Datum'].map((h) => (
                        <th key={h} className="px-6 py-3 text-left" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const s = statusLabel[order.status] ?? { label: order.status, color: '#fff' }
                      return (
                        <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td className="px-6 py-4" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>#{order.id}</td>
                          <td className="px-6 py-4">
                            <div style={{ color: '#ffffff', fontSize: '0.85rem' }}>{order.name}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>{order.email}</div>
                          </td>
                          <td className="px-6 py-4" style={{ color: '#D4AF77', fontSize: '0.85rem', fontWeight: 600 }}>{formatPrice(order.total)}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 text-xs" style={{ backgroundColor: `${s.color}18`, color: s.color, border: `1px solid ${s.color}40` }}>
                              {s.label}
                            </span>
                          </td>
                          <td className="px-6 py-4" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                            {new Date(order.createdAt).toLocaleDateString('nl-NL')}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
