"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import DashboardLayout from "@/components/dashboard-layout";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  verifiedUsers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1️⃣ get logged-in user
        const profileRes = await API.get("/api/auth/profile");
        const user = profileRes.data;

        // 2️⃣ if admin → fetch stats
        if (user.role === "admin") {
          const statsRes = await API.get("/api/admin/stats");
          setStats(statsRes.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading && <p>Loading...</p>}

      {!loading && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="p-6 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">{stats.activeUsers}</p>
          </div>

          <div className="p-6 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Admins</p>
            <p className="text-2xl font-bold">{stats.admins}</p>
          </div>

          <div className="p-6 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Verified Users</p>
            <p className="text-2xl font-bold">{stats.verifiedUsers}</p>
          </div>
        </div>
      )}

      {!loading && !stats && (
        <p className="text-muted-foreground">
          Welcome! You are logged in successfully.
        </p>
      )}
    </DashboardLayout>
  );
}
