import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

/**
 * @name ProtectedContent
 * @description
 * Este componente muestra contenido que solo es visible para los usuarios autenticados.
 * Utiliza el hook `useAuth0` para acceder a la información del usuario.
 */
const ProtectedContent = () => {
  const { user } = useAuth0();

  return (
    <div className="container mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 md:mt-16 max-w-2xl text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Bienvenido, {user?.name}!
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        Has accedido a contenido protegido. Solo los usuarios autenticados
        pueden ver esta información.
      </p>

      {/* Mostramos la foto de perfil y algunos datos del usuario */}
      {user?.picture && (
        <Image
          src={user.picture}
          alt="Foto de perfil del usuario"
          width={128} // Propiedad agregada para evitar el error
          height={128} // Propiedad agregada para evitar el error
          className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-indigo-500 shadow-md"
        />
      )}

      {user?.email && (
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Correo electrónico:</span>{" "}
          {user.email}
        </p>
      )}

      {/* Puedes agregar más información del usuario aquí */}
      <div className="mt-8">
        <p className="text-gray-500 text-sm">
          Este es un componente de ejemplo. Aquí puedes añadir cualquier
          interfaz de usuario que requiera que el usuario haya iniciado sesión.
        </p>
      </div>
    </div>
  );
};

export default ProtectedContent;
