// src/app/(views)/home/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ProductCard from "./components/ProductCard";
import { IProduct } from "@/types/Product";
// IMPORTAMOS EL HOOK DE AUTH0
import { useAuth0 } from "@auth0/auth0-react";
// Importamos el hook del carrito que ya está conectado a la API
import { useCart } from "@/hooks/useCart";
// IMPORTAMOS TU SERVICIO DE PRODUCTOS REAL
import { productService } from "@/services/ProductService";


export default function HomePage() {
    const { user } = useAuth0();
    const userId = user?.sub || null;
    
    const { addToCart } = useCart(userId);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // FUNCIÓN REAL: AHORA USARÁ TU SERVICIO
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            // USAMOS LA FUNCIÓN getAll() DE TU SERVICIO DE PRODUCTOS
            const data = await productService.getAll();
            
            setProducts(data);
            setError(null);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado al cargar los productos.");
            }
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
                <h1 className="text-2xl font-bold mb-10 text-center text-primary-txt-100">Página Principal</h1>
                
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

