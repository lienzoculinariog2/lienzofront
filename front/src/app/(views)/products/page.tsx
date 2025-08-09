import React from "react";
import CategoriesList from "./[categoryId]/components/CategoriesList";
import { protoCategories } from "@/helpers/categories";

const categories = () => {
  return (
    <>
      <h1 className="text-primary-txt-200"> Paletas de sabores: </h1>
      <CategoriesList categories={protoCategories} />
      <br/>
    </>
  );
};

export default categories;
