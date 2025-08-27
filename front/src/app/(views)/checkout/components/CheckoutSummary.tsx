'use client';

import { CartItem } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  discount?: number; 
  total?: number;
}

export function CheckoutSummary({ cartItems, discount, total }: CheckoutSummaryProps) {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const subTotal = cartItems.reduce((acc, item) => acc + item.totalItemPrice, 0);

  return (
    <div className="border rounded p-4 mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-white">Resumen del pedido</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span className="text-gray-100">{item.name} × {item.quantity}</span>
          <span className="text-gray-100">{formatCurrency(item.price * item.quantity)}</span>
        </div>
      ))}

      {discount && (
        <div className="flex justify-between text-green-600 mb-2">
          <span className="text-green-400">Descuento aplicado</span>
          <span className="text-green-400">-{formatCurrency(discount)}</span>
        </div>
      )}

      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span className="text-white">Total</span>
        <span className="text-white">{formatCurrency(total || subTotal)}</span>
      </div>
    </div>
  );
}
