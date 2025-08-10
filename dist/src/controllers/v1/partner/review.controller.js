"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var ApiResponse = require("../../../utils/response.js");
var _require2 = require("../../../models/review.model"),
  Review = _require2.Review;
var _require3 = require("../../../models/booking.model"),
  Booking = _require3.Booking;
var _require4 = require("mongoose"),
  mongoose = _require4.mongoose;
var ReviewController = /*#__PURE__*/_createClass(function ReviewController() {
  _classCallCheck(this, ReviewController);
});
_defineProperty(ReviewController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _totalResult$;
    var owner_id, page, limit, service_id, rating, review_status, search, matchStage, ratingFilter, isValidObjectId, searchFilter, reviewDateFilter, reviewToDate, pipeline, bookings, totalPipeline, totalResult, total, payload;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          owner_id = req.user.id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 4;
          service_id = req.query.service_id || "";
          rating = parseInt(req.query.rating);
          review_status = req.query.review_status;
          search = req.query.search || "";
          matchStage = {
            owner_id: new mongoose.Types.ObjectId(owner_id),
            status: "completed"
          };
          if (service_id) {
            matchStage.service_id = new mongoose.Types.ObjectId(service_id);
          }
          if (review_status) {
            matchStage.review_status = review_status;
          }
          ratingFilter = !isNaN(rating) ? {
            "review_id.rating": rating
          } : {}; // Fungsi helper untuk cek apakah string adalah valid ObjectId
          isValidObjectId = function isValidObjectId(str) {
            return /^[0-9a-fA-F]{24}$/.test(str);
          };
          searchFilter = search ? [{
            $match: {
              $or: [{
                "service_id.name": {
                  $regex: search,
                  $options: "i"
                }
              }, {
                "partner_id.name": {
                  $regex: search,
                  $options: "i"
                }
              }, {
                "user_id.name": {
                  $regex: search,
                  $options: "i"
                }
              }].concat(_toConsumableArray(isValidObjectId(search) ? [{
                _id: new mongoose.Types.ObjectId(search)
              }] : [])).filter(Boolean) // Remove undefined entries
            }
          }] : []; // Filter berdasarkan tanggal review (jika diperlukan)
          reviewDateFilter = {};
          if (req.query.date_from || req.query.date_to) {
            reviewDateFilter = {};
            if (req.query.date_from) {
              reviewDateFilter["review_id.createdAt"] = {
                $gte: new Date(req.query.date_from)
              };
            }
            if (req.query.date_to) {
              reviewToDate = new Date(req.query.date_to);
              reviewToDate.setHours(23, 59, 59, 999);
              if (!reviewDateFilter["review_id.createdAt"]) {
                reviewDateFilter["review_id.createdAt"] = {};
              }
              reviewDateFilter["review_id.createdAt"].$lte = reviewToDate;
            }
          }
          pipeline = [{
            $match: matchStage
          },
          // Join ke collection Review
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "booking_id",
              as: "review_id"
            }
          }, {
            $unwind: {
              path: "$review_id",
              preserveNullAndEmptyArrays: true
            }
          },
          // Join ke Service dan Partner (untuk pencarian)
          {
            $lookup: {
              from: "services",
              localField: "service_id",
              foreignField: "_id",
              as: "service_id"
            }
          }, {
            $unwind: "$service_id"
          }, {
            $lookup: {
              from: "partners",
              localField: "partner_id",
              foreignField: "_id",
              as: "partner_id"
            }
          }, {
            $unwind: "$partner_id"
          }, {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user_id"
            }
          }, {
            $unwind: "$user_id"
          },
          // Filter berdasarkan rating jika ada
          {
            $match: ratingFilter
          },
          // filter berdasarkan date review from and review to
          {
            $match: reviewDateFilter
          }].concat(searchFilter, [
          // Sort dan Pagination
          {
            $sort: {
              createdAt: -1
            }
          }, {
            $skip: (page - 1) * limit
          }, {
            $limit: limit
          }]);
          _context.n = 1;
          return Booking.aggregate(pipeline);
        case 1:
          bookings = _context.v;
          // Hitung total tanpa skip-limit
          totalPipeline = [{
            $match: matchStage
          }, {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "booking_id",
              as: "review_id"
            }
          }, {
            $unwind: {
              path: "$review_id",
              preserveNullAndEmptyArrays: true
            }
          }, {
            $match: ratingFilter
          }, {
            $match: reviewDateFilter
          }].concat(searchFilter, [{
            $count: "total"
          }]);
          _context.n = 2;
          return Booking.aggregate(totalPipeline);
        case 2:
          totalResult = _context.v;
          total = ((_totalResult$ = totalResult[0]) === null || _totalResult$ === void 0 ? void 0 : _totalResult$.total) || 0;
          payload = {
            data: bookings,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context.a(2, ApiResponse.successResponse(res, "success get reviews partner", payload));
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "getTotalBookingNotReviewed", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var owner_id, totalNotReviewedBooking;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          owner_id = req.user.id;
          _context2.n = 1;
          return Booking.countDocuments({
            owner_id: owner_id,
            status: "completed",
            review_status: "not_reviewed"
          });
        case 1:
          totalNotReviewedBooking = _context2.v;
          return _context2.a(2, ApiResponse.successResponse(res, "success get total not reviewed booking partner", totalNotReviewedBooking));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(ReviewController, "getTotalBookingReview", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var owner_id, totalReviewedBooking;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          owner_id = req.user.id;
          _context3.n = 1;
          return Booking.countDocuments({
            owner_id: owner_id,
            status: "completed"
          });
        case 1:
          totalReviewedBooking = _context3.v;
          return _context3.a(2, ApiResponse.successResponse(res, "success get total all review booking partner", totalReviewedBooking));
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = ReviewController;