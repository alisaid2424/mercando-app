import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start  px-6 md:px-16 lg:px-32 gap-10 py-14 border-y border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image
            className="w-10 mx-auto md:mx-0"
            width={50}
            height={50}
            src="/logo.svg"
            alt="logo"
          />
          <p className="mt-6 text-sm text-center md:text-start">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center text-center md:text-start md:items-start">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center text-center md:text-start md:items-start">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-154-879-094</p>
              <p>contact@aliasy.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright &copy; {new Date().getFullYear()} My Website. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
