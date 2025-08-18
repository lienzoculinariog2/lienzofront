"use client";

import { IProduct } from "@/types/Product";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Interfaz para los productos del carrito con cantidad
export interface CartItem {
    id: string; // ID del CartItem (UUID)
    name: string;
    price: number;
    quantity: number;
    imgUrl?: string;
    totalItemPrice: number;
    description: string;
    stock: number;
}

// Interfaz que devuelve tu back-end
interface FullCartSummaryDto {
    items: CartItem[];
    totalItems: number;
    subTotal: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useCart = (userId: string | null) => {
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
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (product: Partial<IProduct>) => {
        if (!userId || !product.id) {
            toast.error("Error: Se requiere iniciar sesión y un ID de producto válido.");
            return;
        }

        try {
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
        } catch (error: unknown) {
            console.error('Error adding to cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al añadir producto al carrito.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    };
    
    // CORRECCIÓN: Envuelto en useCallback
    const updateCartQuantity = useCallback(async (itemId: string, newQuantity: number) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para actualizar el carrito.");
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/cart/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    updates: [{ itemId: itemId, quantity: newQuantity }],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el carrito.');
            }
            const updatedCart: FullCartSummaryDto = await response.json();
            setCartItems(updatedCart.items);
            toast.info("Cantidad del producto actualizada.");
        } catch (error: unknown) {
            console.error('Error updating cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al actualizar el carrito.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    }, [userId]);

    // CORRECCIÓN: Envuelto en useCallback
    const deleteCartItem = useCallback(async (itemId: string) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para eliminar productos del carrito.");
            return;
        }
        try {
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
        } catch (error: unknown) {
            console.error('Error deleting from cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al eliminar el producto.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
    }, [userId]);

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
    
    // Función para manejar el evento de clic en el botón de añadir en CartItem
    const handleAddQuantity = useCallback((itemId: string) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            updateCartQuantity(itemId, item.quantity + 1);
        }
    }, [cartItems, updateCartQuantity]);

    // Función para manejar el evento de clic en el botón de restar en CartItem
    const handleRemoveQuantity = useCallback((itemId: string) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item && item.quantity > 1) {
            updateCartQuantity(itemId, item.quantity - 1);
        } else if (item && item.quantity === 1) {
            deleteCartItem(itemId);
        }
    }, [cartItems, updateCartQuantity, deleteCartItem]);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return { 
        cartItems, 
        addToCart, 
        updateCartQuantity, 
        deleteCartItem, 
        resetCart, 
        totalQuantity, 
        isLoading,
        handleAddQuantity,
        handleRemoveQuantity
    };
};






