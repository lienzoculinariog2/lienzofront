"use client";

import { StripeWrapper } from "./components/StripeWrapper";
import { PaymentForm } from "./components/PaymentForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentStatus } from "./components/PaymentStatus";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
// ❌ Ya no se necesita useAuth0 ni userService
// import { useAuth0 } from '@auth0/auth0-react';
// import { userService } from "@/services/draft/userService";
// import { IUser } from "@/types/User";

export default function CheckoutPage() {
  // ❌ Ya no necesitas gestionar el estado del usuario aquí
  // const { user: auth0User, getAccessTokenSilently } = useAuth0();
  // const [user, setUser] = useState<IUser | null>(null);

  // ✅ useCart ahora obtiene el userId automáticamente del contexto
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

  // ❌ Eliminamos este useEffect completo, ya que el CartContext lo hace por ti
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (auth0User && auth0User.sub && auth0User.email) {
  //       try {
  //         const accessToken = await getAccessTokenSilently();
  //         const fetchedUser = await userService.getOrCreateUser(
  //           auth0User.sub,
  //           auth0User.email,
  //           accessToken
  //         );
  //         setUser(fetchedUser);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   };
  //   fetchUser();
  // }, [auth0User, getAccessTokenSilently]);

  useEffect(() => {
    // ✅ Ahora solo dependemos de que el carrito no esté cargando y tenga elementos
    if (!isCartLoading && cartItems.length > 0 && !clientSecret) {
      setIsProcessing(true);
      // ✅ La llamada a createPaymentIntent también debe adaptarse para no requerir un userId
      // La función createPaymentIntent debe obtener el userId del contexto de Auth0 o de la sesión.
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
          <CheckoutSummary
            cartItems={cartItems}
            discount={discount ? subTotal - finalTotal : undefined}
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
