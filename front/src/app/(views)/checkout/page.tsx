'use client';

import { StripeWrapper } from "./components/StripeWrapper";
import { PaymentForm } from "./components/PaymentForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentStatus } from "./components/PaymentStatus";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useCart } from "@/hooks/useCart"; 
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { userService } from "@/services/draft/userService";
import { IUser } from "@/types/User";
import { useDiscount } from "@/hooks/useDiscount";
import { DiscountInput } from "./components/DiscountInput";


export default function CheckoutPage() {
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  
  const { cartItems, isLoading: isCartLoading } = useCart(user?.id ?? null);
  
  const { createPaymentIntent } = useStripeCheckout();
  const { discount, discountError, isLoading: isDiscountLoading, validateDiscountCode } = useDiscount();
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth0User && auth0User.sub && auth0User.email) {
        try {
          const accessToken = await getAccessTokenSilently();
          const fetchedUser = await userService.getOrCreateUser(
            auth0User.sub,
            auth0User.email,
            accessToken
          );
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [auth0User, getAccessTokenSilently]);

  useEffect(() => {
    if (user?.id && !isCartLoading && cartItems.length > 0 && !clientSecret && !isProcessing && !isDiscountLoading) {
      setIsProcessing(true);
      
      const checkoutDto = {
        shippingAddress: user.address || "Dirección no disponible",
        discountCode: discount?.code,
      };

      createPaymentIntent(user.id, checkoutDto)
        .then(secret => {
          if (secret) {
            setClientSecret(secret);
          }
        })
        .finally(() => setIsProcessing(false));
    }
  }, [user, isCartLoading, cartItems, clientSecret, isProcessing, isDiscountLoading, discount, createPaymentIntent]);

  const subTotal = cartItems.reduce((acc, item) => acc + (parseFloat(String(item.price)) || 0) * item.quantity, 0);
  const finalTotal = discount ? subTotal * (1 - discount.percentage / 100) : subTotal;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6 text-white">Checkout</h1>
      
      {isCartLoading || isProcessing ? (
        <p>Cargando información del pago...</p>
      ) : (
        <>
          <CheckoutSummary cartItems={cartItems} discount={discount ? subTotal - finalTotal : undefined} total={finalTotal} />
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-white">¿Tienes un código de descuento?</h3>
            <DiscountInput onApply={validateDiscountCode} isLoading={isDiscountLoading} />
            {discountError && <p className="text-red-500 text-sm mt-2">{discountError}</p>}
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





