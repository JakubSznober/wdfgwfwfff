import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react'
import { apiFetch } from '../../lib/api'
import { formatPrice } from '../../lib/price'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: number
  name: string
  email: string
  address: string | null
  city: string | null
  postalCode: string | null
  total: number
  discount: number
  paymentMethod: string
  status: string
  notes: string | null
  items: OrderItem[]
  createdAt: string
}

const STATUS_OPTIONS = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const statusLabel: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'In behandeling', color: '#D4AF77' },
  PAID:      { label: 'Betaald',        color: '#4ade80' },
  SHIPPED:   { label: 'Verzonden',      color: '#60a5fa' },
  DELIVERED: { label: 'Geleverd',       color: '#a3e635' },
  CANCELLED: { label: 'Geannuleerd',    color: '#f87171' },
}

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    apiFetch('/orders')
      .then((r) => r.json())
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await apiFetch(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) })
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const deleteOrder = async (id: number, name: string) => {
    if (!confirm(`Bestelling van "${name}" verwijderen? Dit verwijdert alle persoonsgegevens.`)) return
    setDeleting(id)
    try {
      await apiFetch(`/orders/${id}`, { method: 'DELETE' })
      setOrders((prev) => prev.filter((o) => o.id !== id))
      if (expanded === id) setExpanded(null)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) return <div className="p-8" style={{ color: 'rgba(255,255,255,0.3)' }}>Laden...</div>

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
          Bestellingen
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '4px' }}>
          {orders.length} {orders.length === 1 ? 'bestelling' : 'bestellingen'} totaal
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
          Nog geen bestellingen
        </div>
      ) : (
        <div style={{ backgroundColor: '#111111', border: '1px solid rgba(212,175,119,0.12)' }}>
          {orders.map((order, idx) => {
            const s = statusLabel[order.status] ?? { label: order.status, color: '#fff' }
            const isExpanded = expanded === order.id
            return (
              <div key={order.id} style={{ borderBottom: idx < orders.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                {/* Row */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : order.id)}
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    className="shrink-0"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  <div className="w-12 shrink-0" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                    #{order.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }}>{order.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{order.email}</div>
                  </div>

                  <div className="w-24 text-right shrink-0" style={{ color: '#D4AF77', fontSize: '0.88rem', fontWeight: 600 }}>
                    {formatPrice(order.total)}
                  </div>

                  <div className="w-36 shrink-0">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="w-full px-2 py-1.5 text-xs outline-none"
                      style={{
                        backgroundColor: `${s.color}12`,
                        border: `1px solid ${s.color}40`,
                        color: s.color,
                      }}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} style={{ backgroundColor: '#111111', color: '#fff' }}>
                          {statusLabel[st]?.label ?? st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24 text-right shrink-0" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
                    {new Date(order.createdAt).toLocaleDateString('nl-NL')}
                  </div>

                  <button
                    onClick={() => deleteOrder(order.id, order.name)}
                    disabled={deleting === order.id}
                    title="Bestelling verwijderen"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.25)', opacity: deleting === order.id ? 0.4 : 1, padding: '4px' }}
                    className="hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-14 pb-5" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="pt-4 grid grid-cols-2 gap-6">
                      {/* Delivery address */}
                      {(order.address || order.city) && (
                        <div>
                          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Bezorgadres</p>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{order.address}</p>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{[order.postalCode, order.city].filter(Boolean).join(' ')}</p>
                        </div>
                      )}
                      {/* Notes */}
                      {order.notes && (
                        <div>
                          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Opmerking</p>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{order.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="mt-4">
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Producten</p>
                      <div className="flex flex-col gap-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                              {item.quantity}× {item.name}
                            </span>
                            <span style={{ color: '#D4AF77', fontSize: '0.82rem' }}>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                        {order.discount > 0 && (
                          <div className="flex items-center justify-between mt-1 pt-2" style={{ borderTop: '1px solid rgba(212,175,119,0.1)' }}>
                            <span style={{ color: '#D4AF77', fontSize: '0.82rem' }}>Korting toegepast</span>
                            <span style={{ color: '#D4AF77', fontSize: '0.82rem' }}>-{formatPrice(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-1 pt-2" style={{ borderTop: '1px solid rgba(212,175,119,0.1)' }}>
                          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Betaalwijze</span>
                          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                            {order.paymentMethod === 'IDEAL' ? 'iDEAL'
                              : order.paymentMethod === 'CREDITCARD' ? 'Creditcard'
                              : 'Bankoverschrijving'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
