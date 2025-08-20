// app/(views)/(category)/CategoryProductsClient.tsx
"use client";

import React from "react";
import { IProduct } from "@/types/Product";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/app/(views)/(home)/components/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  products: IProduct[];
}

const CategoryProductsClient: React.FC<Props> = ({ products }) => {
   const { user } = useAuth0();
  const userId = user?.sub || null;
  const { addToCart } = useCart(userId);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={() =>
            addToCart({ id: product.id, name: product.name || "Producto" })
          }
        />
      ))}
    </div>
  );
};

export default CategoryProductsClient;
