const UserController = require("@/controllers/v1/user.controller.js");
const authMiddleware = require("@/middlewares/auth.middleware.js");
const express = require("express");

const router = express.Router();

// create user
router.post("/", UserController.createNewUser);

// get all users
router.get("/", UserController.getUsers);

// find user by id
router.get("/:id", UserController.findUserById);

// update user by id
router.patch("/:id", UserController.updateUser);

// delete user by id
router.delete("/:id", UserController.deleteUser);

module.exports = router;
