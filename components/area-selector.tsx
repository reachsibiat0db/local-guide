"use client";

import { useEffect, useState } from "react";
import { AREAS } from "@/lib/areas";

export default function AreaSelector() {
  const [area, setArea] = useState("Kolathur");

  useEffect(() => {
    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
  }, []);

  const changeArea = (val: string) => {
    localStorage.setItem("area", val);
    setArea(val);
    window.location.reload(); // MVP refresh
  };

  return (
    <div className="flex justify-center mb-4">
      <select
        value={area}
        onChange={(e) => changeArea(e.target.value)}
        className="border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 text-sm"
      >
        {AREAS.map((a) => (
          <option key={a.id} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  );
}