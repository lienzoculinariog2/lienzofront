// src/app/(views)/Demo/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

import ProductCard from "./ProductCard";
import { getProducts } from "@/services/draft/ProductServiceMock";
import { IProduct } from "@/types/Product";
import { useCart } from "@/hooks/useCart"; // Importa el hook


export default function DemoPage() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("No se pudieron cargar los productos.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    return (
        <main>
            <div className="py-8 bg-primary-background-500">
                <h1 className="text-2xl font-bold mb-10 text-center text-primary-txt-100">Página de Demostración</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center mt-20">
                        <p className="text-center text-primary-txt-100">Cargando productos...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center mt-20">
                        <p className="text-center text-daily-menu-500">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                onAddToCart={() => addToCart(product)}
                                {...product}
                            />
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer position="bottom-right" />
        </main>
    );
}