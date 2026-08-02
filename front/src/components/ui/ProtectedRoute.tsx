// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth0 } from "@auth0/auth0-react";
// import Spinner from "@/components/ui/Spinner";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.replace("/"); // Redirige al home si no está logueado
//     }
//   }, [isLoading, isAuthenticated, router]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Spinner />
//       </div>
//     );
//   }

//   // Usuario autenticado → renderiza contenido
//   return <>{children}</>;
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserRoles } from "@/hooks/useUserRoles";
import Spinner from "@/components/ui/Spinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const { isBanned, loading } = useUserRoles();

  useEffect(() => {
    if (!isLoading && !loading) {
      if (!isAuthenticated || isBanned) {
        router.replace("/"); // 👈 bloquea a no logueados o baneados
      }
    }
  }, [isLoading, loading, isAuthenticated, isBanned, router]);

  if (isLoading || loading || !isAuthenticated || isBanned) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}

