const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createBlog = async (req, res) => {
  const { title, content, tags, category } = req.body;

  // Validate request body
  if (!title || !content || !tags || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Create the blog
    const newBlog = await Blog.create({
      title,
      content,
      tags,
      // tags: tags ? tags.split(",") : [],
      category,
      author: req.user._id,
    });

    // Respond with the newly created blog
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    // Log error and send response
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const readBlog = async (req, res) => {
  let { page, limit, category, tag } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const query = {};
  if (category) {
    query.category = category;
  }
  if (tag) {
    query.tags = { $in: [tag] };
  }

  try {
    const blogs = await Blog.find(query)
      .populate("author", "name email") // Populate the author details
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Fetch the comment count for each blog
    const blogsWithCommentCount = await Promise.all(
      blogs.map(async (blog) => {
        const commentCount = await Comment.countDocuments({ blogId: blog._id });
        return {
          ...blog.toObject(), // Convert Mongoose document to plain object
          commentCount,
        };
      })
    );

    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      currentPage: page,
      limit: limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: blogsWithCommentCount, // Include blogs with comment counts
    });
  } catch (error) {
    console.error("Error in readBlog:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// const readBlog = async (req, res) => {
//   let { page, limit, category, tag } = req.query;
//   page = parseInt(page) || 1;
//   limit = parseInt(limit) || 10;
//   const query = {};
//   if (category) {
//     query.category = category;
//   }
//   if (tag) {
//     query.tags = { $in: [tag] };
//   }

//   try {
//     const blogs = await Blog.find(query)
//       .populate("author", "name email")
//       .skip((page - 1) * limit)
//       .limit(limit);
//     const totalBlogs = await Blog.countDocuments(query);
//     res.status(200).json({
//       success: true,
//       currentPage: page,
//       limit: limit,
//       totalBlogs,
//       totalPages: Math.ceil(totalBlogs / limit),
//       data: blogs,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error,
//     });
//   }
// };
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id }).populate(
      "author",
      "name email"
    );
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    if (
      blog.author.toString() === req.user._id.toString() ||
      req.user.role.toString() === "admin"
    ) {
      const update = req.body;
      const updateBlog = await Blog.findByIdAndUpdate({ _id: id }, update, {
        new: true,
      });
      if (updateBlog) {
        res.status(200).json({
          success: true,
          blog: updateBlog,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// const deleteBlog = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const blog = await Blog.findById({ _id: id });
//     if (!blog) {
//       res.status(404).json({
//         success: false,
//         message: "Not found",
//       });
//     }
//     if (
//       blog.author.toString() === req.user._id.toString() ||
//       req.user.role.toString() === "admin"
//     ) {
//       const deleteBlog = await Blog.findByIdAndDelete({ _id: id });
//       if (deleteBlog) {
//         res.status(200).json({
//           success: true,
//         });
//       } else {
//         res.status(500).json({
//           success: false,
//           message: "Server Error",
//         });
//       }
//     } else {
//       res.status(403).json({
//         success: false,
//         message: "Not Authorized",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the user is the author or an admin
    if (
      blog.author.toString() === req.user._id.toString() ||
      req.user.role === "admin"
    ) {
      // Delete the blog
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (deletedBlog) {
        return res.status(200).json({
          success: true,
          message: "Blog deleted successfully",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to delete the blog",
        });
      }
    } else {
      // User is not authorized
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this blog",
      });
    }
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message, // Add this for debugging purposes
    });
  }
};

const searchBlog = async (req, res) => {
  let { page, query, tags, category } = req.query;
  page = parseInt(page) || 1;
  const limit = 5;
  // console.log(query, tags, category);

  let searchCriteria = {};

  if (query) {
    searchCriteria.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];
  }

  if (tags) {
    searchCriteria.tags = { $in: tags.split(",") }; // Match any of the tags
  }

  if (category) {
    searchCriteria.category = category; // Match the category ID
  }

  try {
    const blogs = await Blog.find(searchCriteria)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Fetch the comment count for each blog
    const blogsWithCommentCount = await Promise.all(
      blogs.map(async (blog) => {
        const commentCount = await Comment.countDocuments({ blogId: blog._id });
        return {
          ...blog.toObject(), // Convert Mongoose document to plain object
          commentCount,
        };
      })
    );

    const totalBlogs = await Blog.countDocuments(searchCriteria);
    res.status(200).json({
      success: true,
      currentPage: page,
      limit: limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: blogsWithCommentCount, // Include blogs with comment counts
    });
  } catch (error) {
    res.status(500).json({ error: "Error searching blogs." });
  }
};

module.exports = {
  createBlog,
  readBlog,
  getBlog,
  editBlog,
  deleteBlog,
  searchBlog,
};
