"use client"

import { Combobox } from "@headlessui/react"
import { useState } from "react"

type Item = {
  id: number
  name: string
}

type Props = {
  items: Item[]
  label: string
  name: string
  onChange?: (id: string) => void
}

export default function SearchableDropdown({ items, label, name, onChange }: Props) {

  const [selected, setSelected] = useState<Item | null>(null)
  const [query, setQuery] = useState("")

  const filtered =
    query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <div>

      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <Combobox value={selected} 
        onChange={(item: Item | null) => {
        setSelected(item)
        if (item) {
          onChange?.(String(item.id))
        }
        }}>

        <div className="relative">

          {/* INPUT */}

          <Combobox.Input
            className="w-full border rounded-lg px-3 py-2"
            displayValue={(item: Item) => item?.name || ""}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setQuery("")}
            placeholder={`Search ${label}`}
          />

          {/* BUTTON (important for opening dropdown on click) */}

          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            ▼
          </Combobox.Button>

          {/* Hidden input for form submit */}

          <input
            type="hidden"
            name={name}
            value={selected?.id || ""}
          />

          {/* DROPDOWN OPTIONS */}

            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow">

            {filtered.length === 0 ? (
                <div className="px-3 py-2 text-gray-500">
                    No matching results
                </div>
                ) : (
                filtered.map((item) => (
                <Combobox.Option
                    key={item.id}
                    value={item}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                >
                    {item.name}
                </Combobox.Option>
                ))
            )}

            </Combobox.Options>

        </div>

      </Combobox>

    </div>
  )
}