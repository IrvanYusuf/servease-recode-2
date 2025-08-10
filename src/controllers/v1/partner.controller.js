const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { Partner } = require("@/models/partner.model");
const getPublicIdCloudinary = require("@/utils/getPublicIdCloudinary");
const ApiError = require("@/errors/apiError");
const cloudinary = require("@/config/cloudinary");

class PartnerController {
  static index = async (req, res) => {
    const user_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const filter = { user_id };

    if (search) {
      filter["$or"] = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { province: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
      ];
    }
    const total = await Partner.countDocuments(filter);
    const partners = await Partner.find(filter)
      .populate("user_id")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const payload = {
      data: partners,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
    return ApiResponse.successResponse(res, "success get datas", payload);
  };

  static store = async (req, res) => {
    const data = req.validated;
    const imageUrl = await uploadToCloudinary({ buffer: req.file.buffer });

    const user = req.user;

    const partner = await Partner.create({
      user_id: user.id,
      city: data.city,
      name: data.name,
      province: data.province,
      district: data.district,
      profile_image: imageUrl,
      description: data.description,
      link_map: data.link_map,
    });

    return ApiResponse.successResponse(
      res,
      "success create partner",
      partner,
      null,
      StatusCodes.CREATED
    );
  };

  static destroy = async (req, res, next) => {
    const { partner_id } = req.params;
    const partner = await Partner.findById(partner_id);
    if (!partner) {
      return next(new ApiError("Partner not found", StatusCodes.NOT_FOUND));
    }
    // Ambil public_id dari url
    const imageUrl = partner.profile_image;
    const publicId = getPublicIdCloudinary(imageUrl);
    // Hapus dari Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Hapus dari MongoDB
    await Partner.deleteOne({ _id: partner_id });

    return ApiResponse.successResponse(res, "Success delete partner");
  };
}

module.exports = PartnerController;
