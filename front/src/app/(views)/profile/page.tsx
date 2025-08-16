// app/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";
import { UserInfoPanel } from "./components/UserInfoPanel";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Ahora solo buscamos, ya que UserSync se encarga de la creación
      if (isAuthenticated && user?.sub) {
        try {
          const accessToken = await getAccessTokenSilently();
          // Usamos 'getOrCreateUser' por seguridad, aunque ya debería existir
          const profile = await userService.getOrCreateUser(
            user.sub,
            user.email || "",
            accessToken
          );
          setProfileData(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsFetchingProfile(false);
        }
      }
    };
    fetchUserProfile();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleSaveProfile = async (formData: Partial<IUser>) => {
    if (!isAuthenticated || !user?.sub) return;
    try {
      const accessToken = await getAccessTokenSilently();
      // La lógica de guardado ahora solo actualiza
      const updatedProfile = await userService.update(
        user.sub,
        formData,
        accessToken
      );
      setProfileData(updatedProfile);
      alert("¡Perfil actualizado con éxito!");
    } catch (error) {
      console.error("Error saving user profile:", error);
      alert("Error al guardar el perfil.");
    }
  };

  if (isLoading || isFetchingProfile) {
    return <Spinner />;
  }

  if (!isAuthenticated || !profileData) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Panel informativo del usuario */}
      <UserInfoPanel profileData={profileData} />

      {/* Formulario de edición */}
      <div className="mt-8">
        <ProfileForm user={profileData} onSave={handleSaveProfile} />
      </div>
    </div>
  );
}
