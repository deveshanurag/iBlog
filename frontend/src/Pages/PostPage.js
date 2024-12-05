import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const PostPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const blogPerPage = 5;
  const { email } = JSON.parse(localStorage.getItem("userInfo"));

  const fetchBlogs = async (page, keyword = "") => {
    try {
      const endpoint = keyword
        ? `/api/blogs/search?query=${keyword}&page=${page}`
        : `/api/blogs?page=${page}&limit=${blogPerPage}`;
      const { data } = await axios.get(endpoint);
      setBlogs(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setError("Failed to load blogs.");
    }
  };
  useEffect(() => {
    fetchBlogs(page, searchKeyword);
  }, [page, searchKeyword]);

  const handleDeleteBlog = async (id) => {
    try {
      alert("Are you sure to delete this?");
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/blogs/${id}`, config);
      setBlogs(blogs.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-end items-center p-4">
        <div className="relative">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search..."
            className="w-64 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400">
            Search
          </button>
        </div>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="-my-8 divide-y-2 divide-gray-100">
            {blogs.map((d, index) => {
              return (
                <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      {d.category}
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                      {d.createdAt.split("T")[0]}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {d.title}
                    </h2>
                    <p className="leading-relaxed">
                      {d.content.length > 165
                        ? `${d.content.slice(0, 165)}...`
                        : d.content}
                    </p>
                    <div className="flex justify-around">
                      <Link
                        to={`/blog/${d._id}`}
                        className="text-green-500 inline-flex items-center mt-4"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                      <span className="mt-7">
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                          <span className="flex items-center space-x-4">
                            {/* Edit Icon */}
                            {d.author.email === email ? (
                              <span className="flex items-center space-x-4">
                                <Link to={`/edit/${d._id}`}>
                                  <span
                                    className="text-green-500 cursor-pointer hover:text-green-700"
                                    title="Edit"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M11 4h4a2 2 0 012 2v4"></path>
                                      <path d="M16 3l4 4"></path>
                                      <path d="M4 21v-3.5L16 5.5l3.5 3.5L7.5 21H4z"></path>
                                    </svg>
                                  </span>
                                </Link>

                                {/* Delete Icon */}

                                <span
                                  className="text-red-500 cursor-pointer hover:text-red-700"
                                  title="Delete"
                                  onClick={() => handleDeleteBlog(d._id)}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M3 6h18"></path>
                                    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                    <path d="M10 11v6"></path>
                                    <path d="M14 11v6"></path>
                                    <path d="M5 6h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6z"></path>
                                  </svg>
                                </span>
                              </span>
                            ) : (
                              <span></span>
                            )}

                            {/* Comment Icon with Badge */}
                            <Link to={`/blog/${d._id}`}>
                              <span
                                className="flex items-center text-gray-500"
                                title="Comment"
                              >
                                <svg
                                  className="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>
                                <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                                  {d.commentCount}
                                </span>
                              </span>
                            </Link>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 mx-1 rounded-lg border ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="flex items-center mx-2">
          <span className="text-gray-600">Page</span>
          <span className="mx-2 text-blue-500 font-bold text-lg">{page}</span>
          <span className="text-gray-600">of</span>
          <span className="ml-2 text-gray-800 font-medium">{totalPages}</span>
        </div>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 mx-1 rounded-lg border ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
