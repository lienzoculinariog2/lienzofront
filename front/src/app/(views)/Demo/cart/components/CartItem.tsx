// src/app/(views)/Demo/Cart/components/CartItem.tsx
"use client";

import React from 'react';
import { IProduct } from "@/types/Product";
import Image from "next/image";
import { BsTrash3 } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa"; // Iconos para añadir y eliminar

interface CartItemProps {
    product: Partial<IProduct> & { quantity: number };
    onRemove: (productId: string) => void;
    onAdd: (product: Partial<IProduct>) => void;
}

const CartItem = ({ product, onRemove, onAdd }: CartItemProps) => {
  return (
    <div key={product.id} className="mb-8 border-b border-primary-txt-800 pb-4 flex items-start gap-4">
      {product.imgUrl && (
        <Image
          src={product.imgUrl}
          alt={product.name || 'Imagen de producto'}
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded-md"
        />
      )}
      <div className="flex-1 min-h-[70px]">
        <h3 className="text-lg font-semibold text-primary-txt-100">{product.name}</h3>
        <p className="text-primary-txt-500"><strong>Precio:</strong> ${product.price?.toFixed(2)}</p>
        <p className="text-primary-txt-500"><strong>Descripción:</strong> {product.description}</p>
        <p className="text-primary-txt-500"><strong>Stock:</strong> {product.stock}</p>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => product.quantity > 1 ? onRemove(product.id as string) : null}>
          <FaMinus className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
        </button>
        <span className="text-lg font-bold text-primary-txt-100">{product.quantity}</span>
        <button onClick={() => onAdd(product)}>
          <FaPlus className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
        </button>
        <button onClick={() => product.id && onRemove(product.id as string)}>
          <BsTrash3 className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;