// src/components/ProductCard.tsx
import { IProduct } from "@/types/Product";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../../components/ui/Button";

// Objeto de mapeo para los colores del nivel calórico (más legible)
const caloricColors: { [key: number]: string } = {
  1: "bg-low-calories-100",
  2: "bg-low-calories-500",
  3: "bg-celiac-500",
  4: "bg-daily-menu-300",
  5: "bg-daily-menu-700",
};

const ProductCard: FC<Partial<IProduct>> = (product) => {
  const {
    id,
    name,
    description,
    price,
    stock,
    imgUrl,
    caloricLevel,
    ingredients,
    category,
  } = product;

   // ✅ SOLUCIÓN: Usamos .some() para buscar coincidencias parciales
 const ingredientNames = ingredients?.map(ingredient => 
    typeof ingredient === 'string' ? ingredient : ingredient.name
  );

  // Usamos ingredientNames para todas las comprobaciones
  const tieneHarina = ingredientNames?.some(
    (i) =>
      typeof i === "string" &&
      (i.toLowerCase().includes("harina") ||
        i.toLowerCase().includes("pan") ||
        i.toLowerCase().includes("trigo") ||
        i.toLowerCase().includes("pasta"))
  );

  const tieneLacteo = ingredientNames?.some(
    (i) =>
      typeof i === "string" &&
      (i.toLowerCase().includes("leche") ||
        i.toLowerCase().includes("lacteo") ||
        i.toLowerCase().includes("queso"))
  );

  const tieneCarne = ingredientNames?.some(
    (i) =>
      typeof i === "string" &&
      (i.toLowerCase().includes("carne") ||
        i.toLowerCase().includes("pollo") ||
        i.toLowerCase().includes("pescado"))
  );

  const tieneVerdura = ingredientNames?.some(
    (i) =>
      typeof i === "string" &&
      (i.toLowerCase().includes("verdura") ||
        i.toLowerCase().includes("ensalada") ||
        i.toLowerCase().includes("vegetal"))
  );


  // Array de ingredientes especiales para mapear (más escalable)
  const specialIngredients = [
    { check: tieneVerdura, className: "bg-vegetarian-900" },
    { check: tieneLacteo, className: "bg-secondary-txt-500" },
    { check: tieneHarina, className: "bg-daily-menu-700" },
    { check: tieneCarne, className: "bg-daily-menu-900" },
  ];

  // Función para generar la URL, adaptada para que solo use el ID
  // Esto coincide con la ruta dinámica [...id]
  const generateUrl = (id: string | number | undefined) => {
    return `/product-details/${id}`;
  };

  return (
    <div className="flex flex-col justify-between w-full max-w-sm transition-transform duration-200 border rounded-lg shadow-lg bg-primary-background-900 border-primary-background-800 hover:scale-105">
      {/* Sección de barras de color */}
      <div
        className={`h-2 w-full rounded-t ${
          caloricColors[caloricLevel as number] || "bg-secondary-background-300"
        }`}
      />
      <div className="w-full flex flex-col gap-[2px] text-primary-txt-200">
        {specialIngredients.map(
          (item, index) =>
            item.check && (
              <div key={index} className={`h-2 ${item.className} w-full`} />
            )
        )}
      </div>

      <Link href={generateUrl(id)}>
        <div className="relative w-full h-52">
          <Image
            fill
            className="object-cover rounded-t-lg"
            src={imgUrl || "/docs/images/products/placeholder.png"}
            alt={name || "product image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="px-5 mt-4">
          <h5 className="text-xl font-semibold tracking-tight text-center text-primary-txt-100">
            {name && name.length > 28
              ? `${name.substring(0, 28)}...`
              : name || "Sin nombre"}
          </h5>
          <p className="mt-4 mb-2 text-sm text-center text-secondary-txt-600">
            {description && description.length > 90
              ? `${description.substring(0, 90)}...`
              : description || "Sin descripción"}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 mt-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-center">
            <span className="text-3xl font-bold text-primary-txt-100">
              {price !== undefined ? `$${price}` : "Sin precio"}
            </span>
            <p className="mt-1 text-xs text-secondary-txt-700">
              {stock !== undefined ? `Stock: ${stock}` : "Sin stock"}
            </p>
          </div>
          <Button variant="category" categoryId={category?.id}>
            <p>Añadir al carrito</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
