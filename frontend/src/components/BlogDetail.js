import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BlogDetail = () => {
  const [blogDetail, setBlogDetail] = useState(null); // Start with null
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const { id } = useParams();
  const { email } = JSON.parse(localStorage.getItem("userInfo"));

  const getBlog = async () => {
    try {
      const { data } = await axios.get(`/api/blogs/${id}`);
      setBlogDetail(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async () => {
    try {
      const { data } = await axios.get(`/api/comments/${id}`);
      setComments(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
    getComment();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `/api/comments/${id}`,
          {
            comment: newComment.trim(),
          },
          config
        );
        setComments([data.data, ...comments]);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditComment = (id) => {
    const comment = comments.find((c) => c._id === id);
    setEditingCommentId(id);
    setEditingText(comment.comment);
  };

  const handleSaveEdit = async (id) => {
    if (editingText.trim()) {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `/api/comments/${id}`,
          {
            comment: editingText.trim(),
          },
          config
        );
        setComments(
          comments.map((c) =>
            c._id === id ? { ...c, comment: editingText } : c
          )
        );
        setEditingCommentId(null);
        setEditingText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/comments/${id}`, config);
      setComments(comments.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!blogDetail) {
    return <p>Loading...</p>; // Render a loading message until blogDetail is fetched
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Blog Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {blogDetail.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-4">
                Author:{" "}
                <span className="font-semibold">
                  {blogDetail.author?.name || "Unknown"}
                </span>
              </span>
              <span className="mr-4">
                Date:{" "}
                <span className="font-semibold">
                  {blogDetail.createdAt?.split("T")[0] || "N/A"}
                </span>
              </span>
              <span>
                Category:{" "}
                <span className="font-semibold text-green-600">
                  {blogDetail.category || "N/A"}
                </span>
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {blogDetail.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="text-gray-700 leading-relaxed mb-6">
            <p>{blogDetail.content}</p>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Comments
            </h2>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-blue-500 hover:underline mb-4"
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>

            {showComments && (
              <div className="border-t border-gray-200 pt-4">
                {/* Add Comment */}
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Post Comment
                  </button>
                </div>

                {/* Display Comments */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative"
                    >
                      <p className="text-sm text-gray-600 mb-1">
                        By: {comment.userId?.name || "Anonymous"}
                      </p>
                      {editingCommentId === comment._id ? (
                        <>
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleSaveEdit(comment._id)}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <p className="text-gray-700">{comment.comment}</p>
                      )}
                      {email === comment.userId.email && (
                        <div className="absolute bottom-2 right-4 flex gap-2">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="text-blue-500 hover:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
