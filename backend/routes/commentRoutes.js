const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/commentControllers");
const protect = require("../middlewares/authMiddleware");

router.route("/:id").post(protect, addComment);
router.route("/:id").get(getComments);
router.route("/:id").put(protect, editComment).delete(protect, deleteComment);
router.route("/:id").delete(protect, deleteComment);
module.exports = router;
