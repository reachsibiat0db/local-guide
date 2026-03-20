"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AreaSelector from "@/components/area-selector";
import { RECENT } from "@/lib/recent";

export default function Home() {
  const [area, setArea] = useState("");
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const savedArea = localStorage.getItem("area") || "";
    const savedAreaId = localStorage.getItem("areaId") || "";

    setArea(savedArea);

    if (savedAreaId) {
      fetch(`/api/recent?areaId=${savedAreaId}`)
        .then(res => res.json())
        .then(data => setRecent(data));
    }
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">


        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-gray-900">Town</span>
            <span className="text-black">Trust</span>
          </h1>

          <p className="text-sm italic text-gray-500">
            Find places your town trusts.
          </p>
        </div>
        {/* Header */}
        <div className="mt-4">
          <AreaSelector />
        </div>        

        {/* Hero Card */}
        <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-500 mt-1">
            Discover trusted salons, electricians, food spots and more.
          </p>

          <Link
            href="/categories"
            className="block mt-4 bg-black text-white text-center py-3 rounded-xl"
          >
            Explore Categories
          </Link>
        </div>

        {/* 🔥 Recently Added Section */}


        {area && recent.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              🔥 Recently added in {area}
            </h2>

            <div className="space-y-2">
              {recent.map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.category.slug}?placeId=${item.id}`}
                  className="block bg-white rounded-xl p-3 shadow-sm text-sm hover:bg-gray-50"
                >
                  <div className="font-semibold text-black">{item.name}</div>
                  <div className="text-gray-400 text-xs">
                    {item.category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}