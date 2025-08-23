'use client';

import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function useStripeCheckout() {
  const createPaymentIntent = useCallback(async (userId: string, cartId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables.');
      }

      // PASO 1: Llama al CheckoutService para obtener el resumen del carrito y crear la orden
      const checkoutResponse = await axios.post(`${apiUrl}/checkout/${userId}`, {
        // En tu CheckoutService, necesitas el cartId y cualquier otro dato
        // como el discountCode si lo tuvieras
        cartId: cartId,
        // Asumo que el userId lo obtienes del token de autenticación en tu back-end
      });
      
      const { finalTotal, orderId } = checkoutResponse.data;

      // PASO 2: Llama al PaymentsController para crear el Payment Intent
      const paymentIntentResponse = await axios.post(`${apiUrl}/payments/create-payment-intent`, {
        amount: finalTotal,
        orderId: orderId,
        // Puedes agregar más datos si tu DTO los necesita
      });

      return paymentIntentResponse.data.clientSecret as string;
    } catch (error) {
      console.error("Error al crear PaymentIntent:", error);
      toast.error("Error al iniciar el pago. Intenta de nuevo.");
      return null;
    }
  }, []);

  return {
    createPaymentIntent,
  };
}



