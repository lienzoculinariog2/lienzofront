"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "../../components/CategoryForm";
import { ICategories } from "@/types/Categories";
import { categoriesServices } from "@/services/CategoryService";

const CreateCategoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveCategory = async (formData: Partial<ICategories>) => {
    if (!formData.name) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await categoriesServices.create({
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive ?? true,
        imgUrl: formData.imgUrl || "",
      });
      router.push("/admin/categories"); // Redirige después de crear
    } catch (err) {
      console.error("Error creando categoría:", err);
      setError("Ocurrió un error al crear la categoría.");
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
        <h1 className="mb-6 text-3xl font-bold text-center text-primary-txt-500">
          Crear Nueva Categoría
        </h1>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <CategoryForm onSave={handleSaveCategory} onCancel={handleCancel} />
        {loading && <p className="text-gray-500">Guardando categoría...</p>}
      </div>
    </div>
  );
};

export default CreateCategoryPage;

