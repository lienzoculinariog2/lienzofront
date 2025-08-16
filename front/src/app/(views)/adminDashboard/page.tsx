"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";
import { ICategories } from "@/types/Categories";
import { productService } from "@/services/ProductService";
import { categoriesServices } from "@/services/CategoryService";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await productService.getAll();
      const allCategories = await categoriesServices.getAll();

      setProducts(allProducts.slice(0, 4)); 
      setCategories(allCategories.slice(0, 4)); 
    };

    fetchData();
  }, []);

  const handleEditProduct = (id: string) => {
    router.push(`/adminDashboard/products/edit-products?id=${id}`);
  };

  const handleEditCategory = (id: string) => {
    router.push(`/adminDashboard/categories/edit-category?id=${id}`);
  };

  return (
    <div className="container min-h-screen p-8 mx-auto text-primary-txt-500">
      {/* Encabezado */}
      <header className="mb-10 text-center">
        <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
          Panel de Administración
        </h1>
        <p className="mt-2 text-gray-400">
          Gestiona tus productos y categorías de forma sencilla.
        </p>
      </header>

      {/* Sección de Productos */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Últimos Productos</h2>
          <div className="flex gap-3">
            <Link href="/adminDashboard/products/edit-products">
              <Button variant="dailyMenu">Ver Todos</Button>
            </Link>
            <Link href="/adminDashboard/products/create-product">
              <Button variant="dailyMenu">Crear Nuevo</Button>
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400">
            No hay productos para mostrar.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleEditProduct(product.id)}
                className="overflow-hidden transition-shadow shadow-lg cursor-pointer bg-black/40 rounded-xl hover:shadow-xl"
              >
                {product.imgUrl && (
                  <div className="relative w-full h-40">
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-2 font-semibold text-green-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de Categorías */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Últimas Categorías</h2>
          <div className="flex gap-3">
            <Link href="/adminDashboard/categories/edit-category">
              <Button variant="dailyMenu">Ver Todas</Button>
            </Link>
            <Link href="/adminDashboard/categories/create-category">
              <Button variant="dailyMenu">Crear Nueva</Button>
            </Link>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-400">No hay categorías para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleEditCategory(category.id)}
                className="overflow-hidden transition-shadow shadow-lg cursor-pointer bg-black/40 rounded-xl hover:shadow-xl"
              >
                {category.imgUrl && (
                  <div className="relative w-full h-40">
                    <Image
                      src={category.imgUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {category.description}
                  </p>
                  <p
                    className={`mt-2 font-semibold ${
                      category.isActive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {category.isActive ? "Activa" : "Inactiva"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;

