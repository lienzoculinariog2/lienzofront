"use client";

import ProtectedRoute from "@/components/ui/ProtectedRoute";
import ProfilePageContent from "./ProfilePageContent";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
