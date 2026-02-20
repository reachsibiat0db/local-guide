"use client";

import PageHeader from "@/components/page-header";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-6">
        <PageHeader title="Suggest a Place" />

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdPIAvFsaQeKHwAJWAC33xvvqW3mtoMaGRhfGeXf8MTsUpjvg/viewform?embedded=true"
            width="100%"
            height="650"
            className="border-0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </main>
  );
}
