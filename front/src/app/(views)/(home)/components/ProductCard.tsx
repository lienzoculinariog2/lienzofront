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
    imgURL,
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
<<<<<<< HEAD:front/src/components/cards/flowbiteCard.tsx
    // CAMBIO: Se envuelve toda la tarjeta en un solo <Link> para que sea clicable
=======
    // CAMBIO: Se usa bg-primary-background-900 y border-primary-background-800 para el fondo oscuro
    <div className="w-full max-w-sm border rounded-lg shadow-lg bg-primary-background-900 border-primary-background-800">
    
      {/* Sección de barras de color */}
    <div
        className={`h-2 w-full rounded-t ${
        caloricColors[caloricLevel as number] || "bg-secondary-background-300"
        }`}
    />
    <div className="w-full flex flex-col gap-[2px]">
        {specialIngredients.map((item, index) =>
        item.check && (
            <div key={index} className={`h-2 ${item.className} w-full`} />
        )
        )}
    </div>

>>>>>>> bf3e652295cc7fb040e069ae76246b81766f03b8:front/src/app/(views)/(home)/components/ProductCard.tsx
    <Link href={generateUrl(id)}>
    <div className="w-full max-w-sm bg-primary-background-900 border border-primary-background-800 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105">
        {/* Sección de barras de color */}
        <div
        className={`h-2 w-full rounded-t ${
            caloricColors[caloricLevel as number] || "bg-secondary-background-300"
        }`}
        />
        <div className="w-full flex flex-col gap-[2px]">
        {specialIngredients.map((item, index) =>
            item.check && (
            <div key={index} className={`h-2 ${item.className} w-full`} />
            )
        )}
        </div>

        <div className="relative w-full h-52">
        <Image
            fill
            className="object-cover rounded-t-lg"
            src={imgURL || "/docs/images/products/placeholder.png"}
            alt={name || "product image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </div>
<<<<<<< HEAD:front/src/components/cards/flowbiteCard.tsx
        
        <div className="mt-4 px-5 pb-5">
          {/* CAMBIO: El nombre del producto ya no es un link duplicado */}
        <h5 className="text-xl font-semibold tracking-tight text-primary-txt-100 text-center">
            {name || "Producto sin nombre"}
        </h5>
        <p className="text-center text-secondary-txt-600 text-sm mb-2">
=======
    </Link>
    
    {/* CAMBIO: Se ajusta el espaciado superior a "mt-4" en lugar de "mt-2" y se elimina el padding del div exterior*/}
    <div className="px-5 pb-5 mt-4">
        <Link href={generateUrl(id)}>
          {/* CAMBIO: El texto del nombre del producto ahora está centrado y es de color blanco */}
        <h5 className="text-xl font-semibold tracking-tight text-center text-primary-txt-100">
            {name || "Producto sin nombre"}
        </h5>
        </Link>
          {/* CAMBIO: La descripción también está centrada y usa un color de gris más oscuro para la descripción. */}
        <p className="mb-2 text-sm text-center text-secondary-txt-600">
>>>>>>> bf3e652295cc7fb040e069ae76246b81766f03b8:front/src/app/(views)/(home)/components/ProductCard.tsx
            {description || "Sin descripción"}
        </p>
        
        <div className="mt-4"></div>

        <div className="flex items-center justify-between">
            <div>
<<<<<<< HEAD:front/src/components/cards/flowbiteCard.tsx
            <span className="text-3xl font-bold text-primary-txt-100">
                {price !== undefined ? `$${price}` : "Sin precio"}
            </span>
            <p className="text-xs text-secondary-txt-700 ml-2">
                {stock !== undefined ? `Stock: ${stock}` : "Sin stock"}
=======
                  {/* CAMBIO: El precio usa el color blanco */}
                <span className="text-3xl font-bold text-primary-txt-100">
                    {price !== undefined ? `$${price}` : "Sin precio"}
                </span>
                  {/* CAMBIO: El stock usa un color de gris más oscuro */}
                <p className="ml-2 text-xs text-secondary-txt-700">
                    {stock !== undefined ? `Stock: ${stock}` : "Sin stock"}
                </p>
            </div>
            <Button variant="dailyMenu">
            <p>
                Añadir al carrito
>>>>>>> bf3e652295cc7fb040e069ae76246b81766f03b8:front/src/app/(views)/(home)/components/ProductCard.tsx
            </p>
            </div>
            {/* El botón ya no está dentro del Link para evitar un link anidado */}
            <Button variant="dailyMenu">
            <p>Añadir al carrito</p>
            </Button>
        </div>
        </div>
    </div>
    </Link>
);
};

export default ProductCard;