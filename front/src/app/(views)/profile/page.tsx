// app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import { userService } from "@/services/draft/userService"; // Importamos el servicio
import { IUser } from "@/types/User";
import Spinner from "@/components/ui/Spinner"; // Asumiendo que tienes un componente Spinner

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  // useEffect para cargar los datos del usuario la primera vez
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user?.sub) {
        // 🔹 Logueamos el objeto de Auth0 y el sub real
        console.log("Auth0 user object:", user);
        console.log("Auth0 sub (real ID):", user.sub);
        console.log("Auth0 email:", user.email);
        console.log("Auth0 address:", user.address);

        setIsFetchingProfile(true);
        try {
          // Usamos el `userService` para obtener el perfil.
          const profile = await userService.getById(user.sub);
          setProfileData(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsFetchingProfile(false);
        }
      }
    };
    fetchUserProfile();
  }, [isAuthenticated, user]);

  // Esta es la función clave que recibe el formulario.
  // Se la pasamos al `ProfileForm` a través de la prop `onSave`.
  const handleSaveProfile = async (formData: Partial<IUser>) => {
    if (isAuthenticated && user?.sub) {
      try {
        // Llama al `userService` para actualizar los datos.
        // Aquí es donde los datos van al "backend mockeado".
        const response = await userService.update(user.sub, formData);

        // El servicio mockeado devuelve los datos actualizados en `response.data`.
        setProfileData(response.data);
        alert("¡Perfil guardado con éxito!");
      } catch (error) {
        console.error("Error saving user profile:", error);
        alert("Error al guardar el perfil.");
      }
    }
  };

  // Muestra un spinner mientras se cargan los datos del perfil
  if (isLoading || isFetchingProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <p className="text-center p-8">
        Debes iniciar sesión para ver esta página.
      </p>
    );
  }

  // Muestra el formulario si el perfil se ha cargado correctamente
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Perfil</h1>
      {profileData ? (
        <ProfileForm
          user={profileData}
          onSave={handleSaveProfile} // Aquí conectamos el formulario con la función
        />
      ) : (
        <p>No se encontraron datos del perfil.</p>
      )}
    </div>
  );
}
