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
var _require2 = require("../../models/service.model"),
  Service = _require2.Service;
var _require3 = require("../../models/review.model"),
  Review = _require3.Review;
var redisClient = require("../../config/redis");
var ApiError = require("../../errors/apiError");
var ServiceController = /*#__PURE__*/_createClass(function ServiceController() {
  _classCallCheck(this, ServiceController);
});
_defineProperty(ServiceController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user_id, page, limit, filter, total, services, payload;
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
          return Service.countDocuments(filter);
        case 1:
          total = _context.v;
          _context.n = 2;
          return Service.find(filter).populate("partner_id").populate("category_id").skip((page - 1) * limit).limit(limit);
        case 2:
          services = _context.v;
          payload = {
            data: services,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context.a(2, ApiResponse.successResponse(res, "success get datas", payload));
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_defineProperty(ServiceController, "findByCategory", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var category_id, page, limit, filter, total, services, payload;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          category_id = req.params.category_id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          filter = {
            category_id: category_id
          };
          _context2.n = 1;
          return Service.countDocuments(filter);
        case 1:
          total = _context2.v;
          _context2.n = 2;
          return Service.find(filter).populate("partner_id").populate("category_id").skip((page - 1) * limit).limit(limit);
        case 2:
          services = _context2.v;
          payload = {
            data: services,
            pagination: {
              total: total,
              page: page,
              limit: limit,
              totalPages: Math.ceil(total / limit)
            }
          };
          return _context2.a(2, ApiResponse.successResponse(res, "success get datas", payload));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(ServiceController, "show", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var service_id, service;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          service_id = req.params.service_id;
          _context3.n = 1;
          return Service.findOne({
            _id: service_id
          }).populate("partner_id").populate("user_id").populate("category_id");
        case 1:
          service = _context3.v;
          if (service) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, next(new ApiError("Service not found", StatusCodes.NOT_FOUND)));
        case 2:
          return _context3.a(2, ApiResponse.successResponse(res, "success get service", service));
      }
    }, _callee3);
  }));
  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
_defineProperty(ServiceController, "getServiceReview", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res, next) {
    var service_id, service_reviews;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          service_id = req.params.service_id;
          _context4.n = 1;
          return Review.find({
            service_id: service_id
          }).populate("user_id");
        case 1:
          service_reviews = _context4.v;
          if (service_reviews) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, next(new ApiError("Review service not found", StatusCodes.NOT_FOUND)));
        case 2:
          return _context4.a(2, ApiResponse.successResponse(res, "success get review service", service_reviews));
      }
    }, _callee4);
  }));
  return function (_x8, _x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}());
_defineProperty(ServiceController, "searchServices", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _result$, _result$2;
    var _req$query, _req$query$keyword, keyword, _req$query$page, page, _req$query$limit, limit, regex, skip, pipeline, result, data, total, payload;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _req$query = req.query, _req$query$keyword = _req$query.keyword, keyword = _req$query$keyword === void 0 ? "" : _req$query$keyword, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          regex = new RegExp(keyword, "i"); // case-insensitive
          skip = (parseInt(page) - 1) * parseInt(limit);
          pipeline = [{
            $lookup: {
              from: "categories",
              // nama collection Category
              localField: "category_id",
              foreignField: "_id",
              as: "category"
            }
          }, {
            $lookup: {
              from: "partners",
              localField: "partner_id",
              foreignField: "_id",
              as: "partner_id"
            }
          }, {
            $unwind: {
              path: "$category",
              preserveNullAndEmptyArrays: true
            }
          }, {
            $unwind: {
              path: "$partner_id",
              preserveNullAndEmptyArrays: true
            }
          }, {
            $match: {
              $or: [{
                name: {
                  $regex: regex
                }
              }, {
                "category.name": {
                  $regex: regex
                }
              }]
            }
          }, {
            $facet: {
              data: [{
                $skip: skip
              }, {
                $limit: parseInt(limit)
              }],
              totalCount: [{
                $count: "count"
              }]
            }
          }];
          _context5.n = 1;
          return Service.aggregate(pipeline);
        case 1:
          result = _context5.v;
          data = ((_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.data) || [];
          total = ((_result$2 = result[0]) === null || _result$2 === void 0 || (_result$2 = _result$2.totalCount[0]) === null || _result$2 === void 0 ? void 0 : _result$2.count) || 0;
          payload = {
            data: data,
            pagination: {
              total: total,
              page: parseInt(page),
              limit: limit,
              totalPages: Math.ceil(total / limit),
              keyword: keyword
            }
          };
          return _context5.a(2, ApiResponse.successResponse(res, "success get search data", payload));
      }
    }, _callee5);
  }));
  return function (_x1, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
_defineProperty(ServiceController, "getPopularServices", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var cacheKey, cached, limit, randomDocs, randomIds, services;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          cacheKey = "popular_services";
          _context6.n = 1;
          return redisClient.get(cacheKey);
        case 1:
          cached = _context6.v;
          limit = parseInt(req.query.limit) || 10;
          if (!cached) {
            _context6.n = 2;
            break;
          }
          console.log("🍕 Serving data popular services from Redis Cache with key:", cacheKey);
          return _context6.a(2, ApiResponse.successResponse(res, "success get datas", JSON.parse(cached)));
        case 2:
          _context6.n = 3;
          return Service.aggregate([{
            $sample: {
              size: limit
            }
          }, {
            $project: {
              _id: 1
            }
          }]);
        case 3:
          randomDocs = _context6.v;
          randomIds = randomDocs.map(function (doc) {
            return doc._id;
          });
          _context6.n = 4;
          return Service.find({
            _id: {
              $in: randomIds
            }
          }).populate("partner_id").populate("category_id");
        case 4:
          services = _context6.v;
          _context6.n = 5;
          return redisClient.setEx(cacheKey, 1800, JSON.stringify(services));
        case 5:
          return _context6.a(2, ApiResponse.successResponse(res, "success get popular services", services));
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = ServiceController;