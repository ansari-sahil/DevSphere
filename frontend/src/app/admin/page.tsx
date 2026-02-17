import AdminRoute from "@/components/AdminRoute";
import DashboardLayout from "@/components/dashboard-layout";

export default function AdminPage() {
  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Admin Panel</h2>
          <p className="text-muted-foreground">
            Manage users and system settings
          </p>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}
