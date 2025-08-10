const UserController = require("@/controllers/v1/user.controller.js");
const authMiddleware = require("@/middlewares/auth.middleware.js");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { updateUserSchemaValidation } = require("@/validation/auth.validation");
const express = require("express");

const router = express.Router();

// public routes

// create user
router.post("/", UserController.createNewUser);

// get all users
router.get("/", UserController.getUsers);

router.delete("/:id", UserController.deleteUser);

// private routes
router.use(authMiddleware);

// find user by id
router.get("/detail", UserController.findUserById);

// update user by id
router.patch(
  "/",
  validateMiddleware(updateUserSchemaValidation),
  UserController.updateUser
);

// delete user by id

module.exports = router;
