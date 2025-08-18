"use client";

import { IProduct } from "@/types/Product";
import { useCart } from "@/hooks/useCart";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  product: IProduct;
}

export default function AddToCartButton({ product }: Props) {
  const { user, isAuthenticated } = useAuth0();
  const userId = isAuthenticated ? user?.sub || null : null;

  const { addToCart } = useCart(userId);

  const handleClick = () => {
    addToCart(product); // ya maneja validación, toast y actualización
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isAuthenticated || !userId}
      className={`px-6 py-2 text-white transition rounded ${
        isAuthenticated && userId
          ? "bg-daily-menu-600 hover:bg-daily-menu-700"
          : "bg-low-calories-500 cursor-not-allowed"
      }`}
    >
      {isAuthenticated ? "Añadir al carrito" : "Iniciá sesión para comprar"}
    </button>
  );
}
