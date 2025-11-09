import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import UpdateUserForm from "./_components/UpdateUserForm";
import prisma from "@/lib/db";

const AdminPage = async () => {
  const { userId } = await auth();
  if (!userId) return notFound();

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) return notFound();

  return (
    <main>
      <section className="section-gap lg:w-5/6 mx-auto">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic my-7">
            Profile
          </h1>
          <UpdateUserForm key={user.id} user={user} />
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
