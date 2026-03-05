import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function POST(request: NextRequest) {

  const formData = await request.formData()

  const areaId = Number(formData.get("areaId"))
  const categoryId = Number(formData.get("categoryId"))
  const placeInput = String(formData.get("place"))

  const description = String(formData.get("description"))
  const contact = String(formData.get("contact") || "")

  let placeId: number

  // check if numeric id (existing place)

  if (!isNaN(Number(placeInput))) {

    placeId = Number(placeInput)

  } else {

    // create new place

    const newPlace = await prisma.place.create({
      data: {
        name: placeInput,
        areaId,
        categoryId
      }
    })

    placeId = newPlace.id
  }

  await prisma.feedback.create({
    data: {
      placeId,
      description,
      type: "positive",
      severity: "low",
      contact
    }
  })

  return NextResponse.redirect(new URL("/add?success=1", request.url))
}