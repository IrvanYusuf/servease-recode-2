const nodemailer = require("nodemailer");
const { CONFIG } = require("./index.js");

const transporter = nodemailer.createTransport({
  host: CONFIG.MAIL_HOST,
  port: CONFIG.MAIL_PORT,
  auth: {
    user: CONFIG.MAIL_USER,
    pass: CONFIG.MAIL_PASS,
  },
});

module.exports = { transporter };
