"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";

const AdminDashboardPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await productService.getAll();
      setProducts(allProducts.slice(0, 4)); // solo 4 para previsualización
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mt-8">
        <Link href="/adminDashboard/products/edit-products">
          <Button variant="dailyMenu">Ver y Editar Productos</Button>
        </Link>

        <Link href="/adminDashboard/products/create-product">
          <Button variant="dailyMenu">Crear Nuevo Producto</Button>
        </Link>
        <Link href="/adminDashboard/categories/edit-category">
          <Button variant="dailyMenu">Editar Categoría</Button>
        </Link>
        <Link href="/adminDashboard/categories/create-category">
          <Button variant="dailyMenu">Crear Nueva Categoría</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
