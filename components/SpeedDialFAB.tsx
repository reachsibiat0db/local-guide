"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Bug, MapPin, Pencil } from "lucide-react";

export default function SpeedDialFAB() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const actions = [
    {
      label: "Add place",
      icon: MapPin,
      href: "/add",
    },
    {
      label: "Suggest edit",
      icon: Pencil,
      href: "/edit",
    },
    {
      label: "Report bug",
      icon: Bug,
      href: "https://docs.google.com/forms/d/e/1FAIpQLSecszyDz--KricWfOcKX3feos92P_0qzy20w3kMl6sK9Kh56g/viewform",
      external: true,
    },
  ];

  return (
    <div
      ref={ref}
      className="fixed right-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50"
    >
      {/* Backdrop blur */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Actions */}
      <div className="flex flex-col items-end gap-3 mb-3">
        {actions.map((action, i) => {
          const Icon = action.icon;

          return (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-full
                bg-white text-gray-900
                shadow-lg
                text-sm font-medium
                transition-all duration-300

                ${open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"}

              `}
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms", // stagger
              }}
            >
              <Icon className="w-5 h-5 shrink-0" strokeWidth={2.4} />
              <span>{action.label}</span>
            </a>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-center
          h-40 w-14 md:h-12 md:w-12
          rounded-full
          bg-blue-600 text-white
          shadow-xl
          transition-all duration-300
          active:scale-95
        "
      >
        <Plus
          className={`w-7 h-7 md:w-6 md:h-6 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          strokeWidth={2.8}
        />
      </button>
    </div>
  );
}