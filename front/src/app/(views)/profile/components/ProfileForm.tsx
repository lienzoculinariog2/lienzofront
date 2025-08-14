// app/profile/components/ProfileForm.tsx
"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { IUser, Diet } from "@/types/User"; 

// Definimos una nueva interfaz para el estado del formulario
// Esto nos permite ser explícitos sobre los tipos que los inputs de HTML manejan
interface IProfileFormData {
name: string;
email: string;
address: string;
phone: string;
  diet: Diet; // El tipo aquí es el mismo que en IUser
birthday: string;
}

// Definimos los tipos de las props que el componente ProfileForm espera
interface ProfileFormProps {
user: IUser;
onSave: (formData: Partial<IUser>) => void;
}

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
const initialFormData: IProfileFormData = {
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    // Convertimos el número de teléfono a string para el input
    phone: user?.phone?.toString() || '',
    // Nos aseguramos de que el valor por defecto sea del tipo 'Diet'
    diet: user?.diet || 'general',
    // Convertimos la fecha a formato de string "YYYY-MM-DD" para el input
    birthday: user?.birthday?.toISOString().split('T')[0] || '',
};

const [formData, setFormData] = useState<IProfileFormData>(initialFormData);
const [isSaving, setIsSaving] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Corregimos la advertencia de 'any' validando el nombre del campo
    if (name === "diet") {
        // Hacemos un casting seguro solo para el campo de dieta
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
    
    // Convertimos los datos del formulario a un formato que coincida con `IUser`
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
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
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
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
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
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
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
        <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
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
        <label htmlFor="diet" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Dieta</label>
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
        <Button 
        type="submit" 
        disabled={isSaving}
        variant="default" 
        >
        {isSaving ? 'Guardando...' : 'Guardar Perfil'}
        </Button>
    </div>
    </form>
);
};

export default ProfileForm;






