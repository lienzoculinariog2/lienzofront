// src/app/(views)/menu/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SerchBar";
import { IProduct } from "@/types/Product";
import ProductCard from "../(home)/components/ProductCard";

// **Tus datos de prueba (`protoProduct`) son usados aquí**
const mockProducts: IProduct[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Milanesa con arroz",
    description:
      "Es una milanesa que además tiene arroz. Es una milanesa con arroz.",
    price: 450.0,
    stock: 3,
    imgURL:
      "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_q8noseq8noseq8no.png?updatedAt=1754607553700",
    isActive: true,
    category: "550e8400-e29b-41d4-a716-446655440000",
    caloricLevel: 5,
    ingredients: ["carne", "grano", "verdura"],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441000",
    name: "Milanesa sin arroz",
    description:
      "Es una milanesa que no tiene arroz. Es una milanesa sin arroz.",
    price: 400.0,
    stock: 5,
    imgURL:
      "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Gemini_Generated_Image_6k2jo76k2jo76k2j.png?updatedAt=1754607408351",
    isActive: true,
    category: "550e8400-e29b-41d4-a716-446655441000",
    caloricLevel: 3,
    ingredients: ["carne"],
  },
];

export default function MenuPage() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para la búsqueda y el filtro
  const [searchTerm, setSearchTerm] = useState("");

  // No se usa selectedCategory porque tu prototipo no tiene la propiedad 'category'
  // const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');

  // useEffect para cargar los datos del backend una sola vez
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // En un futuro, aquí harías tu llamada a la API real
        // const response = await fetch('/api/products');
        // const data = await response.json();
        // setAllProducts(data);

        // Por ahora, simulamos la espera con setTimeout
        setTimeout(() => {
          setAllProducts(mockProducts);
          setIsLoading(false);
        }, 1500); // Simula 1.5 segundos de carga
      } catch (err) {
        setError("No se pudieron cargar los productos.");
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []); // El array vacío asegura que se ejecuta solo al montar el componente

  // La función que actualiza el estado y se pasa al SearchBar
  const handleSearch = (category: string, term: string) => {
    // Al no tener una propiedad 'category' en tus datos, ignoramos el parámetro 'category'
    // y solo actualizamos el término de búsqueda.
    setSearchTerm(term);
  };

  // Lógica para filtrar los productos en base al estado del término de búsqueda
  const filteredProducts = allProducts.filter((product) => {
    // Se ha eliminado el filtro por categoría para que coincida con la interfaz `IProduct`
    // y solo se filtre por el término de búsqueda.
    const matchesSearchTerm =
      (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);

    return matchesSearchTerm;
  });

  // Renderizado condicional
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Nuestro Menú</h1>

      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <p className="text-center text-lg text-primary-txt-400 mt-8">
          Cargando productos...
        </p>
      )}

      {error && (
        <p className="text-center text-lg text-red-500 mt-8">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-center text-lg text-secondary-txt-500 col-span-full">
              No se encontraron productos que coincidan con la búsqueda.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
