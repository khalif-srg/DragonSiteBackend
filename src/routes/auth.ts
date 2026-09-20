// src/routes/auth.ts
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', async (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }

  const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  res.json({ token })
})

export default router