"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  HomeIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline"

export default function BottomNav() {

  const pathname = usePathname()

  const nav = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Categories", href: "/categories", icon: Squares2X2Icon },
    { name: "Recommend", href: "/add", icon: PlusCircleIcon },
    { name: "About", href: "/about", icon: InformationCircleIcon },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-around py-2">

        {nav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                active ? "text-black" : "text-gray-400"
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              {item.name}
            </Link>
          )
        })}

      </div>
    </div>
  )
}