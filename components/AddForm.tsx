"use client"
import { Suspense } from "react";


import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import SearchableDropdown from "./SearchableDropdown"
import PlaceSearchDropdown from "./PlaceSearchDropdown"

type Item = {
  id: number
  name: string
}

type Props = {
  areas: Item[]
  categories: Item[]
}



export default function AddForm({ areas, categories }: Props) {
  const searchParams = useSearchParams()
  const [areaId, setAreaId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const successParam = searchParams.get("success")
  const [showSuccess, setShowSuccess] = useState(successParam === "1")
  const router = useRouter()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (showSuccess) {

        const fadeTimer = setTimeout(() => {
            setFadeOut(true)
        }, 2500) // start fading before disappearing

        const timer = setTimeout(() => {
            setShowSuccess(false)
            // remove query param from URL
            router.replace("/add")
        }, 3000) // disappears after 3 seconds

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(timer)
        }
    }
  }, [showSuccess, router])

  return (

    <div className="max-w-2xl mx-auto px-4 pt-2 pb-32">

      <h1 className="text-2xl font-semibold mb-4">
        Add Recommendation
      </h1>
      {showSuccess && (
        <div
            className={`fixed top-6 right-6 z-50 transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
             Submitted successfully
            </div>
        </div>
        )}
      <form action="/api/recommendation" method="POST" className="space-y-5">

        {/* Area + Category */}

        <div className="grid grid-cols-2 gap-4">

          <SearchableDropdown
            items={areas}
            label="Area"
            name="areaId"
            onChange={(id) => setAreaId(id)}
          />

          <SearchableDropdown
            items={categories}
            label="Category"
            name="categoryId"
            onChange={(id) => setCategoryId(id)}
          />

        </div>

        {/* Place */}
        <Suspense fallback={null}>
            <PlaceSearchDropdown
            areaId={areaId}
            categoryId={categoryId}
            name="place"
            />
        </Suspense>
        {/* Contact */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact (optional)
          </label>

          <input
            type="text"
            name="contact"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Phone number"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>

          <textarea
            name="description"
            required
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Describe your experience..."
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl text-lg font-medium shadow"
        >
          Submit Recommendation
        </button>

      </form>

    </div>
  )
}