"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductImageGallary = ({ productData }: { productData: Product }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = productData.images;

  // Auto Slide Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="sm:px-16 md:px-0 lg:px-20 xl:px-20">
      <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
        <Image
          src={images[currentSlide]}
          alt={`Main Image ${currentSlide + 1}`}
          className="w-full h-[350px] object-contain mix-blend-multiply"
          width={1280}
          height={720}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img: string, index: number) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 border ${
              currentSlide === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`Thumb ${index + 1}`}
              className="w-full h-20 object-contain mix-blend-multiply"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallary;
