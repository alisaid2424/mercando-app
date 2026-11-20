import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <div className="container max-w-7xl">
      <div className=" flex flex-col md:flex-row items-center justify-between lg:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
        <Image
          className="max-w-56"
          src="/jbl_soundbox_image.webp"
          alt="JBL portable speaker"
          width={300}
          height={300}
          sizes="(max-width: 768px) 70vw, 224px"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
            Level Up Your Gaming Experience
          </h2>
          <p className="max-w-[343px] font-medium text-gray-700">
            From immersive sound to precise controls—everything you need to win
          </p>
          <Button className="group">
            Buy now
            <ArrowRight className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <Image
          className="hidden md:block max-w-80"
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
    </div>
  );
};

export default Banner;
