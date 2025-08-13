import React from "react";

import CategoriesList from "./[categoryId]/components/CategoriesList";
import { getAllCategories } from "@/services/CategoryService";

const categories = async () => {
  const categoriesFromBackend = await getAllCategories.getAll();

  return (
    <>
      {/* <div className="container p-4 mx-auto">
        <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
          Paletas de sabores: 
        </h1>
      </div> */}
      <CategoriesList categories={categoriesFromBackend} />
      <br />
    </>
  );
};

export default categories;
