// import { useAuth0 } from "@auth0/auth0-react";

// const namespace = "https://lienzofront.vercel.app";

// export const useUserRoles = () => {
//   const { user, isAuthenticated } = useAuth0();
//   const roles = isAuthenticated && user ? user[namespace + "/roles"] || [] : [];

//   return {
//     roles,
//     isAdmin: roles.includes("admin"),
//     isBanned: roles.includes("banned"),
//     isUser: roles.includes("user"),
//   };
// };
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface BackendUser {
  id: string;
  email: string;
  name: string;
  roles: "admin" | "user" | "banned"; // viene de tu backend
}

export const useUserRoles = () => {
  const { user: auth0User, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || !auth0User?.sub) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();

        // Aquí usamos auth0User.sub, que es el ID único de Auth0
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${auth0User.sub}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Error al obtener usuario");

        const data: BackendUser = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error cargando usuario", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, auth0User, getAccessTokenSilently]);

  return {
    user,
    role: user?.roles,
    isAdmin: user?.roles === "admin",
    isUser: user?.roles === "user",
    isBanned: user?.roles === "banned",
    loading,
  };
};

