import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

// Public: list published posts
router.get('/', async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, excerpt: true, image: true, category: true, createdAt: true },
  })
  res.json(posts)
})

// Public: single post by slug
router.get('/:slug', async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } })
  if (!post || !post.published) { res.status(404).json({ error: 'Artikel niet gevonden' }); return }
  res.json(post)
})

// Admin: list all posts
router.get('/admin/all', requireAdmin, async (_req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(posts)
})

// Admin: create post
router.post('/', requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, image, category, published } = req.body
  if (!title || !slug || !excerpt || !content) {
    res.status(400).json({ error: 'Titel, slug, excerpt en inhoud zijn verplicht' }); return
  }
  const post = await prisma.blogPost.create({
    data: {
      title: String(title),
      slug: String(slug).toLowerCase().replace(/\s+/g, '-'),
      excerpt: String(excerpt),
      content: String(content),
      image: image ? String(image) : null,
      category: category ? String(category) : 'Gezondheid',
      published: published !== false,
    },
  })
  res.status(201).json(post)
})

// Admin: update post
router.put('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  const { title, slug, excerpt, content, image, category, published } = req.body
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(title && { title: String(title) }),
      ...(slug && { slug: String(slug).toLowerCase().replace(/\s+/g, '-') }),
      ...(excerpt && { excerpt: String(excerpt) }),
      ...(content && { content: String(content) }),
      image: image !== undefined ? (image ? String(image) : null) : undefined,
      ...(category && { category: String(category) }),
      ...(published !== undefined && { published: Boolean(published) }),
    },
  })
  res.json(post)
})

// Admin: delete post
router.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  await prisma.blogPost.delete({ where: { id } })
  res.json({ ok: true })
})

export default router
