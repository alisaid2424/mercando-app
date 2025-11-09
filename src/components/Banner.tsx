import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <div className="container max-w-7xl">
      <div className=" flex flex-col md:flex-row items-center justify-between lg:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
        <Image
          className="max-w-56"
          src="/jbl_soundbox_image.png"
          alt="jbl_soundbox_image"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
            Level Up Your Gaming Experience
          </h2>
          <p className="max-w-[343px] font-medium text-gray-800/60">
            From immersive sound to precise controls—everything you need to win
          </p>
          <Button className="group">
            Buy now
            <ArrowRight className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <Image
          className="hidden md:block max-w-80"
          src="/md_controller_image.png"
          alt="md_controller_image"
          width={300}
          height={300}
        />
        <Image
          className="md:hidden"
          src="/sm_controller_image.png"
          alt="sm_controller_image"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
};

export default Banner;
