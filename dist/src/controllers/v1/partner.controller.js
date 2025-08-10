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
var _require2 = require("../../utils/uploadToCloudinary"),
  uploadToCloudinary = _require2.uploadToCloudinary;
var _require3 = require("../../models/partner.model"),
  Partner = _require3.Partner;
var getPublicIdCloudinary = require("../../utils/getPublicIdCloudinary");
var ApiError = require("../../errors/apiError");
var cloudinary = require("../../config/cloudinary");
var PartnerController = /*#__PURE__*/_createClass(function PartnerController() {
  _classCallCheck(this, PartnerController);
});
_defineProperty(PartnerController, "index", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user_id, page, limit, search, filter, total, partners, payload;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          user_id = req.user.id;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          search = req.query.search || "";
          filter = {
            user_id: user_id
          };
          if (search) {
            filter["$or"] = [{
              name: {
                $regex: search,
                $options: "i"
              }
            }, {
              description: {
                $regex: search,
                $options: "i"
              }
            }, {
              city: {
                $regex: search,
                $options: "i"
              }
            }, {
              province: {
                $regex: search,
                $options: "i"
              }
            }, {
              district: {
                $regex: search,
                $options: "i"
              }
            }];
          }
          _context.n = 1;
          return Partner.countDocuments(filter);
        case 1:
          total = _context.v;
          _context.n = 2;
          return Partner.find(filter).populate("user_id").sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit);
        case 2:
          partners = _context.v;
          payload = {
            data: partners,
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
_defineProperty(PartnerController, "store", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var data, imageUrl, user, partner;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          data = req.validated;
          _context2.n = 1;
          return uploadToCloudinary({
            buffer: req.file.buffer
          });
        case 1:
          imageUrl = _context2.v;
          user = req.user;
          _context2.n = 2;
          return Partner.create({
            user_id: user.id,
            city: data.city,
            name: data.name,
            province: data.province,
            district: data.district,
            profile_image: imageUrl,
            description: data.description,
            link_map: data.link_map
          });
        case 2:
          partner = _context2.v;
          return _context2.a(2, ApiResponse.successResponse(res, "success create partner", partner, null, StatusCodes.CREATED));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
_defineProperty(PartnerController, "destroy", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var partner_id, partner, imageUrl, publicId;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          partner_id = req.params.partner_id;
          _context3.n = 1;
          return Partner.findById(partner_id);
        case 1:
          partner = _context3.v;
          if (partner) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, next(new ApiError("Partner not found", StatusCodes.NOT_FOUND)));
        case 2:
          // Ambil public_id dari url
          imageUrl = partner.profile_image;
          publicId = getPublicIdCloudinary(imageUrl); // Hapus dari Cloudinary
          if (!publicId) {
            _context3.n = 3;
            break;
          }
          _context3.n = 3;
          return cloudinary.uploader.destroy(publicId);
        case 3:
          _context3.n = 4;
          return Partner.deleteOne({
            _id: partner_id
          });
        case 4:
          return _context3.a(2, ApiResponse.successResponse(res, "Success delete partner"));
      }
    }, _callee3);
  }));
  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = PartnerController;