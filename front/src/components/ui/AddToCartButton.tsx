"use client";

import { IProduct } from "@/types/Product";
import { useCart } from "@/hooks/useCart";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/ui/Button";

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

  const hasAccess = isAuthenticated && userId;

  return (
    <Button
      onClick={handleClick}
      variant="category"
      categoryId={product.category.id} // aquí le pasas la categoría del producto
      disabled={!hasAccess || (product.stock ?? 0) <= 0}
      className="w-full"
    >
      {hasAccess ? "Añadir al carrito" : "Iniciá sesión para comprar"}
    </Button>
  );
}
