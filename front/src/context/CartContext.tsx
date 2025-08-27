// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { IProduct } from "@/types/Product";
// ✅ Importa el nuevo hook de sincronización

// Define la URL de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Define las interfaces necesarias
export interface CartItem {
  id: string; 
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string;
  totalItemPrice: number;
  description: string;
  stock: number;
}

interface FullCartSummaryDto {
  id: string; 
  items: CartItem[];
  totalItems: number;
  subTotal: number;
}

// Define la interfaz del contexto para el tipado
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Partial<IProduct>) => Promise<void>;
  updateCartQuantity: (itemId: string, newQuantity: number) => Promise<void>;
  deleteCartItem: (itemId: string) => Promise<void>;
  resetCart: () => Promise<void>;
  totalQuantity: number;
  isLoading: boolean;
  handleAddQuantity: (itemId: string) => void;
  handleRemoveQuantity: (itemId: string) => void;
  cartId: string | null;
  refreshCart: () => void;
}

// 1. Crea el contexto
const CartContext = createContext<CartContextType | null>(null);

// 2. Crea el proveedor que contiene toda la lógica
export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || null;
  

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ Incluimos el useRef para las notificaciones
  const toastRef = useRef(toast);

  const fetchCart = useCallback(async () => {
    // ✅ Condición mejorada: espera a que el usuario esté autenticado Y sincronizado
    if (!isAuthenticated || !userId ) {
      setIsLoading(false);
      setCartItems([]);
      setCartId(null);
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setCartItems([]);
          setCartId(null);
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo cargar el carrito.");
      }
      const data: FullCartSummaryDto = await response.json();
      setCartItems(data.items);
      setCartId(data.id);
    } catch (error: unknown) {
      console.error("Error fetching cart:", error);
      if (error instanceof Error) {
        toastRef.current.error(error.message || "Error al cargar el carrito.");
      } else {
        toastRef.current.error("Ocurrió un error inesperado al cargar el carrito.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, userId, getAccessTokenSilently]); // ✅ Agrega isUserSynced a las dependencias

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ Incluimos la función refreshCart
  const refreshCart = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product: Partial<IProduct>) => {
    // ✅ Condición mejorada: espera a que el usuario esté autenticado Y sincronizado
    if (!isAuthenticated || !userId || !product.id) {
      toastRef.current.error("El usuario no está listo. Por favor, intenta de nuevo.");
      return;
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/cart/addsingle/${userId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.message && errorData.message.includes("stock")) {
          toastRef.current.error("Has llegado al límite de stock disponible para este producto.");
          return;
        }
        if (errorData.message && errorData.message.includes("iniciar sesión")) {
          toastRef.current.error("Debes iniciar sesión para agregar productos al carrito.");
          return;
        }
        throw new Error(errorData.message || "Error al añadir producto al carrito.");
      }
      const updatedCart: FullCartSummaryDto = await response.json();
      setCartItems(updatedCart.items);
      toastRef.current.success(`'${product.name}' agregado al carrito!`);
      setCartId(updatedCart.id);
    } catch (error: unknown) {
      console.error("Error adding to cart:", error);
      if (error instanceof Error) {
        toastRef.current.error(error.message || "Error al añadir producto al carrito.");
      } else {
        toastRef.current.error("Ocurrió un error inesperado.");
      }
    }
  };

  const updateCartQuantity = useCallback(
    async (itemId: string, newQuantity: number) => {
      // ✅ Condición mejorada: espera a que el usuario esté autenticado Y sincronizado
      if (!isAuthenticated || !userId ) {
        toastRef.current.error("El usuario no está listo. Por favor, intenta de nuevo.");
        return;
      }
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/cart/${userId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            updates: [{ itemId: itemId, quantity: newQuantity }],
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 400) {
            toastRef.current.error("No puedes superar el límite de stock disponible.");
            return;
          }
          if (errorData.message && errorData.message.includes("Could not update cart")) {
            toastRef.current.error("Ocurrió un error al actualizar el carrito. Por favor, intenta de nuevo.");
            return;
          }
          throw new Error(errorData.message || "Error al actualizar el carrito.");
        }
        const updatedCart: FullCartSummaryDto = await response.json();
        setCartItems(updatedCart.items);
        toastRef.current.info("Cantidad del producto actualizada.");
        setCartId(updatedCart.id);
      } catch (error: unknown) {
        console.error("Error updating cart:", error);
        if (error instanceof Error) {
          toastRef.current.error(error.message || "Error al actualizar el carrito.");
        } else {
          toastRef.current.error("Ocurrió un error inesperado.");
        }
      }
    },
    [isAuthenticated, userId, getAccessTokenSilently]
  );

  const deleteCartItem = useCallback(
    async (itemId: string) => {
      // ✅ Condición mejorada: espera a que el usuario esté autenticado Y sincronizado
      if (!isAuthenticated || !userId ) {
        toastRef.current.error("El usuario no está listo. Por favor, intenta de nuevo.");
        return;
      }
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/cart/${userId}/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 404) {
            toastRef.current.error("El producto ya no existe en el carrito.");
            return;
          }
          throw new Error(errorData.message || "Error al eliminar el producto.");
        }
        const updatedCart: FullCartSummaryDto = await response.json();
        setCartItems(updatedCart.items);
        toastRef.current.error("Producto eliminado del carrito.");
        setCartId(updatedCart.id);
      } catch (error: unknown) {
        console.error("Error deleting from cart:", error);
        if (error instanceof Error) {
          toastRef.current.error(error.message || "Error al eliminar el producto.");
        } else {
          toastRef.current.error("Ocurrió un error inesperado.");
        }
      }
    },
    [isAuthenticated, userId, getAccessTokenSilently]
  );

  const resetCart = async () => {
    // ✅ Condición mejorada: espera a que el usuario esté autenticado Y sincronizado
    if (!isAuthenticated || !userId ) {
      toastRef.current.error("El usuario no está listo. Por favor, intenta de nuevo.");
      return;
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al vaciar el carrito.");
      }
      setCartItems([]);
      toastRef.current.info("El carrito ha sido vaciado.");
      setCartId(null);
    } catch (error: unknown) {
      console.error("Error resetting cart:", error);
      if (error instanceof Error) {
        toastRef.current.error(error.message || "Error al vaciar el carrito.");
      } else {
        toastRef.current.error("Ocurrió un error inesperado.");
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

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateCartQuantity,
    deleteCartItem,
    resetCart,
    totalQuantity,
    isLoading,
    handleAddQuantity,
    handleRemoveQuantity,
    cartId,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};