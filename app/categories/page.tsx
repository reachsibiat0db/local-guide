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
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title="Categories" />

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 capitalize text-center text-gray-900 font-semibold active:scale-95 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
