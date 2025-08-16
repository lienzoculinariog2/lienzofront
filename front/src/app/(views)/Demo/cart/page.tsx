// src/app/(views)/Demo/Cart/page.tsx
"use client";

import React from "react";
// Corregir las importaciones para que coincidan con la mayúscula
import CartItem from "./components/CartItem";
import CreateOrderBtn from "./components/CreateOrderBtn";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "@/hooks/useCart";


const CartPage = () => {
  const { cartItems, removeFromCart, resetCart, addToCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const showCart = cartItems.length > 0;

  return (
    <div className=" mx-5 py-8 bg-primary-background-500">
      <h1 className="text-2xl font-bold mb-10 text-center text-primary-txt-100">Carrito de Compras</h1>

      <div className="bg-secondary-background-500 shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between text-xl font-semibold mb-8 p-6">
          <h2 className="text-primary-txt-100">Productos en el Carrito</h2>
        </div>
        
        {showCart ? (
          cartItems.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={removeFromCart}
              onAdd={addToCart}
            />
          ))
        ) : (
          <p className="text-daily-menu-500 text-center">No hay productos en el carrito.</p>
        )}
      </div>
      
      <div className="bg-secondary-background-500 shadow-md rounded-lg p-6 flex justify-end">
        <h2 className="text-xl font-semibold text-primary-txt-100">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      
      {showCart && (
        <div className="flex justify-end mt-4">
          <CreateOrderBtn resetCart={resetCart} />
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;