import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string }
  if (!username || !password) {
    res.status(400).json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht' })
    return
  }
  const admin = await prisma.adminUser.findUnique({ where: { username } })
  if (!admin) {
    res.status(401).json({ error: 'Gebruikersnaam of wachtwoord onjuist' })
    return
  }
  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    res.status(401).json({ error: 'Gebruikersnaam of wachtwoord onjuist' })
    return
  }
  const token = jwt.sign(
    { adminId: admin.id, username: admin.username },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  )
  res.json({ token, username: admin.username })
})

export default router
