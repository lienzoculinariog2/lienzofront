import { IUser } from "@/types/User";

type Props = {
  profileData: IUser;
  onEditClick?: () => void;
};

const formatDate = (date?: Date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-UY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const UserInfoPanel = ({ profileData, onEditClick }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4 p-6 mb-8 transition-shadow border rounded-lg shadow-md bg-black/40 border-primary-txt-800 hover:shadow-lg">
      {/* Encabezado */}
      <h2 className="text-xl font-semibold text-primary-txt-100">
        Información del usuario
      </h2>

      {/* Datos */}
      <div className="grid gap-3 text-sm text-primary-txt-500 md:grid-cols-2">
        <p>
          <strong className="text-primary-txt-300">Nombre:</strong>{" "}
          {profileData.name ?? "—"}
        </p>
        <p>
          <strong className="text-primary-txt-300">Email:</strong>{" "}
          {profileData.email}
        </p>
        <p>
          <strong className="text-primary-txt-300">Teléfono:</strong>{" "}
          {profileData.phone ?? "—"}
        </p>
        <p>
          <strong className="text-primary-txt-300">Dirección:</strong>{" "}
          {profileData.address ?? "—"}
        </p>
        <p>
          <strong className="text-primary-txt-300">Dieta:</strong>{" "}
          {profileData.diet === "general"
            ? "Sin dieta específica"
            : profileData.diet ?? "—"}
        </p>
        <p>
          <strong className="text-primary-txt-300">Fecha de registro:</strong>{" "}
          {formatDate(profileData.birthday)}
        </p>
        <p>
          <strong className="text-primary-txt-300">Rol:</strong>{" "}
          {profileData.roles === "admin"
            ? "Administrador"
            : profileData.roles === "user"
            ? "Cliente"
            : "Baneado"}
        </p>
        <p>
          <strong className="text-primary-txt-300">Suscrito:</strong>{" "}
          {profileData.isSuscribed ? "Sí" : "No"}
        </p>
      </div>

      {/* Botón editar */}
      {onEditClick && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onEditClick}
            className="px-4 py-2 text-sm font-semibold text-white rounded-md shadow bg-daily-menu-600 hover:bg-daily-menu-700"
          >
            Editar perfil
          </button>
        </div>
      )}
      
    </div>
  );
};

