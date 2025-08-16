import React from "react";
import { notFound } from "next/navigation";
import { productService } from "@/services/ProductService"; 
import ProductCard from "../../(home)/components/ProductCard";
import { categoriesServices } from "@/services/CategoryService";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryId = params.categoryId;

  // Solo categorías activas
  const categories = (await categoriesServices.getAll()).filter(c => c.isActive);

  // Buscar la categoría activa correspondiente
  const category = categories.find((c) => c.id === categoryId);
  if (!category) {
    notFound(); // Redirige a 404 si la categoría no existe o está desactivada
  }

  // Traer productos de la categoría
  const filteredProducts = await productService.getByCategoryId(categoryId);

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
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
