"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("module-alias/register");
require("dotenv").config();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var _require = require("@faker-js/faker"),
  faker = _require.faker;
var _require2 = require("../../config/index.js"),
  CONFIG = _require2.CONFIG;
var _require3 = require("../../models/user.model"),
  User = _require3.User;

// ambil jumlah dari argument CLI, default 10
var totalUsers = parseInt(process.argv[2]) || 10;
var generateFakeUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _t, _t2, _t3, _t4, _t5, _t6, _t7, _t8, _t9, _t0;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _t = faker.internet.userName();
          _t2 = faker.person.fullName();
          _t3 = faker.internet.email();
          _t4 = faker.phone.number("08##########");
          _t5 = faker.helpers.arrayElement(["MALE", "FEMALE"]);
          _t6 = faker.date.birthdate({
            min: 18,
            max: 50,
            mode: "age"
          });
          _context.n = 1;
          return bcrypt.hash("password123", 10);
        case 1:
          _t7 = _context.v;
          _t8 = faker.helpers.arrayElement(["ADMIN", "USER", "PARTNER"]);
          _t9 = faker.datatype["boolean"]();
          _t0 = faker.image.avatar();
          return _context.a(2, {
            username: _t,
            name: _t2,
            email: _t3,
            phone: _t4,
            gender: _t5,
            birthDate: _t6,
            password: _t7,
            role: _t8,
            isVerified: _t9,
            profile_url: _t0
          });
      }
    }, _callee);
  }));
  return function generateFakeUser() {
    return _ref.apply(this, arguments);
  };
}();
var seedUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var fakeUsers, i, _t1, _t10, _t11;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return mongoose.connect(CONFIG.MONGO_URI);
        case 1:
          fakeUsers = [];
          i = 0;
        case 2:
          if (!(i < totalUsers)) {
            _context2.n = 5;
            break;
          }
          _t1 = fakeUsers;
          _context2.n = 3;
          return generateFakeUser();
        case 3:
          _t10 = _context2.v;
          _t1.push.call(_t1, _t10);
        case 4:
          i++;
          _context2.n = 2;
          break;
        case 5:
          _context2.n = 6;
          return User.insertMany(fakeUsers);
        case 6:
          console.log("\u2705 Seeded ".concat(totalUsers, " fake users successfully."));
          process.exit(0);
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t11 = _context2.v;
          console.error("❌ Failed to seed users:", _t11);
          process.exit(1);
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function seedUsers() {
    return _ref2.apply(this, arguments);
  };
}();
seedUsers();