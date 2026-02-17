"use client";

import DashboardLayout from "@/components/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-purple-200">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: 124 },
          { label: "Active Users", value: 98 },
          { label: "Admins", value: 5 },
          { label: "Verified", value: 110 },
        ].map((item) => (
          <div
            key={item.label}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:scale-105 transition"
          >
            <p className="text-gray-400 text-sm">{item.label}</p>
            <h2 className="text-3xl font-bold text-purple-300">{item.value}</h2>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
