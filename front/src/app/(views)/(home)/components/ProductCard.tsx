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
  } = product;

  // Lógica para detectar ingredientes
  const tieneCarne = ingredients?.includes("carne");
  const tieneHarina = ingredients?.some(
    (i) => i.includes("pasta") || i.includes("pan") || i.includes("harina")
  );
  const tieneLacteo = ingredients?.some(
    (i) => i.includes("leche") || i.includes("lacteo")
  );
  const tieneVerdura = ingredients?.includes("verdura");

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
    // CAMBIO CLAVE: Se usa una sola estructura para la tarjeta.
    // El 'Link' ahora envuelve solo las partes que deberían ser clicables
    // para ir a la página de detalles, no el botón de "Añadir al carrito".
    <div className="w-full max-w-sm rounded-lg shadow-lg bg-primary-background-900 border border-primary-background-800 transition-transform duration-200 hover:scale-105">
      {/* Sección de barras de color */}
      <div
        className={`h-2 w-full rounded-t ${
          caloricColors[caloricLevel as number] || "bg-secondary-background-300"
        }`}
      />
      <div className="w-full flex flex-col gap-[2px]">
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
            {name || "Producto sin nombre"}
          </h5>
          <p className="mb-2 text-sm text-center text-secondary-txt-600">
            {description || "Sin descripción"}
          </p>
        </div>
      </Link>

      {/* Sección de precio, stock y botón fuera del Link */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-3xl font-bold text-primary-txt-100">
              {price !== undefined ? `$${price}` : "Sin precio"}
            </span>
            <p className="text-xs text-secondary-txt-700 ml-2">
              {stock !== undefined ? `Stock: ${stock}` : "Sin stock"}
            </p>
          </div>
          <Button variant="dailyMenu">
            <p>Añadir al carrito</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
