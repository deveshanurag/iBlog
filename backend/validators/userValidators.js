const { body } = require("express-validator");
const registerValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

const loginValidation = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

module.exports = { registerValidation, loginValidation };
