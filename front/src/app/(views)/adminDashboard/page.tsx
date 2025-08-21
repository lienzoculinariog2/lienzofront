"use client";

import ProtectedRoute from "@/components/ui/ProtectedRoute";
import AdminDashboardPage from "./AdminDashboard";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AdminDashboardPage />
    </ProtectedRoute>
  );
}
