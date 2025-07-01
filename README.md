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
MONGO_URI=xxxxxxx
PORT=3300
#generate with openssl rand -base64 32
JWT_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
#db provider (mongodb, prisma)
DB_PROVIDER=xxxxxx
```

---

## 🧰 CLI Generator

```bash
# akan membuat file user.controller.js (class controller)
npm run make:controller user
# akan membuat folder v1/user.controller.js (class controller)
npm run make:controller v1/User

# kamu juga bisa menambahkan type function atau class
# akan membuat folder v1/user.controller.js (function controller)
npm run make:controller v1/User -- --type=function

# akan membuat folder v1/user.route.js
# sekaligus menambahkan route ke src/routes/v1/index.js
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
🔗 [LinkedIn](https://www.linkedin.com/in/irvanyusufcahyadi/) — [GitHub](https://github.com/IrvanYusuf) - [Threads](https://www.threads.com/@irvanyusufcahyadi__)
