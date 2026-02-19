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
  const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // get user role
        const profile = await API.get("/auth/profile");
        const userRole = profile.data.role;

        setRole(userRole);

        // if admin → fetch stats
        if (userRole === "admin") {
          const res = await API.get("/api/admin/stats");
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Dashboard load error");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-muted-foreground">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {role === "admin" ? <AdminDashboard stats={stats} /> : <UserDashboard />}
    </DashboardLayout>
  );
}

function AdminDashboard({ stats }: { stats: Stats | null }) {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Admin Overview</h1>

      {!stats ? (
        <p className="text-muted-foreground">Loading stats...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="Active Users" value={stats.activeUsers} />
          <StatCard label="Admins" value={stats.admins} />
          <StatCard label="Verified Users" value={stats.verifiedUsers} />
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4">
          <ActionButton text="Manage Users" href="/admin" />
          <ActionButton text="Create Event" href="/admin" />
        </div>
      </div>
    </>
  );
}

function UserDashboard() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Welcome Back 👋</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Upcoming Events" value="No events registered" />

        <DashboardCard title="Your Activity" value="No recent activity" />
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 rounded-xl bg-card/70 backdrop-blur-xl border border-border">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-card/70 backdrop-blur-xl border border-border">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg mt-2">{value}</p>
    </div>
  );
}

function ActionButton({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="px-6 py-3 rounded-lg bg-primary text-white hover:opacity-90 transition"
    >
      {text}
    </a>
  );
}
