// src/middleware/requireAuth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Missing token' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}