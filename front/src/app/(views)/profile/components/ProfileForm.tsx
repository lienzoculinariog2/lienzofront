"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { IUser, Diet } from "@/types/User";

interface IProfileFormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  diet: Diet;
  birthday: string;
}

interface ProfileFormProps {
  user: IUser;
  onSave: (formData: Partial<IUser>) => void;
}

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
  const initialFormData: IProfileFormData = {
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone?.toString() || "",
    diet: user?.diet || "general",

    // --- SOLUCIÓN FINAL ---
    // Primero, verificamos si 'user.birthday' existe.
    // Si existe, lo convertimos de string a un objeto Date con 'new Date()'.
    // Luego, ahora sí, podemos usar '.toISOString()' de forma segura.
    birthday: user.birthday
      ? new Date(user.birthday).toISOString().split("T")[0]
      : "",
  };

  const [formData, setFormData] = useState<IProfileFormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "diet") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as Diet,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const dataToSave: Partial<IUser> = {
      ...formData,
      phone: formData.phone ? parseInt(formData.phone, 10) : undefined,
      birthday: formData.birthday ? new Date(formData.birthday) : undefined,
    };

    await onSave(dataToSave);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      {/* Campo Nombre */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Campo Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
        />
      </div>

      {/* Campo Dirección */}
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Dirección
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Campo Teléfono */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Campo Fecha de Nacimiento */}
      <div className="mb-4">
        <label
          htmlFor="birthday"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Campo Tipo de Dieta */}
      <div className="mb-6">
        <label
          htmlFor="diet"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Tipo de Dieta
        </label>
        <select
          id="diet"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="general">General</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="celiaco">Celíaco</option>
          <option value="fitness">Fitness</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isSaving} variant="default">
          {isSaving ? "Guardando..." : "Guardar Perfil"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
