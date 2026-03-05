import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url)

  const areaId = searchParams.get("areaId")
  const categoryId = searchParams.get("categoryId")
  const search = searchParams.get("search") // UPDATED: support search filtering

  if (!areaId || !categoryId) {
    return NextResponse.json([])
  }
  
  console.log("API called with:", { areaId, categoryId, search }) // UPDATED

  const places = await prisma.place.findMany({
    where: {
      areaId: Number(areaId),
      categoryId: Number(categoryId),
      ...(search && { // UPDATED: optional search filter
        name: {
          contains: search,
          mode: "insensitive"
        }
      })
    },
    orderBy: {
      name: "asc"
    }
  })

  console.log("Places from DB:", places)

  return NextResponse.json(places)
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

  // normalize name
  const normalizedName = name.trim()

  // check duplicate
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

  // if duplicate found → return existing place
  if (existingPlace) {
    return NextResponse.json({
      place: existingPlace,
      duplicate: true
    })
  }

  // create new place
  const place = await prisma.place.create({
    data: {
      name: normalizedName,
      areaId: Number(areaId),
      categoryId: Number(categoryId)
    }
  })

  return NextResponse.json({
    place,
    duplicate: false
  })
}