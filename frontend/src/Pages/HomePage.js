import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center  text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the Blogging Platform
          </h1>
          <p className="text-lg md:text-xl mb-10">
            Share your thoughts with the world or dive into inspiring stories
            and ideas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Read Blogs */}
            <Link
              to="/post"
              className="group p-8 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16l-4-4m0 0l4-4m-4 4h16"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-white">
                  Read Blogs
                </h2>
                <p className="mt-2 text-gray-600 group-hover:text-gray-200">
                  Explore a variety of blogs and gain insights into diverse
                  topics.
                </p>
              </div>
            </Link>

            {/* Write Blogs */}
            <Link
              to="/write"
              className="group p-8 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20h9m-9 0a9 9 0 01-9-9V5a2 2 0 012-2h3.28a2 2 0 011.664.89l1.52 2.43a2 2 0 001.664.89H18a2 2 0 012 2v6a2 2 0 01-2 2h-6a9 9 0 01-9 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-white">
                  Write a Blog
                </h2>
                <p className="mt-2 text-gray-600 group-hover:text-gray-200">
                  Share your stories and knowledge with the world.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
