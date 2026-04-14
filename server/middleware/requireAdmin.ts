import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  adminId?: number
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Niet geautoriseerd' })
    return
  }
  const token = authHeader.slice(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { adminId: number }
    req.adminId = payload.adminId
    next()
  } catch {
    res.status(401).json({ error: 'Token ongeldig of verlopen' })
  }
}
