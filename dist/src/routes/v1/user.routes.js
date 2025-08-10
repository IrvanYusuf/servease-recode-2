"use strict";

var UserController = require("../../controllers/v1/user.controller.js");
var authMiddleware = require("../../middlewares/auth.middleware.js");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/auth.validation"),
  updateUserSchemaValidation = _require.updateUserSchemaValidation;
var express = require("express");
var router = express.Router();

// public routes

// create user
router.post("/", UserController.createNewUser);

// get all users
router.get("/", UserController.getUsers);
router["delete"]("/:id", UserController.deleteUser);

// private routes
router.use(authMiddleware);

// find user by id
router.get("/detail", UserController.findUserById);

// update user by id
router.patch("/", validateMiddleware(updateUserSchemaValidation), UserController.updateUser);

// delete user by id

module.exports = router;