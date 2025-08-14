"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

const AdminDashboardPage = () => {
  return (
    <div className="container p-8 mx-auto text-center">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Panel de Administración
      </h1>

      <div className="flex flex-col items-center gap-4 mt-8">
        <Link href="/adminDashboard/edit-products">
          <Button variant="dailyMenu">Ver y Editar Productos</Button>
        </Link>
        <Link href="/adminDashboard/create-product">
          <Button variant="dailyMenu">Crear Nuevo Producto</Button>
        </Link>
        <Link href="/adminDashboard/categories">
          <Button variant="dailyMenu">Ver y Editar Categorías</Button>
        </Link>
        <Link href="/adminDashboard/categories/create-category">
          <Button variant="dailyMenu">Crear Nueva Categoría</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
