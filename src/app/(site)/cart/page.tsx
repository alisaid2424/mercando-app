import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CartItems from "./_components/CartItems";
import DeliveryInformationForm from "./_components/DeliveryInformationForm";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { Pages } from "@/constants/enums";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected items, update quantities, and enter your delivery information to complete your order on Mercando.",
  robots: {
    index: false,
    follow: false,
  },
};

const CartPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) redirect(Pages.LOGIN);

  return (
    <section aria-labelledby="cart-heading" className="section-gap wrapper">
      <h1
        id="cart-heading"
        className="text-primary text-center font-bold text-4xl italic mb-10"
      >
        Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div role="region" aria-label="Cart items">
          <CartItems />
        </div>
        <div role="region" aria-label="Delivery information">
          <DeliveryInformationForm key={user.id} user={user} />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
