"use client";

import { Bug } from "lucide-react";

export default function ReportBug() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSecszyDz--KricWfOcKX3feos92P_0qzy20w3kMl6sK9Kh56g/viewform"
      target="_blank"
      className="
        group fixed right-5
        bottom-[max(6.5rem,env(safe-area-inset-bottom))]  /* ⭐ stacked above + FAB */

        flex items-center
        h-10 w-10 md:hover:w-auto   /* ⭐ hover only on desktop */

        bg-gray-900 text-white
        rounded-full
        shadow-lg
        transition-all duration-300
        px-3
        active:scale-95

        md:hover:shadow-xl md:hover:shadow-black/30
      "
    >
      {/* ICON (unchanged) */}
      <div className="flex items-center justify-center w-6 h-6">
        <Bug size={16} strokeWidth={2} />
      </div>

      {/* Label — desktop only */}
      <span
        className="
          hidden md:inline-block   /* ⭐ hide on mobile */
          ml-2 whitespace-nowrap
          max-w-0 overflow-hidden
          group-hover:max-w-[120px]
          transition-all duration-300
          text-sm
        "
      >
        Report bug
      </span>
    </a>
  );
}