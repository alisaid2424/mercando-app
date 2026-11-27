import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mercando for support, inquiries, or feedback. Find our location, email, phone number, and contact form.",
};

const ContactPage = () => {
  return (
    <section
      aria-labelledby="contact-heading"
      className="wrapper flex flex-col gap-5 py-8 text-gray-600 lg:flex-row"
    >
      <div className="relative flex items-end justify-start overflow-hidden rounded-lg bg-gray-300 p-8 max-lg:order-2 max-lg:min-h-[500px] md:flex-1">
        <iframe
          width="100%"
          height="100%"
          className="absolute inset-0 border-0"
          title="Mercando location map"
          loading="lazy"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
        />

        <div className="relative flex flex-wrap rounded bg-white py-6 shadow-md">
          <div className="px-6 lg:w-1/2">
            <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900">
              ADDRESS
            </h2>
            <p className="mt-1 text-gray-700">
              Photo booth tattooed prism, portland taiyaki hoodie neutra
              typewriter
            </p>
          </div>

          <div className="mt-4 px-6 lg:mt-0 lg:w-1/2">
            <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900">
              EMAIL
            </h2>
            <a
              href="mailto:example@email.com"
              className="leading-relaxed text-orange-700 underline-offset-4 hover:underline"
            >
              example@email.com
            </a>

            <h2 className="title-font mt-4 text-xs font-semibold tracking-widest text-gray-900">
              PHONE
            </h2>
            <p className="leading-relaxed text-gray-700">123-456-7890</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center rounded-lg border bg-white px-5 py-7 shadow-xl md:ml-auto md:py-8 lg:max-w-96">
        <h1
          id="contact-heading"
          className="title-font mb-1 text-lg font-semibold text-gray-900"
        >
          Feedback
        </h1>
        <p className="mb-5 leading-relaxed text-gray-600">
          Post-ironic portland shabby chic echo park, banjo fashion axe
        </p>

        <form className="flex flex-col">
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="email" className="text-sm leading-7 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="text-sm leading-7 text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="h-32 w-full resize-none rounded border border-gray-300 bg-white px-3 py-1 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <Button type="submit" className="h-10">
            Send Message
          </Button>
        </form>

        <p className="mt-3 text-xs text-gray-600">
          Chicharrones blog helvetica normcore iceland tousled brook viral
          artisan.
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
