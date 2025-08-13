"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SerchBar";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import { getAllCategories } from "@/services/CategoryService"; 
import ProductCard from "@/app/(views)/(home)/components/ProductCard";


interface RenderBarProps {
  title?: string;
}

const RenderBar: React.FC<RenderBarProps> = ({ title }) => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [categories, setCategories] = useState<string[]>([]);

  const pageTitle = title || "Nuestros Menus";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [products, fetchedCategories] = await Promise.all([
          productService.getAll(),
          getAllCategories.getAll(),
        ]);

        setAllProducts(products);
        setFilteredProducts(products);

        const categoryNames = fetchedCategories.map(cat => cat.name);
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
    const filterProducts = () => {
      let results = allProducts;
  
      if (selectedCategory !== "Todas las categorías") {
        results = results.filter(product => product.category?.name === selectedCategory);
      }
  
      if (searchTerm !== "") {
        const lowercasedTerm = searchTerm.toLowerCase();
        results = results.filter((product) => {
          const hasMatchingIngredient = product.ingredients?.some(
            (ingredient) => ingredient.toLowerCase().includes(lowercasedTerm)
          );
  
          return (
            product.name?.toLowerCase().includes(lowercasedTerm) ||
            product.description?.toLowerCase().includes(lowercasedTerm) ||
            hasMatchingIngredient
          );
        });
      }
  
      setFilteredProducts(results);
    };
  
    filterProducts();
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
}

export default RenderBar;