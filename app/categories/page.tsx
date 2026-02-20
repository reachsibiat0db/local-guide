import Link from "next/link";
import PageHeader from "@/components/page-header";


const categories = [
  "restaurants",
  "salons",
  "electricians",
  "internet",
  "supermarket",
];

export default function Categories() {
  return (
    <main className="min-h-screen bg-white border border-gray-100 pb-20">
      <div className="max-w-md mx-auto p-6">
        <PageHeader title="Categories" />

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 capitalize text-center text-black font-semibold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
