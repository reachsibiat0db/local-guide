import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const areaId = searchParams.get("areaId"); // UPDATED

  if (!areaId) {
    return NextResponse.json([]);
  }

  const places = await prisma.place.findMany({
    where: {
      areaId: Number(areaId) // UPDATED
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 5
  });

  return NextResponse.json(places);
}