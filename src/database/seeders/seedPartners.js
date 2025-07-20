require("module-alias/register");

require("dotenv").config();
const { faker } = require("@faker-js/faker/locale/id_ID");
const connectDb = require("@/database/db.js");
const { Partner } = require("@/models/partner.model");
const { User } = require("@/models/user.model");

const total = process.argv[2] || 10; // jumlah input lewat argumen

(async () => {
  try {
    await connectDb();

    const users = await User.find({
      role: "PARTNER",
      _id: "687a037a88f2df6a9e58021e",
    }); // Partner membutuhkan user_id

    if (users.length === 0) {
      console.error(
        "Tidak ada user dengan role PARTNER. Buat user terlebih dahulu."
      );
      process.exit(1);
    }

    const partners = [];

    for (let i = 0; i < total; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      partners.push({
        user_id: randomUser._id,
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        city: faker.location.city(),
        province: faker.location.state(),
        district: faker.location.street(),
        link_map: `https://www.google.com/maps/place/${faker.location
          .city()
          .replace(/\s/g, "+")}`,
        profile_image: faker.image.avatar(640, 480, true),
      });
    }

    await Partner.insertMany(partners);

    console.log(`✅ Seeded ${total} fake partners successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
})();
