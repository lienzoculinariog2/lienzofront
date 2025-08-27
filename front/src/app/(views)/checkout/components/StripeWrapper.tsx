'use client';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { ReactNode } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeWrapperProps {
  clientSecret: string;
  children: ReactNode;
}

export function StripeWrapper({ clientSecret, children }: StripeWrapperProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'flat',
      labels: 'floating',
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}


