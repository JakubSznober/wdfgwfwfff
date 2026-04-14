import { useState, useEffect, FormEvent } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { apiFetch } from '../../lib/api'

interface Settings {
  contact_phone: string
  contact_email: string
  contact_kvk: string
  contact_address: string
  contact_city: string
  footer_tagline: string
  social_instagram: string
  social_facebook: string
  shipping_free_above: string
  shipping_cost: string
}

const DEFAULT: Settings = {
  contact_phone: '',
  contact_email: '',
  contact_kvk: '',
  contact_address: '',
  contact_city: '',
  footer_tagline: '',
  social_instagram: '',
  social_facebook: '',
  shipping_free_above: '50',
  shipping_cost: '4.95',
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    apiFetch('/settings')
      .then((r) => r.json())
      .then((data) => setSettings((prev) => ({ ...prev, ...data })))
      .finally(() => setLoading(false))
  }, [])

  const set = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.value }))
    setSaved(false)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiFetch('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8" style={{ color: 'rgba(255,255,255,0.3)' }}>Laden...</div>

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
      <div className="mb-8">
        <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
          Instellingen
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '4px' }}>
          Contactgegevens, bezorging en sociale media
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-10">

        {/* Contact */}
        <section>
          <h2 className="mb-5 pb-3 border-b" style={{ color: '#D4AF77', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderColor: 'rgba(212,175,119,0.12)' }}>
            Contactgegevens
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <label style={labelStyle}>E-mailadres</label>
              <input type="email" value={settings.contact_email} onChange={set('contact_email')} className="w-full px-4 py-3" style={inputStyle} placeholder="info@blissbone.nl" />
            </div>
            <div>
              <label style={labelStyle}>Telefoonnummer</label>
              <input type="text" value={settings.contact_phone} onChange={set('contact_phone')} className="w-full px-4 py-3" style={inputStyle} placeholder="+31 6 12 34 56 78" />
            </div>
            <div>
              <label style={labelStyle}>KVK-nummer</label>
              <input type="text" value={settings.contact_kvk} onChange={set('contact_kvk')} className="w-full px-4 py-3" style={inputStyle} placeholder="12345678" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Adres</label>
                <input type="text" value={settings.contact_address} onChange={set('contact_address')} className="w-full px-4 py-3" style={inputStyle} placeholder="Straatnaam 1" />
              </div>
              <div>
                <label style={labelStyle}>Stad</label>
                <input type="text" value={settings.contact_city} onChange={set('contact_city')} className="w-full px-4 py-3" style={inputStyle} placeholder="Amsterdam" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section>
          <h2 className="mb-5 pb-3 border-b" style={{ color: '#D4AF77', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderColor: 'rgba(212,175,119,0.12)' }}>
            Footer
          </h2>
          <div>
            <label style={labelStyle}>Tagline</label>
            <input type="text" value={settings.footer_tagline} onChange={set('footer_tagline')} className="w-full px-4 py-3" style={inputStyle} placeholder="Premium natuurlijke hondensnacks" />
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="mb-5 pb-3 border-b" style={{ color: '#D4AF77', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderColor: 'rgba(212,175,119,0.12)' }}>
            Bezorging
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Gratis bezorging vanaf (€)</label>
              <input type="number" step="0.01" min="0" value={settings.shipping_free_above} onChange={set('shipping_free_above')} className="w-full px-4 py-3" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Bezorgkosten (€)</label>
              <input type="number" step="0.01" min="0" value={settings.shipping_cost} onChange={set('shipping_cost')} className="w-full px-4 py-3" style={inputStyle} />
            </div>
          </div>
        </section>

        {/* Social */}
        <section>
          <h2 className="mb-5 pb-3 border-b" style={{ color: '#D4AF77', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderColor: 'rgba(212,175,119,0.12)' }}>
            Sociale media
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Instagram URL</label>
              <input type="url" value={settings.social_instagram} onChange={set('social_instagram')} className="w-full px-4 py-3" style={inputStyle} placeholder="https://instagram.com/blissbone" />
            </div>
            <div>
              <label style={labelStyle}>Facebook URL</label>
              <input type="url" value={settings.social_facebook} onChange={set('social_facebook')} className="w-full px-4 py-3" style={inputStyle} placeholder="https://facebook.com/blissbone" />
            </div>
          </div>
        </section>

        {/* Save button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-7 py-3 transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #D4AF77, #C9A66B)', color: '#111111', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: saving ? 0.7 : 1 }}
          >
            <Save size={14} />
            {saving ? 'Opslaan...' : 'Instellingen opslaan'}
          </button>
          {saved && (
            <div className="flex items-center gap-2" style={{ color: '#4ade80', fontSize: '0.82rem' }}>
              <CheckCircle size={16} /> Opgeslagen!
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
