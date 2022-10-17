const { body } = require("express-validator");

exports.userValidate = () => {
  return [
    body("name", "Name required").isBoolean(),
    body("gender", "Gender required").isBoolean(),
    body("contact", "Contact requried").isBoolean(),
    body("address", "Address requried").isBoolean(),
    body("photoUrl", "Photo url requried").isBoolean(),
  ];
};
