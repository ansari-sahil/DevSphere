"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    API.get("/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {!stats ? (
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {stats.users}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {stats.active}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admins</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {stats.admins}
              </CardContent>
            </Card>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
