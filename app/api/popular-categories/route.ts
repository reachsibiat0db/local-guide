import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const DEFAULT_POPULAR = [
  "restaurant",
  "salon",
  "electrician",
  "hospital",
];

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const area = searchParams.get("area");

  if (!area) {
    return NextResponse.json(DEFAULT_POPULAR);
  }

  // get places in the area
  const places = await prisma.place.findMany({
    where: {
      area: {
        name: area,
      },
    },
    include: {
      category: true,
      feedbacks: true,
    },
  });

  if (places.length === 0) {
    return NextResponse.json(DEFAULT_POPULAR);
  }

  const categoryStats: Record<string, { reviews: number; places: number }> = {};

  places.forEach((p) => {

    const slug = p.category.slug;

    if (!categoryStats[slug]) {
      categoryStats[slug] = { reviews: 0, places: 0 };
    }

    categoryStats[slug].places += 1;
    categoryStats[slug].reviews += p.feedbacks.length;
  });

  // sort by reviews first
  let popular = Object.entries(categoryStats)
    .sort((a, b) => b[1].reviews - a[1].reviews)
    .map(([slug]) => slug);

  // if all reviews = 0 → fallback to place count
  const totalReviews = Object.values(categoryStats).reduce(
    (sum, c) => sum + c.reviews,
    0
  );

  if (totalReviews === 0) {
    popular = Object.entries(categoryStats)
      .sort((a, b) => b[1].places - a[1].places)
      .map(([slug]) => slug);
  }
//  console.log("AREA:", area)
//  console.log("PLACES:", places)

  return NextResponse.json(popular.slice(0, 4));
}