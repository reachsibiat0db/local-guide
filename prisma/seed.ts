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
      { name: "Electrician",slug: "electrician"},
      { name: "Salon",slug: "salon" },
      { name: "Restaurant",slug: "restaurant" },
      { name: "Internet",slug: "internet" },
      { name: "Supermarket",slug: "supermarket" },
      { name: "Medicals",slug: "medicals" },
      { name: "Laundry",slug: "laundry" },
      { name: "Hospital",slug: "hospital" },
      { name: "Newspaper",slug: "news-paper" },
      { name: "Catering",slug: "catering" },
      { name: "School",slug: "school" },
      { name: "Car Care",slug: "car-care" },
      { name: "Cycle Repair",slug: "cycle-repair" },
      { name: "Milk Vendor",slug: "milk-vendor" },
      { name: "Driver",slug: "driver" }
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