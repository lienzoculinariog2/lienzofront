// src/hooks/useCart.ts
"use client";

import { IProduct } from "@/types/Product";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// ... (interfaces se mantienen igual)
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
interface FullCartSummaryDto {
  id: string; // <-- Importante: El ID del carrito ahora se define aquí
  items: CartItem[];
  totalItems: number;
  subTotal: number;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useCart = (userId: string | null) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Añadimos un estado para guardar el ID del carrito
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      setCartItems([]);
      setCartId(null);
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
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo cargar el carrito.");
      }
      const data: FullCartSummaryDto = await response.json();
      setCartItems(data.items);
      // Guardamos el cartId que viene de la API
      setCartId(data.id);
    } catch (error: unknown) {
      console.error("Error fetching cart:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Error al cargar el carrito.");
      } else {
        toast.error("Ocurrió un error inesperado al cargar el carrito.");
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
      toast.error("Debes iniciar sesión para añadir un producto al carrito.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/cart/addsingle/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (
          response.status === 400 &&
          errorData.message &&
          errorData.message.includes("stock")
        ) {
          toast.error(
            "Has llegado al límite de stock disponible para este producto."
          );
          return;
        }
        if (errorData.message && errorData.message.includes("iniciar sesión")) {
          toast.error(
            "Debes iniciar sesión para agregar productos al carrito."
          );
          return;
        }
        throw new Error(
          errorData.message || "Error al añadir producto al carrito."
        );
      }
      const updatedCart: FullCartSummaryDto = await response.json();
      setCartItems(updatedCart.items);
      toast.success(`'${product.name}' agregado al carrito!`);
      setCartId(updatedCart.id);
    } catch (error: unknown) {
      console.error("Error adding to cart:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Error al añadir producto al carrito.");
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    }
  };

  const updateCartQuantity = useCallback(
    async (itemId: string, newQuantity: number) => {
      if (!userId) {
        toast.error("Debes iniciar sesión para actualizar el carrito.");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/cart/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            updates: [{ itemId: itemId, quantity: newQuantity }],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json(); // --- LÓGICA DE MANEJO DE ERRORES MEJORADA --- // Si el error es 400 (Bad Request), asumimos que es de validación (como el stock)
          if (response.status === 400) {
            toast.error("No puedes superar el límite de stock disponible.");
            return;
          } // Si el mensaje es el de "Could not update cart...", mostramos el error genérico
          if (
            errorData.message &&
            errorData.message.includes("Could not update cart")
          ) {
            toast.error(
              "Ocurrió un error al actualizar el carrito. Por favor, intenta de nuevo."
            );
            return;
          }
          throw new Error(
            errorData.message || "Error al actualizar el carrito."
          );
        }
        const updatedCart: FullCartSummaryDto = await response.json();
        setCartItems(updatedCart.items);
        toast.info("Cantidad del producto actualizada.");
        setCartId(updatedCart.id);
      } catch (error: unknown) {
        console.error("Error updating cart:", error);
        if (error instanceof Error) {
          toast.error(error.message || "Error al actualizar el carrito.");
        } else {
          toast.error("Ocurrió un error inesperado.");
        }
      }
    },
    [userId]
  );

  const deleteCartItem = useCallback(
    async (itemId: string) => {
      if (!userId) {
        toast.error(
          "Debes iniciar sesión para eliminar productos del carrito."
        );
        return;
      }
      try {
        const response = await fetch(`${API_URL}/cart/${userId}/${itemId}`, {
          method: "DELETE",
        });

            if (!response.ok) {
                const errorData = await response.json();
                
                if (response.status === 404) {
                    toast.error("El producto ya no existe en el carrito.");
                    return;
                }
                
                throw new Error(errorData.message || 'Error al eliminar el producto.');
            }
            const updatedCart: FullCartSummaryDto = await response.json();
            setCartItems(updatedCart.items);
            toast.error("Producto eliminado del carrito.");
        } catch (error: unknown) {
            console.error('Error deleting from cart:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al eliminar el producto.');
            } else {
                toast.error('Ocurrió un error inesperado.');
            }
        }
      }
    },
    [userId]
  );

  const resetCart = async () => {
    if (!userId) {
      toast.error("Debes iniciar sesión para vaciar el carrito.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al vaciar el carrito.");
      }
      setCartItems([]);
      toast.info("El carrito ha sido vaciado.");
      setCartId(null);
    } catch (error: unknown) {
      console.error("Error resetting cart:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Error al vaciar el carrito.");
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    }
  };
  const handleAddQuantity = useCallback(
    (itemId: string) => {
      const item = cartItems.find((i) => i.id === itemId);
      if (item) {
        updateCartQuantity(itemId, item.quantity + 1);
      }
    },
    [cartItems, updateCartQuantity]
  );

  const handleRemoveQuantity = useCallback(
    (itemId: string) => {
      const item = cartItems.find((i) => i.id === itemId);
      if (item && item.quantity > 1) {
        updateCartQuantity(itemId, item.quantity - 1);
      } else if (item && item.quantity === 1) {
        deleteCartItem(itemId);
      }
    },
    [cartItems, updateCartQuantity, deleteCartItem]
  );

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
    handleRemoveQuantity,
    cartId, // Añadimos el cartId al return
  };
};
