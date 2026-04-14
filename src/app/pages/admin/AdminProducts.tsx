import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { apiFetch } from '../../lib/api'
import { formatPrice } from '../../lib/price'

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number | null
  badge: string | null
  image: string
  inStock: boolean
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  const loadProducts = async () => {
    try {
      const res = await apiFetch('/products/all')
      setProducts(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  const toggleStock = async (product: Product) => {
    await apiFetch(`/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify({ inStock: !product.inStock }),
    })
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: !p.inStock } : p))
    )
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" verwijderen? Dit kan niet ongedaan gemaakt worden.`)) return
    setDeleting(id)
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' })
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
            Producten
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '4px' }}>
            {products.length} producten in catalogus
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

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)' }}>Laden...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-24" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
          Nog geen producten. <Link to="/admin/products/new" style={{ color: '#D4AF77' }}>Voeg er een toe →</Link>
        </div>
      ) : (
        <div style={{ backgroundColor: '#111111', border: '1px solid rgba(212,175,119,0.12)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212,175,119,0.08)' }}>
                  {['Afbeelding', 'Naam', 'Categorie', 'Prijs', 'Label', 'Opslag', 'Acties'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {/* Image */}
                    <td className="px-5 py-3">
                      <div
                        className="w-12 h-12 rounded-sm overflow-hidden shrink-0"
                        style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(212,175,119,0.1)' }}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    {/* Name */}
                    <td className="px-5 py-3">
                      <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</span>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-3">
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{p.category}</span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-3">
                      <span style={{ color: '#D4AF77', fontSize: '0.88rem', fontWeight: 600 }}>{formatPrice(p.price)}</span>
                      {p.originalPrice && (
                        <span className="ml-2 line-through" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </td>
                    {/* Badge */}
                    <td className="px-5 py-3">
                      {p.badge ? (
                        <span className="px-2 py-0.5 text-xs" style={{ backgroundColor: 'rgba(212,175,119,0.1)', border: '1px solid rgba(212,175,119,0.2)', color: '#D4AF77' }}>
                          {p.badge}
                        </span>
                      ) : (
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>—</span>
                      )}
                    </td>
                    {/* In stock toggle */}
                    <td className="px-5 py-3">
                      <button onClick={() => toggleStock(p)} className="flex items-center gap-2 transition-colors">
                        {p.inStock ? (
                          <ToggleRight size={22} style={{ color: '#4ade80' }} />
                        ) : (
                          <ToggleLeft size={22} style={{ color: 'rgba(255,255,255,0.3)' }} />
                        )}
                        <span style={{ color: p.inStock ? '#4ade80' : 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                          {p.inStock ? 'Beschikbaar' : 'Uitverkocht'}
                        </span>
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/products/${p.id}`}
                          className="flex items-center gap-1.5 transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}
                        >
                          <Pencil size={13} /> Bewerken
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={deleting === p.id}
                          className="flex items-center gap-1.5 transition-colors hover:text-red-400"
                          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}
                        >
                          <Trash2 size={13} /> {deleting === p.id ? '...' : 'Verwijder'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
