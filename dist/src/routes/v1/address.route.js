"use strict";

var AddressController = require("../../controllers/v1/address.controller");
var authMiddleware = require("../../middlewares/auth.middleware");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/address.validation"),
  createAddressSchema = _require.createAddressSchema,
  updateAddressSchema = _require.updateAddressSchema;
var express = require("express");
var router = express.Router();

// private routes
router.use(authMiddleware);
router.post("/", validateMiddleware(createAddressSchema), AddressController.store);
router.get("/", AddressController.index);
router.get("/primary", AddressController.getPrimaryAddress);
router.patch("/:address_id/set-primary", AddressController.setPrimary);
router.patch("/:address_id/update", validateMiddleware(updateAddressSchema), AddressController.update);
router["delete"]("/:address_id", AddressController.destroy);
module.exports = router;