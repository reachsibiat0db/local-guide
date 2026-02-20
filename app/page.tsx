"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AreaSelector from "@/components/area-selector";
import { RECENT } from "@/lib/recent";

export default function Home() {
  const [area, setArea] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("area") || "";
    setArea(saved);
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        {/* Header */}
        <AreaSelector />

        <h1 className="text-xl font-semibold text-gray-900">
          Local Guide
        </h1>
        <p className="text-gray-500 mt-1">
          Trusted places curated for locals
        </p>

        {/* Hero Card */}
        <div className="mt-6 p-5 bg-white rounded-2xl shadow-sm">
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
        {area && RECENT[area]?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              🔥 Recently added in {area}
            </h2>

            <div className="space-y-2">
              {RECENT[area].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-3 shadow-sm text-sm"
                >
                  <div className="font-semibold text-black">{item.name}</div>
                  <div className="text-gray-400 text-xs">
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}