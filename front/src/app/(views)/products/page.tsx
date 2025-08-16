import React from "react";

import CategoriesList from "./[categoryId]/components/CategoriesList";
import { categoriesServices } from "@/services/CategoryService";

const categories = async () => {
  const categoriesFromBackend = await categoriesServices.getAll();
   const activeCategories = categoriesFromBackend.filter(c => c.isActive);
   
  return (
    <>
      <div className="container p-4 mx-auto">
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
