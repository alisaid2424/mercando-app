import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CartItems from "./_components/CartItems";
import DeliveryInformationForm from "./_components/DeliveryInformationForm";
import prisma from "@/lib/db";

const CartPage = async () => {
  const { userId } = await auth();
  if (!userId) return notFound();
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) return notFound();
  return (
    <main>
      <section className="section-gap">
        <div className="container max-w-7xl">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <CartItems />
            <DeliveryInformationForm key={user.id} user={user} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
