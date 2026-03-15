import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { analyzeReview } from "@/lib/ai/analyzeReview"
import { generateLocalsSay } from "@/lib/ai/generateLocalsSay"

export async function POST(request: NextRequest) {

  const formData = await request.formData()

  const areaId = Number(formData.get("areaId"))
  const categoryId = Number(formData.get("categoryId"))
  const placeIdInput = formData.get("placeId")
  const placeInput = String(formData.get("place"))

  const description = String(formData.get("description"))
  const contact = String(formData.get("contact") || "")
  const ai = await analyzeReview(description)
  console.log(ai)
  let placeId: number

// check if existing place selected

  if (placeIdInput) {
    placeId = Number(placeIdInput)
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

  const sentiment = ai.sentiment as "positive" | "negative" | "mixed"

  await prisma.feedback.create({
    data: {
      placeId,
      description,
      sentiment,
      contact
    }
  })

  // update summary counts

  const summaryUpdate: any  = {
    totalReviews: { increment: 1 },
    lastUpdated: new Date(),
    localsSay: ai.summary
  }

  if (sentiment === "positive") {
    summaryUpdate.positiveCount = { increment: 1 }
  }

  if (sentiment === "negative") {
    summaryUpdate.negativeCount = { increment: 1 }
  }

  await prisma.placeSummary.update({
    where: { placeId },
    data: summaryUpdate
  })

  
  const recentReviews = await prisma.feedback.findMany({
    where: { placeId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      description: true
    }
  })
  const reviewText = recentReviews
  .map((r, i) => `${i + 1}. ${r.description}`)
  .join("\n")

  const localsSay = await generateLocalsSay(reviewText)

  await prisma.placeSummary.update({
    where: { placeId },
    data: {
      localsSay
    }
  })

  return NextResponse.redirect(new URL("/add?success=1", request.url))
}