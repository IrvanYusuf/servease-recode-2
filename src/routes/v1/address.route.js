const AddressController = require("@/controllers/v1/address.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.post("/", authMiddleware, AddressController.store);
router.get("/", authMiddleware, AddressController.index);
router.get("/primary", authMiddleware, AddressController.getPrimaryAddress);
router.patch(
  "/:address_id/set-primary",
  authMiddleware,
  AddressController.setPrimary
);

router.delete("/", authMiddleware, AddressController.destroy);

module.exports = router;
