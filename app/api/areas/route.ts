import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const areas = await prisma.area.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(areas);
}