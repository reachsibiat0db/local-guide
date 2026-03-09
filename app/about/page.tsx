import PageHeader from "@/components/page-header";
export default function About() {
  return (
    <main className="min-h-screen bg-white pb-20">
<div className="max-w-xl mx-auto p-4 space-y-6">
  
  <h1 className="text-xl font-semibold">About TownTrust</h1>

  <p className="text-gray-600 leading-relaxed">
    <span className="font-semibold text-gray-800">TownTrust</span> helps communities
    discover trusted local services through real experiences shared by people nearby.
  </p>

  <div className="space-y-4">

    <div className="flex gap-3">
      <span>🔎</span>
      <div>
        <h3 className="font-medium">Discover</h3>
        <p className="text-gray-600 text-sm">
          Find great restaurants, repair services, and trusted businesses
          recommended by your community.
        </p>
      </div>
    </div>

    <div className="flex gap-3">
      <span>💬</span>
      <div>
        <h3 className="font-medium">Share</h3>
        <p className="text-gray-600 text-sm">
          Share honest reviews and help others make better local decisions.
        </p>
      </div>
    </div>

    <div className="flex gap-3">
      <span>🤝</span>
      <div>
        <h3 className="font-medium">Build Trust</h3>
        <p className="text-gray-600 text-sm">
          Help create a trusted network of local places in your neighborhood.
        </p>
      </div>
    </div>

  </div>
</div>
    </main>
  );
}
