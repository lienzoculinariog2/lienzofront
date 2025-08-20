import React from "react";
import { notFound } from "next/navigation";
import { productService } from "@/services/ProductService";
import { categoriesServices } from "@/services/CategoryService";
import { PaginatedResponse } from "@/types/PaginatedResponse";
import { IProduct } from "@/types/Product";
import CategoryProductsClient from "./components/CategoryProductsClient";
import Image from "next/image";

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
      <div>
      {/*  Banner como en el home pero dinámico */}
      <div className="relative w-full h-[350px] md:h-[450px]">
        <Image
          src={category.imgUrl || "/default-category.jpg"} 
          alt={`Banner de ${category.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gray-300/10" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <Image
            src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/2145c662-3775-48b0-aba7-55d032195e32-removebg-preview.png?updatedAt=1754512253493"
            alt="Logo de Lienzo Culinario"
            width={400}
            height={400}
            className="filter contrast-150 brightness-75"
          />
        </div>
      </div>
          <h1 className="my-6 mt-8 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
            {category.name}
          </h1>

      {/*  Listado de productos */}
      <div className="container p-4 mx-auto">
        <CategoryProductsClient
          key={category.id}
          products={filteredProducts}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
