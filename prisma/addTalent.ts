import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const talent = await prisma.talent.create({
    data: {
      name: 'K-Zone',
      role: 'Developer, Influencer',
      image: 'https://zuyxplqpdxmewrjumova.supabase.co/storage/v1/object/public/talent-images/K-Zone.jpeg',
      category: 'Creative',
      city: 'Melbourne',
    },
  })

  console.log('✅ Talent added:', talent)
}

main()
  .catch((err) => {
    console.error('❌ Failed to add talent:', err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
