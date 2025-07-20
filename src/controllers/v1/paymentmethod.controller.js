const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");  
class PaymentMethodController {
  static index = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };
}

module.exports = PaymentMethodController;
