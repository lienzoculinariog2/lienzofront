'use client';

import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// 🎯 NUEVO: Define una interfaz para el DTO
interface CheckoutDto {
  shippingAddress: string;
  discountCode?: string;
}

export function useStripeCheckout() {
  // 🎯 CORRECCIÓN: Usamos la interfaz para definir el tipo de checkoutDto
  const createPaymentIntent = useCallback(async (userId: string, checkoutDto: CheckoutDto) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables.');
      }

      const response = await axios.post(`${apiUrl}/checkout/${userId}/complete`, checkoutDto);
      
      return response.data.paymentIntent.clientSecret as string;

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


