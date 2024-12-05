const express = require("express");
const router = express.Router();
const {
  createBlog,
  readBlog,
  getBlog,
  editBlog,
  deleteBlog,
  searchBlog,
} = require("../controllers/blogControllers");
const protect = require("../middlewares/authMiddleware");

router.route("/search").get(searchBlog);
router.route("/").post(protect, createBlog).get(readBlog);
router.route("/:id").get(getBlog);
router.route("/:id").put(protect, editBlog);
router.route("/:id").delete(protect, deleteBlog);

module.exports = router;
