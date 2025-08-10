"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("http-status-codes"),
  StatusCodes = _require.StatusCodes;
var ApiResponse = require("../../utils/response.js");
var _require2 = require("../../validation/review.validation"),
  createReviewSchema = _require2.createReviewSchema,
  updateReviewSchema = _require2.updateReviewSchema;
var _require3 = require("../../models/review.model"),
  Review = _require3.Review;
var _require4 = require("../../models/booking.model"),
  Booking = _require4.Booking;
var _require5 = require("../../models/service.model"),
  Service = _require5.Service;
var ApiError = require("../../errors/apiError");
var ReviewController = /*#__PURE__*/_createClass(function ReviewController() {
  _classCallCheck(this, ReviewController);
});
_defineProperty(ReviewController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user_id, page, limit, filter, total, reviews, payload;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          user_id = req.user.id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          filter = {
            user_id: user_id
          };
          _context.n = 1;
          return Review.countDocuments(filter);
        case 1:
          total = _context.v;
          _context.n = 2;
          return Review.find(filter).populate({
            path: "service_id",
            populate: {
              path: "category_id",
              model: "Category"
            }
          }).populate("booking_id").populate("partner_id").sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit);
        case 2:
          reviews = _context.v;
          payload = {
            data: reviews,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          }; // LOGIC APP
          return _context.a(2, ApiResponse.successResponse(res, "success get reviews", payload));
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "store", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var booking_id, user_id, data, createReview, updateStatusReview, allReviews, totalRating, totalReviews, averageRating;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          booking_id = req.params.booking_id;
          user_id = req.user.id;
          data = req.validated;
          _context2.n = 1;
          return Review.create({
            user_id: user_id,
            booking_id: booking_id,
            partner_id: data.partner_id,
            service_id: data.service_id,
            owner_id: data.owner_id,
            rating: data.rating,
            comment: data.comment
          });
        case 1:
          createReview = _context2.v;
          _context2.n = 2;
          return Booking.findOneAndUpdate({
            _id: booking_id,
            user_id: user_id
          }, {
            review_status: "reviewed"
          });
        case 2:
          updateStatusReview = _context2.v;
          _context2.n = 3;
          return Review.find({
            service_id: data.service_id
          });
        case 3:
          allReviews = _context2.v;
          totalRating = allReviews.reduce(function (sum, r) {
            return sum + r.rating;
          }, 0);
          totalReviews = allReviews.length;
          averageRating = totalRating / totalReviews; // Update rating dan total_reviews di Service
          _context2.n = 4;
          return Service.findByIdAndUpdate(data.service_id, {
            rating: averageRating.toFixed(1),
            // jika ingin 1 angka desimal
            total_reviews: totalReviews
          });
        case 4:
          return _context2.a(2, ApiResponse.successResponse(res, "success create review", createReview, null, StatusCodes.CREATED));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "update", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var review_id, data, existingReview, review, allReviews, totalRating, totalReviews, averageRating;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          review_id = req.params.review_id;
          data = req.validated; // Cek apakah review exists
          _context3.n = 1;
          return Review.findById(review_id);
        case 1:
          existingReview = _context3.v;
          if (existingReview) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, ApiResponse.errorResponse(res, "Review not found", null, 404));
        case 2:
          _context3.n = 3;
          return Review.findByIdAndUpdate(review_id, data, {
            runValidators: true,
            "new": true
          });
        case 3:
          review = _context3.v;
          _context3.n = 4;
          return Review.find({
            service_id: existingReview.service_id
          });
        case 4:
          allReviews = _context3.v;
          totalRating = allReviews.reduce(function (sum, r) {
            return sum + r.rating;
          }, 0);
          totalReviews = allReviews.length;
          averageRating = totalRating / totalReviews; // Update rating dan total_reviews di Service
          _context3.n = 5;
          return Service.findByIdAndUpdate(existingReview.service_id, {
            rating: averageRating.toFixed(1),
            // jika ingin 1 angka desimal
            total_reviews: totalReviews
          });
        case 5:
          return _context3.a(2, ApiResponse.successResponse(res, "Review updated successfully", review));
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "destroy", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res, next) {
    var review_id, review, serviceId, allReviews, totalRating, totalReviews, averageRating;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          review_id = req.params.review_id; // Cek apakah review exists
          _context4.n = 1;
          return Review.findById(review_id);
        case 1:
          review = _context4.v;
          if (review) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, next(new ApiError("Review not found", StatusCodes.NOT_FOUND)));
        case 2:
          // Store service_id before deletion
          serviceId = review.service_id; // Delete review
          _context4.n = 3;
          return Review.findByIdAndDelete(review_id);
        case 3:
          _context4.n = 4;
          return Review.find({
            service_id: serviceId
          });
        case 4:
          allReviews = _context4.v;
          totalRating = allReviews.reduce(function (sum, r) {
            return sum + r.rating;
          }, 0);
          totalReviews = allReviews.length;
          averageRating = totalRating / totalReviews; // Update rating dan total_reviews di Service
          _context4.n = 5;
          return Service.findByIdAndUpdate(serviceId, {
            rating: averageRating.toFixed(1),
            // jika ingin 1 angka desimal
            total_reviews: totalReviews
          });
        case 5:
          return _context4.a(2, ApiResponse.successResponse(res, "Review deleted successfully", {
            deletedReview: review,
            updatedStats: {
              totalReviews: totalReviews,
              averageRating: totalReviews === 0 ? 0 : Number(averageRating.toFixed(1))
            }
          }));
      }
    }, _callee4);
  }));
  return function (_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "getTotalReviewed", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var user_id, totalReviewedUser;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          user_id = req.user.id;
          _context5.n = 1;
          return Review.countDocuments({
            user_id: user_id
          });
        case 1:
          totalReviewedUser = _context5.v;
          return _context5.a(2, ApiResponse.successResponse(res, "success get total reviewed booking", totalReviewedUser));
      }
    }, _callee5);
  }));
  return function (_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = ReviewController;