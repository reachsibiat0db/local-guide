import PageHeader from "@/components/page-header";
const data: Record<string, any[]> = {
  electricians: [
    {
      name: "Raja Electrician",
      note: "Recommended by multiple apartments. Fast response.",
    },
    {
      name: "Kumar Electricals",
      note: "Affordable and reliable.",
    },
  ],
  restaurants: [
    {
      name: "Anjappar",
      note: "Popular for family dining.",
    },
  ],
  salons: [
    {
      name: "Green Trends",
      note: "Budget friendly and clean.",
    },
  ],
  internet: [
    {
      name: "ACT Fibernet",
      note: "Fast and reliable in most apartments.",
    },
  ],
};

export default async function CategoryPage({ params }: any) {
  const { slug } = await params; // ✅ NEW FIX

  const items = data[slug] || [];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-6">
        <PageHeader title={slug} />

        {items.map((item, i) => (
          <div key={i} className="mb-3 bg-white rounded-2xl shadow-sm p-4">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{item.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
