// components/UserInfoPanel.tsx
import { IUser } from "@/types/User";

type Props = {
  profileData: IUser;
};

export const UserInfoPanel = ({ profileData }: Props) => {
  return (
    <div className="rounded-md border p-4 mb-6 bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Datos actuales del usuario</h2>
      <ul className="text-sm text-gray-700 space-y-1">
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
          <strong>Dieta:</strong> {profileData.diet ?? "—"}
        </li>
        <li>
          <strong>Fecha de nacimiento:</strong>{" "}
          {formatDate(profileData.birthday)}
        </li>
        <li>
          <strong>Rol:</strong>{" "}
          {profileData.isAdmin === "admin" ? "Administrador" : "Cliente"}
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
