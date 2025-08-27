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
  const { createPaymentIntent } = useStripeCheckout();
  const {
    discount,
    discountError,
    isLoading: isDiscountLoading,
    validateDiscountCode,
  } = useDiscount();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // ✅ Calcular los totales aquí
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );
  const discountAmount = discount?.percentage || 0; // Usar 0 si no hay descuento
  const finalTotal = subTotal - discountAmount;

  useEffect(() => {
    if (!isCartLoading && cartItems.length > 0 && !clientSecret) {
      setIsProcessing(true);
      createPaymentIntent()
        .then((secret) => {
          if (secret) {
            setClientSecret(secret);
          }
        })
        .finally(() => setIsProcessing(false));
    }
  }, [isCartLoading, cartItems, clientSecret, createPaymentIntent]);

  return (
    <div className="container p-4 mx-auto md:p-8">
      <h1 className="mb-6 text-xl font-semibold text-white">Checkout</h1>

      {isCartLoading || isProcessing ? (
        <p>Cargando información del pago...</p>
      ) : (
        <>
          {/* ✅ Pasar las variables calculadas como props */}
          <CheckoutSummary
            cartItems={cartItems}
            discount={discountAmount} // El descuento ya es un número
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

          <PaymentStatus />

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
