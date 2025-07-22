require("module-alias/register");

require("dotenv").config();
const { faker } = require("@faker-js/faker/locale/id_ID");
const { Partner } = require("@/models/partner.model");
const { Category } = require("@/models/category.model");
const { Service } = require("@/models/service.model");
const connectDb = require("@/database/db.js");
const { User } = require("@/models/user.model");

const jumlah = process.argv[2] || 10;

const seedServices = async () => {
  await connectDb();
  // 687b11888f6d6220ac217c90
  const partners = await Partner.find();
  const categories = await Category.find({ _id: "6879b5bb8a6301eca1bf4bd2" });
  const users = await User.find();

  const categoriesId = [
    "6879c494caed8b685f3de4d1",
    "6879c4a9caed8b685f3de4d3",
    "6879c2eecaed8b685f3de4c3",
    "6879c4bfcaed8b685f3de4d5",
    "6879c4dacaed8b685f3de4d7",
    "6879c4eacaed8b685f3de4d9",
    "6879b5bb8a6301eca1bf4bd2",
  ];

  if (partners.length === 0 || categories.length === 0) {
    console.error("Partner atau Category kosong! Seed data terlebih dahulu.");
    process.exit(1);
  }

  const services = [];
  for (const categoryId of categoriesId) {
    for (let i = 0; i < jumlah; i++) {
      const randomPartner = faker.helpers.arrayElement(partners);
      const randomCategory = faker.helpers.arrayElement(categoriesId);
      const randomUser = faker.helpers.arrayElement(users);

      services.push({
        name: faker.commerce.productName(),
        price: (faker.number.int({ min: 100, max: 5000 }) * 1000).toString(),
        description: faker.lorem.paragraphs({ min: 4, max: 10 }, "<br/>\n"),
        partner_id: randomPartner._id,
        category_id: categoryId,
        user_id: randomUser._id,
        thumbnail: `https://picsum.photos/800/600?random=${faker.number.int()}`,
        gallery_images: [
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
        ],
      });
    }
  }

  await Service.deleteMany();
  await Service.insertMany(services);

  console.log(`✅ Seeded ${jumlah} fake services successfully.`);
  process.exit();
};

seedServices();
