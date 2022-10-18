const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users.controller");
const valid = require("../../middleware/validation");

router
  /**
   * @api {get} /random
   * @apiDescription get random user from users
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} one random user only.
   */
  .get("/random", usersController.getRandromUser);
router
  /**
   * @api {get} /all
   * @apiDescription  Get all the random users
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} get all users .
   * @apiParam  {max{5}}    Get the limit users
   */
  .get("/all", usersController.getAllUser);
router
  /**
   * @api {post} /save
   * @apiDescription  Save user
   * @apiBodyRequired {id = must be number}, {name, gender, contact, address, photoUrl} = is string or any type
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} get all users.
   */
  .post("/save", valid.userValidate(), usersController.saveUser);
router
  /**
   * @api {patch} /update
   * @apiDescription  update user
   * @apiBodyRequired {id = must be number}
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} get all users.
   */
  .patch("/update", valid.validateId(), usersController.updateUser);

router
  /**
   * @api {patch} /bulk-update
   * @apiDescription  multiple user update
   * @apiBodyRequired must be send array of object {id = must be number and requried}
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} get all users.
   */
  .patch("/bulk-update", valid.vallidateBody(), usersController.multipleUpdate);

router
  /**
   * @api {patch} /delete
   * @apiDescription  delete user
   * @apiBodyRequired {id = must be number}
   * @apiPermission everybody
   * @apiHeader {String} not to be required
   * @apiSuccess {Object[]} get all users.
   */
  .delete("/delete", valid.validateId(), usersController.deleteUser);

module.exports = router;
