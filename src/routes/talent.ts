import { Router } from 'express'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '../middleware/requireAuth'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const prisma = new PrismaClient({ adapter })

const router = Router()

// GET all talent
router.get('/', async (req, res) => {
  try {
    const talent = await prisma.talent.findMany()
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

// POST a new talent — protected, requires login
router.post('/', requireAuth, async (req, res) => {
  const { name, role, image, category, city } = req.body

  if (!name || !role || !image || !category || !city) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const newTalent = await prisma.talent.create({
      data: { name, role, image, category, city },
    })
    res.status(201).json(newTalent)
  } catch (err) {
    console.error('FULL ERROR:', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router