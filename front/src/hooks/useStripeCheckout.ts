// src/hooks/useStripeCheckout.ts (Option 1)
"use client";

import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
// Add axios back for consistency with old code if needed
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useStripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const createPaymentIntent = useCallback(async () => {
    const userId = user?.sub;
    console.log("🟢 userId en useStripeCheckout:", userId);

    if (!isAuthenticated || !userId) {
      toast.error("Debes iniciar sesión para completar la compra.");
      return null;
    }

    setIsLoading(true);
    try {
      // ✅ Change the endpoint to the one your backend uses
      console.log(
        "🟢 URL que estoy llamando:",
        `${API_URL}/checkout/${encodeURIComponent(userId)}/complete`
      );

      const response = await axios.post(
        `${API_URL}/checkout/${encodeURIComponent(userId)}/complete`,
        {
          shippingAddress: "123 Calle Falsa, Springfield",
          // discountCode: "",
        }
      );

      return response.data.paymentIntent.clientSecret as string;
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      toast.error("Error al iniciar el pago. Intenta de nuevo.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.sub]);

  return {
    createPaymentIntent,
    isLoading,
  };
};
