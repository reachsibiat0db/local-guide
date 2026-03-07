"use client";

import { useEffect, useState } from "react";

export default function AreaSelector() {

  const [areas, setAreas] = useState<any[]>([]); // NEW
  const [area, setArea] = useState(""); // UPDATED
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAreas() {
      const res = await fetch("/api/areas");
      const data = await res.json();

      setAreas(data);
      setLoading(false);
    }

    loadAreas();

    const saved = localStorage.getItem("area");
    if (saved) setArea(saved);
  }, []);

  const changeArea = (val: string) => {

    const selected = areas.find(a => a.name === val); // NEW

    if (!selected) return;

    localStorage.setItem("areaId", selected.id.toString()); // UPDATED
    localStorage.setItem("area", selected.name); // UPDATED

    setArea(val);
    window.location.reload(); // MVP refresh
  };

  // if (areas.length === 0) {
  //   return <div className="text-sm text-gray-400">Loading areas...</div>;
  // }
  return (
    <div className="flex justify-center mb-4 h-10">
      {loading ? (
        <div className="w-40 h-10 flex items-center justify-center gap-2 rounded-lg bg-gray-100 text-gray-400 text-sm animate-pulse">
          📍 Loading area...
        </div>
      ) : (
        <select
          value={area}
          onChange={(e) => changeArea(e.target.value)}
          className="border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 text-sm"
        >
          {areas.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}