import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const WriteBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const Navigate = useNavigate();

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    const blogData = { title, content, category, tags };
    // console.log("Blog Data:", blogData);
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/blogs", blogData, config);
      alert("Posted");
      Navigate("/post");
    } catch (error) {
      console.log(error);
    }
    // Send `blogData` to the backend via API call
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Write Your Blog
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Title */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter the category"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Tags
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WriteBlogPage;
