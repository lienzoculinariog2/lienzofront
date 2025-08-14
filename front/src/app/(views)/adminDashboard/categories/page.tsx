"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categoriesServices } from "@/services/CategoryService";
import Button from "@/components/ui/Button";
import { ICategories } from "@/types/Categories";

const CategoriesList = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesServices.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div className="container p-4 mx-auto">
      <div className="container p-4 mx-auto">
        <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
          Categorías
          </h1>
          <br/>
      </div>
        <Link href="/adminDashboard/categories/create-category">
          <Button>Crear Nueva Categoría</Button>
        </Link>

      <ul className="space-y-2 font-extrabold text-primary-txt-300">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between p-2 border rounded">
            <span>{cat.name}</span>
            <Link href={`/adminDashboard/categories/edit/${cat.id}`}>
              <Button variant="dailyMenu">Editar</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
