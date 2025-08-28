"use client";

import { CartItem } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  discount?: number;
  total?: number;
}

export function CheckoutSummary({
  cartItems,
  discount,
  total,
}: CheckoutSummaryProps) {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );
  const discountAmount = discount ? subTotal * (discount / 100) : 0;
  const finalTotal = subTotal - discountAmount;

  return (
    <div className="p-4 mb-6 border rounded shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-white">
        Resumen del pedido
      </h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span className="text-gray-100">
            {item.name} × {item.quantity}
          </span>
          <span className="text-gray-100">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      ))}

      {discount && (
        <div className="flex justify-between mb-2 text-green-600">
          <span className="text-green-400">
            Descuento aplicado ({discount}%)
          </span>
          <span className="text-green-400">
            -{formatCurrency(discountAmount)}
          </span>
        </div>
      )}

      <div className="flex justify-between pt-2 mt-2 font-semibold border-t">
        <span className="text-white">Total</span>
        <span className="text-white">{formatCurrency(finalTotal)}</span>
      </div>
    </div>
  );
}
