// src/components/auth/UserSync.tsx
"use client";

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userService } from '@/services/draft/userService';

/**
 * @name UserSync
 * @description Este componente "vigilante" no renderiza nada visual.
 * Su única misión es escuchar el estado de autenticación y asegurarse
 * de que el usuario logueado exista en nuestra base de datos del backend.
 */
const UserSync = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoading && isAuthenticated && user?.sub) {
        try {
          const accessToken = await getAccessTokenSilently();
          // Esta función buscará al usuario y, si no existe, lo creará.
          await userService.getOrCreateUser(user.sub, user.email || '', accessToken);
        } catch (error) {
          console.error("UserSync: Error al sincronizar el usuario.", error);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, user, isLoading, getAccessTokenSilently]);

  return null; // No renderiza nada.
};

export default UserSync;