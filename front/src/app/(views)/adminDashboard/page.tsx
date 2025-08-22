"use client";

import ProtectedRoute from "@/components/ui/ProtectedRoute";
import AdminDashboardPage from "./AdminDashboard";
import AdminRoute from "@/components/ui/AdminRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    </ProtectedRoute>
  );
}
