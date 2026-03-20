"use client"

import { useState } from "react"

type Props = {
  placeId: number
  placeName: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void // 🔥 NEW
}

export default function ReviewSheet({ placeId, placeName, isOpen, onClose, onSuccess }: Props) {

  const [description, setDescription] = useState("")
  const [contact, setContact] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) // 🔥 NEW

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 animate-slideUp max-h-[65vh] overflow-y-auto">

        {/* Drag Handle */}
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">{placeName}</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            if (isSubmitting) return // 🔥 prevent double click

            setIsSubmitting(true)

            const formData = new FormData(e.currentTarget)

            const res = await fetch("/api/recommendation", {
              method: "POST",
              body: formData,
              headers: {
                "Accept": "application/json"
              }
            })

            if (res.ok) {

              // reset form
              setDescription("")
              setContact("")

              // 🔥 refresh parent (important)
              onSuccess?.()

              // small delay for better UX
              setTimeout(() => {
                onClose()
              }, 500)

            }

            setIsSubmitting(false)
          }}
          className="space-y-3"
        >

          <input type="hidden" name="placeId" value={placeId} />

          <textarea
            name="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Share your experience..."
          />

          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Phone (optional)"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-white transition
              ${isSubmitting ? "bg-gray-400" : "bg-black"}
            `}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

        </form>

      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  )
}