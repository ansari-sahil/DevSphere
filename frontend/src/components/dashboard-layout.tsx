"use client";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
