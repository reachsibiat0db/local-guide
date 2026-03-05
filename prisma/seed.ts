import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  // Seed Areas
  await prisma.area.createMany({
    data: [
      { name: "Korattur" },
      { name: "Kolathur" },
      { name: "Padur" },
      { name: "Ramapuram" },
      { name: "Chrompet" },
      { name: "Anna Nagar" },
      { name: "Siruseri" },
      { name: "Kelambakkam" }
    ],
    skipDuplicates: true
  })

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { name: "Electrician" },
      { name: "Salon" },
      { name: "Restaurant" },
      { name: "Internet" },
      { name: "Supermarket" },
      { name: "Medicals" },
      { name: "Laundry" },
      { name: "Hospital" },
      { name: "Newspaper" },
      { name: "Catering" },
      { name: "School" },
      { name: "Car Care" },
      { name: "Cycle Repair" },
      { name: "Milk Vendor" },
      { name: "Driver" }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })