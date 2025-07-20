require("module-alias/register");

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const { CONFIG } = require("@/config/index.js");
const { User } = require("@/models/user.model");

// ambil jumlah dari argument CLI, default 10
const totalUsers = parseInt(process.argv[2]) || 10;

const generateFakeUser = async () => ({
  username: faker.internet.userName(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number("08##########"),
  gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
  birthDate: faker.date.birthdate({ min: 18, max: 50, mode: "age" }),
  password: await bcrypt.hash("password123", 10),
  role: faker.helpers.arrayElement(["ADMIN", "USER", "PARTNER"]),
  isVerified: faker.datatype.boolean(),
  profile_url: faker.image.avatar(),
});

const seedUsers = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URI);

    const fakeUsers = [];
    for (let i = 0; i < totalUsers; i++) {
      fakeUsers.push(await generateFakeUser());
    }

    await User.insertMany(fakeUsers);

    console.log(`✅ Seeded ${totalUsers} fake users successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed users:", error);
    process.exit(1);
  }
};

seedUsers();
