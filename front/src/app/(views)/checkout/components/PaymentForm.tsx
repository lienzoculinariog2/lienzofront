"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  clientSecret: string;
}

export function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
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

    // Paso 1: Llamar a elements.submit() para validar los datos.
    // Esta llamada es síncrona, pero la documentación de Stripe indica que debe ir primero.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Error desconocido en el formulario.");
      setLoading(false);
      return;
    }

    // Paso 2: Si el formulario es válido, proceder a confirmar el pago.
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    // Paso 3: Manejar el resultado de la confirmación.
    if (result.error) {
      setError(
        result.error.message || "Error desconocido durante la confirmación."
      );
    } else {
      router.push("/checkout/success");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />{" "}
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Procesando..." : "Pagar"}{" "}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
    </form>
  );
}
