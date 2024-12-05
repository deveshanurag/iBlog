const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params; // Blog ID
  try {
    // Create the comment
    const newComment = await Comment.create({
      blogId: id,
      userId: req.user._id,
      comment,
    });

    // Populate fields
    const populatedComment = await Comment.findById(newComment._id)
      .populate("userId", "name email")
      .populate("blogId", "title content");

    if (populatedComment) {
      res.status(200).json({
        success: true,
        data: populatedComment,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ blogId: id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    if (comments) {
      res.status(200).json({
        success: true,
        data: comments,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const editComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const oldComment = await Comment.findById(id);
    if (!oldComment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (oldComment.userId.toString() != req.user._id.toString()) {
      res.status(405).send({
        success: false,
        message: "Unauthorized",
      });
    }
    oldComment.comment = comment;
    const newComment = await oldComment.save();
    if (newComment) {
      res.status(200).json({
        success: true,
        data: newComment,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const oldComment = await Comment.findById(id);
    if (!oldComment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (oldComment.userId.toString() !== req.user._id.toString()) {
      res.status(405).send({
        success: false,
        message: "Unauthorized",
      });
    }
    const deleteComment = await Comment.findByIdAndDelete(id);
    if (deleteComment) {
      res.status(200).json({
        success: true,
        message: "Successfully deleted",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Could not delete",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

module.exports = { addComment, getComments, editComment, deleteComment };
