import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    image: "/boy_with_headphone_image.webp",
    alt: "Young man wearing wireless over-ear headphones",
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: "/boy_with_earphone_image.webp",
    alt: "Young man wearing compact wireless earphones",
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: "/boy_with_laptop_image.webp",
    alt: "Young man working on a modern laptop",
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <section
      aria-labelledby="featured-products-section-heading"
      className="wrapper mt-14 pb-14"
    >
      <div className="flex flex-col items-center">
        <h2
          id="featured-products-section-heading"
          className="text-3xl font-medium"
        >
          Featured Products
        </h2>
        <div aria-hidden="true" className="mt-2 h-0.5 w-28 bg-primary" />
      </div>

      <ul
        aria-label="Featured product highlights"
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14"
      >
        {products.map(({ id, image, alt, title, description }) => (
          <li key={id}>
            <article className="group relative overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={alt}
                className="h-[450px] w-full object-cover brightness-75 transition duration-300 group-hover:brightness-90"
                width={400}
                height={400}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              />
              <div className="absolute bottom-8 left-8 space-y-2 text-white transition duration-300 group-hover:-translate-y-4">
                <h3 className="text-xl font-medium lg:text-2xl">{title}</h3>
                <p className="max-w-60 text-sm leading-5 lg:text-base">
                  {description}
                </p>
                <Button
                  aria-label={`Buy now — ${title}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Buy now
                  <ExternalLink aria-hidden="true" className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedProduct;
