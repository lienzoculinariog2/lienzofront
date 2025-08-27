// src/components/ui/auth/UserSync.tsx
"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userService } from "@/services/draft/userService"; // ✅ Importa el servicio que funcionaba

const UserSync = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const { sub, email } = user || {};

  useEffect(() => {
    const syncUser = async () => {
      if (isLoading || !isAuthenticated || !sub) return;

      try {
        const accessToken = await getAccessTokenSilently();
        // ✅ Vuelve a usar el método que funciona
        await userService.getOrCreateUser(sub, email || "", accessToken);
        console.log("Usuario sincronizado con el backend.");
      } catch (err) {
        console.error("Error al sincronizar usuario con backend:", err);
      }
    };
    void syncUser();
  }, [isAuthenticated, isLoading, sub, email, getAccessTokenSilently]);

  return null;
};

export default UserSync;