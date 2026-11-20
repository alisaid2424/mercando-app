import { Button } from "./ui/button";

const NewsLetter = () => {
  return (
    <div className="container max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
        <h1 className="md:text-4xl text-2xl font-medium">
          Subscribe now & get 20% off
        </h1>
        <p className="md:text-base text-gray-600 max-w-md pb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700"
            placeholder="Enter Your Email"
          />
          <Button
            type="submit"
            className="md:px-12 px-8 h-full rounded-md rounded-s-none"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
