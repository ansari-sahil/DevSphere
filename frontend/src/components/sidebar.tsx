"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function Sidebar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    API.get("api/auth/profile")
      .then((res) => setRole(res.data.role))
      .catch(() => setRole(""));
  }, []);

  return (
    <aside className="w-64 border-r p-6 space-y-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>

      {role === "admin" && (
        <>
          <Link href="/admin">Admin Panel</Link>
          <Link href="/admin/users">Manage Users</Link>
        </>
      )}
    </aside>
  );
}
