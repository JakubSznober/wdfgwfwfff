import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

// Public: list in-stock products
router.get('/', async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(products)
})

// Admin: list all products (incl. out of stock)
router.get('/all', requireAdmin, async (_req, res) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(products)
})

// Public: single product
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) { res.status(404).json({ error: 'Product niet gevonden' }); return }
  res.json(product)
})

// Admin: create product
router.post('/', requireAdmin, async (req, res) => {
  const { name, description, price, originalPrice, image, badge, category, inStock } = req.body
  if (!name || !description || price == null || !image || !category) {
    res.status(400).json({ error: 'Verplichte velden ontbreken' })
    return
  }
  const product = await prisma.product.create({
    data: {
      name: String(name),
      description: String(description),
      price: Number(price),
      originalPrice: originalPrice != null && originalPrice !== '' ? Number(originalPrice) : null,
      image: String(image),
      badge: badge ? String(badge) : null,
      category: String(category),
      inStock: inStock !== false,
    },
  })
  res.status(201).json(product)
})

// Admin: update product
router.put('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  const { name, description, price, originalPrice, image, badge, category, inStock } = req.body
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name != null && { name: String(name) }),
      ...(description != null && { description: String(description) }),
      ...(price != null && { price: Number(price) }),
      originalPrice: originalPrice != null && originalPrice !== '' ? Number(originalPrice) : null,
      ...(image != null && { image: String(image) }),
      badge: badge ? String(badge) : null,
      ...(category != null && { category: String(category) }),
      ...(inStock != null && { inStock: Boolean(inStock) }),
    },
  })
  res.json(product)
})

// Admin: delete product
router.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  await prisma.product.delete({ where: { id } })
  res.status(204).send()
})

export default router
