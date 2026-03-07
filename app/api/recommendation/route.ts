import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

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

    // create summary row for the place

    await prisma.placeSummary.create({
      data: {
        placeId
      }
    })
  }

  // TEMP sentiment (later will come from LLM)

  let sentiment: "positive" | "negative"
  sentiment = "positive"

  await prisma.feedback.create({
    data: {
      placeId,
      description,
      sentiment,
      contact
    }
  })

  // update summary counts

  const summaryUpdate = {
    positiveCount: { increment: 1 },
    totalReviews: { increment: 1 },
    lastUpdated: new Date()
  }

  await prisma.placeSummary.update({
    where: { placeId },
    data: summaryUpdate
  })

  return NextResponse.redirect(new URL("/add?success=1", request.url))
}