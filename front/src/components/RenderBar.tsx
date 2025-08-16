"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/ui/SerchBar";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import ProductCard from "@/app/(views)/(home)/components/ProductCard";
import { categoriesServices } from "@/services/CategoryService";
import { ICategories } from "@/types/Categories";

interface RenderBarProps {
  title?: string;
}

const RenderBar: React.FC<RenderBarProps> = ({ title }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [categories, setCategories] = useState<string[]>([]);

  const pageTitle = title || "Nuestros Menus";

  // Fetch categorías al montar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoriesServices.getAll();
        const categoryNames = fetchedCategories
          .filter((cat: ICategories) => cat.isActive)
          .map((cat) => cat.name);
        setCategories(["Todas las categorías", ...categoryNames]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Resetear productos al cambiar búsqueda o categoría
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm, selectedCategory]);

  // Cargar productos cuando cambia página, búsqueda o categoría
  useEffect(() => {
    if (!hasMore) return;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await productService.getPaginatedAndFiltered({
          page,
          limit: 20,
          term: searchTerm,
          category: selectedCategory !== "Todas las categorías" ? selectedCategory : undefined,
        });

        // Evitar duplicados
        setProducts(prev => {
          const newProducts = res.data.filter(p => !prev.some(prevP => prevP.id === p.id));
          return [...prev, ...newProducts];
        });

        setHasMore(res.hasNextPage);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm, selectedCategory, hasMore]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading &&
        hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const handleSearch = useCallback((category: string, term: string) => {
    setSelectedCategory(category);
    setSearchTerm(term);
  }, []);

  return (
    <main className="container p-4 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        {pageTitle}
      </h1>

      <SearchBar onSearch={handleSearch} categories={categories} />

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} {...product} />)
        ) : (
          !isLoading && (
            <p className="text-lg text-center text-secondary-txt-500 col-span-full">
              No se encontraron productos que coincidan con la búsqueda.
            </p>
          )
        )}
      </div>

      {isLoading && (
        <p className="mt-4 text-center text-primary-txt-400">Cargando productos...</p>
      )}
      {/* {!hasMore && products.length > 0 && (
        <p className="mt-8 text-center text-secondary-txt-500">No hay más productos</p>
      )} */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </main>
  );
};

export default RenderBar;