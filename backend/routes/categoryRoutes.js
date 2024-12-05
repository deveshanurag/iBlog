const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/categoryControllers");
const protect = require("../middlewares/authMiddleware");

router.route("/").post(protect, createCategory);
module.exports = router;
