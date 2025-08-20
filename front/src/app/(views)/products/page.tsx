import React from "react";

import CategoriesList from "./[categoryId]/components/CategoriesList";
import { categoriesServices } from "@/services/CategoryService";
import Image from "next/image";

const categories = async () => {
  const categoriesFromBackend = await categoriesServices.getAll();
   const activeCategories = categoriesFromBackend.filter(c => c.isActive);
   
  return (
    <>
      <div >
        <div className="relative w-full h-[450px]">
                  <Image
                    src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_axvy0oaxvy0oaxvy.png?updatedAt=1755719449885"
                    alt="Banner de comida en la página de inicio"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 z-10 bg-gray-300/10" />
        
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Image
                      src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/2145c662-3775-48b0-aba7-55d032195e32-removebg-preview.png?updatedAt=1754512253493"
                      alt="Logo de Lienzo Culinario"
                      width={400}
                      height={400}
                      className="filter contrast-150 brightness-75"
                    />
                  </div>
                </div>
        <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
          Paleta de sabores:
        </h1>
      </div>

      <CategoriesList categories={activeCategories} />
      <br />
    </>
  );
};

export default categories;
