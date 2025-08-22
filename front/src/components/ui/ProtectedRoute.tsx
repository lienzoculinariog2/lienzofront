// // components/auth/ProtectedRoute.tsx
// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth0 } from "@auth0/auth0-react";
// import Spinner from "@/components/ui/Spinner";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push("/"); // Redirige a la home si no está autenticado
//     }
//   }, [isLoading, isAuthenticated, router]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Spinner />
//       </div>
//     );
//   }

//   // Si está logueado, muestra el contenido
//   return <>{children}</>;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "@/components/ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/"); // Redirige al home si no está logueado
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Usuario autenticado → renderiza contenido
  return <>{children}</>;
}

