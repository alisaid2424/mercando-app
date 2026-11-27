import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <section aria-labelledby="gaming-banner-heading" className="wrapper">
      <div className="my-16 flex flex-col items-center justify-between overflow-hidden rounded-xl bg-[#E6E9F2] py-14 md:flex-row md:py-0 lg:pl-20">
        <Image
          className="max-w-56"
          src="/jbl_soundbox_image.webp"
          alt="JBL portable speaker"
          width={300}
          height={300}
          sizes="224px"
        />

        <div className="flex flex-col items-center justify-center space-y-2 px-4 text-center md:px-0">
          <h2
            id="gaming-banner-heading"
            className="max-w-[290px] text-2xl font-semibold md:text-3xl"
          >
            Level Up Your Gaming Experience
          </h2>
          <p className="max-w-[343px] font-medium text-gray-700">
            From immersive sound to precise controls—everything you need to win
          </p>
          <Button
            aria-label="Buy gaming gear now"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Buy now
            <ArrowRight
              aria-hidden="true"
              className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>

        <Image
          className="hidden max-w-80 md:block"
          src="/md_controller_image.webp"
          alt="Wireless gaming controller"
          width={300}
          height={300}
          sizes="320px"
        />

        <Image
          className="md:hidden"
          src="/sm_controller_image.webp"
          alt="Wireless gaming controller"
          width={700}
          height={700}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
    </section>
  );
};

export default Banner;
