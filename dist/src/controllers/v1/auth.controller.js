"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../../models/user.model.js"),
  User = _require.User;
var ApiResponse = require("../../utils/response.js");
var _require2 = require("http-status-codes"),
  StatusCodes = _require2.StatusCodes;
var bcrypt = require("bcryptjs");
var _require3 = require("../../constant/constant.js"),
  SALT_BCRYPT = _require3.SALT_BCRYPT;
var generateOtp = require("../../utils/generateOtp.js");
var generateJwtToken = require("../../utils/generateJwtToken.js");
var getAppTimezone = require("../../utils/getAppTimezone.js");
var dayjs = require("../../utils/dayjs.js");
var _require4 = require("../../utils/sendEmailTemplate.js"),
  mobileEmailTemplateForgotPasswordOtp = _require4.mobileEmailTemplateForgotPasswordOtp,
  sendEmailTemplate = _require4.sendEmailTemplate,
  webEmailTemplateForgotPasswordOtp = _require4.webEmailTemplateForgotPasswordOtp;
var crypto = require("crypto");
var ApiError = require("../../errors/apiError");
var AuthController = /*#__PURE__*/_createClass(function AuthController() {
  _classCallCheck(this, AuthController);
});
_defineProperty(AuthController, "register", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var data, checkExistingUser, hashedPassword, otp, expiredOtp, user, payloadToken, token, dataResponse;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          data = req.validated;
          _context.n = 1;
          return User.findOne({
            email: data.email
          });
        case 1:
          checkExistingUser = _context.v;
          if (!checkExistingUser) {
            _context.n = 2;
            break;
          }
          return _context.a(2, next(new ApiError("Email already registered", StatusCodes.CONFLICT)));
        case 2:
          _context.n = 3;
          return bcrypt.hash(data.password, SALT_BCRYPT);
        case 3:
          hashedPassword = _context.v;
          otp = generateOtp();
          expiredOtp = dayjs().tz(getAppTimezone()).add(1, "days").toDate();
          user = new User({
            name: data.name,
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            role: data.role,
            username: data.username,
            password: hashedPassword,
            birthDate: data.birthDate,
            otpVerification: otp,
            otpVerificationExpiresAt: expiredOtp // expired in 1 day
          });
          _context.n = 4;
          return user.save();
        case 4:
          // jwt token
          payloadToken = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          };
          token = generateJwtToken(payloadToken);
          dataResponse = {
            user: _objectSpread({}, payloadToken),
            token: token
          };
          return _context.a(2, ApiResponse.successResponse(res, "success register user", dataResponse, null, StatusCodes.CREATED));
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var data, checkExistingUser, checkPassword, payloadToken, token, dataResponse;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          data = req.validated;
          _context2.n = 1;
          return User.findOne({
            email: data.email
          });
        case 1:
          checkExistingUser = _context2.v;
          if (checkExistingUser) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          _context2.n = 3;
          return bcrypt.compare(data.password, checkExistingUser.password);
        case 3:
          checkPassword = _context2.v;
          if (checkPassword) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, next(new ApiError("Invalid credential", StatusCodes.UNAUTHORIZED)));
        case 4:
          // jwt token
          payloadToken = {
            id: checkExistingUser._id,
            name: checkExistingUser.name,
            email: checkExistingUser.email,
            role: checkExistingUser.role,
            isVerified: checkExistingUser.isVerified
          };
          token = generateJwtToken(payloadToken);
          dataResponse = {
            user: _objectSpread({}, payloadToken),
            token: token
          };
          return _context2.a(2, ApiResponse.successResponse(res, "success login user", dataResponse, null, StatusCodes.OK));
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "verifyOtp", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var _req$validated, otp, email, user;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _req$validated = req.validated, otp = _req$validated.otp, email = _req$validated.email;
          _context3.n = 1;
          return User.findOne({
            email: email,
            otpVerification: otp,
            otpVerificationExpiresAt: {
              $gt: new Date()
            }
          });
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, next(new ApiError("otp invalid or expires", StatusCodes.BAD_REQUEST)));
        case 2:
          // user.otpVerification = "";
          // user.otpVerificationExpiresAt = null;
          user.set("otpVerification", undefined, {
            strict: false
          });
          user.set("otpVerificationExpiresAt", undefined, {
            strict: false
          });
          user.isVerified = true;
          _context3.n = 3;
          return user.save();
        case 3:
          return _context3.a(2, ApiResponse.successResponse(res, "OTP verified successfully"));
      }
    }, _callee3);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "me", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res, next) {
    var userId, user;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          userId = req.user.id; // from authMiddleware
          _context4.n = 1;
          return User.findById(userId).select("-password -otpVerification -otpVerificationExpiresAt -resetPasswordOtpVerification -resetPasswordOtpVerificationExpiresAt");
        case 1:
          user = _context4.v;
          if (user) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          return _context4.a(2, ApiResponse.successResponse(res, "success get detail profile me", user));
      }
    }, _callee4);
  }));
  return function (_x0, _x1, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "logout", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          return _context5.a(2, ApiResponse.successResponse(res, "Logout successful"));
      }
    }, _callee5);
  }));
  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "changePassword", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res, next) {
    var _req$user;
    var userId, user, _req$validated2, currentPassword, newPassword, match;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          userId = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id; // diambil dari auth middleware
          _context6.n = 1;
          return User.findById(userId);
        case 1:
          user = _context6.v;
          if (user) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, next(new ApiError("User not found", StatusCodes.UNAUTHORIZED)));
        case 2:
          _req$validated2 = req.validated, currentPassword = _req$validated2.currentPassword, newPassword = _req$validated2.newPassword;
          _context6.n = 3;
          return bcrypt.compare(currentPassword, user.password);
        case 3:
          match = _context6.v;
          if (match) {
            _context6.n = 4;
            break;
          }
          return _context6.a(2, next(new ApiError("Wrong current password", StatusCodes.UNAUTHORIZED)));
        case 4:
          _context6.n = 5;
          return bcrypt.hash(newPassword, SALT_BCRYPT);
        case 5:
          user.password = _context6.v;
          _context6.n = 6;
          return user.save();
        case 6:
          return _context6.a(2, ApiResponse.successResponse(res, "Password changed successfully"));
      }
    }, _callee6);
  }));
  return function (_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "forgotPasswordMobile", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res, next) {
    var email, user, otp;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          email = req.validated.email;
          _context7.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context7.v;
          if (user) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          otp = generateOtp();
          user.resetPasswordOtpVerification = otp;
          user.resetPasswordOtpVerificationExpiresAt = dayjs().tz(getAppTimezone()).add(15, "minutes").toDate();
          _context7.n = 3;
          return user.save();
        case 3:
          // TODO: kirim OTP ke email
          sendEmailTemplate(email, "Reset Password OTP", mobileEmailTemplateForgotPasswordOtp(user, otp));
          console.log("OTP sent to ".concat(email, ": ").concat(otp));
          return _context7.a(2, ApiResponse.successResponse(res, "OTP sent to your email"));
      }
    }, _callee7);
  }));
  return function (_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "forgotPasswordWeb", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res, next) {
    var email, user, token;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          email = req.validated.email;
          _context8.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context8.v;
          if (user) {
            _context8.n = 2;
            break;
          }
          return _context8.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          token = crypto.randomBytes(32).toString("hex");
          user.resetPasswordTokenVerification = token;
          user.resetPasswordTokenVerificationExpiresAt = dayjs().tz(getAppTimezone()).add(15, "minutes").toDate();
          _context8.n = 3;
          return user.save();
        case 3:
          // TODO: kirim OTP ke email
          sendEmailTemplate(email, "Reset Password Link", webEmailTemplateForgotPasswordOtp(user, token));
          console.log("OTP sent to ".concat(email, ": ").concat(otp));
          return _context8.a(2, ApiResponse.successResponse(res, "Reset link password sent to your email"));
      }
    }, _callee8);
  }));
  return function (_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "verifyForgotPasswordOtp", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res, next) {
    var _req$validated3, otp, email, user;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _req$validated3 = req.validated, otp = _req$validated3.otp, email = _req$validated3.email;
          _context9.n = 1;
          return User.findOne({
            email: email,
            resetPasswordOtpVerification: otp,
            resetPasswordOtpVerificationExpiresAt: {
              $gt: new Date()
            }
          });
        case 1:
          user = _context9.v;
          if (user) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, next(new ApiError("otp invalid or expires", StatusCodes.BAD_REQUEST)));
        case 2:
          _context9.n = 3;
          return user.save();
        case 3:
          return _context9.a(2, ApiResponse.successResponse(res, "OTP verified successfully"));
      }
    }, _callee9);
  }));
  return function (_x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "resetPasswordMobile", /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res, next) {
    var _req$validated4, email, newPassword, user;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _req$validated4 = req.validated, email = _req$validated4.email, newPassword = _req$validated4.newPassword;
          _context0.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context0.v;
          if (user) {
            _context0.n = 2;
            break;
          }
          return _context0.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          _context0.n = 3;
          return bcrypt.hash(newPassword, SALT_BCRYPT);
        case 3:
          user.password = _context0.v;
          user.set("resetPasswordOtpVerification", undefined, {
            strict: false
          });
          user.set("resetPasswordOtpVerificationExpiresAt", undefined, {
            strict: false
          });
          user.set("otpVerification", undefined, {
            strict: false
          });
          user.set("otpVerificationExpiresAt", undefined, {
            strict: false
          });
          _context0.n = 4;
          return user.save();
        case 4:
          return _context0.a(2, ApiResponse.successResponse(res, "Password changed successfully"));
      }
    }, _callee0);
  }));
  return function (_x25, _x26, _x27) {
    return _ref0.apply(this, arguments);
  };
}());
_defineProperty(AuthController, "resetPasswordWeb", /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res, next) {
    var _req$validated5, email, newPassword, token, user;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          _req$validated5 = req.validated, email = _req$validated5.email, newPassword = _req$validated5.newPassword, token = _req$validated5.token;
          _context1.n = 1;
          return User.findOne({
            email: email,
            resetPasswordTokenVerification: token,
            resetPasswordTokenVerificationExpiresAt: {
              $gt: new Date()
            }
          });
        case 1:
          user = _context1.v;
          if (user) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, next(new ApiError("Invalid session", StatusCodes.UNAUTHORIZED)));
        case 2:
          _context1.n = 3;
          return bcrypt.hash(newPassword, SALT_BCRYPT);
        case 3:
          user.password = _context1.v;
          user.set("resetPasswordTokenVerification", undefined, {
            strict: false
          });
          user.set("resetPasswordTokenVerificationExpiresAt", undefined, {
            strict: false
          });
          user.set("otpVerification", undefined, {
            strict: false
          });
          user.set("otpVerificationExpiresAt", undefined, {
            strict: false
          });
          _context1.n = 4;
          return user.save();
        case 4:
          return _context1.a(2, ApiResponse.successResponse(res, "Password changed successfully"));
      }
    }, _callee1);
  }));
  return function (_x28, _x29, _x30) {
    return _ref1.apply(this, arguments);
  };
}());
module.exports = AuthController;