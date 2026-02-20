"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import { DATA } from "@/lib/data";
import { Listing } from "@/types/listing";
import { useParams } from "next/navigation";
import EmptyState from "@/components/empty-state";

const data: Record<string, any[]> = {
  electricians: [
    {
      name: "Raja Electrician",
      note: "Recommended by multiple apartments. Fast response.",
    },
    {
      name: "Kumar Electricals",
      note: "Affordable and reliable.",
    },
  ],
  restaurants: [
    {
      name: "Anjappar",
      note: "Popular for family dining.",
    },
  ],
  salons: [
    {
      name: "Green Trends",
      note: "Budget friendly and clean.",
    },
  ],
  internet: [
    {
      name: "ACT Fibernet",
      note: "Fast and reliable in most apartments.",
    },
  ],
};

export default function CategoryPage() {
  const [area, setArea] = useState("kolathur");
  useEffect(() => {
    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
  }, []);

  const params = useParams();
  const slug = params.slug as string;
  const items: Listing[] = DATA[area]?.[slug] || [];

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title={slug} />
        
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
