import AdminRoute from "@/components/AdminRoute";
import DashboardLayout from "@/components/dashboard-layout";

export default function AdminPage() {
  return (
    <AdminRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </DashboardLayout>
    </AdminRoute>
  );
}
