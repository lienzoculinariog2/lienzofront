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

export default function CheckoutPage() {
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  
  const { cartItems, isLoading: isCartLoading } = useCart(user?.id ?? null);
  
  const { createPaymentIntent } = useStripeCheckout();
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
    if (user?.id && !isCartLoading && cartItems.length > 0 && !clientSecret) {
      setIsProcessing(true);
      createPaymentIntent(user.id)
        .then(secret => {
          if (secret) {
            setClientSecret(secret);
          }
        })
        .finally(() => setIsProcessing(false));
    }
  }, [user, isCartLoading, cartItems, clientSecret, createPaymentIntent]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6 text-white">Checkout</h1>
      
      {isCartLoading || isProcessing ? (
        <p>Cargando información del pago...</p>
      ) : (
        <>
          <CheckoutSummary cartItems={cartItems} />
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






