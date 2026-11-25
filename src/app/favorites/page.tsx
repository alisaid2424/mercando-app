import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserFavorites } from "@/server/db/user";
import { Pages } from "@/constants/enums";
import LottieHandler from "@/lib/LottieHandler";
import ProductCard from "@/components/ProductCard";
import { getUserFavoriteIds } from "@/server/db/favorite";

const Favorites = async () => {
  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const showfavorite = await getUserFavorites(userId);
  const userFavoriteIds = await getUserFavoriteIds();

  return (
    <div className="container max-w-7xl flex flex-col items-start">
      <div className="flex flex-col items-end my-10">
        <h2 className="text-2xl font-medium">Your Favourite</h2>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {showfavorite.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full pb-10">
          {showfavorite.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={userFavoriteIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="element-center text-center min-h-dvh w-full">
          <LottieHandler type="empty" message="No Favorite Available" />
        </div>
      )}
    </div>
  );
};

export default Favorites;
