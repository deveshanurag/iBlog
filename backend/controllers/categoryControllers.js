const Category = require("../models/categoryModel");
const createCategory = async (req, res) => {
  const { cat } = req.body;
  if (!cat) {
    res.status(400).json({
      success: false,
      message: "Category not provided",
    });
  }
  if (req.user.role.toString() !== "admin") {
    res.status(404).json({
      success: false,
      message: "Not authorized",
    });
  }
  try {
    const createCat = await Category.create({ name: cat });
    if (createCat) {
      res.status(200).json({
        success: true,
        data: createCat,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
module.exports = { createCategory };
