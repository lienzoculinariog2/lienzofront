"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import ProtectedContent from "@/components/ui/ProtectedContent"; // Importamos el componente de contenido protegido
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";

/**
 * @name ProfilePage
 * @description
 * Esta página principal del perfil de usuario maneja el estado de autenticación,
 * la carga inicial de los datos del usuario y el guardado del formulario.
 * Integra el componente ProtectedContent para el saludo y ProfileForm para la edición.
 */
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  // useEffect para cargar los datos del usuario la primera vez
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Solo intentamos cargar el perfil si el usuario está autenticado y tiene un 'sub' (id de Auth0)
      if (isAuthenticated && user?.sub) {
        setIsFetchingProfile(true);
        try {
          // Usamos el servicio mockeado para obtener el perfil
          const profile = await userService.getById(user.sub);
          setProfileData(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Opcional: manejar el error mostrando un mensaje al usuario
        } finally {
          setIsFetchingProfile(false);
        }
      } else if (!isLoading) {
        // Si no está autenticado y no está cargando, terminamos la carga del perfil
        setIsFetchingProfile(false);
      }
    };
    fetchUserProfile();
  }, [isAuthenticated, user, isLoading]);

  /**
   * Maneja el guardado del formulario de perfil.
   * @param {Partial<IUser>} formData - Los datos del formulario que se van a guardar.
   */
  const handleSaveProfile = async (formData: Partial<IUser>) => {
    if (isAuthenticated && user?.sub) {
      try {
        // Llama al `userService` para actualizar los datos
        const response = await userService.update(user.sub, formData);
        setProfileData(response.data);
        alert("¡Perfil guardado con éxito!");
      } catch (error) {
        console.error("Error saving user profile:", error);
        alert("Error al guardar el perfil.");
      }
    }
  };

  // 1. Si Auth0 está cargando O estamos buscando el perfil, mostramos un Spinner
  if (isLoading || isFetchingProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // 2. Si el usuario no está autenticado, mostramos un mensaje
  if (!isAuthenticated || !user) {
    return (
      <p className="text-center p-8">
        Debes iniciar sesión para ver esta página.
      </p>
    );
  }

  // 3. Si todo está listo, mostramos la interfaz completa
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* 🔹 Primero, mostramos el componente de saludo y foto */}
      <ProtectedContent />

      {/* 🔹 Luego, el formulario de edición, que solo se renderiza si hay datos */}
      {profileData ? (
        <div className="mt-8">
          <ProfileForm user={profileData} onSave={handleSaveProfile} />
        </div>
      ) : (
        <p className="mt-8 text-center">No se encontraron datos del perfil.</p>
      )}
    </div>
  );
}
