"use client"

import { Suspense } from "react"
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
  const router = useRouter()

  const successParam = searchParams.get("success")

  const [showSuccess, setShowSuccess] = useState(successParam === "1")
  const [fadeOut, setFadeOut] = useState(false)

  const [place, setPlace] = useState("")
  const [placeExists, setPlaceExists] = useState<boolean | null>(null)
  const [placeChosen, setPlaceChosen] = useState(false)

  const [areaId, setAreaId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [placeId, setPlaceId] = useState<number | null>(null)

  useEffect(() => {
    if (showSuccess) {

      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
      }, 2500)

      const timer = setTimeout(() => {
        setShowSuccess(false)
        router.replace("/add")
      }, 3000)

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

        {/* PLACE SEARCH */}

        <Suspense fallback={null}>
          <PlaceSearchDropdown
            name="place"
            onChange={(name: string, exists?: boolean, id?: number) => {
              setPlace(name)
              console.log("Place selected:", name, exists)
              setPlaceExists(exists ?? false)
              setPlaceChosen(true)
              setPlaceId(id ?? null)
            }}
          />
        </Suspense>
        {/* <div className="text-xs text-gray-400">
          chosen: {String(placeChosen)} | exists: {String(placeExists)}
        </div> */}
        <input type="hidden" name="place" value={place} required />
        <input type="hidden" name="placeId" value={placeId ?? ""} />
        <input type="hidden" name="placeName" value={placeExists ? "" : place} />

        {/* SHOW AREA + CATEGORY ONLY IF NEW PLACE */}

        {placeChosen && placeExists === false && (

          <div className="grid grid-cols-2 gap-4">

            <SearchableDropdown
              items={areas}
              label="Area *"
              name="areaId"
              onChange={(id) => setAreaId(id)}
            />

            <input type="hidden" name="areaId" value={areaId} required />

            <SearchableDropdown
              items={categories}
              label="Category *"
              name="categoryId"
              onChange={(id) => setCategoryId(id)}
            />

            <input type="hidden" name="categoryId" value={categoryId} required />

          </div>

        )}

        {/* CONTACT */}

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

        {/* DESCRIPTION */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>

          <textarea
            name="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Describe your experience..."
          />
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={
            !place ||
            !description.trim() ||
            (placeExists === false && (!areaId || !categoryId))
          }
          className={`w-full py-3 rounded-xl text-lg font-medium shadow 
          ${
            !place ||
            !description.trim() ||
            (placeExists === false && (!areaId || !categoryId))
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white cursor-pointer"
          }`}
        >
          Submit Recommendation
        </button>

      </form>

    </div>
  )
}