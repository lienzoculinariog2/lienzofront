"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/ui/SerchBar";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import ProductCard from "@/app/(views)/(home)/components/ProductCard";
import { categoriesServices } from "@/services/CategoryService";
import { CategoryOption, ICategories } from "@/types/Categories";

// 🔐 Auth0 y carrito
import { useAuth0 } from "@auth0/auth0-react";
import { useCart } from "@/hooks/useCart";

interface RenderBarProps {
  title?: string;
}

const RenderBarWithCart: React.FC<RenderBarProps> = ({ title }) => {
  const { user } = useAuth0();
  const userId = user?.sub || null;
  const { addToCart } = useCart(userId);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>({
    id: "all",
    name: "Todas las categorías",
  });
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const pageTitle = title || "Nuestros Menus";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoriesServices.getAll();
        const categoryObjects = fetchedCategories
          .filter((cat: ICategories) => cat.isActive)
          .map((cat) => ({ id: cat.id, name: cat.name }));
        setCategories([
          { id: "all", name: "Todas las categorías" },
          ...categoryObjects,
        ]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (!hasMore) return;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await productService.getPaginatedAndFiltered({
          page,
          limit: 12,
          term: searchTerm,
          category:
            selectedCategory.id !== "all" ? selectedCategory.id : undefined,
        });

        setProducts((prev) => {
          const newProducts = res.data.filter(
            (p) => !prev.some((prevP) => prevP.id === p.id)
          );
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const handleSearch = useCallback((category: CategoryOption, term: string) => {
    setSelectedCategory(category);
    setSearchTerm(term);
  }, []);

  return (
    <main className="container p-4 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        {pageTitle}
      </h1>

      <SearchBar onSearch={handleSearch} categories={categories} />

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
               onAddToCart={() => addToCart({ id: product.id, name: product.name })}
              />
            ))
          : !isLoading && (
              <p className="text-lg text-center text-secondary-txt-500 col-span-full">
                No se encontraron productos que coincidan con la búsqueda.
              </p>
            )}
      </div>

      {isLoading && (
        <p className="mt-4 text-center text-primary-txt-400">
          Cargando productos...
        </p>
      )}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </main>
  );
};

export default RenderBarWithCart;
