"use strict";

var nodemailer = require("nodemailer");
var _require = require("./index.js"),
  CONFIG = _require.CONFIG;
var transporter = nodemailer.createTransport({
  host: CONFIG.MAIL_HOST,
  port: CONFIG.MAIL_PORT,
  auth: {
    user: CONFIG.MAIL_USER,
    pass: CONFIG.MAIL_PASS
  }
});
module.exports = {
  transporter: transporter
};