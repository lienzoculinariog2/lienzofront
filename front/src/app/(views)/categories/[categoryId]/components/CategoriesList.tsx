import React, { FC } from "react";
import { ICategories } from "@/types/Categories";
import CategoryCard from "./CategoryCard";

interface CategoriesListProps {
  categories: ICategories[];
}

const CategoriesList: FC<CategoriesListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-[45vh] text-center font-bold text-2xl mt-32">
        <p> No hay categorías disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        {categories.map((c) => (
             <CategoryCard {...c} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;