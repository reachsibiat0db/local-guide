import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { analyzeReview } from "@/lib/ai/analyzeReview"
import { generateLocalsSay } from "@/lib/ai/generateLocalsSay"

export async function POST(request: NextRequest) {

  const formData = await request.formData()

  const areaIdRaw = formData.get("areaId")
  const categoryIdRaw = formData.get("categoryId")
  const placeIdInput = formData.get("placeId")

  const placeInput = String(formData.get("place") || "")
  const description = String(formData.get("description") || "")
  const contact = String(formData.get("contact") || "")

  const accept = request.headers.get("accept") || ""

  let placeId: number

  // 🔥 EXISTING PLACE FLOW
  if (placeIdInput) {

    placeId = Number(placeIdInput)

  } else {

    const areaId = Number(areaIdRaw)
    const categoryId = Number(categoryIdRaw)

    // ❗ Safety check (avoid DB crash)
    if (!areaId || !categoryId || !placeInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // 🔥 CREATE NEW PLACE
    const newPlace = await prisma.place.create({
      data: {
        name: placeInput.trim(),
        areaId,
        categoryId
      }
    })

    placeId = newPlace.id

    await prisma.placeSummary.create({
      data: {
        placeId
      }
    })
  }

  // 🔥 AI ANALYSIS
  const ai = await analyzeReview(description)

  const sentiment = ai.sentiment as "positive" | "negative" | "mixed"

  // 🔥 CREATE FEEDBACK
  await prisma.feedback.create({
    data: {
      placeId,
      description,
      sentiment,
      contact
    }
  })

  // 🔥 UPDATE SUMMARY COUNTS
  const summaryUpdate: any = {
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

  // 🔥 REGENERATE LOCALS SAY
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

  // 🔥 DUAL RESPONSE HANDLING

  // For Bottom Sheet (fetch)
  if (accept.includes("application/json")) {
    return NextResponse.json({ success: true })
  }

  // For Add Recommendation Page (form submit)
  return NextResponse.redirect(new URL("/add?success=1", request.url))
}