import Banner from "@/components/Banner";
import BestSellers from "@/components/BestSellers";
import FeaturedProduct from "@/components/FeaturedProduct";
import HeaderSlider from "@/components/HeaderSlider";
import NewsLetter from "@/components/NewsLetter";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <h1 className="sr-only">Mercando — Online Store</h1>
      <HeaderSlider />
      <Suspense fallback={<ProductSkeleton />}>
        <BestSellers />
      </Suspense>
      <FeaturedProduct />
      <Banner />
      <NewsLetter />
    </>
  );
};

export default HomePage;
