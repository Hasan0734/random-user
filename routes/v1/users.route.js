const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users.controller");
const valid = require('../../middleware/validation');

router.get("/random", usersController.getRandromUser);
router.get("/all", usersController.getAllUser);
router.post("/save", valid.userValidate(), usersController.saveUser);
router.patch("/update", usersController.updateUser)


module.exports = router;
