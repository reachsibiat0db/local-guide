import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">
          Velachery Local Guide
        </h1>
        <p className="text-gray-500 mt-1">
          Trusted places curated for locals
        </p>

        {/* Hero Card */}
        <div className="mt-6 p-5 bg-white rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold">
            New to Velachery?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Discover trusted salons, electricians, food spots and more.
          </p>

          <Link
            href="/categories"
            className="block mt-4 bg-black text-white text-center py-3 rounded-xl"
          >
            Explore Categories
          </Link>
        </div>
      </div>
    </main>
  );
}
