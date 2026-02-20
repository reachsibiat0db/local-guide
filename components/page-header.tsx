"use client";

import { useRouter } from "next/navigation";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => router.back()}
        className="text-xl p-2 -ml-2"
        aria-label="Go back"
      >
        ←
      </button>

      <h1 className="text-lg font-semibold capitalize">{title}</h1>
    </div>
  );
}
