import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get("area");

  if (!area) {
    return NextResponse.json([]);
  }

  const places = await prisma.place.findMany({
    where: {
      area: {
        name: area
      }
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