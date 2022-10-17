const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users.controller");

router.route("/").get(userController.getRandromUser).post();

module.exports = router;
