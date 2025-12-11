import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserFavorites } from "@/server/db/user";
import { Pages } from "@/constants/enums";
import LottieHandler from "@/lib/LottieHandler";
import ProductCard from "@/components/ProductCard";

const Favorites = async () => {
  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const showfavorite = await getUserFavorites(userId);

  return showfavorite.length ? (
    <div className="container max-w-7xl flex flex-col items-start">
      <div className="flex flex-col items-end my-10">
        <p className="text-2xl font-medium">Your Favourite</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full pb-10">
        {showfavorite.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <div className="element-center text-center min-h-[calc(100vh-60px)]">
      <LottieHandler type="empty" message="No Favorite Available" />
    </div>
  );
};

export default Favorites;
