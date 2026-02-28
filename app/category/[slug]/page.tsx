"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import { DATA } from "@/lib/data";
import { Listing } from "@/types/listing";
import { useParams } from "next/navigation";
import EmptyState from "@/components/empty-state";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryPage() {
  const [area, setArea] = useState("kolathur");
  useEffect(() => {
    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
  }, []);

  const params = useParams();
  const slug = params.slug as string;
  const items: Listing[] = DATA[area]?.[slug] || [];
  const category = CATEGORIES.find((c) => c.slug === slug);
  
  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title={category?.label || slug} />
        
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            items.map((item) => (
              <div
                key={item.name}
                className="p-4 bg-white rounded-xl shadow-sm"
              >
                <h3 className="font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.note}</p>
              </div>
            ))
          )}
      </div>
    </main>
  );
}
