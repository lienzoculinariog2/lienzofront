"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";
import { UserInfoPanel } from "./components/UserInfoPanel";
import { UserOrders } from "./components/UserOrders";
import { toast } from "react-toastify";

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

    // 👇 lógica para mostrar mensajes distintos según lo que se actualiza
    if (formData.hasOwnProperty("isSuscribed")) {
      toast.success(
        updatedProfile.isSuscribed
          ? "Te has suscrito a la newsletter 🎉"
          : "Has cancelado tu suscripción a la newsletter"
      );
    } else {
      toast.success("¡Perfil actualizado con éxito! 🎉");
      setShowForm(false); // cerrar el formulario solo si era edición de perfil
    }
  } catch (error) {
    console.error("Error saving user profile:", error);

    if (formData.hasOwnProperty("isSuscribed")) {
      toast.error("No se pudo actualizar la suscripción 😢");
    } else {
      toast.error("Error al guardar el perfil 😢");
    }
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

