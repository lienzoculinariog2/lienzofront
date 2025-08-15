// src/app/(views)/product-details/[...slug]/page.tsx
import React from "react";
import Image from "next/image";
import { productService } from "@/services/ProductService";
import { IProduct } from "@/types/Product";
import Button from "@/components/ui/Button";


const specialColors: { [key: string]: string } = {
  carne: "bg-daily-menu-500", 
  lacteo: "bg-secondary-txt-500", 
  huevo: "bg-celiac-500", 
  grano: "bg-celiac-500", 
  harina: "bg-celiac-500", 
  fruta: "bg-vegetarian-500", 
  vegetal: "bg-vegetarian-500", 
  default: "bg-secondary-background-500",
};


export default async function ProductDetail({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const id = slug[slug.length - 1];

  if (!id) {
    return (
      <div className="p-8 mt-20 mb-20 text-center">
        <h2 className="mb-2 text-2xl font-bold text-primary-txt-200">
          Platillo no encontrado
        </h2>
        <p className="text-secondary-txt-500">
          Por favor, verifica la URL o vuelve a la lista de platillos.
        </p>
      </div>
    );
  }

  let product: IProduct | null = null;
  try {
    product = await productService.getById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-primary-txt-200">
          Platillo no encontrado
        </h2>
        <p className="text-secondary-txt-500">
          Por favor, vuelve a la lista de platillos.
        </p>
      </div>
    );
  }

  const ingredientTypes = new Set<string>();
  const categories = [
    { category: "carne", keywords: ["carne", "pollo", "pescado", "cerdo"] },
    { category: "lacteo", keywords: ["leche", "lacteo", "queso", "yogur"] },
    { category: "huevo", keywords: ["huevo", "huevos"] },
    { category: "grano", keywords: ["grano", "arroz", "trigo", "avena"] },
    { category: "harina", keywords: ["harina", "pasta", "pan"] },
    { category: "fruta", keywords: ["fruta", "manzana", "platano", "naranja"] },
    {
      category: "vegetal",
      keywords: ["vegetal", "verdura", "lechuga", "tomate", "zanahoria"],
    },
  ];

product?.ingredients?.forEach((ingredient) => {
  const lowerCaseIngredient = ingredient.name.toLowerCase(); // ahora sí es string
  categories.forEach((cat) => {
    if (cat.keywords.some((keyword) => lowerCaseIngredient.includes(keyword))) {
      ingredientTypes.add(cat.category);
    }
  });
});

  return (
    <div className="max-w-4xl p-8 mx-auto mt-10 mb-20 overflow-hidden border shadow-lg bg-primary-background-900 border-primary-background-800 rounded-xl">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
        <div className="relative w-full mb-6 overflow-hidden lg:w-1/2 h-96 rounded-xl lg:mb-0">
          <Image
            src={product.imgUrl || "/docs/images/products/placeholder.png"}
            alt={product.name || "product image"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-between w-full lg:w-1/2">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-primary-txt-100">
              {product.name || "Platillo sin nombre"}
            </h1>
            <p className="mb-6 text-lg text-secondary-txt-300">
              {product.description || "Sin descripción"}
            </p>

            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-primary-txt-200">
                Ingredientes:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(ingredientTypes).map((type, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${specialColors[type]}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2 text-primary-txt-300">
                <span className="mr-2 font-semibold">Nivel Calórico:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    specialColors[
                      product.caloricLevel as keyof typeof specialColors
                    ] || specialColors.default
                  }`}
                >
                  {product.caloricLevel || "No especificado"}
                </span>
              </div>
              <div className="flex items-center text-primary-txt-300">
                <span className="mr-2 font-semibold">Stock:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    (product.stock ?? 0) > 0
                      ? "bg-daily-menu-500"
                      : "bg-low-calories-500"
                  }`}
                >
                  {(product.stock ?? 0) > 0
                    ? `En stock: ${product.stock}`
                    : "Sin stock"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-6 border-t border-secondary-background-800">
            <span className="text-4xl font-bold text-primary-txt-400">
              {product.price !== undefined ? `$${product.price}` : "Sin precio"}
            </span>
            <Button variant="category" categoryId={product.category.id} className="px-5 py-3">
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
