import React, { FC } from "react";
import Link from "next/link"; 
import { ICategories } from "@/types/Categories";
import CategoryCard from "../../[ccategoryId]/components/CategoryCard";

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
          <Link href={`/products/${c.id}`} key={c.id}>
            <CategoryCard {...c} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;