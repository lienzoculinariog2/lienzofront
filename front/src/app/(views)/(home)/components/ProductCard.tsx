"use client";
import { IProduct } from "@/types/Product";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../../components/ui/Button";

// Definimos las props, incluyendo la nueva función para añadir al carrito
interface ProductCardProps extends Partial<IProduct> {
  onAddToCart: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  stock,
  imgUrl,
  caloricLevel,
  ingredients = [],
  category,
  onAddToCart,
}) => {
  const ingredientNames = ingredients.map((i) => i.name.toLowerCase());

  const tieneHarina = ingredientNames.some((i) =>
    ["harina", "pan", "trigo", "pasta", "pizza", "tortilla"].some((kw) =>
      i.includes(kw)
    )
  );

  const tieneQueso = ingredientNames.some((i) =>
    ["queso", "mozzarella", "cheddar", "parmesano", "gouda"].some((kw) =>
      i.includes(kw)
    )
  );

  const tieneCarne = ingredientNames.some((i) =>
    ["carne", "pollo", "pescado", "res", "cerdo", "jamón", "salchicha"].some(
      (kw) => i.includes(kw)
    )
  );

  const tieneVerdura = ingredientNames.some((i) =>
    [
      "verdura",
      "ensalada",
      "vegetal",
      "tomate",
      "lechuga",
      "pepino",
      "espinaca",
    ].some((kw) => i.includes(kw))
  );

  const specialIngredients = [
    { check: tieneVerdura, className: "bg-vegetarian-700" },
    { check: tieneCarne, className: "bg-daily-menu-700" },
    { check: tieneQueso, className: "bg-celiac-500" },
    { check: tieneHarina, className: "bg-vegan-600" },
  ];

  const generateUrl = (id: string | number | undefined) =>
    `/product-details/${id}`;
  const hasStock = (stock && stock > 0) || false;

  const caloricColors: { [key: number]: string } = {
    1: "bg-vegetarian-500",
    2: "bg-vegetarian-700",
    3: "bg-yellow-500",
    4: "bg-daily-menu-500",
    5: "bg-daily-menu-700",
  };

  return (
    <div className="flex flex-col justify-between w-full max-w-sm h-[540px] transition-transform duration-200 border rounded-lg shadow-lg bg-primary-background-900 border-primary-background-800 hover:scale-105">
      {/* 🔷 ZONA 1: Barras + Imagen */}
      <div>
        <div className="flex flex-col w-full h-4 gap-[2px]">
          {typeof caloricLevel === "number" &&
          caloricLevel >= 1 &&
          caloricLevel <= 5 ? (
            <div className="w-full h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${caloricColors[caloricLevel]}`}
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div className="w-full h-2 bg-transparent" />
          )}

          <div className="flex w-full h-2 rounded-full overflow-hidden gap-[2px]">
            {specialIngredients.map(
              (item, index) =>
                item.check && (
                  <div
                    key={index}
                    className={`${item.className} h-full rounded-full`}
                    style={{
                      width: `${
                        100 / specialIngredients.filter((i) => i.check).length
                      }%`,
                    }}
                  />
                )
            )}
          </div>
        </div>

        <Link href={generateUrl(id)}>
          <div className="relative w-full h-52">
            {imgUrl && typeof imgUrl === "string" && (
              <Image
                fill
                className="object-cover rounded-t-lg"
                src={imgUrl}
                alt={name || "product image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </Link>
      </div>

      {/* 🔷 ZONA 2: Nombre + Descripción */}
      <Link href={generateUrl(id)}>
        <div className="px-5 mt-4 flex flex-col justify-start h-[100px] overflow-hidden">
          <h5 className="text-xl font-semibold tracking-tight text-center text-primary-txt-100 h-[32px] overflow-hidden">
            {name && name.length > 28
              ? `${name.substring(0, 28)}...`
              : name || "Sin nombre"}
          </h5>
          <p className="mt-2 text-sm text-center text-secondary-txt-600 h-[64px] overflow-hidden">
            {description && description.length > 90
              ? `${description.substring(0, 90)}...`
              : description || "Sin descripción"}
          </p>
        </div>
      </Link>

      {/* 🔷 ZONA 3: Precio + Botón */}
      <div className="px-5 pb-5 flex flex-col items-center justify-center">
        <div className="mb-2 text-center">
          <span className="text-3xl font-bold text-primary-txt-100">
            {price !== undefined ? `$${price}` : "Sin precio"}
          </span>
          <p className="mt-1 text-xs text-secondary-txt-700">
            {stock !== undefined ? `Stock: ${stock}` : "Sin stock"}
          </p>
        </div>
        <Button
          variant="category"
          categoryId={category?.id}
          onClick={onAddToCart}
          disabled={!hasStock}
        >
          <p>{hasStock ? "Añadir al carrito" : "Sin Stock"}</p>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
