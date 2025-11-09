import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getUser } from "@/server/db/user";
import { User } from "@prisma/client";
import CheckoutClient from "./_components/CheckoutClient";

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

  return <CheckoutClient amount={Math.round(Number(amount))} user={user} />;
};

export default CheckoutPage;
