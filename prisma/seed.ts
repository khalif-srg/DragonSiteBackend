import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.talent.createMany({
    data: [
      {
        name: 'Solace Path',
        role: 'Sound Producer, Influencer',
        image: 'https://zuyxplqpdxmewrjumova.supabase.co/storage/v1/object/public/talent-images/SolacePath.jpeg',
        category: 'Creative',
        city: 'Sydney',
      },
      {
        name: 'Mikhaiel',
        role: 'Fashion, Influencer',
        image: 'https://zuyxplqpdxmewrjumova.supabase.co/storage/v1/object/public/talent-images/MikhaielMain.jpeg',
        category: 'Talent',
        city: 'Sydney',
      },
      {
        name: 'Fargo',
        role: 'Creative Director',
        image: 'https://zuyxplqpdxmewrjumova.supabase.co/storage/v1/object/public/talent-images/FargoMain.jpeg',
        category: 'Creative',
        city: 'Melbourne',
      },
      {
        name: 'Akkers',
        role: 'Fashion, Influencer',
        image: 'https://zuyxplqpdxmewrjumova.supabase.co/storage/v1/object/public/talent-images/AkkersMain.jpeg',
        category: 'Talent',
        city: 'Melbourne',
      },
    ],
  })
}

main()
  .then(() => {
    console.log('✅ Seeded successfully!')
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })