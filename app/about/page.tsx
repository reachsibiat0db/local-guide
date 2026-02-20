import PageHeader from "@/components/page-header";
export default function About() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto p-6">
        <PageHeader title="About" />
        <p className="text-gray-500 mt-2 text-sm">
          Local Guide helps people discover trusted services in their area.
        </p>
      </div>
    </main>
  );
}
