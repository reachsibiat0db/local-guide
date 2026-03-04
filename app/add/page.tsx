import { prisma } from "@/lib/prisma"

export default async function AddPage() {

    const areas = await prisma.area.findMany({
        orderBy: { name: "asc" }
    })

  return (
    <div className="max-w-2xl mx-auto mt-2 bg-white p-3 rounded-xl shadow">

      <h1 className="text-2xl font-semibold mb-2">
        Add Recommendation
      </h1>

      <form className="space-y-2">

        <div className="grid grid-cols-2 gap-4">

          {/* Area */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Area *
            </label>

            <select name="areaId" className="w-full border rounded-lg px-3 py-2">
              <option>Select Area</option>
              {areas.map((area: { id: number; name: string }) => (
                    <option key={area.id} value={area.id}>
                    {area.name}
                    </option>
                ))}
            </select>
          </div>

          {/* Category */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Category *
            </label>

            <select className="w-full border rounded-lg px-3 py-2">
              <option>Select Category</option>
            </select>
          </div>

        </div>

        {/* Place */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Name of the Place *
          </label>

          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Eg: Murugan Idli Shop"
          />
        </div>

        {/* Contact */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact (optional)
          </label>

          <input
            type="tel"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Phone number"
          />
        </div>

        {/* Title */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Title *
          </label>

          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Short title"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>

          <textarea
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Describe your experience..."
          />
        </div>

        <button className="w-full bg-black text-white py-3 rounded-xl text-lg font-medium shadow">
            Submit Recommendation
        </button>

      </form>

    </div>
  );
}