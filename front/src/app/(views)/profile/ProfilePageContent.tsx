"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";
import { UserInfoPanel } from "./components/UserInfoPanel";
import { UserOrders } from "./components/UserOrders";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);
  const [showForm, setShowForm] = useState(false); // 👈 nuevo estado

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const accessToken = await getAccessTokenSilently();
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
      const updatedProfile = await userService.update(user.sub, formData, accessToken);
      setProfileData(updatedProfile);
      alert("¡Perfil actualizado con éxito!");
      setShowForm(false); // 👈 cerrar el formulario al guardar
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
    <div className="container p-4 mx-auto md:p-8">
      {/* Panel informativo del usuario */}
      <UserInfoPanel profileData={profileData} onEditClick={() => setShowForm(!showForm)} />

      {/* Formulario de edición, solo visible si showForm es true */}
      {showForm && (
        <div className="mt-8">
          <ProfileForm user={profileData} onSave={handleSaveProfile} />
        </div>
      )}
      <UserOrders userId={profileData.id} />
    </div>
  );
}

