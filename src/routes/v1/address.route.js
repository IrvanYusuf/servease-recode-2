const AddressController = require("@/controllers/v1/address.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("@/validation/address.validation");
const express = require("express");

const router = express.Router();

// private routes
router.use(authMiddleware);

router.post(
  "/",
  validateMiddleware(createAddressSchema),
  AddressController.store
);
router.get("/", AddressController.index);
router.get("/primary", AddressController.getPrimaryAddress);
router.patch("/:address_id/set-primary", AddressController.setPrimary);
router.patch(
  "/:address_id/update",
  validateMiddleware(updateAddressSchema),
  AddressController.update
);

router.delete("/:address_id", AddressController.destroy);

module.exports = router;
