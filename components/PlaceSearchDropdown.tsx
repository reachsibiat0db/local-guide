"use client"
console.log("PlaceSearchDropdown rendered")
import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"

type Props = {
  areaId: string
  categoryId: string
  name: string
  onChange?: (name: string) => void
}

type Place = {
  id: number
  name: string
}

export default function PlaceSearchDropdown({ areaId, categoryId, name, onChange }: Props) {

  const [places, setPlaces] = useState<Place[]>([])
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Place | null>(null)

  useEffect(() => {

    if (!areaId || !categoryId) return

    fetch(`/api/places?areaId=${areaId}&categoryId=${categoryId}`)
      .then(res => res.json())
      .then(data => setPlaces(data))
  }, [areaId, categoryId])

  console.log("AreaId" , areaId)
  console.log("CategoryId" , places)
  
  const filtered =
    query === ""
      ? places
      : places.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )

  return (

    <div>

      <label className="block text-sm font-medium mb-1">
        Place *
      </label>

      <Combobox value={selected} onChange={(place: Place | null) => {
        setSelected(place)
        if (place) {
          setQuery(place.name)
          onChange?.(place.name)
        }
      }}>

        <div className="relative">

          <Combobox.Input
            className="w-full border rounded-lg px-3 py-2"
            displayValue={(place: Place) => place?.name || query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or add place"
          />

          {/* <input
            type="hidden"
            name={name}
            value={selected?.id || query}
          /> */}

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow">

            {filtered.map((place) => (
              <Combobox.Option
                key={place.id}
                value={place}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                
              >
                {place.name}
              </Combobox.Option>
            ))}

            {filtered.length === 0 && query !== "" && (
              <div className="px-3 py-2 text-gray-500">
                No matching results — press Enter to create
              </div>
            )}

          </Combobox.Options>

        </div>

      </Combobox>

    </div>
  )
}