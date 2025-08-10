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
var ApiResponse = require("../../../utils/response.js");
var _require2 = require("../../../models/booking.model"),
  Booking = _require2.Booking;
var _require3 = require("../../../models/timelinetracker.model"),
  TimelineTracker = _require3.TimelineTracker;
var moment = require("moment");
var mongoose = require("mongoose");
var _require4 = require("../../../models/user.model"),
  User = _require4.User;
var BookingController = /*#__PURE__*/_createClass(function BookingController() {
  _classCallCheck(this, BookingController);
});
_defineProperty(BookingController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var owner_id, status, search, paymentStatus, page, limit, filter, validStatuses, validPaymentStatus, query, allData, regex, filteredData, _total, startIndex, endIndex, paginatedData, _payload, total, datas, payload;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          owner_id = req.user.id;
          status = req.query.status || "";
          search = req.query.search || "";
          paymentStatus = req.query.payment_status || "";
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 4; // Base filter
          filter = {
            owner_id: owner_id
          }; // Filter by status booking
          if (status) {
            validStatuses = ["pending", "confirmed", "cancelled", "completed"];
            if (validStatuses.includes(status)) {
              filter.status = status;
            }
          }

          // Filter by payment status
          if (paymentStatus) {
            validPaymentStatus = ["paid", "unpaid"];
            if (validPaymentStatus.includes(paymentStatus)) {
              filter.payment_status = paymentStatus;
            }
          }

          // Filter by date from and date to
          if (req.query.from || req.query.to) {
            filter.createdAt = {};
            if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
            if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
          }

          // Create base query
          query = Booking.find(filter); // Populate related data
          query = query.populate("address_id").populate("user_id").populate("payment_method_id").populate("partner_id").populate({
            path: "service_id",
            populate: {
              path: "category_id",
              model: "Category"
            }
          });
          if (!search) {
            _context.n = 2;
            break;
          }
          _context.n = 1;
          return query.exec();
        case 1:
          allData = _context.v;
          // Filter the populated data based on search criteria
          regex = new RegExp(search, "i");
          filteredData = allData.filter(function (booking) {
            var _booking$user_id, _booking$service_id;
            // Search by booking ID (convert ObjectId to string)
            var bookingIdMatch = booking._id.toString().match(regex);

            // Search by customer name
            var customerNameMatch = (_booking$user_id = booking.user_id) === null || _booking$user_id === void 0 || (_booking$user_id = _booking$user_id.name) === null || _booking$user_id === void 0 ? void 0 : _booking$user_id.match(regex);

            // Search by service name
            var serviceNameMatch = (_booking$service_id = booking.service_id) === null || _booking$service_id === void 0 || (_booking$service_id = _booking$service_id.name) === null || _booking$service_id === void 0 ? void 0 : _booking$service_id.match(regex);
            return bookingIdMatch || customerNameMatch || serviceNameMatch;
          }); // Calculate pagination for filtered data
          _total = filteredData.length;
          startIndex = (page - 1) * limit;
          endIndex = startIndex + limit;
          paginatedData = filteredData.sort(function (a, b) {
            return b.createdAt - a.createdAt;
          }) // Sort by createdAt desc
          .slice(startIndex, endIndex);
          _payload = {
            data: paginatedData,
            pagination: {
              total: _total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(_total / limit)
            }
          };
          return _context.a(2, ApiResponse.successResponse(res, "success get bookings partner", _payload, null, StatusCodes.OK));
        case 2:
          _context.n = 3;
          return Booking.countDocuments(filter);
        case 3:
          total = _context.v;
          _context.n = 4;
          return query.sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit).exec();
        case 4:
          datas = _context.v;
          payload = {
            data: datas,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context.a(2, ApiResponse.successResponse(res, "success get bookings partner", payload, null, StatusCodes.OK));
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "confirmBooking", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$params, booking_id, customer_id, owner_id, updateStatusBooking;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _req$params = req.params, booking_id = _req$params.booking_id, customer_id = _req$params.customer_id;
          owner_id = req.user.id;
          _context2.n = 1;
          return Booking.findOneAndUpdate({
            _id: booking_id,
            user_id: customer_id
          }, {
            status: "confirmed"
          });
        case 1:
          updateStatusBooking = _context2.v;
          _context2.n = 2;
          return TimelineTracker.findOneAndUpdate({
            owner_id: owner_id,
            booking_id: booking_id
          }, {
            $set: {
              "tracker.confirmed_at": new Date(),
              status: "confirmed",
              notes: "Booking dikonfirmasi"
            }
          });
        case 2:
          return _context2.a(2, ApiResponse.successResponse(res, "success confirmed booking", updateStatusBooking, null, StatusCodes.OK));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingCompleted", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var owner_id, totalCompletedBooking;
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
          totalCompletedBooking = _context3.v;
          return _context3.a(2, ApiResponse.successResponse(res, "success get total completed booking", totalCompletedBooking));
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingCompletedUser", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var user_id, totalCompletedBooking;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          user_id = req.params.user_id;
          _context4.n = 1;
          return Booking.countDocuments({
            user_id: user_id,
            status: "completed"
          });
        case 1:
          totalCompletedBooking = _context4.v;
          return _context4.a(2, ApiResponse.successResponse(res, "success get total completed booking", totalCompletedBooking));
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBooking", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var owner_id, range_date, params, todayStart, todayEnd, weekStart, now, totalBookings;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          owner_id = req.user.id;
          range_date = req.query.range_date || "all";
          params = {
            owner_id: owner_id
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
          _context5.n = 1;
          return Booking.countDocuments(params);
        case 1:
          totalBookings = _context5.v;
          return _context5.a(2, ApiResponse.successResponse(res, "Success get total completed bookings", totalBookings));
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalRevenue", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _totalRevenueResult$;
    var owner_id, totalRevenueResult, totalRevenue;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          owner_id = req.user.id;
          _context6.n = 1;
          return Booking.aggregate([{
            $match: {
              owner_id: new mongoose.Types.ObjectId(owner_id),
              status: "completed"
            }
          }, {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$sub_total"
              }
            }
          }]);
        case 1:
          totalRevenueResult = _context6.v;
          totalRevenue = ((_totalRevenueResult$ = totalRevenueResult[0]) === null || _totalRevenueResult$ === void 0 ? void 0 : _totalRevenueResult$.totalRevenue) || 0;
          return _context6.a(2, ApiResponse.successResponse(res, "Success get total revenue", totalRevenue));
      }
    }, _callee6);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalRevenuePending", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _totalRevenueResult$2;
    var owner_id, totalRevenueResult, totalRevenue;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          owner_id = req.user.id;
          _context7.n = 1;
          return Booking.aggregate([{
            $match: {
              owner_id: new mongoose.Types.ObjectId(owner_id),
              status: "confirmed"
            }
          }, {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$sub_total"
              }
            }
          }]);
        case 1:
          totalRevenueResult = _context7.v;
          totalRevenue = ((_totalRevenueResult$2 = totalRevenueResult[0]) === null || _totalRevenueResult$2 === void 0 ? void 0 : _totalRevenueResult$2.totalRevenue) || 0;
          return _context7.a(2, ApiResponse.successResponse(res, "Success get total revenue", totalRevenue));
      }
    }, _callee7);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getMonthlyRevenue", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _monthlyRevenue$;
    var owner_id, now, startOfMonth, endOfMonth, monthlyRevenue, totalRevenue;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          owner_id = req.user.id;
          now = new Date();
          startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
          _context8.n = 1;
          return Booking.aggregate([{
            $match: {
              owner_id: new mongoose.Types.ObjectId(owner_id),
              status: "completed",
              createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
              }
            }
          }, {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$sub_total"
              }
            }
          }]);
        case 1:
          monthlyRevenue = _context8.v;
          totalRevenue = ((_monthlyRevenue$ = monthlyRevenue[0]) === null || _monthlyRevenue$ === void 0 ? void 0 : _monthlyRevenue$.totalRevenue) || 0;
          return _context8.a(2, ApiResponse.successResponse(res, "Success get monthly revenue", totalRevenue));
      }
    }, _callee8);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingPending", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var owner_id, params, totalPendingBooking;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          owner_id = req.user.id;
          params = {
            status: "pending",
            owner_id: owner_id
          };
          _context9.n = 1;
          return Booking.countDocuments(params);
        case 1:
          totalPendingBooking = _context9.v;
          return _context9.a(2, ApiResponse.successResponse(res, "success get total pending booking", totalPendingBooking));
      }
    }, _callee9);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingCancelled", /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var owner_id, params, totalPendingBooking;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          owner_id = req.user.id;
          params = {
            status: "cancelled",
            owner_id: owner_id
          };
          _context0.n = 1;
          return Booking.countDocuments(params);
        case 1:
          totalPendingBooking = _context0.v;
          return _context0.a(2, ApiResponse.successResponse(res, "success get total cancelled booking", totalPendingBooking));
      }
    }, _callee0);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());
_defineProperty(BookingController, "getTotalBookingOnGoing", /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var owner_id, params, totalPendingBooking;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          owner_id = req.user.id;
          params = {
            status: "confirmed",
            owner_id: owner_id
          };
          _context1.n = 1;
          return Booking.countDocuments(params);
        case 1:
          totalPendingBooking = _context1.v;
          return _context1.a(2, ApiResponse.successResponse(res, "success get total confirmed booking", totalPendingBooking));
      }
    }, _callee1);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
module.exports = BookingController;