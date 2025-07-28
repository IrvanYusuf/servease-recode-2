const { Service } = require("@/models/service.model");
const ApiResponse = require("@/utils/response");
const { StatusCodes } = require("http-status-codes");

class ServiceController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const filter = { user_id };

      const total = await Service.countDocuments(filter);
      const datas = await Service.find(filter)
        .populate("partner_id")
        .populate("category_id")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const payload = {
        data: datas,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      return ApiResponse.successResponse(
        res,
        "success get services partner",
        payload,
        null,
        StatusCodes.OK
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getTotalServices = async (req, res) => {
    try {
      const user_id = req.user.id;
      const totalServices = await Service.countDocuments({ user_id });
      return ApiResponse.successResponse(
        res,
        "success get total services",
        totalServices
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = ServiceController;
