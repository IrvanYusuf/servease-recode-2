const ApiError = require("@/errors/apiError");
const { User } = require("@/models/user.model.js");
const ApiResponse = require("@/utils/response.js");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

class UserController {
  static createNewUser = async (req, res, next) => {
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
  };

  static getUsers = async (req, res) => {
    const users = await User.find().select("-password").lean();

    return ApiResponse.successResponse(res, "success get users", users);
  };

  static findUserById = async (req, res, next) => {
    const user_id = req.user.id;

    const user = await User.findById(user_id).select("-password");
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    return ApiResponse.successResponse(res, "success get user", user);
  };

  static updateUser = async (req, res, next) => {
    const userId = req.user.id;

    const data = req.validated;

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    return ApiResponse.successResponse(res, "User updated successfully", user);
  };

  static deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }
    return ApiResponse.successResponse(res, "success delete user", []);
  };
}

module.exports = UserController;
