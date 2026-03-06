import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const feedback = await prisma.feedback.create({
    data: {
      placeId: body.placeId,
      description: body.description,
      type: body.type,
      severity: body.severity,
    },
  });

  return NextResponse.json(feedback);
}