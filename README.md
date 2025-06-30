# 📦 Boilerplate Express CLI

> RESTful API backend untuk sistem manajemen pengguna menggunakan Express.js + MongoDB.

---

## 🚀 Fitur

- ✅ CRUD User
- ✅ Struktur Modular (Controller, Route, Model)
- ✅ CLI generator: controller, route, middleware

---

## 🛠️ Instalasi

```bash
git clone https://github.com/IrvanYusuf/boilerplate-express-cli.git
cd nama-repo
npm install
```

---

## 🍙 Konfigurasi

```env
PORT=3300
MONGO_URI=your_mongo_uri
JWT_SECRET_KEY=your_secret_key
```

---

## 🧰 CLI Generator

```bash
# akan membuat file user.controller.js (class controller)
npm run make:controller user
# akan membuat folder v1/user.controller.js (class controller)
npm run make:controller v1/User

# kamu juga bisa menambahkan type function atau class
npm run make:controller v1/User -- --type=function
# akan membuat folder v1/user.controller.js (function controller)

# akan membuat folder v1/user.controller.js (class controller)
# sekaligus menambahkan route ke index.js
npm run make:route v1/user.route.js

# akan membuat middleware auth
npm run make:middleware auth

```

---

## 📦 Teknologi

Node.js

Vite

Express.js

MongoDB (Mongoose) / Database lainnya

bcryptjs

dotenv

module-alias

## 👨‍💻 Author

Irvan Yusuf Cahyadi
📍 Medan, Indonesia
🔗 LinkedIn — GitHub
