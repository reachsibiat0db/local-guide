"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import EmptyState from "@/components/empty-state";
// import { CATEGORIES } from "@/lib/categories";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import AreaSelector from "@/components/area-selector";

type Review = {
  id: number;
  description: string;
  createdAt: string;
};

type Place = {
  id: number;
  name: string;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  totalReviews: number;
  lastUpdated: string | null;
  localsSay: string | null;
  reviews: Review[];
};

export default function CategoryPage() {

  const [areaId, setAreaId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null);
  const [expandedLocalsSay, setExpandedLocalsSay] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryLabel, setCategoryLabel] = useState<string>(""); // NEW
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const params = useParams();
  const slug = params.slug as string;
  
  useEffect(() => {
    async function loadCategory() {
      const res = await fetch(`/api/categories`)
      const data = await res.json()

      const found = data.find((c: any) => c.slug === slug)

      if (found) {
        setCategoryId(found.id)
      }
    }

    loadCategory()
  }, [slug])


  // useEffect(() => {
  //   async function loadCategory() {
  //     const res = await fetch(`/api/categories`);
  //     const data = await res.json();

  //     const found = data.find((c: any) => c.slug === slug);

  //     if (found) {
  //       setCategoryLabel(found.label);
  //       console.log("Category Label:",categoryLabel)
  //     }
  //   }

  //   loadCategory();
  // }, [slug]);

  useEffect(() => {
    const saved = localStorage.getItem("areaId");
    console.log("Area:",saved)
    if (saved) setAreaId(saved);
  }, []);

  useEffect(() => {
    if (!areaId || !categoryId) return; // prevents early call

    async function loadPlaces() {
      setLoading(true); // added
      const res = await fetch(
        `/api/places?areaId=${areaId}&categoryId=${categoryId}`
      );
      const data = await res.json();
      setPlaces(data);
      setLoading(false); // added
    }

    loadPlaces();
  }, [areaId, categoryId]);

  function getStatusMessage(pos: number, neg: number) {

    if (pos > neg) {
      return {
        text: "Mostly positive feedback",
        color: "text-green-600"
      };
    }

    if (neg > pos) {
      return {
        text: "⚠ Mixed or mostly negative feedback",
        color: "text-red-500"
      };
    }

    return {
      text: "Mixed feedback",
      color: "text-yellow-600"
    };
  }



  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <AreaSelector />
        <PageHeader title={categoryLabel || slug} />

          {loading ? (
            <div className="space-y-4 mt-4">
              {[1,2,3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                  {/* Header row */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-4 mb-2">
                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>

                  {/* Last updated */}
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>

                  {/* Status */}
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : places.length === 0 ? (
            <EmptyState />
          ) : (

          places.map((place) => {

            const status = getStatusMessage(
              place.positiveCount,
              place.negativeCount
            );

            const isNegativeDominant =
              place.negativeCount > place.positiveCount;

              const MAX_LENGTH = 60

              const truncatedLocals =
                place.localsSay && place.localsSay.length > MAX_LENGTH
                  ? place.localsSay.slice(0, MAX_LENGTH) + "..."
                  : place.localsSay

            return (
              <div
                key={place.id}
                onClick={() =>
                  setExpanded(expanded === place.id ? null : place.id)
                }
                className={`p-4 rounded-xl border transition cursor-pointer active:scale-[0.99] mb-4
                  ${
                    isNegativeDominant
                      ? "bg-red-50 border-red-200 shadow-none"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
              >

                {/* Header Row */}
                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-black">
                    {place.name}
                  </h3>

                  {expanded === place.id ? (
                    <ChevronDown size={18} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}

                </div>

                {/* Counts */}
                <div className="text-sm mt-2 flex gap-4 items-center text-gray-600">

                  <span>👍 {place.positiveCount}</span>
                  <span>👎 {place.negativeCount}</span>
                  <span>😐 {place.neutralCount}</span>
                  <span>• {place.totalReviews} reviews</span>

                </div>

                {/* Last Updated */}
                <p className="text-xs text-gray-400 mt-1">
                  Last updated{" "}
                  {place.lastUpdated
                    ? new Date(place.lastUpdated).toLocaleDateString()
                    : "—"}
                </p>

                {/* Status Message */}
                <p className={`text-xs mt-2 ${status.color}`}>
                  {status.text}
                </p>

                {/* Locals Say */}
                {place.localsSay && (
                  <div className="text-sm text-gray-600 mt-2 italic">
                    <span>
                      Locals say:{" "}
                      {expandedLocalsSay === place.id
                        ? place.localsSay
                        : truncatedLocals}
                    </span>

                    {place.localsSay.length > MAX_LENGTH && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedLocalsSay(
                            expandedLocalsSay === place.id ? null : place.id
                          )
                        }}
                        className="ml-1 text-blue-600 text-xs"
                      >
                        {expandedLocalsSay === place.id ? "less" : "more"}
                      </button>
                    )}
                  </div>
                )}

                {/* Expanded Reviews */}
                {expanded === place.id && (

                  <div className="mt-4 border-t pt-3">

                    <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">

                      {place.reviews.map((review) => (

                        <div key={review.id}>

                          <p className="text-sm text-gray-700">
                            {review.description}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>

                        </div>

                      ))}

                    </div>

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