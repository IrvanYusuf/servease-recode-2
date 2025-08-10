"use strict";

var express = require("express");
var apiV1Routes = require("./v1/index.js");
var router = express.Router();
router.use("/v1", apiV1Routes);
module.exports = router;