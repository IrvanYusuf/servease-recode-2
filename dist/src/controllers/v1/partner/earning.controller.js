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
var mongoose = require("mongoose");
var _require3 = require("../../../models/user.model"),
  User = _require3.User;
var ApiError = require("../../../errors/apiError");
var _require4 = require("../../../models/withdraw.model"),
  Withdraw = _require4.Withdraw;
var EarningController = /*#__PURE__*/_createClass(function EarningController() {
  _classCallCheck(this, EarningController);
});
_defineProperty(EarningController, "getEarningsHistory", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var owner_id, page, limit, filter, total, bookings, payload;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          owner_id = req.user.id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          filter = {
            owner_id: new mongoose.Types.ObjectId(owner_id),
            status: {
              $in: ["confirmed", "completed"]
            }
          };
          _context.n = 1;
          return Booking.countDocuments(filter);
        case 1:
          total = _context.v;
          _context.n = 2;
          return Booking.find(filter).sort({
            booking_date: -1
          }).populate({
            path: "service_id",
            populate: [{
              path: "category_id",
              model: "Category"
            }]
          }).populate("user_id").populate("partner_id").populate("payment_method_id").skip((page - 1) * limit).limit(limit);
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
          return _context.a(2, ApiResponse.successResponse(res, "success get earning history", payload));
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(EarningController, "getWithdrawHistory", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var owner_id, page, limit, filter, total, withdraws, payload;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          owner_id = req.user.id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          filter = {
            owner_id: new mongoose.Types.ObjectId(owner_id)
          };
          _context2.n = 1;
          return Withdraw.countDocuments(filter);
        case 1:
          total = _context2.v;
          _context2.n = 2;
          return Withdraw.find(filter).skip((page - 1) * limit).limit(limit);
        case 2:
          withdraws = _context2.v;
          payload = {
            data: withdraws,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context2.a(2, ApiResponse.successResponse(res, "success get withdraw history", payload));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(EarningController, "makeWithdraw", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var owner_id, data, user, withdraw;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          owner_id = req.user.id;
          data = req.validated;
          _context3.n = 1;
          return User.findById(owner_id);
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          if (!(user.balance < 0)) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, next(new ApiError("Balance not enough", StatusCodes.BAD_REQUEST)));
        case 3:
          _context3.n = 4;
          return Withdraw.create({
            owner_id: owner_id,
            bank_name: data.bank_name,
            account_name: data.account_name,
            account_number: data.account_number,
            amount: data.amount,
            admin_fee: data.admin_fee,
            notes: data.notes,
            created_at: new Date()
          });
        case 4:
          withdraw = _context3.v;
          user.balance = user.balance - parseInt(data.amount);
          _context3.n = 5;
          return user.save();
        case 5:
          return _context3.a(2, ApiResponse.successResponse(res, "success request withdraw", withdraw, null, StatusCodes.CREATED));
      }
    }, _callee3);
  }));
  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(EarningController, "getTotalMonthlyWithdraw", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _monthlyWithdraw$;
    var owner_id, now, startOfMonth, endOfMonth, monthlyWithdraw, totalMonthlyWithdraw;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          owner_id = req.user.id;
          now = new Date();
          startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
          _context4.n = 1;
          return Withdraw.aggregate([{
            $match: {
              owner_id: new mongoose.Types.ObjectId(owner_id),
              createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
              }
            }
          }, {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$amount"
              }
            }
          }]);
        case 1:
          monthlyWithdraw = _context4.v;
          totalMonthlyWithdraw = ((_monthlyWithdraw$ = monthlyWithdraw[0]) === null || _monthlyWithdraw$ === void 0 ? void 0 : _monthlyWithdraw$.totalRevenue) || 0;
          return _context4.a(2, ApiResponse.successResponse(res, "Success get monthly withdraw", totalMonthlyWithdraw));
      }
    }, _callee4);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(EarningController, "getUserBalance", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var owner_id, user, balance;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          owner_id = req.user.id;
          _context5.n = 1;
          return User.findById(owner_id);
        case 1:
          user = _context5.v;
          if (user) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, next(new ApiError("User not found", StatusCodes.NOT_FOUND)));
        case 2:
          balance = user.balance || 0;
          return _context5.a(2, ApiResponse.successResponse(res, "Success get user balance", balance));
      }
    }, _callee5);
  }));
  return function (_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = EarningController;