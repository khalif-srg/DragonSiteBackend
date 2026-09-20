import dotenv from 'dotenv'
import authRouter from './routes/auth'
dotenv.config()

import express from 'express'
import cors from 'cors'
import talentRouter from './routes/talent'


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/talent', talentRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})