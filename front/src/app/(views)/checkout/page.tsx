"use client";

// import { StripeWrapper } from "./components/StripeWrapper";
// import { PaymentForm } from "./components/PaymentForm";
// import { CheckoutSummary } from "./components/CheckoutSummary";
// import { PaymentStatus } from "./components/PaymentStatus";
// import { useStripeCheckout } from "@/hooks/useStripeCheckout";
// import { useUser } from "@/hooks/useUser"; // o desde Auth0
// import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  // const { user } = useUser();
  // const { cart } = useCart();
  // const { createPaymentIntent } = useStripeCheckout();
  // const [clientSecret, setClientSecret] = useState<string | null>(null);

  // useEffect(() => {
  //   if (user && cart?.id) {
  //     createPaymentIntent(cart.id, user.id).then(setClientSecret);
  //   }
  // }, [user, cart]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>

      {/* <CheckoutSummary /> */}

      {/* <PaymentStatus /> */}

      {/* {clientSecret && (
        <StripeWrapper clientSecret={clientSecret}>
          <PaymentForm />
        </StripeWrapper>
      )} */}
    </div>
  );
}
