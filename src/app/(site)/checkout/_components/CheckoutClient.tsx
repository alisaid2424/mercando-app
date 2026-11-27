"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { User } from "@prisma/client";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY!);

interface CheckoutClientProps {
  amount: number;
  user: User;
}

const CheckoutClient = ({ amount, user }: CheckoutClientProps) => {
  const options: StripeElementsOptions = {
    mode: "payment",
    currency: "usd",
    amount: amount * 100,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} user={user} />
    </Elements>
  );
};

export default CheckoutClient;
