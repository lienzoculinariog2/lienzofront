import React from "react";

import CategoriesList from "./[categoryId]/components/CategoriesList";
import { getAllCategories } from "@/services/CategoryService";

const categories = async () => {
  const categoriesFromBackend = await getAllCategories.getAll();

  return (
    <>
      <h1 className="text-primary-txt-200"> Paletas de sabores: </h1>
      <CategoriesList categories={categoriesFromBackend} />
      <br />
    </>
  );
};

export default categories;
