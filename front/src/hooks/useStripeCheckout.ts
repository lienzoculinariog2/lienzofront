// import { useCallback } from "react";
// import axios from "axios";

export function useStripeCheckout() {
  // const createPaymentIntent = useCallback(async (cartId: string, userId: string) => {
  //   try {
  //     const response = await axios.post("/api/checkout/create-payment-intent", {
  //       cartId,
  //       userId,
  //     });

  //     return response.data.clientSecret as string;
  //   } catch (error) {
  //     console.error("Error al crear PaymentIntent:", error);
  //     return null;
  //   }
  // }, []);

  return {
    // createPaymentIntent,
  };
}
