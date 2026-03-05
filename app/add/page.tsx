
import { prisma } from "@/lib/prisma"
import AddForm from "@/components/AddForm"
import { useRouter } from "next/navigation"

export default async function AddPage() {

  const areas = await prisma.area.findMany({
    orderBy: { name: "asc" }
  })

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <AddForm
      areas={areas}
      categories={categories}
    />
  )
}