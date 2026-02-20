"use client";

import { useRouter } from "next/navigation";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => router.back()}
        className="text-2xl p-2 -ml-2 text-gray-900 rounded-full active:bg-gray-200 transition"
        aria-label="Go back"
      >
        ‹
      </button>

      <h1 className="text-lg font-semibold text-gray-900 capitalize">{title}</h1>
    </div>
  );
}
