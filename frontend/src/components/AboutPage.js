import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const AboutPage = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/post");
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg max-w-3xl p-8">
          <h1 className="text-4xl font-bold text-green-600 text-center mb-6">
            About Us
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Welcome to{" "}
            <span className="font-semibold text-green-500">iBlog</span>, your
            go-to destination for insightful and engaging content on a wide
            range of topics. Our mission is to deliver high-quality blogs that
            inform, inspire, and entertain.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We are passionate about creating a platform where writers and
            readers can connect, share ideas, and grow together. Whether you're
            here to explore new ideas, learn something new, or simply enjoy a
            good read, we've got you covered.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Thank you for being part of our journey. We look forward to bringing
            you the best content and building a vibrant community of curious
            minds!
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handleClick()}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
            >
              Explore Blogs
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
