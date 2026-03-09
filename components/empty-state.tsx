"use client";

import Link from "next/link";

export default function EmptyState({
  message = "No listings yet.",
  subtext = "Be the first to Recommend 🙌",
  showCTA = true,
}) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-sm">{message}</p>
      <p className="text-xs text-gray-400 mt-2">{subtext}</p>

      {showCTA && (
        <Link
          href="/add"
          className="inline-block mt-5 px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-black rounded-lg"
        >
          Add a recommendation
        </Link>
      )}
    </div>
  );
}