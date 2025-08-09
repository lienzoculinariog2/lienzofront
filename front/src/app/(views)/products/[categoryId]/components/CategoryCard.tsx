import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ICategories } from "@/types/Categories";
import Button from "@/components/ui/Button";


const CategoryCard: FC<ICategories> = ({ id, name, description, imgUrl }) => {
  const generateUrl = (categoryId: string) => {
    return `/products/${categoryId}`;
  };

  return (
    <div className="flex w-[70vw] mx-auto bg-light_blue-300 border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="w-1/3 h-auto">
        <Link href={generateUrl(id)} className="relative block w-full h-full">
          <Image
            fill
            src={
              imgUrl ||
              "https://ik.imagekit.io/your_fallback_image_url/fallback.jpg"
            }
            alt={name || "Imagen de la Categoría"}
            className="object-cover"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between w-2/3 p-5">
        <div>
          <Link href={generateUrl(id)}>
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name || "Nombre de la Categoría"}
            </h5>
          </Link>
          <p className="mb-4 text-sm text-gray-500 line-clamp-3">
            {description || "Descripción no disponible"}
          </p>
        </div>
        <div className="flex items-start">
<Link href={generateUrl(id)}>
            <Button
              variant="category" // Le indicamos al botón que use la variante de categoría
              categoryId={id} // Le pasamos el ID para que sepa qué color usar
              className="inline-flex items-center px-3 py-2 text-sm font-medium"
            >
              Ver Productos
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
