const jwt = require("jsonwebtoken");
const { CONFIG } = require("@/config/index.js");

/**
 * Generate a JWT token.
 * - Jika `originalToken` disertakan, maka token baru akan dibuat dengan `exp` dari token tersebut.
 * - Jika tidak, maka gunakan `expiredToken` default.
 *
 * @param {Object} payload - Data untuk dimasukkan ke dalam token.
 * @param {string} [expiredToken="7d"] - Waktu kedaluwarsa token, jika `originalToken` tidak disediakan.
 * @param {string|null} [originalToken=null] - Token lama untuk mengambil `exp` yang sudah ditentukan.
 * @returns {string} - Token JWT baru.
 */
const generateJwtToken = (
  payload,
  expiredToken = "7d",
  originalToken = null
) => {
  // Jika token lama diberikan dan ingin mempertahankan exp lama
  if (originalToken) {
    const decoded = jwt.decode(originalToken);
    if (!decoded || !decoded.exp) {
      throw new Error("Original token tidak valid atau tidak memiliki exp");
    }

    // Buat token baru dengan exp dari token lama
    return jwt.sign(
      { ...payload, exp: decoded.exp },
      CONFIG.JWT_SECRET_KEY,
      { noTimestamp: true } // tidak buat iat baru
    );
  }

  // Default: buat token dengan expiredToken baru
  return jwt.sign(payload, CONFIG.JWT_SECRET_KEY, {
    expiresIn: expiredToken,
  });
};

module.exports = generateJwtToken;
