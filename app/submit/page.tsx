"use client";

import PageHeader from "@/components/page-header";
import { useEffect, useState } from "react";
import { buildFormUrl } from "@/lib/form";


export default function SubmitPage() {

  const [formUrl, setFormUrl] = useState("");

  useEffect(() => {
    const area = localStorage.getItem("area") || "Kolathur";
    const url = buildFormUrl({ area });
    setFormUrl(url);
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title="Recommend" />

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {formUrl && (
            <iframe
              src={formUrl}
              width="100%"
              height="600"
              className="border-0"
            />
          )}
        </div>
      </div>
    </main>
  );
}
