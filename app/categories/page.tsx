"use client";

import Link from "next/link";
import PageHeader from "@/components/page-header";
import { CATEGORIES } from "@/lib/categories";
import { useState, useEffect } from "react"

// const POPULAR = ["restaurant", "salon", "electrician", "hospital"]; 
// use slug values from CATEGORIES

export default function Categories() {
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [loadingPopular, setLoadingPopular] = useState(true)
  

  const filtered = CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(query.toLowerCase())
  );

  const popularCategories = CATEGORIES.filter((cat) =>
    popular.includes(cat.slug)
  );

  const gridCategories = filtered.filter(
    (cat) => !popular.includes(cat.slug)
  );

  useEffect(() => {
    const saved = localStorage.getItem("area") || "";

    setArea(saved);

    if (saved) {
      fetch(`/api/popular-categories?area=${saved}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("POPULAR:", data);
          setPopular(data);
          setLoadingPopular(false)
        });
    }
  }, []);
  return (
    <main className="min-h-screen bg-white border border-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">

        <PageHeader title="Categories" />

        {/* Search */}
        <div className="relative mt-3 mb-5">

          {/* Search Icon */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            placeholder="Search categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* Popular (hide while searching) */}
        {!query && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 mb-3">
              Popular
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">

              {loadingPopular && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-14 flex items-center justify-center rounded-2xl bg-gray-100 border border-gray-200 text-sm text-gray-400 animate-pulse"
                    >
                      Loading...
                    </div>
                  ))}
                </>
              )}

              {!loadingPopular &&
                popularCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="bg-gray-100 border border-gray-200 rounded-2xl p-4 text-center font-semibold"
                  >
                    {cat.label}
                  </Link>
                ))
              }

            </div>

            {/* <div className="grid grid-cols-2 gap-4 mb-6">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-gray-100 border border-gray-200 rounded-2xl p-4 text-center font-semibold"
                >
                  {cat.label}
                </Link>
              ))}
            </div> */}
          </>
        )}

        {/* All Categories */}
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          {query ? "Results" : "All Categories"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {(query ? filtered : gridCategories).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center text-gray-900 font-semibold active:scale-95 transition hover:bg-gray-50"
            >
              {cat.label}
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}