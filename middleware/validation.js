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

module.exports.vallidateBody = () => {
  return [
    body("")
      .isArray()
      .withMessage("Invalid array")
      .custom((value, { req }) => {
        const allNumber = value.map((val) => {
          if (!!val.id) {
            if (typeof val.id === "number") {
              return true;
            } else {
              return false;
            }
          } else {
            console.log("hello");
            return false;
          }
        });
        const trueNumber = allNumber.every((element) => element === true);
        if (trueNumber) {
          return true;
        }
        return false;
      })
      .withMessage("ID must be number and required"),
  ];
};

module.exports.checkErrors = (errors, res) => {
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
};
