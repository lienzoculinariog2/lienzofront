import React from "react";
import { notFound } from "next/navigation";
import { protoCategories } from "@/helpers/categories";
import { protoProduct } from "@/helpers/products";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { categoryId } = params;

  const category = protoCategories.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const filteredProducts = protoProduct.filter(
  (p) => p.category.id === category.id
);

  if (filteredProducts.length === 0) {
    return (
      <>
      <div className="mt-20 text-xl text-center text-gray-500">
        No se encontraron productos para esta categoría.
      </div>
      <br/>
      </>
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-primary-txt-300">
        Productos de la Categoría: {category.name}
      </h1>
    </div>
  );
};

export default CategoryPage;
