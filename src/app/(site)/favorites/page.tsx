import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserFavorites } from "@/server/db/user";
import { Pages } from "@/constants/enums";
import LottieHandler from "@/lib/LottieHandler";
import ProductCard from "@/components/ProductCard";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "View and manage your saved favorite products on Mercando.",
  robots: {
    index: false,
    follow: false,
  },
};

const Favorites = async () => {
  const { userId } = await auth();
  if (!userId) redirect(Pages.LOGIN);
  const favorites = await getUserFavorites(userId);
  const userFavoriteIds = await getUserFavoriteIds();

  return (
    <section
      aria-labelledby="favorites-heading"
      className="wrapper flex flex-col items-start"
    >
      <div className="flex flex-col items-end my-10">
        <h1 id="favorites-heading" className="text-2xl font-medium">
          Your Favourite
        </h1>
        <div
          aria-hidden="true"
          className="w-16 h-0.5 bg-primary rounded-full"
        />
      </div>

      {favorites.length ? (
        <ul
          aria-label="Favorite products list"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full pb-10"
        >
          {favorites.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                isFavorite={userFavoriteIds.includes(product.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="element-center text-center min-h-[60vh] w-full"
          aria-live="polite"
          aria-label="Favorites status"
        >
          <LottieHandler type="empty" message="No Favorite Available" />
        </div>
      )}
    </section>
  );
};

export default Favorites;
