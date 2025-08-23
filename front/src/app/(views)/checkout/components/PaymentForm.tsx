'use client';

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

// Define las props que el componente recibirá, incluyendo el clientSecret
interface PaymentFormProps {
  clientSecret: string;
}

export function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe no está listo.");
      setLoading(false);
      return;
    }

    // La lógica de confirmación se mantiene igual, pero ahora usando el clientSecret de las props
    const result = await stripe.confirmPayment({
      elements,
      clientSecret, // Aquí se usa el clientSecret real
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (result.error) {
      setError(result.error.message || "Error desconocido.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}


