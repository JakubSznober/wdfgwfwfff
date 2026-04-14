import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Inloggen mislukt'); return }
      localStorage.setItem('bb_admin_token', data.token)
      navigate('/admin/dashboard', { replace: true })
    } catch {
      setError('Verbinding met server mislukt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#090909', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem' }}>
            <span style={{ color: '#D4AF77', fontWeight: 600, letterSpacing: '0.12em' }}>Bliss</span>
            <span style={{ color: '#ffffff', fontWeight: 300, letterSpacing: '0.12em' }}>Bone</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '6px' }}>
            Beheerpaneel
          </p>
        </div>

        {/* Card */}
        <div
          className="p-8"
          style={{ backgroundColor: '#111111', border: '1px solid rgba(212,175,119,0.15)' }}
        >
          <h1 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>
            Inloggen
          </h1>

          {error && (
            <div
              className="mb-5 px-4 py-3 text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Gebruikersnaam
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 outline-none transition-colors"
                style={{
                  backgroundColor: '#0a0a0a',
                  border: '1px solid rgba(212,175,119,0.2)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,119,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(212,175,119,0.2)')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 outline-none transition-colors"
                  style={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid rgba(212,175,119,0.2)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,119,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(212,175,119,0.2)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 mt-2 transition-opacity duration-200"
              style={{
                background: 'linear-gradient(135deg, #D4AF77, #C9A66B)',
                color: '#111111',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: loading ? 0.7 : 1,
              }}
            >
              <LogIn size={15} />
              {loading ? 'Bezig...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
