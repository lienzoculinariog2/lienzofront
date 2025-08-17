import { IProduct } from "@/types/Product";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../../components/ui/Button";

const ProductCard: FC<Partial<IProduct>> = ({ id, name, description, price, stock, imgUrl, ingredients = [], category }) => {

  const ingredientNames = ingredients.map((i) => i.name.toLowerCase());

  // Nuevas categorías más completas
  const tieneHarina = ingredientNames.some(
    (i) =>
      i.includes("harina") ||
      i.includes("pan") ||
      i.includes("trigo") ||
      i.includes("pasta") ||
      i.includes("pizza") ||
      i.includes("tortilla")
  );

  const tieneQueso = ingredientNames.some(
    (i) =>
      i.includes("queso") ||
      i.includes("mozzarella") ||
      i.includes("cheddar") ||
      i.includes("parmesano") ||
      i.includes("gouda")
  );

  const tieneCarne = ingredientNames.some(
    (i) =>
      i.includes("carne") ||
      i.includes("pollo") ||
      i.includes("pescado") ||
      i.includes("res") ||
      i.includes("cerdo") ||
      i.includes("jamón") ||
      i.includes("salchicha")
  );

  const tieneVerdura = ingredientNames.some(
    (i) =>
      i.includes("verdura") ||
      i.includes("ensalada") ||
      i.includes("vegetal") ||
      i.includes("tomate") ||
      i.includes("lechuga") ||
      i.includes("pepino") ||
      i.includes("espinaca")
  );

  const specialIngredients = [
    { check: tieneVerdura, className: "bg-vegetarian-700" },
    { check: tieneCarne, className: "bg-daily-menu-700" },
    { check: tieneQueso, className: "bg-vegan-400" },
    { check: tieneHarina, className: "bg-celiac-500" },
  ];

  const generateUrl = (id: string | number | undefined) => `/product-details/${id}`;

  return (
    <div className="flex flex-col justify-between w-full max-w-sm transition-transform duration-200 border rounded-lg shadow-lg bg-primary-background-900 border-primary-background-800 hover:scale-105">
      
      {/* Barras de colores según ingredientes */}
    <div className="flex w-full h-2 rounded-full overflow-hidden gap-[2px]">
  {specialIngredients.map(
    (item, index) =>
      item.check && (
        <div
          key={index}
          className={`${item.className} h-full rounded-full`}
          style={{
            width: `${100 / specialIngredients.filter(i => i.check).length}%`,
          }}
        />
      )
  )}
</div>

      {/* Imagen + link al detalle */}
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

        {/* Info básica */}
        <div className="px-5 mt-4">
          <h5 className="text-xl font-semibold tracking-tight text-center text-primary-txt-100">
            {name && name.length > 28 ? `${name.substring(0, 28)}...` : name || "Sin nombre"}
          </h5>
          <p className="mt-4 mb-2 text-sm text-center text-secondary-txt-600">
            {description && description.length > 90
              ? `${description.substring(0, 90)}...`
              : description || "Sin descripción"}
          </p>
        </div>
      </Link>

      {/* Precio + stock + botón */}
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




