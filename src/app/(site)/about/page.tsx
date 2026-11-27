import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Mercando, our competitive advantage, and how we deliver a seamless online shopping experience.",
};

const AboutPage = () => {
  return (
    <section aria-labelledby="about-heading" className="wrapper py-6 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
          <div className="relative h-[500px] w-full max-w-[600px] overflow-hidden rounded-lg bg-gray-100 shadow-lg max-lg:hidden">
            <Image
              src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600&h=500"
              width={600}
              height={500}
              loading="lazy"
              alt="Workspace with a laptop and coffee"
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="text-start md:pt-8">
          <p className="font-bold text-primary">Who we are</p>

          <h1
            id="about-heading"
            className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6"
          >
            Our competitive advantage
          </h1>

          <p className="mb-6 text-gray-600 sm:text-lg md:mb-8">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.
          </p>

          <h2 className="mb-2 text-start text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
            About us
          </h2>

          <p className="mb-6 text-gray-600 sm:text-lg md:mb-8">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated. It may be used to display
            a sample of fonts or generate text for testing. Filler text is dummy
            text which has no meaning however looks very similar to real text.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
