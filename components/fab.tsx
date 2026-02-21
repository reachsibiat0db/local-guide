"use client";

import { Plus } from "lucide-react";

export default function AddPlaceFAB() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdPIAvFsaQeKHwAJWAC33xvvqW3mtoMaGRhfGeXf8MTsUpjvg/viewform"
      target="_blank"
      className="
        group fixed bottom-40 right-5
        flex items-center justify-center
        h-10 w-10 hover:w-auto
        bg-gray-900 text-white
        rounded-full
        shadow-lg
        transition-all duration-300
        px-3
      "
    >
      {/* Centered + icon */}
            {/* ICON WRAPPER (true center anchor) */}
      <div className="flex items-center justify-center w-6 h-6">
        <Plus size={28} viewBox="0 0 18 24" strokeWidth={2.5} />
      </div>
      

      {/* Expanding label */}
      <span
        className="
          ml-2 whitespace-nowrap
          max-w-0 overflow-hidden
          group-hover:max-w-[140px]
          transition-all duration-300
          text-sm font-medium
        "
      >
        Recommend
      </span>
    </a>
  );
}