"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import DashboardLayout from "@/components/dashboard-layout";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    API.get("/api/auth/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </DashboardLayout>
  );
}
