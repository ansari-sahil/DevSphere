"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import AdminRoute from "@/components/AdminRoute";
import DashboardLayout from "@/components/dashboard-layout";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/api/admin/users?page=${page}&search=${search}`,
      );
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const toggleStatus = async (id: string) => {
    if (!confirm("Change user status?")) return;

    await API.put(`/api/admin/users/${id}/toggle-active`);
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  const changeRole = async (id: string, role: string) => {
    if (!confirm(`Change role to ${role}?`)) return;

    await API.put(`/api/admin/users/${id}/role`, { role });
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user permanently?")) return;

    await API.delete(`/api/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <AdminRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        {/* 🔍 Search */}
        <input
          placeholder="Search users..."
          className="border p-2 mb-4 w-full max-w-sm"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {loading && <p>Loading users...</p>}

        {!loading && (
          <>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-left">
                <thead className="border-b bg-muted">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>

                      {/* 🎖 ROLE BADGE */}
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => toggleStatus(user._id)}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>

                        {user.role !== "admin" ? (
                          <button
                            onClick={() => changeRole(user._id, "admin")}
                            className="px-2 py-1 border rounded text-sm"
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => changeRole(user._id, "user")}
                            className="px-2 py-1 border rounded text-sm"
                          >
                            Remove Admin
                          </button>
                        )}

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-2 py-1 border rounded text-sm text-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📄 Pagination */}
            <div className="flex justify-between mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </DashboardLayout>
    </AdminRoute>
  );
}
