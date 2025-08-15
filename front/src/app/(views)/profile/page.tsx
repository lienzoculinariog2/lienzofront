"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import ProtectedContent from "@/components/ui/ProtectedContent";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user?.sub) {
        setIsFetchingProfile(true);
        try {
          const accessToken = await getAccessTokenSilently();
          const profile = await userService.getOrCreateUser(user.sub, user.email || '', accessToken);
          setProfileData(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsFetchingProfile(false);
        }
      } else if (!isLoading) {
        setIsFetchingProfile(false);
      }
    };
    fetchUserProfile();
  }, [isAuthenticated, user, isLoading, getAccessTokenSilently]);

  const handleSaveProfile = async (formData: Partial<IUser>) => {
    if (isAuthenticated && user?.sub) {
      try {
        const accessToken = await getAccessTokenSilently();
        const updatedProfile = await userService.update(user.sub, formData, accessToken);
        setProfileData(updatedProfile); 
        alert("¡Perfil guardado con éxito!");
      } catch (error) {
        console.error("Error saving user profile:", error);
        alert("Error al guardar el perfil.");
      }
    }
  };

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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ProtectedContent />

      {profileData ? (
        <div className="mt-8">
          <ProfileForm user={profileData} onSave={handleSaveProfile} />

          {/* --- VISOR DE JSON --- */}
          {/* Este bloque mostrará los datos completos del usuario en formato JSON */}
          <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg">
            <h3 className="text-lg font-bold mb-2">Datos del Usuario (JSON en vivo)</h3>
            <pre className="text-sm whitespace-pre-wrap break-all">
              <code>
                {JSON.stringify(profileData, null, 2)}
              </code>
            </pre>
          </div>
          {/* --- FIN DEL VISOR DE JSON --- */}

        </div>
      ) : (
        <p className="mt-8 text-center">No se encontraron datos del perfil.</p>
      )}
    </div>
  );
}
