"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: "/header_headphone_image.png",
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "/header_playstation_image.png",
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/header_macbook_image.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
          width: `${sliderData.length * 100}vw`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div key={slide.id} className="w-screen flex-shrink-0 py-6">
            <div className="container max-w-7xl">
              <div className="bg-[#E6E9F2] max-md:h-[475px] rounded-xl flex flex-col-reverse md:flex-row items-center justify-between px-5 md:px-14 py-8 ">
                {/* Text Section */}
                <div className="md:pl-8 mt-10 md:mt-0 max-w-xl">
                  <p className="md:text-base text-primary pb-1">
                    {slide.offer}
                  </p>
                  <h1 className="text-2xl md:text-[40px] md:leading-[48px] font-semibold max-md:min-h-[110px]">
                    {slide.title}
                  </h1>
                  <div className="flex items-center mt-4 md:mt-6 gap-4 flex-wrap">
                    <Button
                      variant="default"
                      size="lg"
                      className=" rounded-full font-medium "
                    >
                      {slide.buttonText1}
                    </Button>
                    <Button
                      variant="ghost"
                      className="group cursor-pointer !bg-inherit text-base"
                    >
                      {slide.buttonText2}
                      <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative flex items-center justify-center flex-1 md:w-72 w-48 h-48 md:h-72 overflow-hidden">
                  <Image
                    src={slide.imgSrc}
                    alt={`Slide ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-primary" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
