import PageHeader from "@/components/page-header";
import CategoriesClient from "./categories-client";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // ISR - revalidate every 1 hour

export default async function Categories() {

  const categories = await prisma.category.findMany({
    // where: { active: true },
    // orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen bg-white border border-gray-100 pb-20">
      <div className="max-w-md mx-auto px-4 pt-4 pb-6">

        <PageHeader title="Categories" />

        <CategoriesClient categories={categories} />

      </div>
    </main>
  );
}