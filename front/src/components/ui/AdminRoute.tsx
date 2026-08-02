"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "@/hooks/useUserRoles";
import Spinner from "@/components/ui/Spinner";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAdmin, loading } = useUserRoles();

  useEffect(() => {
    if (!isLoading && !loading) {
      if (!isAuthenticated || !isAdmin) {
        router.replace("/"); // 👈 redirige si no es admin
      }
    }
  }, [isLoading, loading, isAuthenticated, isAdmin, router]);

  if (isLoading || loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
