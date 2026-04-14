import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { ArrowLeft, Save } from 'lucide-react'
import { apiFetch } from '../../lib/api'

const CATEGORIES = ['Gevogelte', 'Rund', 'Varken', 'Lam', 'Kauwstokken', 'Overig']
const BADGES = ['', 'Bestseller', 'Actie', 'Nieuw', 'Populair']

interface FormState {
  name: string
  description: string
  price: string
  originalPrice: string
  image: string
  badge: string
  category: string
  inStock: boolean
}

const EMPTY: FormState = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  image: '',
  badge: '',
  category: 'Gevogelte',
  inStock: true,
}

export function AdminProductForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      apiFetch(`/products/${id}`)
        .then((r) => r.json())
        .then((p) => {
          setForm({
            name: p.name,
            description: p.description,
            price: String(p.price),
            originalPrice: p.originalPrice != null ? String(p.originalPrice) : '',
            image: p.image,
            badge: p.badge ?? '',
            category: p.category,
            inStock: p.inStock,
          })
        })
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.description.trim() || !form.price || !form.image.trim() || !form.category) {
      setError('Vul alle verplichte velden in')
      return
    }
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        image: form.image.trim(),
        badge: form.badge || null,
        category: form.category,
        inStock: form.inStock,
      }
      if (isNew) {
        await apiFetch('/products', { method: 'POST', body: JSON.stringify(body) })
      } else {
        await apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) })
      }
      navigate('/admin/products')
    } catch {
      setError('Opslaan mislukt. Probeer opnieuw.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8" style={{ color: 'rgba(255,255,255,0.3)' }}>Laden...</div>
  }

  const inputStyle = {
    backgroundColor: '#0a0a0a',
    border: '1px solid rgba(212,175,119,0.2)',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none',
  }

  const labelStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link to="/admin/products" style={{ color: 'rgba(255,255,255,0.35)' }} className="hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
            {isNew ? 'Nieuw product' : 'Product bewerken'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name */}
        <div>
          <label style={labelStyle}>Naam *</label>
          <input type="text" value={form.name} onChange={set('name')} required className="w-full px-4 py-3" style={inputStyle} />
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Omschrijving *</label>
          <textarea
            value={form.description}
            onChange={set('description')}
            required
            rows={3}
            className="w-full px-4 py-3 resize-none"
            style={inputStyle}
          />
        </div>

        {/* Price row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Prijs (€) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={set('price')}
              required
              className="w-full px-4 py-3"
              style={inputStyle}
              placeholder="9.95"
            />
          </div>
          <div>
            <label style={labelStyle}>Originele prijs (€) <span style={{ opacity: 0.5 }}>optioneel</span></label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.originalPrice}
              onChange={set('originalPrice')}
              className="w-full px-4 py-3"
              style={inputStyle}
              placeholder="15.95"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label style={labelStyle}>Afbeelding URL *</label>
          <input
            type="url"
            value={form.image}
            onChange={set('image')}
            required
            className="w-full px-4 py-3"
            style={inputStyle}
            placeholder="https://..."
          />
          {form.image && (
            <div className="mt-3 flex items-center gap-4">
              <img src={form.image} alt="Preview" className="w-20 h-20 object-cover rounded-sm" style={{ border: '1px solid rgba(212,175,119,0.15)' }} onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Voorbeeld</span>
            </div>
          )}
        </div>

        {/* Category + Badge row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Categorie *</label>
            <select value={form.category} onChange={set('category')} className="w-full px-4 py-3" style={inputStyle}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Label <span style={{ opacity: 0.5 }}>optioneel</span></label>
            <select value={form.badge} onChange={set('badge')} className="w-full px-4 py-3" style={inputStyle}>
              {BADGES.map((b) => <option key={b} value={b}>{b || '— geen —'}</option>)}
            </select>
          </div>
        </div>

        {/* In stock */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={set('inStock')}
            className="w-4 h-4 accent-[#D4AF77]"
          />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>Beschikbaar in winkel</span>
        </label>

        {/* Submit */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-7 py-3 transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #D4AF77, #C9A66B)', color: '#111111', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: saving ? 0.7 : 1 }}
          >
            <Save size={14} />
            {saving ? 'Opslaan...' : isNew ? 'Product aanmaken' : 'Wijzigingen opslaan'}
          </button>
          <Link
            to="/admin/products"
            className="px-6 py-3 transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Annuleren
          </Link>
        </div>
      </form>
    </div>
  )
}
