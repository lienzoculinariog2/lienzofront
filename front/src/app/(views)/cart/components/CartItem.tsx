"use client";

import React from 'react';
import { IProduct } from "@/types/Product";
import Image from "next/image";
import { BsTrash3 } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";

interface CartItemProps {
    product: Partial<IProduct> & { quantity: number };
    // onAdd ahora recibe el item y la cantidad para sumarla
    onAdd: (itemId: string) => void;
    // onRemove ahora recibe el item y la cantidad para restarla
    onRemove: (itemId: string) => void;
    onDelete: (itemId: string) => void;
}

const CartItem = ({ product, onAdd, onRemove, onDelete }: CartItemProps) => {
    const priceAsNumber = product.price ? parseFloat(String(product.price)) : 0;
    
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
                <p className="text-primary-txt-500"><strong>Precio:</strong> ${priceAsNumber.toFixed(2)}</p>
                <p className="text-primary-txt-500"><strong>Descripción:</strong> {product.description}</p>
                <p className="text-primary-txt-500"><strong>Stock:</strong> {product.stock}</p>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => onRemove(product.id as string)}>
                    <FaMinus className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
                </button>
                <span className="text-lg font-bold text-primary-txt-100">{product.quantity}</span>
                <button onClick={() => onAdd(product.id as string)}>
                    <FaPlus className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
                </button>
                <button onClick={() => onDelete(product.id as string)}>
                    <BsTrash3 className="w-5 h-5 text-primary-txt-300 hover:text-daily-menu-500 transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;


