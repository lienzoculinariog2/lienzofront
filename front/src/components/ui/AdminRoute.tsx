"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "@/hooks/useUserRoles";
import Spinner from "@/components/ui/Spinner";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();
  const { isAdmin, loading } = useUserRoles();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !isAdmin) {
        router.replace("/"); // 👈 redirige si no es admin
      }
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
