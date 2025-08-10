"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var _require2 = require("../../models/booking.model"),
  Booking = _require2.Booking;
var _require3 = require("../../models/service.model"),
  Service = _require3.Service;
var _require4 = require("../../constant/constant"),
  APP_FEE = _require4.APP_FEE;
var _require5 = require("../../utils/uploadToCloudinary"),
  uploadToCloudinary = _require5.uploadToCloudinary;
var _require6 = require("../../models/timelinetracker.model"),
  TimelineTracker = _require6.TimelineTracker;
var ApiError = require("../../errors/apiError");
var _require7 = require("../../models/paymentMethod.model"),
  PaymentMethod = _require7.PaymentMethod;
var _require8 = require("../../models/user.model"),
  User = _require8.User;
var BookingController = /*#__PURE__*/_createClass(function BookingController() {
  _classCallCheck(this, BookingController);
});
_defineProperty(BookingController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user_id, status, review_status, page, limit, filter, validStatuses, validStatusReviews, total, bookings, payload, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          user_id = req.user.id;
          status = req.query.status || "";
          review_status = req.query.review_status || "";
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 4;
          filter = {
            user_id: user_id
          }; // Tambah filter status jika ada dan bukan 'all'
          if (status) {
            // Validasi status yang valid
            validStatuses = ["pending", "confirmed", "cancelled", "completed"];
            if (validStatuses.includes(status)) {
              filter.status = status;
            }
          }
          if (review_status) {
            // Validasi status yang valid
            validStatusReviews = ["not_reviewed", "reviewed"];
            if (validStatusReviews.includes(review_status)) {
              filter.review_status = review_status;
            }
          }
          _context.n = 1;
          return Booking.countDocuments(filter);
        case 1:
          total = _context.v;
          _context.n = 2;
          return Booking.find(filter).populate({
            path: "service_id",
            populate: [{
              path: "category_id",
              model: "Category"
            }, {
              path: "user_id",
              model: "User"
            }]
          }).populate("partner_id").populate("address_id").populate("payment_method_id").sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit);
        case 2:
          bookings = _context.v;
          payload = {
            data: bookings,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context.a(2, ApiResponse.successResponse(res, "success get bookings", payload, null, StatusCodes.OK));
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error(_t);
          return _context.a(2, ApiResponse.errorResponse(res, "Internal server error", {
            server: _t.message
          }));
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "show", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var booking_id, booking, timelinetracker, payload;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          booking_id = req.params.booking_id;
          _context2.n = 1;
          return Booking.findOne({
            _id: booking_id
          }).populate("user_id").populate({
            path: "service_id",
            populate: [{
              path: "category_id",
              model: "Category"
            }, {
              path: "user_id",
              model: "User"
            }]
          }).populate("partner_id").populate("address_id").populate("payment_method_id");
        case 1:
          booking = _context2.v;
          if (booking) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, next(new ApiError("Booking not found", StatusCodes.NOT_FOUND)));
        case 2:
          _context2.n = 3;
          return TimelineTracker.findOne({
            booking_id: booking_id
          });
        case 3:
          timelinetracker = _context2.v;
          payload = booking ? _objectSpread(_objectSpread({}, booking.toObject()), {}, {
            timelinetracker: timelinetracker
          }) : {
            timelinetracker: timelinetracker
          };
          return _context2.a(2, ApiResponse.successResponse(res, "success get detail booking", payload));
      }
    }, _callee2);
  }));
  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "store", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var data, service, user_id, total_price, paymentDue, booking, createTimelineTracker;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          data = req.validated;
          _context3.n = 1;
          return Service.findById(data.service_id);
        case 1:
          service = _context3.v;
          if (service) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, next(new ApiError("Service not found", StatusCodes.NOT_FOUND)));
        case 2:
          user_id = req.user.id;
          total_price = service.price + APP_FEE;
          paymentDue = new Date();
          paymentDue.setHours(paymentDue.getHours() + 24);
          _context3.n = 3;
          return Booking.create({
            user_id: user_id,
            address_id: data.address_id,
            partner_id: data.partner_id,
            owner_id: data.owner_id,
            payment_method_id: data.payment_method_id,
            booking_date: data.booking_date,
            booking_time: data.booking_time,
            bring_ladder: data.bring_ladder,
            service_id: service._id,
            notes: data.notes,
            total_price: total_price,
            sub_total: service.price,
            app_cost: APP_FEE,
            payment_due: paymentDue
          });
        case 3:
          booking = _context3.v;
          _context3.n = 4;
          return TimelineTracker.create({
            user_id: user_id,
            booking_id: booking._id,
            owner_id: data.owner_id,
            partner_id: data.partner_id,
            service_id: data.service_id,
            tracker: {
              booked_at: new Date()
            },
            notes: "Booking dibuat"
          });
        case 4:
          createTimelineTracker = _context3.v;
          return _context3.a(2, ApiResponse.successResponse(res, "success create booking", booking, null, StatusCodes.CREATED));
      }
    }, _callee3);
  }));
  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "uploadPaymentProof", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var booking_id, user_id, paymentProofUrl, update_booking;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          booking_id = req.params.booking_id;
          user_id = req.user.id;
          _context4.n = 1;
          return uploadToCloudinary({
            buffer: req.file.buffer
          });
        case 1:
          paymentProofUrl = _context4.v;
          _context4.n = 2;
          return Booking.findOneAndUpdate({
            _id: booking_id,
            user_id: user_id
          }, {
            payment_proof: paymentProofUrl,
            payment_status: "paid"
          });
        case 2:
          update_booking = _context4.v;
          _context4.n = 3;
          return TimelineTracker.findOneAndUpdate({
            owner_id: update_booking.owner_id,
            booking_id: booking_id
          }, {
            $set: {
              "tracker.payment_at": new Date(),
              status: "payment",
              notes: "Melakukan Pembayaran"
            }
          });
        case 3:
          return _context4.a(2, ApiResponse.successResponse(res, "success upload payment proof", update_booking));
      }
    }, _callee4);
  }));
  return function (_x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "completeBooking", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var booking_id, paymentStatus, params, update_booking, payment_method_id, service_id, owner_id, paymentMethodName, trackerUpdate, service, user;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          booking_id = req.params.booking_id; // const user_id = req.user.id;
          paymentStatus = req.body.payment_status;
          params = {
            status: "completed"
          };
          if (paymentStatus && paymentStatus.trim() !== "") {
            params.payment_status = paymentStatus;
          }
          _context5.n = 1;
          return Booking.findOneAndUpdate({
            _id: booking_id
          }, params);
        case 1:
          update_booking = _context5.v;
          payment_method_id = update_booking.payment_method_id, service_id = update_booking.service_id, owner_id = update_booking.owner_id;
          _context5.n = 2;
          return PaymentMethod.findById(payment_method_id);
        case 2:
          paymentMethodName = _context5.v;
          // Payload dasar
          trackerUpdate = {
            "tracker.completed_at": new Date(),
            status: "completed",
            notes: "Booking selesai"
          }; // Jika cash, tambahkan payment_at
          if (paymentMethodName.type === "cash") {
            trackerUpdate["tracker.payment_at"] = new Date();
          }

          // Update ke TimelineTracker
          _context5.n = 3;
          return TimelineTracker.findOneAndUpdate({
            owner_id: owner_id,
            booking_id: booking_id
          }, {
            $set: trackerUpdate
          });
        case 3:
          _context5.n = 4;
          return Service.findById(service_id);
        case 4:
          service = _context5.v;
          _context5.n = 5;
          return User.findById(owner_id);
        case 5:
          user = _context5.v;
          console.log({
            user: user,
            balance: user.balance,
            price: service.price
          });
          user.balance = Number(user.balance ? user.balance : 0) + Number(service.price);
          _context5.n = 6;
          return user.save();
        case 6:
          return _context5.a(2, ApiResponse.successResponse(res, "Booking marked as completed successfully", update_booking));
      }
    }, _callee5);
  }));
  return function (_x1, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBooking", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var user_id, range_date, params, todayStart, todayEnd, weekStart, now, totalBookings;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          user_id = req.user.id;
          range_date = req.query.range_date || "all";
          params = {
            user_id: user_id
          };
          if (range_date === "today") {
            todayStart = moment().utc().startOf("day").toDate();
            todayEnd = moment().utc().endOf("day").toDate();
            params.createdAt = {
              $gte: todayStart,
              $lte: todayEnd
            };
          } else if (range_date === "week") {
            weekStart = moment().utc().subtract(7, "days").startOf("day").toDate();
            now = moment().utc().endOf("day").toDate();
            params.createdAt = {
              $gte: weekStart,
              $lte: now
            };
          }
          _context6.n = 1;
          return Booking.countDocuments(params);
        case 1:
          totalBookings = _context6.v;
          return _context6.a(2, ApiResponse.successResponse(res, "Success get total completed bookings", totalBookings));
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingCompleted", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var user_id, totalCompletedBooking;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          user_id = req.user.id;
          _context7.n = 1;
          return Booking.countDocuments({
            user_id: user_id,
            status: "completed"
          });
        case 1:
          totalCompletedBooking = _context7.v;
          return _context7.a(2, ApiResponse.successResponse(res, "success get total completed booking", totalCompletedBooking));
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingNotReviewed", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var user_id, totalNotReviewedBooking;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          user_id = req.user.id;
          _context8.n = 1;
          return Booking.countDocuments({
            user_id: user_id,
            status: "completed",
            review_status: "not_reviewed"
          });
        case 1:
          totalNotReviewedBooking = _context8.v;
          return _context8.a(2, ApiResponse.successResponse(res, "success get total not reviewed booking", totalNotReviewedBooking));
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
module.exports = BookingController;