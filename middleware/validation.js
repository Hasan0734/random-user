const { body } = require("express-validator");

module.exports.userValidate = () => {
  return [
    body("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .custom((value, { req }) => typeof value === "number")
      .withMessage("ID is must contain number"),
    body("name", "Name is required").exists(),
    body("gender", "Gender is required").exists(),
    body("contact", "Contact is requried").exists(),
    body("address", "Address is requried").exists(),
    body("photoUrl", "Photo url is requried").exists(),
  ];
};

module.exports.validateId = () => {
  return [
    body("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .custom((value, { req }) => typeof value === "number")
      .withMessage("ID is must contain number"),
  ];
};
