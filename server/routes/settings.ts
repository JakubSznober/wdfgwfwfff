import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = Router()

// Public: get all settings as key-value object
router.get('/', async (_req, res) => {
  const settings = await prisma.setting.findMany()
  const obj: Record<string, string> = {}
  for (const s of settings) obj[s.key] = s.value
  res.json(obj)
})

// Admin: upsert a single setting
router.put('/:key', requireAdmin, async (req, res) => {
  const { key } = req.params
  const { value } = req.body
  if (value == null) { res.status(400).json({ error: 'Waarde is verplicht' }); return }
  const setting = await prisma.setting.upsert({
    where: { key },
    create: { key, value: String(value) },
    update: { value: String(value) },
  })
  res.json(setting)
})

// Admin: bulk update settings
router.put('/', requireAdmin, async (req, res) => {
  const updates = req.body as Record<string, string>
  const results = await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        create: { key, value: String(value) },
        update: { value: String(value) },
      })
    )
  )
  res.json(results)
})

export default router
