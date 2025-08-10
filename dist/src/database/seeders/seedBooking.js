"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("module-alias/register");
require("dotenv").config();
var _require = require("@faker-js/faker/locale/id_ID"),
  faker = _require.faker;
var _require2 = require("../../models/partner.model"),
  Partner = _require2.Partner;
var _require3 = require("../../models/service.model"),
  Service = _require3.Service;
var connectDb = require("../db.js");
var _require4 = require("../../models/user.model"),
  User = _require4.User;
var _require5 = require("../../models/paymentMethod.model"),
  PaymentMethod = _require5.PaymentMethod;
var _require6 = require("../../constant/constant"),
  APP_FEE = _require6.APP_FEE;
var _require7 = require("../../models/booking.model"),
  Booking = _require7.Booking;
var jumlah = process.argv[2] || 10;
var seedBooking = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var partners, services, paymentMethod, users, bookings, paymentDue, i, randomUser, randomService, randomPartner, randomPaymentMethod, possibleStatus;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return connectDb();
        case 1:
          _context.n = 2;
          return Partner.find({
            user_id: "687b11888f6d6220ac217c90"
          });
        case 2:
          partners = _context.v;
          _context.n = 3;
          return Service.find({
            user_id: "687b11888f6d6220ac217c90"
          });
        case 3:
          services = _context.v;
          _context.n = 4;
          return PaymentMethod.find();
        case 4:
          paymentMethod = _context.v;
          _context.n = 5;
          return User.find();
        case 5:
          users = _context.v;
          if (partners.length === 0) {
            console.error("Partner atau Category kosong! Seed data terlebih dahulu.");
            process.exit(1);
          }
          bookings = [];
          paymentDue = new Date();
          paymentDue.setHours(paymentDue.getHours() + 24);
          for (i = 0; i < jumlah; i++) {
            randomUser = faker.helpers.arrayElement(users);
            randomService = faker.helpers.arrayElement(services);
            randomPartner = faker.helpers.arrayElement(partners);
            randomPaymentMethod = faker.helpers.arrayElement(paymentMethod);
            possibleStatus = ["pending", "confirmed"];
            bookings.push({
              partner_id: randomPartner._id,
              service_id: randomService._id,
              owner_id: "687b11888f6d6220ac217c90",
              user_id: "687cbb083aaf434d724f2385",
              address_id: "687cbb563aaf434d724f2393",
              payment_method_id: randomPaymentMethod._id,
              payment_status: "unpaid",
              payment_due: paymentDue,
              status: faker.helpers.arrayElement(possibleStatus),
              total_price: randomService.price + APP_FEE,
              sub_total: randomService.price,
              app_cost: APP_FEE,
              booking_date: faker.date.future(),
              booking_time: faker.helpers.arrayElement(["09:00", "10:00", "13:00", "15:00"]),
              bring_ladder: faker.datatype["boolean"](),
              review_status: faker.helpers.arrayElement(["not_reviewed"])
              //   notes: faker.lorem.sentence(),
            });
          }
          //   }

          //   await Service.deleteMany();
          _context.n = 6;
          return Booking.insertMany(bookings);
        case 6:
          console.log("\u2705 Seeded ".concat(jumlah, " fake bookings successfully."));
          process.exit();
        case 7:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function seedBooking() {
    return _ref.apply(this, arguments);
  };
}();
seedBooking();