"use client";

// import { useCart } from "@/hooks/useCart";
// import { formatCurrency } from "@/utils/formatCurrency";

export function CheckoutSummary() {
  // const { cart } = useCart();

  // if (!cart) return null;

  return (
    <div className="border rounded p-4 mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

      {/* {cart.items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.name} × {item.quantity}</span>
          <span>{formatCurrency(item.price * item.quantity)}</span>
        </div>
      ))} */}

      {/* {cart.discount && (
        <div className="flex justify-between text-green-600 mb-2">
          <span>Descuento aplicado</span>
          <span>-{formatCurrency(cart.discount)}</span>
        </div>
      )} */}

      {/* <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Total</span>
        <span>{formatCurrency(cart.total)}</span>
      </div> */}
    </div>
  );
}
