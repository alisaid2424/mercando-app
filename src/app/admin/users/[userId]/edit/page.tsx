import UpdateUserForm from "@/app/admin/_components/UpdateUserForm";
import { getUser } from "@/server/db/user";
import { notFound } from "next/navigation";

interface EditUserPageProps {
  params: Promise<{ userId: string }>;
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const { userId } = await params;
  const user = await getUser({ clerkUserId: userId });

  if (!user) notFound();

  return (
    <section className="px-5 lg:w-10/12 mx-auto">
      <h1 className="text-primary text-center font-bold text-4xl italic">
        Update User
      </h1>

      <UpdateUserForm key={user.id} user={user} />
    </section>
  );
};

export default EditUserPage;
