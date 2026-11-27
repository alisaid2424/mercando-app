import { Button } from "./ui/button";

const NewsLetter = () => {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="wrapper flex flex-col items-center justify-center space-y-2 pt-8 pb-14 text-center"
    >
      <h2 id="newsletter-heading" className="text-2xl font-medium md:text-4xl">
        Subscribe now & get 20% off
      </h2>
      <p
        id="newsletter-description"
        className="max-w-md pb-8 text-gray-600 md:text-base"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      <form className="flex h-12 w-full max-w-2xl items-center justify-between md:h-14">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby="newsletter-description"
          placeholder="Enter Your Email"
          className="h-full w-full rounded-md rounded-r-none border border-r-0 border-gray-500/30 px-3 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
        <Button
          type="submit"
          className="h-full rounded-md rounded-s-none px-8 md:px-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          Subscribe
        </Button>
      </form>
    </section>
  );
};

export default NewsLetter;
