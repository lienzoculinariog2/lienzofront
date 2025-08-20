import React from "react";
import { notFound } from "next/navigation";
import { productService } from "@/services/ProductService";
import { categoriesServices } from "@/services/CategoryService";
import { PaginatedResponse } from "@/types/PaginatedResponse";
import { IProduct } from "@/types/Product";
import CategoryProductsClient from "./components/CategoryProductsClient";

// Importamos el Client Component

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryId = params.categoryId;

  const categories = (await categoriesServices.getAll()).filter(
    (c) => c.isActive
  );

  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const response: PaginatedResponse<IProduct> =
    await productService.getByCategoryId(categoryId);

  const filteredProducts: IProduct[] = response.data;

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="mt-20 text-xl text-center text-gray-500">
        No se encontraron productos para esta categoría.
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        {category.name}
      </h1>

      {/* Client Component que maneja carrito y Auth0 */}
      <CategoryProductsClient
        key={category.id} // 🔑 fuerza a React a desmontar y montar de nuevo
        products={filteredProducts}
      />
    </div>
  );
};

export default CategoryPage;
