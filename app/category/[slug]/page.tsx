"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import { DATA } from "@/lib/data";
import { Listing } from "@/types/listing";
import { useParams } from "next/navigation";
import EmptyState from "@/components/empty-state";
import { CATEGORIES } from "@/lib/categories";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function CategoryPage() {
  const [area, setArea] = useState("kolathur");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
  }, []);

  const params = useParams();
  const slug = params.slug as string;
  const reviews: Listing[] = DATA[area]?.[slug] || [];
  const category = CATEGORIES.find((c) => c.slug === slug);

  const grouped = reviews.reduce<Record<string, Listing[]>>((acc, review) => {
    if (!acc[review.name]) acc[review.name] = [];
    acc[review.name].push(review);
    return acc;
  }, {});

  const places = Object.entries(grouped);

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title={category?.label || slug} />

        {places.length === 0 ? (
          <EmptyState />
        ) : (
          places.map(([placeName, placeReviews]) => {
            const positiveCount = placeReviews.filter(
              (r) => r.sentiment === "positive"
            ).length;

            const negativeCount = placeReviews.filter(
              (r) => r.sentiment === "negative"
            ).length;

            const isNegativeDominant = negativeCount > positiveCount;

            const latestDate = placeReviews
              .map((r) => new Date(r.createdAt))
              .sort((a, b) => b.getTime() - a.getTime())[0];

            return (
              <div
                key={placeName}
                onClick={() =>
                  setExpanded(expanded === placeName ? null : placeName)
                }
                className={`p-4 rounded-xl border transition cursor-pointer active:scale-[0.99] mb-4
                  ${
                    isNegativeDominant
                      ? "bg-red-50 border-red-200 shadow-none"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
              >
                {/* Header Row (Name + Chevron) */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-black">
                    {placeName}
                  </h3>
                  {expanded === placeName ? (
                    <ChevronDown size={18} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </div>

                {/* Aggregated Info */}
                <div className="text-sm mt-2 flex gap-4 items-center text-gray-600">
                  <span>👍 {positiveCount}</span>
                  <span>👎 {negativeCount}</span>
                  <span>• {placeReviews.length} reviews</span>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Last updated{" "}
                  {latestDate
                    ? latestDate.toLocaleDateString()
                    : "—"}
                </p>

                {isNegativeDominant && (
                  <p className="text-xs text-red-500 mt-2">
                    ⚠ Mixed or mostly negative feedback
                  </p>
                )}

                {/* Expanded Reviews */}
                {expanded === placeName && (
                  <div className="mt-4 border-t pt-3 space-y-3">
                    {placeReviews
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .map((review, index) => (
                        <div key={index}>
                          <p className="text-sm text-gray-700">
                            {review.comment}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}