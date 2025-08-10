const { Service } = require("@/models/service.model");
const ApiResponse = require("@/utils/response");
const {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
} = require("@/utils/uploadToCloudinary");
const { StatusCodes } = require("http-status-codes");

class ServiceController {
  static index = async (req, res) => {
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
  };

  static store = async (req, res) => {
    const data = req.validated;

    const thumbnailFile = req.files["thumbnail"]?.[0];
    const galleryImages = req.files["gallery_images"] || [];
    const thumbnailUrl = await uploadToCloudinary({
      buffer: thumbnailFile.buffer,
    });

    const galleryImageUrls = await uploadMultipleToCloudinary(galleryImages);
    const user_id = req.user.id;

    const service = await Service.create({
      partner_id: data.partner_id,
      category_id: data.category_id,
      name: data.name,
      price: data.price,
      thumbnail: thumbnailUrl,
      gallery_images: galleryImageUrls,
      description: data.description,
      user_id,
    });

    return ApiResponse.successResponse(
      res,
      "success create service",
      service,
      null,
      StatusCodes.OK
    );
  };

  static getTotalServices = async (req, res) => {
    const user_id = req.user.id;
    const totalServices = await Service.countDocuments({ user_id });
    return ApiResponse.successResponse(
      res,
      "success get total services",
      totalServices
    );
  };
}

module.exports = ServiceController;
