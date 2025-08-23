"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userService } from "@/services/draft/userService";

const UserSync = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const { sub, email } = user || {};
  
useEffect(() => {
  const syncUser = async () => {
    if (isLoading) return;
    if (!isAuthenticated || !sub) return;

    try {
      const accessToken = await getAccessTokenSilently();
      // Solo crea/obtiene el usuario sin tocar el rol
      await userService.getOrCreateUser(sub, email || "", accessToken);
    } catch (err) {
      console.error("Error al sincronizar usuario con backend:", err);
    }
  };

  void syncUser();
}, [isAuthenticated, isLoading, sub, email, getAccessTokenSilently]);


  return null;
};

export default UserSync;