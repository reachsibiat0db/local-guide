"use client";

import { Plus } from "lucide-react";

export default function AddPlaceFAB() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdPIAvFsaQeKHwAJWAC33xvvqW3mtoMaGRhfGeXf8MTsUpjvg/viewform"
      target="_blank"
      className="
        group fixed right-5
        bottom-[max(3.5rem,env(safe-area-inset-bottom))]  /* ⭐ mobile safe area */

        flex items-center justify-center
        h-10 w-10 md:hover:w-auto   /* ⭐ hover expand only on desktop */

        bg-emerald-900 text-white
        rounded-full
        shadow-lg
        transition-all duration-300
        px-3
        active:scale-95

        md:hover:shadow-xl md:hover:shadow-blue-500/25
      "
    >
      {/* ICON (unchanged) */}
      <div className="flex items-center justify-center w-6 h-6">
        <Plus size={28} viewBox="0 0 24 24" strokeWidth={2.5} />
      </div>

      {/* Label — desktop only */}
      <span
        className="
          hidden md:inline-block   /* ⭐ hide on mobile */
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