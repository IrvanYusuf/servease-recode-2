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
var _require3 = require("../../models/category.model"),
  Category = _require3.Category;
var _require4 = require("../../models/service.model"),
  Service = _require4.Service;
var connectDb = require("../db.js");
var _require5 = require("../../models/user.model"),
  User = _require5.User;
var jumlah = process.argv[2] || 10;
var seedServices = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var partners, categories, users, categoriesId, services, _i, _categoriesId, categoryId, i, randomPartner, randomCategory, randomUser;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return connectDb();
        case 1:
          _context.n = 2;
          return Partner.find();
        case 2:
          partners = _context.v;
          _context.n = 3;
          return Category.find({
            _id: "6879b5bb8a6301eca1bf4bd2"
          });
        case 3:
          categories = _context.v;
          _context.n = 4;
          return User.find();
        case 4:
          users = _context.v;
          categoriesId = ["6879c494caed8b685f3de4d1", "6879c4a9caed8b685f3de4d3", "6879c2eecaed8b685f3de4c3", "6879c4bfcaed8b685f3de4d5", "6879c4dacaed8b685f3de4d7", "6879c4eacaed8b685f3de4d9", "6879b5bb8a6301eca1bf4bd2"];
          if (partners.length === 0 || categories.length === 0) {
            console.error("Partner atau Category kosong! Seed data terlebih dahulu.");
            process.exit(1);
          }
          services = [];
          for (_i = 0, _categoriesId = categoriesId; _i < _categoriesId.length; _i++) {
            categoryId = _categoriesId[_i];
            for (i = 0; i < jumlah; i++) {
              randomPartner = faker.helpers.arrayElement(partners);
              randomCategory = faker.helpers.arrayElement(categoriesId);
              randomUser = faker.helpers.arrayElement(users);
              services.push({
                name: faker.commerce.productName(),
                price: (faker.number["int"]({
                  min: 100,
                  max: 5000
                }) * 1000).toString(),
                description: faker.lorem.paragraphs({
                  min: 4,
                  max: 10
                }, "<br/>\n"),
                partner_id: randomPartner._id,
                category_id: categoryId,
                user_id: randomUser._id,
                thumbnail: "https://picsum.photos/800/600?random=".concat(faker.number["int"]()),
                gallery_images: ["https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600"), "https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600"), "https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600"), "https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600"), "https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600"), "https://picsum.photos/seed/".concat(faker.string.uuid(), "/800/600")]
              });
            }
          }
          _context.n = 5;
          return Service.deleteMany();
        case 5:
          _context.n = 6;
          return Service.insertMany(services);
        case 6:
          console.log("\u2705 Seeded ".concat(jumlah, " fake services successfully."));
          process.exit();
        case 7:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function seedServices() {
    return _ref.apply(this, arguments);
  };
}();
seedServices();