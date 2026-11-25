"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const sliderData = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: "/header_headphone_image.webp",
  },
  {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    offer: "Hurry up only few lefts!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: "/header_playstation_image.webp",
  },
  {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: "/header_macbook_image.webp",
  },
];

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="w-full overflow-hidden relative"
      aria-label="Featured offers"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={currentSlide !== index}
            className="w-full flex-shrink-0 py-6"
          >
            <div className="container max-w-7xl">
              <div className="bg-[#E6E9F2] max-md:h-[475px] rounded-xl flex flex-col-reverse md:flex-row items-center justify-between px-5 md:px-14 py-8 ">
                {/* Text Section */}
                <div className="md:pl-8 mt-10 md:mt-0 max-w-xl">
                  <p className="md:text-base text-primary pb-1">
                    {slide.offer}
                  </p>
                  <h2 className="text-2xl md:text-[40px] md:leading-[48px] font-semibold max-md:min-h-[110px]">
                    {slide.title}
                  </h2>
                  <div className="flex items-center mt-4 md:mt-6 gap-4 flex-wrap">
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full font-medium"
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
                    alt={slide.title}
                    width={300}
                    height={300}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(max-width: 768px) 192px, 288px"
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
        {sliderData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={currentSlide === index ? "true" : undefined}
            className="flex h-5 w-5 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-primary scale-125"
                  : "bg-gray-500/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
