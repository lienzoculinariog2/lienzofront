"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import CategoryForm from "../../components/CategoryForm";
import { ICategories } from "@/types/Categories";
import { categoriesServices } from "@/services/CategoryService";
import Image from "next/image";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [editingCategory, setEditingCategory] = useState<ICategories | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const allCategories = await categoriesServices.getAll();
      setCategories(allCategories);
    } catch (err) {
      setError("Error al obtener las categorías.");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (category: ICategories) => {
    try {
      setLoading(true);
      if (category.isActive) {
        await categoriesServices.inactivate(category.id);
      } else {
        await categoriesServices.activate(category.id);
      }
      await fetchCategories();
    } catch (err) {
      console.error("Error al cambiar estado de la categoría:", err);
      setError("Ocurrió un error al cambiar el estado de la categoría.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async (formData: Partial<ICategories>) => {
    try {
      setLoading(true);
      if (editingCategory && editingCategory.id) {
        await categoriesServices.update(editingCategory.id, {
          name: formData.name,
        });
      }
      setEditingCategory(null);
      await fetchCategories();
    } catch (err) {
      setError("Error al guardar la categoría.");
      console.error("Error saving category:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (categoryId: string) => {
    setLoading(true);
    try {
      const categoryToEdit = await categoriesServices.getById(categoryId);
      setEditingCategory(categoryToEdit);
    } catch (err) {
      setError("Error al cargar la categoría para edición.");
      console.error("Error loading category for editing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="container min-h-screen p-8 mx-auto">
      <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Panel de Categorías
      </h1>

      {editingCategory ? (
        <div className="max-w-2xl p-6 mx-auto shadow-lg bg-black/50 rounded-2xl backdrop-blur-md">
          <CategoryForm
            categoryId={editingCategory.id}
            onSave={handleSaveCategory}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <div className="p-6 mt-8 shadow-lg rounded-2xl bg-black/50 backdrop-blur-md">
          <h2 className="mb-6 text-2xl font-bold text-primary-txt-500">
            Lista de Categorías
          </h2>

          {loading && <p className="text-gray-300">Cargando categorías...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between px-4 py-4 mb-2 transition-colors border border-gray-700 rounded-lg hover:bg-gray-800/50"
              >
                {category.imgUrl && (
                  <div className="flex-shrink-0 w-20 h-20 mr-4 overflow-hidden rounded-lg">
                    <Image
                      src={category.imgUrl}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="flex-1 mr-4">
                  <h3 className="mb-1 font-bold underline text-primary-txt-500">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                      {category.description.slice(0, 100)}
                      {category.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end justify-between text-sm text-gray-200">
                  <Button
                    onClick={() => handleEdit(category.id)}
                    variant="category"
                    categoryId={category.id}
                    className="mt-2"
                  >
                    Editar
                  </Button>

                  <Button
                    onClick={() => handleToggleActive(category)}
                    variant={category.isActive ? "dark" : "default"}
                    className="mt-2"
                  >
                    {category.isActive ? "Inactivar" : "Activar"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
