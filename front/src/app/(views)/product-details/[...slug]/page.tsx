import React from "react";
import Image from "next/image";
import { productService } from "@/services/ProductService";
import { IProduct } from "@/types/Product";
import AddToCartButton from "@/components/ui/AddToCartButton";

const specialColors: { [key: string]: string } = {
  carne: "bg-daily-menu-600",
  lacteo: "bg-vegan-500",
  huevo: "bg-celiac-400",
  grano: "bg-celiac-600",
  harina: "bg-celiac-500",
  fruta: "bg-vegetarian-500",
  vegetal: "bg-vegetarian-700",
};

const caloricColors: { [key: number]: string } = {
  1: "bg-vegetarian-500", // Verde
  2: "bg-vegetarian-700",
  3: "bg-yellow-500", // Amarillo
  4: "bg-daily-menu-500", // Naranja
  5: "bg-daily-menu-700", // Rojo
};

const categories = [
  {
    category: "carne",
    keywords: [
      "carne",
      "pollo",
      "pescado",
      "res",
      "cerdo",
      "jamón",
      "salchicha",
    ],
  },
  {
    category: "lacteo",
    keywords: [
      "leche",
      "lacteo",
      "queso",
      "yogur",
      "mozzarella",
      "cheddar",
      "parmesano",
      "gouda",
    ],
  },
  { category: "huevo", keywords: ["huevo", "huevos"] },
  { category: "grano", keywords: ["grano", "arroz", "trigo", "avena"] },
  {
    category: "harina",
    keywords: ["harina", "pasta", "pan", "pizza", "tortilla"],
  },
  { category: "fruta", keywords: ["fruta", "manzana", "platano", "naranja"] },
  {
    category: "vegetal",
    keywords: [
      "vegetal",
      "verdura",
      "lechuga",
      "tomate",
      "zanahoria",
      "ensalada",
      "pepino",
      "espinaca",
    ],
  },
];

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const id = slug[slug.length - 1];

  if (!id) return <div>Platillo no encontrado</div>;

  let product: IProduct | null = null;
  try {
    product = await productService.getById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) return <div>Platillo no encontrado</div>;

  // Extraemos tipos de ingredientes presentes
  const ingredientTypes = new Set<string>();
  product.ingredients?.forEach((ingredient) => {
    const name = ingredient.name.toLowerCase();
    categories.forEach((cat) => {
      if (cat.keywords.some((kw) => name.includes(kw))) {
        ingredientTypes.add(cat.category.toLowerCase()); // todo en minúscula
      }
    });
  });

  return (
    <div className="max-w-4xl p-8 mx-auto mt-10 mb-20 border shadow-lg bg-primary-background-900 border-primary-background-800 rounded-xl">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
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
              {product.name}
            </h1>
            <p className="mb-6 text-lg text-secondary-txt-300">
              {product.description}
            </p>

            {/* Precio */}
            <div className="mb-4 text-4xl font-bold text-primary-txt-400">
              {product.price !== undefined ? `$${product.price}` : "Sin precio"}
            </div>

            {/* Ingredientes con colores */}
            <div className="mb-6">
              <h3 className="mt-4 mb-2 font-semibold text-primary-txt-200">
                Ingredientes:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(ingredientTypes).map((type, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${specialColors[type]}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                    {/* Primera letra en mayúscula */}
                  </span>
                ))}
              </div>
            </div>

            {/* Nivel calórico */}
            <div className="flex items-center mb-2 text-primary-txt-300">
              <span className="mr-2 font-semibold">Nivel Calórico:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                  caloricColors[product.caloricLevel as number] || "bg-gray-500"
                }`}
              >
                {product.caloricLevel || "No especificado"}
              </span>
            </div>

            {/* Stock */}
            <div className="flex items-center mt-5 text-primary-txt-300">
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

            {/* Línea divisoria */}
            <div className="w-full mt-4 mb-4 border-t border-secondary-background-800"></div>

            {/* Botón centrado */}
            <div className="flex flex-col items-center gap-4 pt-4 mt-2">
              <AddToCartButton product={product} />
            </div>
        </div>
      </div>
    </div>
  );
}
