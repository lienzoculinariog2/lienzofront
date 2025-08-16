// src/hooks/useCart.ts
"use client";

import { IProduct } from "@/types/Product";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CART_LOCAL_STORAGE_KEY = "demo_cart";

// Interfaz para los productos del carrito con cantidad
export interface CartItem extends Partial<IProduct> {
    quantity: number;
}

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Partial<IProduct>) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                // Si el producto ya existe, incrementamos la cantidad
                const updatedItems = prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return updatedItems;
            } else {
                // Si no existe, lo agregamos con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        toast.success(`'${product.name}' agregado al carrito!`);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === productId);

            if (existingItem && existingItem.quantity > 1) {
                // Si la cantidad es mayor a 1, la decrementamos
                const updatedItems = prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
                return updatedItems;
            } else {
                // Si la cantidad es 1, eliminamos el ítem
                return prevItems.filter((item) => item.id !== productId);
            }
        });
        toast.info("Producto eliminado del carrito");
    };

    const resetCart = () => {
        setCartItems([]);
        localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
        toast.info("El carrito ha sido vaciado.");
    };

    // Añadimos el total de items
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Corregimos el return para que devuelva totalQuantity
    return { cartItems, addToCart, removeFromCart, resetCart, totalQuantity };
};