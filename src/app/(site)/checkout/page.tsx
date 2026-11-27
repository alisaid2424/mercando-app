import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getUser } from "@/server/db/user";
import { User } from "@prisma/client";
import CheckoutClient from "./_components/CheckoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase securely on Mercando and confirm your order details.",
  robots: {
    index: false,
    follow: false,
  },
};

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { amount } = await searchParams;

  const { userId } = await auth();
  if (!userId) return notFound();

  const user = (await getUser({ clerkUserId: userId })) as User;
  if (!user) return notFound();

  return (
    <section aria-label="Checkout">
      <CheckoutClient amount={Math.round(Number(amount))} user={user} />
    </section>
  );
};

export default CheckoutPage;
