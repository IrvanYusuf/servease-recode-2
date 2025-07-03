const { CONFIG } = require("@/config/index.js");
const jwt = require("jsonwebtoken");

/**
 * Generate a signed JSON Web Token (JWT) with a custom expiration.
 *
 * @function generateJwtToken
 * @param {Object} payload - The payload to include in the JWT (e.g., user ID, email).
 * @param {string} [expiredToken="7d"] - Optional expiration time (e.g., "1d", "7d", "1h"). Defaults to 7 days.
 * @returns {string} The signed JWT token.
 *
 * @example
 * const token = generateJwtToken({ id: user._id, email: user.email }, "1d");
 */
const generateJwtToken = (payload, expiredToken = "7d") => {
  const token = jwt.sign(payload, CONFIG.JWT_SECRET_KEY, {
    expiresIn: expiredToken,
  });

  return token;
};

module.exports = generateJwtToken;
