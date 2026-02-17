"use client";

import Link from "next/link";
import { LayoutDashboard, User, Shield } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-purple-300">DevSphere</h2>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
        >
          <User size={18} /> Profile
        </Link>

        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition"
        >
          <Shield size={18} /> Admin
        </Link>
      </nav>
    </aside>
  );
}
