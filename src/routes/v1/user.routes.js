import UserController from "@/controllers/v1/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

// create user
router.post("/", UserController.createNewUser);

// get all users
router.get("/", authMiddleware, UserController.getUsers);

// find user by id
router.get("/:id", UserController.findUserById);

// update user by id
router.patch("/:id", UserController.updateUser);

// delete user by id
router.delete("/:id", UserController.deleteUser);

export default router;
