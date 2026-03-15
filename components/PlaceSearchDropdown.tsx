"use client"

import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"

type Props = {
  name: string
  onChange?: (name: string, exists?: boolean, placeId?: number) => void
}


type Place = {
  id: number
  name: string
  area?: {
    name: string
  }
}

export default function PlaceSearchDropdown({ name, onChange }: Props) {

  const [query, setQuery] = useState("")
  const [places, setPlaces] = useState<Place[]>([])
  const [selected, setSelected] = useState<Place | null>(null)

  useEffect(() => {

    if (query.length < 1) {
      setPlaces([])
      return
    }

    const timer = setTimeout(() => {

      fetch(`/api/places?search=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setPlaces(data))

    }, 120)

    return () => clearTimeout(timer)

  }, [query])

  return (

    <div>

      <label className="block text-sm font-medium mb-1">
        Place *
      </label>

      <Combobox
        value={selected}
        onChange={(place: Place | null) => {

          setSelected(place)

          if (!place) return

          // NEW PLACE
          if (place.id === -1) {
            setQuery(place.name)
            onChange?.(place.name, false, undefined)
            return
          }

          // EXISTING PLACE
          const fullName = place.area
            ? `${place.name} — ${place.area.name}`
            : place.name

          setQuery(fullName)
          onChange?.(fullName, true, place.id)
        }}
      >

        <div className="relative">

          <Combobox.Input
            className="w-full border rounded-lg px-3 py-2"
            displayValue={() => query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(null)
            }}
            placeholder="Search place (e.g. Saravana Bhavan)"
          />

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow">

            {places.map((place) => (

              <Combobox.Option
                key={place.id}
                value={place}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              >

                {place.name}
                {place.area && (
                  <span className="text-gray-500 text-sm">
                    {" "}— {place.area.name}
                  </span>
                )}

              </Combobox.Option>

            ))}

            {query !== "" && (

            <Combobox.Option
              value={{ id: -1, name: query }}
              className="cursor-pointer px-3 py-2 border-t text-blue-600 hover:bg-gray-100"
            >
              + Add new place "{query}"
            </Combobox.Option>

            )}

          </Combobox.Options>

        </div>

      </Combobox>

    </div>
  )
}