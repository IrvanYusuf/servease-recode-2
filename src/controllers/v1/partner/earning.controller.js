const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Booking } = require("@/models/booking.model");
const mongoose = require("mongoose");
const { User } = require("@/models/user.model");
const ApiError = require("@/errors/apiError");
const { Withdraw } = require("@/models/withdraw.model");

class EarningController {
  static getEarningsHistory = async (req, res) => {
    const owner_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = {
      owner_id: new mongoose.Types.ObjectId(owner_id),
      status: { $in: ["confirmed", "completed"] },
    };
    const total = await Booking.countDocuments(filter);

    const bookings = await Booking.find(filter)
      .sort({ booking_date: -1 })
      .populate({
        path: "service_id",
        populate: [
          {
            path: "category_id",
            model: "Category",
          },
        ],
      })
      .populate("user_id")
      .populate("partner_id")
      .populate("payment_method_id")
      .skip((page - 1) * limit)
      .limit(limit);

    const payload = {
      data: bookings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return ApiResponse.successResponse(
      res,
      "success get earning history",
      payload
    );
  };

  static getWithdrawHistory = async (req, res) => {
    const owner_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = {
      owner_id: new mongoose.Types.ObjectId(owner_id),
    };
    const total = await Withdraw.countDocuments(filter);
    const withdraws = await Withdraw.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const payload = {
      data: withdraws,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return ApiResponse.successResponse(
      res,
      "success get withdraw history",
      payload
    );
  };

  static makeWithdraw = async (req, res, next) => {
    const owner_id = req.user.id;
    const data = req.validated;

    const user = await User.findById(owner_id);
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    if (user.balance < 0) {
      return next(new ApiError("Balance not enough", StatusCodes.BAD_REQUEST));
    }

    const withdraw = await Withdraw.create({
      owner_id,
      bank_name: data.bank_name,
      account_name: data.account_name,
      account_number: data.account_number,
      amount: data.amount,
      admin_fee: data.admin_fee,
      notes: data.notes,
      created_at: new Date(),
    });

    user.balance = user.balance - parseInt(data.amount);
    await user.save();
    return ApiResponse.successResponse(
      res,
      "success request withdraw",
      withdraw,
      null,
      StatusCodes.CREATED
    );
  };

  static getTotalMonthlyWithdraw = async (req, res) => {
    const owner_id = req.user.id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const monthlyWithdraw = await Withdraw.aggregate([
      {
        $match: {
          owner_id: new mongoose.Types.ObjectId(owner_id),
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    const totalMonthlyWithdraw = monthlyWithdraw[0]?.totalRevenue || 0;

    return ApiResponse.successResponse(
      res,
      "Success get monthly withdraw",
      totalMonthlyWithdraw
    );
  };

  static getUserBalance = async (req, res) => {
    const owner_id = req.user.id;

    const user = await User.findById(owner_id);
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    const balance = user.balance || 0;
    return ApiResponse.successResponse(
      res,
      "Success get user balance",
      balance
    );
  };
}

module.exports = EarningController;
