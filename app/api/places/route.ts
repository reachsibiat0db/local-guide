import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url)

  const areaIdParam = searchParams.get("areaId")
  // const categoryId = searchParams.get("categoryId")
  const categorySlug = searchParams.get("categorySlug")
  const search = searchParams.get("search")
  const categoryIdParam = searchParams.get("categoryId")

  if (!areaIdParam || !categoryIdParam) {
  return NextResponse.json([])
  }

  const areaId = Number(areaIdParam)
  const categoryId = Number(categoryIdParam)

  if (Number.isNaN(areaId)) {
    return NextResponse.json([])
  }

  if (!categoryIdParam) {
    return NextResponse.json([])
  }

  // const category = await prisma.category.findUnique({
  //   where: { slug: categorySlug }
  // })

  // if (!category) {
  //   return NextResponse.json([])
  // }

  if (!areaId) {
    return NextResponse.json([])
  }

  const places = await prisma.place.findMany({
    where: {
      areaId: areaId,
      categoryId: categoryId,
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    },
    orderBy: { name: "asc" },
    include: {
      summary: true,
      feedbacks: {
        orderBy: { createdAt: "desc" },
        take: 15
      }
    }
  })

  const result = places.map((place) => {

    const positive = place.summary?.positiveCount ?? 0
    const negative = place.summary?.negativeCount ?? 0
    const total = place.summary?.totalReviews ?? 0
    const neutral = total - positive - negative

    return {
      id: place.id,
      name: place.name,

      positiveCount: positive,
      negativeCount: negative,
      neutralCount: neutral,
      totalReviews: total,

      lastUpdated: place.summary?.lastUpdated ?? null,
      localsSay: place.summary?.localsSay ?? null,

      reviews: place.feedbacks.map((f) => ({
        id: f.id,
        description: f.description,
        createdAt: f.createdAt
      }))
    }

  })

  console.log("categoryId:", categoryId)
  console.log("areaId:", areaId)

  return NextResponse.json(result)
}



export async function POST(request: NextRequest) {

  const body = await request.json()

  const { name, areaId, categoryId } = body

  if (!name || !areaId || !categoryId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const normalizedName = name.trim()

  const existingPlace = await prisma.place.findFirst({
    where: {
      areaId: Number(areaId),
      categoryId: Number(categoryId),
      name: {
        equals: normalizedName,
        mode: "insensitive"
      }
    }
  })

  if (existingPlace) {
    return NextResponse.json({
      place: existingPlace,
      duplicate: true
    })
  }

  const place = await prisma.place.create({
    data: {
      name: normalizedName,
      areaId: Number(areaId),
      categoryId: Number(categoryId)
    }
  })

  // create summary row
  await prisma.placeSummary.create({
    data: {
      placeId: place.id
    }
  })

  return NextResponse.json({
    place,
    duplicate: false
  })
}

