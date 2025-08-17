// src/hooks/useCart.ts
"use client";

import { IProduct } from "@/types/Product";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Interfaz para los productos del carrito con cantidad
export interface CartItem extends Partial<IProduct> {
    quantity: number;
    product?: IProduct;
}

// Interfaz que devuelve tu back-end
interface FullCartSummaryDto {
    items: CartItem[];
    totalItems: number;
    subTotal: number;
}

export const useCart = (userId: string | null) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchCart = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            setCartItems([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/cart/${userId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    setCartItems([]);
                    return;
                }
                throw new Error('No se pudo cargar el carrito.');
            }
            const data: FullCartSummaryDto = await response.json();
            setCartItems(data.items);
        } catch (error: unknown) {
            console.error('Error fetching cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al cargar el carrito.');
            } else {
                toast.error('Ocurrió un error inesperado al cargar el carrito.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId, API_URL]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // LÓGICA CORREGIDA PARA AÑADIR/ACTUALIZAR PRODUCTOS
    const addToCart = async (product: Partial<IProduct>) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }
        if (!product.id) {
            toast.error("Error: el producto no tiene un ID válido.");
            return;
        }

        try {
            // Se busca el item usando el ID del producto, no el ID del cartItem
            const existingItem = cartItems.find(item => item.product?.id === product.id);

            if (existingItem) {
                // Si el producto ya existe, se actualiza la cantidad con una petición PUT
                const updatedQuantity = existingItem.quantity + 1;
                const response = await fetch(`${API_URL}/cart/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        updates: [{ itemId: existingItem.id, quantity: updatedQuantity }],
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al actualizar el carrito.');
                }
                const updatedCart: FullCartSummaryDto = await response.json();
                setCartItems(updatedCart.items);
                toast.success(`'${product.name}' actualizado en el carrito!`);
            } else {
                // Si el producto no existe, se añade con una petición POST
                const response = await fetch(`${API_URL}/cart/addsingle/${userId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product.id, quantity: 1 }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al añadir producto al carrito.');
                }
                const updatedCart: FullCartSummaryDto = await response.json();
                setCartItems(updatedCart.items);
                toast.success(`'${product.name}' agregado al carrito!`);
            }
        } catch (error: unknown) {
            console.error('Error adding to cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al añadir producto al carrito.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    };

    const removeFromCart = async (itemId: string) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para eliminar productos del carrito.");
            return;
        }
        try {
            const currentItem = cartItems.find(item => item.id === itemId);
            if (!currentItem) return;

            if (currentItem.quantity > 1) {
                const response = await fetch(`${API_URL}/cart/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        updates: [{ itemId: itemId, quantity: currentItem.quantity - 1 }],
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al actualizar el carrito.');
                }
                const updatedCart: FullCartSummaryDto = await response.json();
                setCartItems(updatedCart.items);
                toast.info("Cantidad del producto actualizada.");
            } else {
                const response = await fetch(`${API_URL}/cart/${userId}/${itemId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al eliminar el producto.');
                }
                const updatedCart: FullCartSummaryDto = await response.json();
                setCartItems(updatedCart.items);
                toast.info("Producto eliminado del carrito.");
            }
        } catch (error: unknown) {
            console.error('Error removing from cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al eliminar el producto.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    };

    const resetCart = async () => {
        if (!userId) {
            toast.error("Debes iniciar sesión para vaciar el carrito.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/cart/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al vaciar el carrito.');
            }
            setCartItems([]);
            toast.info("El carrito ha sido vaciado.");
        } catch (error: unknown) {
            console.error('Error resetting cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al vaciar el carrito.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    };

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return { cartItems, addToCart, removeFromCart, resetCart, totalQuantity, isLoading };
};





