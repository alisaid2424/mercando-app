import Banner from "@/components/Banner";
import BestSellers from "@/components/BestSellers";
import FeaturedProduct from "@/components/FeaturedProduct";
import HeaderSlider from "@/components/HeaderSlider";
import NewsLetter from "@/components/NewsLetter";

const HomePage = () => {
  return (
    <>
      <HeaderSlider />
      <BestSellers />
      <FeaturedProduct />
      <Banner />
      <NewsLetter />
    </>
  );
};

export default HomePage;
