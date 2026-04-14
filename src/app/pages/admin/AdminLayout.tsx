import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  FileText,
} from 'lucide-react'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Producten' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Bestellingen' },
  { to: '/admin/blog', icon: FileText, label: 'Blog' },
  { to: '/admin/settings', icon: Settings, label: 'Instellingen' },
]

export function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('bb_admin_token')
    if (!token) navigate('/admin/login', { replace: true })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('bb_admin_token')
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#090909', fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col shrink-0 border-r transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#0f0f0f', borderColor: 'rgba(212,175,119,0.12)' }}
      >
        {/* Logo */}
        <div className="px-7 py-7 border-b flex items-center justify-between" style={{ borderColor: 'rgba(212,175,119,0.12)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
            <Store size={18} style={{ color: '#D4AF77' }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: '#D4AF77', letterSpacing: '0.1em' }}>
              Bliss
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#ffffff', letterSpacing: '0.1em' }}>
              Bone
            </span>
          </a>
          <button
            className="lg:hidden text-white/40 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <p className="px-7 pt-1 pb-0" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Beheer
        </p>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-sm ${
                  isActive ? 'text-[#D4AF77]' : 'text-white/40 hover:text-white/80'
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'rgba(212,175,119,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid #D4AF77' : '2px solid transparent',
              })}
            >
              <Icon size={16} />
              <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 border-t pt-4" style={{ borderColor: 'rgba(212,175,119,0.08)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left transition-colors duration-200 hover:text-red-400 rounded-sm"
            style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}
          >
            <LogOut size={16} />
            <span>Uitloggen</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center gap-4 px-5 py-4 border-b"
          style={{ backgroundColor: '#0f0f0f', borderColor: 'rgba(212,175,119,0.12)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/60 hover:text-[#D4AF77] transition-colors"
          >
            <Menu size={22} />
          </button>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: '#D4AF77', letterSpacing: '0.1em' }}>
            Bliss<span style={{ fontWeight: 300, color: '#fff' }}>Bone</span>
          </span>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Beheer
          </span>
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
