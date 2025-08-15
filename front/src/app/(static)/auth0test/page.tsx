// app/auth0vistaprotegida/page.tsx
"use client";
import ProtectedRoute from "@/components/ui/ProtectedRoute";

export default function Auth0VistaProtegida() {
  return (
    <ProtectedRoute>
      <div>
        <p>Usted está en una vista protegida ✅</p>
      </div>
    </ProtectedRoute>
  );
}
