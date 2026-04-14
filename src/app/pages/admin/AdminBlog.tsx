import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { apiFetch } from '../../lib/api'

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  published: boolean
  createdAt: string
}

interface BlogPostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  published: boolean
}

const EMPTY_FORM: BlogPostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'Gezondheid',
  published: true,
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const inputCls: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,175,119,0.2)',
  padding: '10px 12px',
  color: '#ffffff',
  fontSize: '0.85rem',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<number | null>(null) // null = new, -1 = list view
  const [form, setForm] = useState<BlogPostForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadPosts = async () => {
    try {
      const res = await apiFetch('/blog/admin/all')
      setPosts(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadPosts() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = async (post: BlogPost) => {
    setEditing(post.id)
    setShowForm(true)
    const res = await apiFetch(`/blog/${post.slug}`)
    const data = await res.json()
    setForm({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image ?? '',
      category: data.category,
      published: data.published,
    })
  }

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editing === null ? slugify(title) : prev.slug,
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) return
    setSaving(true)
    try {
      if (editing === null) {
        await apiFetch('/blog', {
          method: 'POST',
          body: JSON.stringify(form),
        })
      } else {
        await apiFetch(`/blog/${editing}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
      }
      setShowForm(false)
      setLoading(true)
      await loadPosts()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" verwijderen?`)) return
    setDeleting(id)
    try {
      await apiFetch(`/blog/${id}`, { method: 'DELETE' })
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const togglePublished = async (post: BlogPost) => {
    await apiFetch(`/blog/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({ published: !post.published }),
    })
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
    )
  }

  if (showForm) {
    return (
      <div className="p-8 max-w-3xl">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => setShowForm(false)}
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Terug
          </button>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
            {editing === null ? 'Nieuw artikel' : 'Artikel bewerken'}
          </h1>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Titel *</label>
            <input
              style={inputCls}
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Slug</label>
            <input
              style={inputCls}
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Excerpt * (korte omschrijving)</label>
            <textarea
              style={{ ...inputCls, resize: 'vertical', minHeight: '80px' }}
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Inhoud * (HTML of platte tekst)</label>
            <textarea
              style={{ ...inputCls, resize: 'vertical', minHeight: '220px' }}
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Afbeelding URL</label>
              <input
                style={inputCls}
                value={form.image}
                onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Categorie</label>
              <input
                style={inputCls}
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {form.published
                ? <Eye size={18} style={{ color: '#D4AF77' }} />
                : <EyeOff size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />}
            </button>
            <span style={{ fontSize: '0.82rem', color: form.published ? '#D4AF77' : 'rgba(255,255,255,0.3)' }}>
              {form.published ? 'Gepubliceerd' : 'Concept'}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, #D4AF77, #C9A66B)', color: '#111111', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: saving ? 0.6 : 1, border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer' }}
            >
              Annuleren
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
            Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '4px' }}>
            {posts.length} artikel{posts.length !== 1 ? 'en' : ''}
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #D4AF77, #C9A66B)', color: '#111111', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={14} />
          Nieuw artikel
        </button>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.3)' }}>Laden...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
          Geen artikelen gevonden. Maak uw eerste artikel aan.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between px-6 py-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,119,0.08)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>
                    {post.title}
                  </span>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF77', background: 'rgba(212,175,119,0.1)', padding: '2px 8px' }}>
                    {post.category}
                  </span>
                  {!post.published && (
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px' }}>
                      Concept
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
                  {post.slug} · {new Date(post.createdAt).toLocaleDateString('nl-NL')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => togglePublished(post)}
                  className="p-2 transition-colors hover:text-[#D4AF77]"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: post.published ? '#D4AF77' : 'rgba(255,255,255,0.3)' }}
                  title={post.published ? 'Verbergen' : 'Publiceren'}
                >
                  {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 transition-colors"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}
                  title="Bewerken"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  disabled={deleting === post.id}
                  className="p-2 transition-colors hover:text-red-400"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', opacity: deleting === post.id ? 0.5 : 1 }}
                  title="Verwijderen"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
