"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SerchBar";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import ProductCard from "@/app/(views)/(home)/components/ProductCard";
import { categoriesServices } from "@/services/CategoryService";

interface RenderBarProps {
  title?: string;
}

const RenderBar: React.FC<RenderBarProps> = ({ title }) => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Todas las categorías"
  );
  const [categories, setCategories] = useState<string[]>([]);

  const pageTitle = title || "Nuestros Menus";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [products, fetchedCategories] = await Promise.all([
          productService.getAll(),
          categoriesServices.getAll(),
        ]);

        setAllProducts(products);
        setFilteredProducts(products);

        const categoryNames = fetchedCategories.map((cat) => cat.name);
        setCategories(["Todas las categorías", ...categoryNames]);
      } catch (err) {
        setError("No se pudieron cargar los datos.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let results = allProducts;

    // 1. Aplicar filtro de categoría
    if (selectedCategory !== "Todas las categorías") {
      results = results.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // 2. Aplicar filtro de búsqueda
    if (searchTerm !== "") {
      const normalizedTerm = searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      results = results.filter((product) => {
        const normalizedName = product.name
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const normalizedDescription = product.description
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const nameMatches = normalizedName?.includes(normalizedTerm);
        const descriptionMatches =
          normalizedDescription?.includes(normalizedTerm);

        const hasMatchingIngredient = product.ingredients?.some(
          (ingredient) => {
            const normalizedIngredient = ingredient.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return normalizedIngredient.includes(normalizedTerm);
          }
        );

        return nameMatches || descriptionMatches || hasMatchingIngredient;
      });
    }

    // 3. Actualizar los productos filtrados con el resultado final
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, allProducts]);

  const handleSearch = (category: string, term: string) => {
    setSelectedCategory(category);
    setSearchTerm(term);
  };

  return (
    <main className="container p-4 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        {pageTitle}
      </h1>

      <SearchBar onSearch={handleSearch} categories={categories} />

      {isLoading && (
        <p className="mt-8 text-lg text-center text-primary-txt-400">
          Cargando productos...
        </p>
      )}

      {error && (
        <p className="mt-8 text-lg text-center text-red-500">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-lg text-center text-secondary-txt-500 col-span-full">
              No se encontraron productos que coincidan con la búsqueda.
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default RenderBar;
