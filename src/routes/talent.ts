import { Router } from 'express'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const prisma = new PrismaClient({ adapter })

const router = Router()

// GET all talent (optionally filtered by city/category via query params)
router.get('/', async (req, res) => {
  const { city, category } = req.query

  try {
    const talent = await prisma.talent.findMany({
      where: {
        ...(city && { city: String(city) }),
        ...(category && { category: String(category) }),
      },
    })
    res.json(talent)
  } catch (err) {
    console.error('FULL ERROR:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

// GET a single talent by id
router.get('/:id', async (req, res) => {
  try {
    const talent = await prisma.talent.findUnique({
      where: { id: req.params.id },
    })

    if (!talent) {
      return res.status(404).json({ error: 'Talent not found' })
    }

    res.json(talent)
  } catch (err) {
    console.error('FULL ERROR:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router