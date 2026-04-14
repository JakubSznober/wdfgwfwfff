import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

const VALID_STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

// Public: create order
router.post('/', async (req, res) => {
  const { email, name, address, city, postalCode, items, notes, discount, paymentMethod } = req.body
  if (!email || !name || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Email, naam en producten zijn verplicht' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Ongeldig e-mailadres' })
    return
  }
  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  )
  const discountAmount = typeof discount === 'number' && discount > 0
    ? Math.min(Math.max(discount, 0), subtotal)
    : 0
  const total = subtotal - discountAmount
  const order = await prisma.order.create({
    data: {
      email: String(email),
      name: String(name),
      address: address ? String(address) : null,
      city: city ? String(city) : null,
      postalCode: postalCode ? String(postalCode) : null,
      total,
      discount: discountAmount,
      paymentMethod: typeof paymentMethod === 'string' && paymentMethod ? paymentMethod : 'BANK_TRANSFER',
      notes: notes ? String(notes) : null,
      items: {
        create: items.map((item: { productId?: number; name: string; price: number; quantity: number }) => ({
          productId: item.productId ?? null,
          name: String(item.name),
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      },
    },
    include: { items: true },
  })
  res.status(201).json(order)
})

// Admin: list all orders
router.get('/', requireAdmin, async (_req, res) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  res.json(orders)
})

// Admin: update order status
router.put('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  const { status } = req.body
  if (!VALID_STATUSES.includes(status)) {
    res.status(400).json({ error: 'Ongeldige status' })
    return
  }
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true },
  })
  res.json(order)
})

// Admin: delete order (and its items via cascade)
router.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  await prisma.orderItem.deleteMany({ where: { orderId: id } })
  await prisma.order.delete({ where: { id } })
  res.json({ ok: true })
})

export default router
