// components/UserInfoPanel.tsx
import { IUser } from "@/types/User";

type Props = {
  profileData: IUser;
};

export const UserInfoPanel = ({ profileData }: Props) => {
  return (
    <div className="p-4 mb-6 border rounded-md bg-gray-50">
      <h2 className="mb-2 text-lg font-semibold">Datos actuales del usuario</h2>
      <ul className="space-y-1 text-sm text-gray-700">
        <li>
          <strong>Nombre:</strong> {profileData.name ?? "—"}
        </li>
        <li>
          <strong>Email:</strong> {profileData.email}
        </li>
        <li>
          <strong>Teléfono:</strong> {profileData.phone ?? "—"}
        </li>
        <li>
          <strong>Dirección:</strong> {profileData.address ?? "—"}
        </li>
        <li>
          <strong>Dieta:</strong>{" "}
          {profileData.diet === "general"
            ? "Sin dieta especifica"
            : profileData.diet === "celiaco"
            ? "Celiaco"
            : profileData.diet === "vegano"
            ? "Vegano"
            : profileData.diet === "diabetico"
            ? "Diabetico"
            : profileData.diet === "vegetariano"
            ? "Vegetariano"
            : ""}
        </li>
        <li>
          <strong>Fecha de nacimiento:</strong>{" "}
          {formatDate(profileData.birthday)}
        </li>
        <li>
          <strong>Rol:</strong>{" "}
          {profileData.roles === "admin"
            ? "Administrador"
            : profileData.roles === "user"
            ? "Cliente"
            : "Baneado"}
        </li>
      </ul>
    </div>
  );
};

const formatDate = (date?: Date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-UY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
