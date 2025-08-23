"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "../../components/CategoryForm";
import { ICategories } from "@/types/Categories";
import { categoriesServices } from "@/services/CategoryService";
import { toast } from 'react-toastify';

const CreateCategoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // El estado 'error' ya no es necesario, Toastify lo maneja
  // const [error, setError] = useState<string | null>(null);

  const handleSaveCategory = async (formData: Partial<ICategories>) => {
    if (!formData.name) {
      toast.error("El nombre de la categoría es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      await categoriesServices.create({
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive ?? true,
        imgUrl: formData.imgUrl || "",
      });
      
      toast.success("¡Categoría creada con éxito!"); 
      router.push("/admin/categories");
    } catch (err) {
      console.error("Error creando categoría:", err);
      toast.error("Ocurrió un error al crear la categoría.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-primary-background-500">
      <div className="w-full max-w-2xl">
        {/* La visualización del error se elimina, Toastify lo maneja
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        */}

        <CategoryForm onSave={handleSaveCategory} onCancel={handleCancel} />
        {loading && <p className="text-gray-500">Guardando categoría...</p>}
      </div>
    </div>
  );
};

export default CreateCategoryPage;
