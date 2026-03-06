
import { prisma } from "@/lib/prisma"
import AddForm from "@/components/AddForm"
import { Suspense } from "react"

export default async function AddPage() {

  const areas = await prisma.area.findMany({
    orderBy: { name: "asc" }
  })

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <Suspense fallback={null}>
      <AddForm
        areas={areas}
        categories={categories}
      />
    </Suspense>
  )
}