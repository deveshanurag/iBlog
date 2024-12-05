import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EditBlog = () => {
  const { id } = useParams(); // Fetch the blog ID from the URL
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/blogs/${id}`);
        setBlog({
          title: data.data.title,
          content: data.data.content,
          category: data.data.category,
          tags: data.data.tags || [],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blog data.");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle form submission
  const handleEdit = async (e) => {
    e.preventDefault();
    if (blog.title && blog.content && blog.category && blog.tags) {
      try {
        setLoading(true);
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(`/api/blogs/${id}`, blog, config);
        //   alert("Posted");
        //   await axios.put(`/api/blogs/${id}`, blog);
        setLoading(false);
        alert("Blog updated successfully!");
        navigate(`/blog/${id}`); // Redirect to the blog details page
      } catch (err) {
        console.error(err);
        setError("Failed to update the blog.");
        setLoading(false);
      }
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (tagInput.trim()) {
      setBlog({ ...blog, tags: [...blog.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tag) => {
    setBlog({ ...blog, tags: blog.tags.filter((t) => t !== tag) });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <form
          onSubmit={handleEdit}
          className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-700">Edit Blog</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter blog title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="6"
              placeholder="Enter blog content"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              value={blog.category}
              onChange={(e) => setBlog({ ...blog, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter blog category"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            Update Blog
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditBlog;
