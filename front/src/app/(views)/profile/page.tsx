// app/profile/page.tsx
"use client";

import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm";
import Spinner from "@/components/ui/Spinner"; // Importación correcta del nuevo Spinner
import { IUser } from "@/types/User"; // Importamos la interfaz de usuario

export default function ProfilePage() {
const { user, isAuthenticated, isLoading } = useAuth0();

  // Muestra un spinner mientras carga la autenticación
if (isLoading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <Spinner />
    </div>
    );
}

  // Si el usuario no está autenticado, puedes redirigirlo o mostrar un mensaje
if (!isAuthenticated) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <p>Por favor, inicia sesión para ver tu perfil.</p>
    </div>
    );
}

  // Lógica para guardar el perfil. El tipo de formData ahora es Partial<IUser>.
const handleSaveProfile = (formData: Partial<IUser>) => {
    // Aquí iría la lógica para enviar los datos a tu API o base de datos.
    // Usaremos el userService mockeado por ahora.
    console.log("Datos de perfil a guardar:", formData);
    // Puedes mostrar una notificación de éxito aquí.
};

return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Mi Perfil</h1>
    <div className="max-w-lg mx-auto">
        <ProfileForm 
          // Pasamos el objeto de usuario de Auth0 al formulario
          user={user as IUser} // Casteamos el tipo para que coincida con la interfaz IUser
        onSave={handleSaveProfile} 
        />
    </div>
    </div>
);
}

