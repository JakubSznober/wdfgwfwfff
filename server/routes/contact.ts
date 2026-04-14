import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

// Public: submit contact form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Alle velden zijn verplicht' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Ongeldig e-mailadres' })
    return
  }
  const msg = await prisma.contactMessage.create({
    data: {
      name: String(name),
      email: String(email),
      message: String(message),
    },
  })
  res.status(201).json({ success: true, id: msg.id })
})

// Admin: list messages
router.get('/', requireAdmin, async (_req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(messages)
})

// Admin: mark message as read
router.put('/:id/read', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) { res.status(400).json({ error: 'Ongeldig ID' }); return }
  const msg = await prisma.contactMessage.update({ where: { id }, data: { read: true } })
  res.json(msg)
})

export default router
