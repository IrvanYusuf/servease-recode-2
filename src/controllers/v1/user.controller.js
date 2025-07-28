const { User } = require("@/models/user.model.js");
const ApiResponse = require("@/utils/response.js");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

class UserController {
  static createNewUser = async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const create = await User.create(req.body);

      const user = await User.findById(create._id).select("-password");
      return ApiResponse.successResponse(
        res,
        "User created",
        user,
        null,
        StatusCodes.CREATED
      );
    } catch (error) {
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password").lean();
      // console.log("running");

      return ApiResponse.successResponse(res, "success get users", users);
    } catch (error) {
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static findUserById = async (req, res) => {
    try {
      const user_id = req.user.id;

      const user = await User.findById(user_id).select("-password");
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          {
            user_id: "user not found",
          },
          404
        );
      }

      return ApiResponse.successResponse(res, "success get user", user);
    } catch (error) {
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
  static updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!user) {
        return ApiResponse.errorResponse(res, "User not found", null, 404);
      }

      return ApiResponse.successResponse(
        res,
        "User updated successfully",
        user
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await User.findByIdAndDelete(userId);
      if (!result) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { user: "user not found" },
          404
        );
      }
      return ApiResponse.successResponse(res, "success delete user", []);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = UserController;
