"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { LayoutDashboard, User, Shield } from "lucide-react";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setRole(res.data.role);
      } catch {
        setRole("user");
      }
    };

    fetchProfile();
  }, []);

  return (
    <aside className="w-64 min-h-screen bg-linear-to-b from-purple-800 to-purple-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">DevSphere</h1>

      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-purple-300"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 hover:text-purple-300"
        >
          <User size={18} /> Profile
        </Link>

        {/* show ONLY if admin */}
        {role === "admin" && (
          <Link
            href="/admin"
            className="flex items-center gap-3 hover:text-purple-300"
          >
            <Shield size={18} /> Admin
          </Link>
        )}
      </nav>
    </aside>
  );
}
