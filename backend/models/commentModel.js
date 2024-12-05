const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // put the name which which you have created the table
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
