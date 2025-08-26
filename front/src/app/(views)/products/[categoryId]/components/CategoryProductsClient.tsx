// app/(views)/(category)/CategoryProductsClient.tsx
"use client";

import React from "react";
import { IProduct } from "@/types/Product";
// ❌ Ya no necesitas useCart en este componente, el contexto lo maneja
// import { useCart } from "@/hooks/useCart"; 
import ProductCard from "@/app/(views)/(home)/components/ProductCard";
// ❌ useAuth0 tampoco es necesario aquí, ya que no se usa para nada más que el userId del useCart
// import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  products: IProduct[];
}

const CategoryProductsClient: React.FC<Props> = ({ products }) => {
  // ❌ Ya no necesitas las siguientes líneas
  // const { user } = useAuth0();
  // const userId = user?.sub || null;
  // const { addToCart } = useCart(userId);

  return (
    <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-7xl">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          // ❌ La prop onAddToCart ya no es necesaria aquí
        />
      ))}
    </div>
  );
};

export default CategoryProductsClient;
