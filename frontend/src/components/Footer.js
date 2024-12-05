import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-5 py-8 flex flex-wrap md:items-center lg:items-start justify-between">
        {/* Brand */}
        <div className="w-1/3 md:w-1/4">
          <h2 className="text-lg font-bold mb-4">iBlog</h2>
          <p className="text-sm text-gray-400">
            Made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-red-500 inline-block mx-1"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            by Devesh
          </p>
        </div>

        {/* Navigation Links */}
        <div className="w-1/3 md:w-1/4">
          <h3 className="font-medium text-gray-300 mb-3">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/post" className="text-gray-400 hover:text-white">
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="w-1/3 md:w-1/4">
          <h3 className="font-medium text-gray-300 mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
              title="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54v-2.89h2.54V9.725c0-2.507 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.24 0-1.626.774-1.626 1.564v1.86h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
              title="Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43 1s-4.13 1.85-6.6 3.93a4.48 4.48 0 00-7.67 4.08C7.72 9.21 4.92 7.87 2.73 5.64c-.77 1.32-.11 3.29 1.17 4.15a4.48 4.48 0 01-2.07-.57v.05c.01 1.71 1.2 3.12 2.9 3.44a4.48 4.48 0 01-2.07.08 4.48 4.48 0 004.2 3.13A8.96 8.96 0 010 19.54a12.69 12.69 0 006.29 1.85c7.55 0 11.68-6.26 11.68-11.69 0-.18 0-.35-.02-.53A8.18 8.18 0 0023 3z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
              title="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.308 3.608.933a7.13 7.13 0 012.458 2.458c.625.975.871 2.242.933 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.308 2.633-.933 3.608a7.13 7.13 0 01-2.458 2.458c-.975.625-2.242.871-3.608.933-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.308-3.608-.933a7.13 7.13 0 01-2.458-2.458c-.625-.975-.871-2.242-.933-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.308-2.633.933-3.608a7.13 7.13 0 012.458-2.458c.975-.625 2.242-.871 3.608-.933C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.737 0 8.332.014 7.052.072 5.771.131 4.763.378 4 1.058a8.948 8.948 0 00-3.174 3.174c-.68.763-.927 1.771-.986 3.052C.014 8.332 0 8.737 0 12c0 3.263.014 3.668.072 4.948.059 1.281.306 2.289.986 3.052a8.948 8.948 0 003.174 3.174c.763.68 1.771.927 3.052.986 1.281.058 1.686.072 4.948.072s3.668-.014 4.948-.072c1.281-.059 2.289-.306 3.052-.986a8.948 8.948 0 003.174-3.174c.68-.763.927-1.771.986-3.052.058-1.281.072-1.686.072-4.948s-.014-3.668-.072-4.948c-.059-1.281-.306-2.289-.986-3.052a8.948 8.948 0 00-3.174-3.174c-.763-.68-1.771-.927-3.052-.986C15.668.014 15.263 0 12 0z" />
                <path d="M12 5.838a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zm0 10.163a4 4 0 110-8 4 4 0 010 8z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} iBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
