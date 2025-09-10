// src/app/checkout/page.tsx
"use client";

import { StripeWrapper } from "./components/StripeWrapper";
import { PaymentForm } from "./components/PaymentForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentStatus } from "./components/PaymentStatus";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { DiscountInput } from "./components/DiscountInput";
import { useDiscount } from "@/hooks/useDiscount";

export default function CheckoutPage() {
  const { cartItems, isLoading: isCartLoading } = useCart();
  // El hook ya tiene el estado isLoading. Usemos el de él.
  const { createPaymentIntent, isLoading: isStripeLoading } =
    useStripeCheckout();
  const {
    discount,
    discountError,
    isLoading: isDiscountLoading,
    validateDiscountCode,
  } = useDiscount();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // 💡 Lógica de pago movida a una función de evento
  const handleCreatePaymentIntent = async () => {
    // 💡 Protección contra llamadas duplicadas
    if (isStripeLoading || clientSecret) {
      console.log("Ya se está procesando el pago o ya fue creado.");
      return;
    }

    const secret = await createPaymentIntent(
      "123 Calle Falsa, Springfield", // 💡 Primer argumento: shippingAddress
      discount?.code || null // 💡 Segundo argumento: discountCode
    );
    if (secret) {
      setClientSecret(secret);
    }
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );
  const discountAmount = discount?.percentage || 0;
  const finalTotal = subTotal - discountAmount;

  return (
    <div className="container p-4 mx-auto md:p-8">
      <h1 className="mb-6 text-xl font-semibold text-white">Checkout</h1>

      {isCartLoading ? (
        <p>Cargando información del carrito...</p>
      ) : cartItems.length === 0 ? (
        <p>El carrito está vacío. Por favor, agrega productos.</p>
      ) : (
        <>
          <CheckoutSummary
            cartItems={cartItems}
            discount={discountAmount}
            total={finalTotal}
          />

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-white">
              ¿Tienes un código de descuento?
            </h3>
            <DiscountInput
              onApply={validateDiscountCode}
              isLoading={isDiscountLoading}
            />
            {discountError && (
              <p className="text-red-500 text-sm mt-2">{discountError}</p>
            )}
          </div>

          {/* El botón ahora inicia la creación del Payment Intent */}
          {!clientSecret && (
            <button
              onClick={handleCreatePaymentIntent}
              disabled={isStripeLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isStripeLoading ? "Procesando..." : "Proceder al Pago"}
            </button>
          )}

          {clientSecret && (
            <StripeWrapper clientSecret={clientSecret}>
              <PaymentForm clientSecret={clientSecret} />
            </StripeWrapper>
          )}
        </>
      )}
    </div>
  );
}
