"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();

  const linkClass = (href: string) =>
    `flex flex-col items-center text-xs ${
      path === href ? "text-black font-semibold" : "text-gray-400"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <div className="max-w-md mx-auto flex justify-around py-2">
        <Link href="/" className={linkClass("/")}>
          <span>🏠</span>
          Home
        </Link>

        <Link href="/categories" className={linkClass("/categories")}>
          <span>📂</span>
          Categories
        </Link>
        <Link href="/submit" className={linkClass("/submit")}>
          <span>➕</span>
          Submit
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          <span>ℹ️</span>
          About
        </Link>
      </div>
    </nav>
  );
}
