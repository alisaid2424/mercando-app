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

const headingClass =
  "text-2xl md:text-[40px] md:leading-[48px] font-semibold max-md:min-h-[110px]";

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Featured offers"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => {
          const isCurrent = currentSlide === index;
          const HeadingTag = index === 0 ? "h1" : "h2";

          return (
            <div
              key={slide.id}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className="w-full flex-shrink-0 py-6"
            >
              <div className="wrapper">
                <div className="flex flex-col-reverse items-center justify-between rounded-xl bg-[#E6E9F2] px-5 py-8 max-md:h-[475px] md:flex-row md:px-14">
                  <div className="mt-10 max-w-xl md:mt-0 md:pl-8">
                    <p className="pb-1 text-primary md:text-base">
                      {slide.offer}
                    </p>
                    <HeadingTag className={headingClass}>
                      {slide.title}
                    </HeadingTag>
                    <div className="mt-4 flex flex-wrap items-center gap-4 md:mt-6">
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
                        <ArrowRight
                          aria-hidden="true"
                          className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </Button>
                    </div>
                  </div>

                  <div className="relative flex h-48 w-48 flex-1 items-center justify-center md:justify-end overflow-hidden md:h-72 md:w-72">
                    <Image
                      src={slide.imgSrc}
                      alt={slide.title}
                      width={300}
                      height={300}
                      priority={index === 0}
                      sizes="(max-width: 768px) 192px, 288px"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {sliderData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={currentSlide === index ? "true" : undefined}
            className="flex h-5 w-5 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "scale-125 bg-primary"
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
