import Link from "next/link";
import PageHeader from "@/components/page-header";
import { CATEGORIES } from "@/lib/categories";


export default function Categories() {
  return (
    <main className="min-h-screen bg-white border border-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">
        <PageHeader title="Categories" />

        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center text-gray-900 font-semibold active:scale-95 transition"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
