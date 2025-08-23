'use client';

import { StripeWrapper } from "./components/StripeWrapper";
import { PaymentForm } from "./components/PaymentForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { PaymentStatus } from "./components/PaymentStatus";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useCart } from "@/hooks/useCart"; 
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'; // Importamos el hook de Auth0
import { userService } from "@/services/draft/userService"; // Importamos tu servicio de usuario
import { IUser } from "@/types/User";

export default function CheckoutPage() {
  // Obtenemos el usuario de Auth0
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);

  // Solución: Desestructuramos las propiedades correctas de tu hook 'useCart'
  const { cartId } = useCart(user?.id ?? null);
  const { createPaymentIntent } = useStripeCheckout();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Efecto para obtener el usuario de tu API una vez que Auth0 lo haya autenticado
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

  // Efecto para crear el Payment Intent
  useEffect(() => {
    // Usamos el cartId que acabamos de desestructurar
    if (user?.id && cartId) {
      createPaymentIntent(user.id, cartId).then(setClientSecret);
    }
  }, [user, cartId, createPaymentIntent]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>

      <CheckoutSummary />

      <PaymentStatus />

      {clientSecret && (
        <StripeWrapper clientSecret={clientSecret}>
          <PaymentForm clientSecret={clientSecret} />
        </StripeWrapper>
      )}
    </div>
  );
}






