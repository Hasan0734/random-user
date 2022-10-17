const { body } = require("express-validator");

exports.userValidate = () => {
  return [
    body("id",).isInt(),
    body("name", "Name required").exists(),
    body("gender", "Gender required").exists(),
    body("contact", "Contact requried").exists(),
    body("address", "Address requried").exists(),
    body("photoUrl", "Photo url requried").exists(),
  ];
};
